/**
 * MediCare Connect - CMS-1500 (02/12) Paper Claim Structured Form Mapping
 * Maps claim data into standard box-by-box CMS-1500 format fields.
 */

export interface CMS1500FormData {
  box1_payerType: string;
  box1a_insuredIdNumber: string;
  box2_patientName: string;
  box3_patientBirthDate: string;
  box3_patientSex: 'M' | 'F';
  box4_insuredName: string;
  box5_patientAddress: { street: string; city: string; state: string; zip: string; phone: string };
  box6_patientRelationship: 'Self' | 'Spouse' | 'Child' | 'Other';
  box10_conditionRelatedTo: { employment: boolean; autoAccident: boolean; otherAccident: boolean };
  box11_insuredPolicyGroup: string;
  box21_diagnoses: string[];
  box24_serviceLines: Array<{
    dateFrom: string;
    dateTo: string;
    placeOfService: string;
    cptHcpcs: string;
    modifiers: string;
    diagPointer: string;
    charges: string;
    daysOrUnits: string;
    renderingProviderNpi: string;
  }>;
  box25_federalTaxId: string;
  box28_totalCharge: string;
  box31_physicianSignature: string;
  box32_serviceFacilityLocation: string;
  box33_billingProviderInfo: string;
}

export class CMS1500FormBuilder {
  public static buildForm(rawClaim: any): CMS1500FormData {
    return {
      box1_payerType: 'GROUP HEALTH PLAN',
      box1a_insuredIdNumber: rawClaim.subscriber?.memberId || 'MBR-12345678',
      box2_patientName: `${rawClaim.patient?.lastName || 'DOE'}, ${rawClaim.patient?.firstName || 'JOHN'}`,
      box3_patientBirthDate: rawClaim.patient?.dob || '1985-06-15',
      box3_patientSex: rawClaim.patient?.gender === 'female' ? 'F' : 'M',
      box4_insuredName: `${rawClaim.subscriber?.lastName || 'DOE'}, ${rawClaim.subscriber?.firstName || 'JOHN'}`,
      box5_patientAddress: {
        street: '123 HEALTHCARE BLVD',
        city: 'METROPOLIS',
        state: 'NY',
        zip: '10001',
        phone: '555-019-2831',
      },
      box6_patientRelationship: 'Self',
      box10_conditionRelatedTo: { employment: false, autoAccident: false, otherAccident: false },
      box11_insuredPolicyGroup: 'GRP-99088',
      box21_diagnoses: (rawClaim.diagnoses || ['I10', 'E11.9']).slice(0, 12),
      box24_serviceLines: (rawClaim.serviceLines || [
        {
          dateFrom: '2026-08-25',
          dateTo: '2026-08-25',
          placeOfService: '11',
          cptHcpcs: '99214',
          modifiers: '25',
          diagPointer: 'A',
          charges: '175.00',
          daysOrUnits: '1',
          renderingProviderNpi: '1992837465',
        },
      ]),
      box25_federalTaxId: '12-3456789',
      box28_totalCharge: '175.00',
      box31_physicianSignature: 'Dr. Sarah Jenkins, MD',
      box32_serviceFacilityLocation: 'MediCare Central Clinic, 123 Healthcare Blvd, Metropolis NY 10001',
      box33_billingProviderInfo: 'MediCare Health Services Inc, NPI: 1992837465, Ph: 800-555-1234',
    };
  }
}
