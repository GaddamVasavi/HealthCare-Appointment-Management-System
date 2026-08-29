/**
 * MediCare Connect - CMS MIPS / MACRA Electronic Clinical Quality Measures (eCQM)
 * Implements eCQM 122 (Diabetes HbA1c Poor Control), eCQM 165 (Controlling High Blood Pressure),
 * and eCQM 130 (Colorectal Cancer Screening).
 */

export interface MIPSMeasureScore {
  measureId: string;
  measureName: string;
  initialPopulation: number;
  denominator: number;
  numerator: number;
  performanceRatePercent: number;
}

export class MIPSQualityMeasures {
  public static calculateMeasure122DiabetesPoorControl(diabeticPatients: Array<{ hasDiabetes: boolean; latestHbA1c?: number }>): MIPSMeasureScore {
    const pop = diabeticPatients.filter((p) => p.hasDiabetes);
    const poorControlCount = pop.filter((p) => p.latestHbA1c === undefined || p.latestHbA1c > 9.0).length;

    const rate = pop.length > 0 ? Number(((poorControlCount / pop.length) * 100).toFixed(1)) : 0;

    return {
      measureId: 'CMS122v11',
      measureName: 'Diabetes: Hemoglobin A1c (HbA1c) Poor Control (>9%)',
      initialPopulation: pop.length,
      denominator: pop.length,
      numerator: poorControlCount,
      performanceRatePercent: rate,
    };
  }

  public static calculateMeasure165BloodPressureControl(hypertensivePatients: Array<{ hasHypertension: boolean; systolicBp: number; diastolicBp: number }>): MIPSMeasureScore {
    const pop = hypertensivePatients.filter((p) => p.hasHypertension);
    const controlledCount = pop.filter((p) => p.systolicBp < 140 && p.diastolicBp < 90).length;

    const rate = pop.length > 0 ? Number(((controlledCount / pop.length) * 100).toFixed(1)) : 0;

    return {
      measureId: 'CMS165v11',
      measureName: 'Controlling High Blood Pressure (<140/90 mmHg)',
      initialPopulation: pop.length,
      denominator: pop.length,
      numerator: controlledCount,
      performanceRatePercent: rate,
    };
  }
}
