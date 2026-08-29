/**
 * MediCare Connect - Universal Clinical Scoring Calculators for Shared Client/Server
 */

export class SharedClinicalCalculators {
  public static calculateBMI(heightCm: number, weightKg: number): number {
    if (heightCm <= 0 || weightKg <= 0) return 0;
    const hM = heightCm / 100;
    return Number((weightKg / (hM * hM)).toFixed(1));
  }

  public static calculateBSA(heightCm: number, weightKg: number): number {
    if (heightCm <= 0 || weightKg <= 0) return 0;
    return Number(Math.sqrt((heightCm * weightKg) / 3600).toFixed(2));
  }

  public static calculateMAP(systolicBp: number, diastolicBp: number): number {
    // Mean Arterial Pressure = (2 * Diastolic + Systolic) / 3
    return Number(((2 * diastolicBp + systolicBp) / 3).toFixed(1));
  }

  public static calculatePediatricDose(weightKg: number, mgPerKg: number, maxSingleDoseMg: number): number {
    const raw = weightKg * mgPerKg;
    return Number(Math.min(raw, maxSingleDoseMg).toFixed(1));
  }
}
