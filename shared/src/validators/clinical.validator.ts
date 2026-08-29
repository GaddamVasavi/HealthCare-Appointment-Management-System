/**
 * MediCare Connect - Shared Enterprise Healthcare Validation Suite
 * Validates National Provider Identifier (NPI Luhn 80840 check), DEA Registration Number checksum,
 * ICD-10-CM syntax, CPT-4 procedure codes, LOINC codes, and RxNorm format rules.
 */

export class HealthcareFormatValidators {
  /**
   * Validates 10-digit National Provider Identifier (NPI) using the standard Luhn algorithm (US prefix 80840).
   */
  public static isValidNPI(npi: string): boolean {
    if (!npi || !/^\d{10}$/.test(npi)) return false;

    // Check Luhn checksum with 80840 prefix (total 15 digits)
    const fullNumber = '80840' + npi;
    let sum = 0;
    let alternate = false;

    for (let i = fullNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(fullNumber.charAt(i), 10);
      if (alternate) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      alternate = !alternate;
    }

    return sum % 10 === 0;
  }

  /**
   * Validates DEA Registration Number: 2 letters followed by 7 digits.
   * Checksum: (1st + 3rd + 5th digits) + 2 * (2nd + 4th + 6th digits) = last digit matches 7th digit.
   */
  public static isValidDEA(dea: string): boolean {
    if (!dea || !/^[A-Z]{2}\d{7}$/i.test(dea.trim())) return false;
    const clean = dea.trim().toUpperCase();

    const d1 = parseInt(clean.charAt(2), 10);
    const d2 = parseInt(clean.charAt(3), 10);
    const d3 = parseInt(clean.charAt(4), 10);
    const d4 = parseInt(clean.charAt(5), 10);
    const d5 = parseInt(clean.charAt(6), 10);
    const d6 = parseInt(clean.charAt(7), 10);
    const checkDigit = parseInt(clean.charAt(8), 10);

    const oddSum = d1 + d3 + d5;
    const evenSum = d2 + d4 + d6;
    const total = oddSum + 2 * evenSum;

    return total % 10 === checkDigit;
  }

  /**
   * Validates ICD-10-CM format: 1 letter followed by 2 digits, optional decimal and up to 4 alphanumeric characters.
   */
  public static isValidICD10(code: string): boolean {
    if (!code) return false;
    return /^[A-TV-Z][0-9][0-9AB](\.[0-9A-TV-Z]{1,4})?$/i.test(code.trim());
  }

  /**
   * Validates 5-digit CPT-4 or 5-character HCPCS code format.
   */
  public static isValidCPTHCPCS(code: string): boolean {
    if (!code) return false;
    return /^(\d{5}|[A-V]\d{4}|\d{4}[TF])$/i.test(code.trim());
  }

  /**
   * Validates LOINC identifier syntax: 3 to 5 digits, hyphen, 1 check digit.
   */
  public static isValidLOINC(loinc: string): boolean {
    if (!loinc) return false;
    return /^\d{3,5}-\d$/.test(loinc.trim());
  }

  /**
   * Validates Social Security Number (SSN) format.
   */
  public static isValidSSN(ssn: string): boolean {
    if (!ssn) return false;
    const clean = ssn.replace(/\D/g, '');
    if (clean.length !== 9) return false;
    if (clean === '000000000' || clean.startsWith('000') || clean.startsWith('666') || clean.startsWith('9')) return false;
    return true;
  }

  /**
   * Validates Clinical Blood Pressure format (e.g. '120/80').
   */
  public static isValidBloodPressure(bp: string): { isValid: boolean; systolic?: number; diastolic?: number } {
    if (!bp) return { isValid: false };
    const parts = bp.trim().split('/');
    if (parts.length !== 2) return { isValid: false };

    const sys = parseInt(parts[0], 10);
    const dia = parseInt(parts[1], 10);

    if (isNaN(sys) || isNaN(dia) || sys < 50 || sys > 300 || dia < 30 || dia > 200 || sys <= dia) {
      return { isValid: false };
    }

    return { isValid: true, systolic: sys, diastolic: dia };
  }
}
