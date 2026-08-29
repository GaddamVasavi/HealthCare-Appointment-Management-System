/**
 * MediCare Connect - Medicare Physician Fee Schedule (MPFS) Geographic Pricing Engine
 * Computes allowable reimbursement rates with Geographic Practice Cost Indices (GPCIs).
 */

export interface GPCIRecord {
  localityCode: string;
  localityName: string;
  state: string;
  workGpci: number;
  peGpci: number;
  mpGpci: number;
}

export class MedicareFeeScheduleEngine {
  public static readonly CONVERSION_FACTOR_2026 = 33.2875;

  private static readonly gpciLocalities: Map<string, GPCIRecord> = new Map([
    ['01', { localityCode: '01', localityName: 'California - San Francisco', state: 'CA', workGpci: 1.072, peGpci: 1.258, mpGpci: 0.684 }],
    ['02', { localityCode: '02', localityName: 'New York - Manhattan', state: 'NY', workGpci: 1.085, peGpci: 1.312, mpGpci: 1.452 }],
    ['03', { localityCode: '03', localityName: 'Texas - Houston', state: 'TX', workGpci: 1.000, peGpci: 1.015, mpGpci: 0.945 }],
    ['04', { localityCode: '04', localityName: 'Illinois - Chicago', state: 'IL', workGpci: 1.025, peGpci: 1.088, mpGpci: 1.220 }],
    ['05', { localityCode: '05', localityName: 'Florida - Miami', state: 'FL', workGpci: 1.000, peGpci: 1.045, mpGpci: 1.785 }],
    ['99', { localityCode: '99', localityName: 'National Standard Average', state: 'US', workGpci: 1.000, peGpci: 1.000, mpGpci: 1.000 }],
  ]);

  public static calculateAllowedAmount(params: {
    workRvu: number;
    practiceExpenseRvu: number;
    malpracticeRvu: number;
    localityCode?: string;
    isFacility?: boolean;
    conversionFactor?: number;
  }): {
    geographicallyAdjustedRvu: number;
    allowedAmountUSD: number;
    gpciApplied: GPCIRecord;
  } {
    const locality = this.gpciLocalities.get(params.localityCode || '99') || this.gpciLocalities.get('99')!;
    const cf = params.conversionFactor || this.CONVERSION_FACTOR_2026;

    // Formula: Total Adjusted RVU = (Work RVU * Work GPCI) + (PE RVU * PE GPCI) + (MP RVU * MP GPCI)
    const adjustedWork = params.workRvu * locality.workGpci;
    const adjustedPe = params.practiceExpenseRvu * locality.peGpci;
    const adjustedMp = params.malpracticeRvu * locality.mpGpci;

    const totalRvu = adjustedWork + adjustedPe + adjustedMp;
    const allowed = totalRvu * cf;

    return {
      geographicallyAdjustedRvu: Number(totalRvu.toFixed(3)),
      allowedAmountUSD: Number(allowed.toFixed(2)),
      gpciApplied: locality,
    };
  }
}
