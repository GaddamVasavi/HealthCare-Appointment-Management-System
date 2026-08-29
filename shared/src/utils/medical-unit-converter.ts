/**
 * MediCare Connect - Medical Unit Conversions & Laboratory Transformations
 */

export class MedicalUnitConverter {
  public static fahrenheitToCelsius(f: number): number {
    return Number((((f - 32) * 5) / 9).toFixed(1));
  }

  public static celsiusToFahrenheit(c: number): number {
    return Number(((c * 9) / 5 + 32).toFixed(1));
  }

  public static lbsToKg(lbs: number): number {
    return Number((lbs * 0.45359237).toFixed(1));
  }

  public static kgToLbs(kg: number): number {
    return Number((kg / 0.45359237).toFixed(1));
  }

  public static inchesToCm(inches: number): number {
    return Number((inches * 2.54).toFixed(1));
  }

  public static cmToInches(cm: number): number {
    return Number((cm / 2.54).toFixed(1));
  }

  public static glucoseMgDlToMmolL(mgDl: number): number {
    return Number((mgDl / 18.0182).toFixed(2));
  }

  public static glucoseMmolLToMgDl(mmolL: number): number {
    return Number((mmolL * 18.0182).toFixed(0));
  }
}
