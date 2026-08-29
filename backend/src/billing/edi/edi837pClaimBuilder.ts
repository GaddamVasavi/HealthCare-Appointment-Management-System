/**
 * MediCare Connect - ANSI ASC X12N 837P (005010X222A1) Professional Healthcare Claim Generator
 * Generates EDI 837P standard transaction files containing loops 1000A-2400.
 */

export interface EDI837PClaimData {
  claimId: string;
  submitterId: string;
  submitterName: string;
  receiverId: string;
  receiverName: string;
  billingProvider: {
    npi: string;
    taxId: string;
    organizationName: string;
    address: { street: string; city: string; state: string; zip: string };
  };
  subscriber: {
    memberId: string;
    lastName: string;
    firstName: string;
    dob: string;
    gender: 'M' | 'F';
    payerId: string;
    payerName: string;
  };
  patient?: {
    lastName: string;
    firstName: string;
    dob: string;
    gender: 'M' | 'F';
    relationshipCode: '18' | '01' | '19'; // 18 = Self, 01 = Spouse, 19 = Child
  };
  diagnoses: Array<{ code: string; pointer: number }>;
  serviceLines: Array<{
    lineNumber: number;
    procedureCode: string;
    modifiers?: string[];
    chargeAmount: number;
    units: number;
    dateOfService: string;
    diagnosisPointers: number[];
  }>;
  placeOfServiceCode: string; // '11' = Office, '02' = Telehealth, '21' = Inpatient Hospital
}

export class EDI837PClaimBuilder {
  private static pad(n: number, width: number = 2): string {
    return n.toString().padStart(width, '0');
  }

  private static formatDate(d: Date = new Date()): string {
    return `${d.getFullYear()}${this.pad(d.getMonth() + 1)}${this.pad(d.getDate())}`;
  }

  private static formatTime(d: Date = new Date()): string {
    return `${this.pad(d.getHours())}${this.pad(d.getMinutes())}`;
  }

  public static generateEDI837P(data: EDI837PClaimData): string {
    const d = new Date();
    const dateStr = this.formatDate(d);
    const timeStr = this.formatTime(d);
    const controlNum = this.pad(Math.floor(Math.random() * 999999), 9);

    const segments: string[] = [];

    // Interchange Control Header (ISA)
    segments.push(`ISA*00*          *00*          *ZZ*${data.submitterId.padEnd(15)}*ZZ*${data.receiverId.padEnd(15)}*${dateStr.substring(2)}*${timeStr}*^*00501*${controlNum}*0*P*:~`);

    // Functional Group Header (GS)
    segments.push(`GS*HC*${data.submitterId}*${data.receiverId}*${dateStr}*${timeStr}*1*X*005010X222A1~`);

    // Transaction Set Header (ST)
    segments.push(`ST*837*0001*005010X222A1~`);

    // Beginning of Hierarchical Transaction (BHT)
    segments.push(`BHT*0019*00*${data.claimId}*${dateStr}*${timeStr}*CH~`);

    // Loop 1000A - Submitter Name
    segments.push(`NM1*41*2*${data.submitterName}*****46*${data.submitterId}~`);
    segments.push(`PER*IC*EDI CLAIMS DEPT*TE*8005551234*EM*claims@medicareconnect.com~`);

    // Loop 1000B - Receiver Name
    segments.push(`NM1*40*2*${data.receiverName}*****46*${data.receiverId}~`);

    // Loop 2000A - Billing Provider Hierarchical Level (HL)
    segments.push(`HL*1**20*1~`);
    segments.push(`PRV*BI*PXC*207Q00000X~`); // Family Medicine Taxonomy

    // Loop 2010AA - Billing Provider Name & Address
    segments.push(`NM1*85*2*${data.billingProvider.organizationName}*****XX*${data.billingProvider.npi}~`);
    segments.push(`N3*${data.billingProvider.address.street}~`);
    segments.push(`N4*${data.billingProvider.address.city}*${data.billingProvider.address.state}*${data.billingProvider.address.zip}~`);
    segments.push(`REF*EI*${data.billingProvider.taxId}~`);

    // Loop 2000B - Subscriber Hierarchical Level
    segments.push(`HL*2*1*22*0~`);
    segments.push(`SBR*P*18*******CI~`); // P = Primary, 18 = Self, CI = Commercial

    // Loop 2010BA - Subscriber Name
    segments.push(`NM1*IL*1*${data.subscriber.lastName}*${data.subscriber.firstName}****MI*${data.subscriber.memberId}~`);
    segments.push(`DMG*D8*${data.subscriber.dob.replace(/-/g, '')}*${data.subscriber.gender}~`);

    // Loop 2010BB - Payer Name
    segments.push(`NM1*PR*2*${data.subscriber.payerName}*****PI*${data.subscriber.payerId}~`);

    // Loop 2300 - Claim Information
    const totalCharges = data.serviceLines.reduce((sum, line) => sum + line.chargeAmount, 0).toFixed(2);
    segments.push(`CLM*${data.claimId}*${totalCharges}***${data.placeOfServiceCode}:B:1*Y*A*Y*Y~`);

    // Health Care Diagnosis Codes (HI)
    const diagSegments = data.diagnoses.map((d) => `ABK:${d.code.replace('.', '')}`).join('*');
    segments.push(`HI*${diagSegments}~`);

    // Loop 2400 - Service Lines
    data.serviceLines.forEach((line) => {
      const modStr = (line.modifiers || []).length > 0 ? `:${line.modifiers!.join(':')}` : '';
      const diagPointers = line.diagnosisPointers.join(':');

      segments.push(`LX*${line.lineNumber}~`);
      segments.push(`SV1*HC:${line.procedureCode}${modStr}*${line.chargeAmount.toFixed(2)}*UN*${line.units}***${diagPointers}~`);
      segments.push(`DTP*472*D8*${line.dateOfService.replace(/-/g, '')}~`);
    });

    // Transaction Set Trailer (SE)
    segments.push(`SE*${segments.length - 2}*0001~`);

    // Functional Group Trailer (GE)
    segments.push(`GE*1*1~`);

    // Interchange Control Trailer (IEA)
    segments.push(`IEA*1*${controlNum}~`);

    return segments.join('\r\n');
  }
}
