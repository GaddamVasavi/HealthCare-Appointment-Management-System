/**
 * MediCare Connect - ANSI ASC X12N 835 (005010X221A1) Electronic Remittance Advice (ERA) Parser
 * Parses payment remittance advice, Claim Adjustment Reason Codes (CARC), and Remark Codes (RARC).
 */

export interface RemittanceClaimItem {
  claimControlNumber: string;
  statusCode: string; // 1 = Primary, 2 = Secondary, 4 = Denied, 22 = Reversal
  totalClaimChargeAmount: number;
  claimPaymentAmount: number;
  patientResponsibilityAmount: number;
  payerClaimControlNumber: string;
  adjustments: Array<{
    groupCode: 'CO' | 'CR' | 'OA' | 'PI' | 'PR'; // CO = Contractual Obligation, PR = Patient Responsibility
    reasonCode: string;
    amount: number;
  }>;
}

export interface ParsedRemittanceAdvice {
  checkOrEftNumber: string;
  paymentEffectiveDate: string;
  totalPaidAmount: number;
  payerName: string;
  payeeNpi: string;
  claims: RemittanceClaimItem[];
}

export class EDI835RemittanceParser {
  private static readonly carcDescriptions: Map<string, string> = new Map([
    ['1', 'Deductible Amount'],
    ['2', 'Coinsurance Amount'],
    ['3', 'Co-payment Amount'],
    ['45', 'Charge exceeds fee schedule / maximum allowable amount (Contractual Adjustment)'],
    ['96', 'Non-covered charge(s)'],
    ['97', 'The benefit for this service is included in the payment/allowance for another service/procedure.'],
    ['16', 'Claim/service lacks information or has submission/billing error(s).'],
    ['18', 'Exact duplicate claim/service.'],
    ['29', 'The time limit for filing has expired.'],
  ]);

  public static parse(raw835Text: string): ParsedRemittanceAdvice {
    const lines = raw835Text.split(/~|[\r\n]+/).map((l) => l.trim()).filter((l) => l.length > 0);

    let checkOrEftNumber = '';
    let paymentEffectiveDate = '';
    let totalPaidAmount = 0;
    let payerName = '';
    let payeeNpi = '';
    const claims: RemittanceClaimItem[] = [];

    let currentClaim: Partial<RemittanceClaimItem> | null = null;

    for (const line of lines) {
      const parts = line.split('*');
      const seg = parts[0].toUpperCase();

      if (seg === 'BPR') {
        totalPaidAmount = parseFloat(parts[2] || '0');
        checkOrEftNumber = parts[16] || '';
        paymentEffectiveDate = parts[16] || '';
      } else if (seg === 'N1' && parts[1] === 'PR') {
        payerName = parts[2] || '';
      } else if (seg === 'N1' && parts[1] === 'PE') {
        payeeNpi = parts[4] || '';
      } else if (seg === 'CLP') {
        if (currentClaim && currentClaim.claimControlNumber) {
          claims.push(currentClaim as RemittanceClaimItem);
        }
        currentClaim = {
          claimControlNumber: parts[1] || '',
          statusCode: parts[2] || '1',
          totalClaimChargeAmount: parseFloat(parts[3] || '0'),
          claimPaymentAmount: parseFloat(parts[4] || '0'),
          patientResponsibilityAmount: parseFloat(parts[5] || '0'),
          payerClaimControlNumber: parts[7] || '',
          adjustments: [],
        };
      } else if (seg === 'CAS' && currentClaim) {
        const groupCode = (parts[1] || 'CO') as 'CO' | 'CR' | 'OA' | 'PI' | 'PR';
        const reasonCode = parts[2] || '';
        const amount = parseFloat(parts[3] || '0');
        currentClaim.adjustments?.push({ groupCode, reasonCode, amount });
      }
    }

    if (currentClaim && currentClaim.claimControlNumber) {
      claims.push(currentClaim as RemittanceClaimItem);
    }

    return {
      checkOrEftNumber,
      paymentEffectiveDate,
      totalPaidAmount,
      payerName,
      payeeNpi,
      claims,
    };
  }

  public static getCARCDescription(code: string): string {
    return this.carcDescriptions.get(code) || `Claim Adjustment Reason Code ${code}`;
  }
}
