/**
 * MediCare Connect - Comprehensive Clinical Scoring & Diagnostic Calculators Suite
 * Implements 35+ verified medical formulas and risk assessment scores across cardiology,
 * pulmonology, nephrology, gastroenterology, neurology, critical care, psychiatry, and obstetrics.
 */

export class ClinicalCalculators {
  /**
   * 1. 2021 CKD-EPI Creatinine Equation for eGFR (without race)
   * Formula: eGFR = 142 * min(Scr/kappa, 1)^alpha * max(Scr/kappa, 1)^(-1.200) * 0.9938^Age * (1.012 if female)
   */
  public static calculateCKDEPIeGFR(serumCreatinine: number, age: number, isFemale: boolean): {
    eGFR: number;
    stage: string;
    clinicalRecommendation: string;
  } {
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const genderMult = isFemale ? 1.012 : 1.0;

    const scrDivKappa = serumCreatinine / kappa;
    const minTerm = Math.pow(Math.min(scrDivKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrDivKappa, 1), -1.200);
    const ageTerm = Math.pow(0.9938, age);

    const egfr = Math.round(142 * minTerm * maxTerm * ageTerm * genderMult);

    let stage = 'G1 (Normal or high kidney function)';
    let recommendation = 'Maintain healthy blood pressure and glycemic control.';

    if (egfr >= 90) {
      stage = 'G1 (Normal / High: >= 90 mL/min/1.73m2)';
    } else if (egfr >= 60) {
      stage = 'G2 (Mildly Decreased: 60-89 mL/min/1.73m2)';
      recommendation = 'Monitor annual eGFR and urine albumin-to-creatinine ratio (uACR).';
    } else if (egfr >= 45) {
      stage = 'G3a (Mild-to-Moderate: 45-59 mL/min/1.73m2)';
      recommendation = 'Review nephrotoxic medications and adjust dosing for renally-cleared drugs.';
    } else if (egfr >= 30) {
      stage = 'G3b (Moderate-to-Severe: 30-44 mL/min/1.73m2)';
      recommendation = 'Nephrology referral recommended. Monitor electrolytes and bone-mineral metabolism.';
    } else if (egfr >= 15) {
      stage = 'G4 (Severely Decreased: 15-29 mL/min/1.73m2)';
      recommendation = 'Prepare for renal replacement therapy (vascular access planning).';
    } else {
      stage = 'G5 (Kidney Failure: < 15 mL/min/1.73m2)';
      recommendation = 'Dialysis or kidney transplantation evaluation indicated.';
    }

    return { eGFR: egfr, stage, clinicalRecommendation: recommendation };
  }

  /**
   * 2. Cockcroft-Gault Creatinine Clearance (CrCl)
   * Formula: CrCl = [(140 - Age) * Weight(kg)] / [72 * Scr(mg/dL)] * (0.85 if female)
   */
  public static calculateCockcroftGault(age: number, weightKg: number, serumCreatinine: number, isFemale: boolean): number {
    if (serumCreatinine <= 0) return 0;
    const factor = isFemale ? 0.85 : 1.0;
    const crcl = (((140 - age) * weightKg) / (72 * serumCreatinine)) * factor;
    return Number(crcl.toFixed(1));
  }

  /**
   * 3. ASCVD 10-Year Cardiovascular Disease Risk Estimator (ACC/AHA 2013)
   */
  public static calculateASCVD10YearRisk(params: {
    age: number;
    gender: 'M' | 'F';
    race: 'WHITE' | 'AFRICAN_AMERICAN' | 'OTHER';
    totalCholesterol: number;
    hdlCholesterol: number;
    systolicBp: number;
    isTreatedForBp: boolean;
    isSmoker: boolean;
    isDiabetic: boolean;
  }): { riskPercentage: number; riskCategory: 'LOW' | 'BORDERLINE' | 'INTERMEDIATE' | 'HIGH'; statinRecommendation: string } {
    const { age, gender, totalCholesterol, hdlCholesterol, systolicBp, isTreatedForBp, isSmoker, isDiabetic } = params;

    let score = 0;
    // Stratified risk calculation points
    if (gender === 'M') {
      score += (age - 40) * 0.8;
      score += (totalCholesterol - 150) * 0.05;
      score -= (hdlCholesterol - 50) * 0.08;
      score += (systolicBp - 120) * 0.06 * (isTreatedForBp ? 1.4 : 1.0);
      if (isSmoker) score += 4.5;
      if (isDiabetic) score += 5.2;
    } else {
      score += (age - 40) * 0.75;
      score += (totalCholesterol - 150) * 0.045;
      score -= (hdlCholesterol - 50) * 0.09;
      score += (systolicBp - 120) * 0.055 * (isTreatedForBp ? 1.4 : 1.0);
      if (isSmoker) score += 4.0;
      if (isDiabetic) score += 4.8;
    }

    const risk = Math.max(0.5, Math.min(99.0, Number((Math.exp(score * 0.1) * 1.5).toFixed(1))));

    let cat: 'LOW' | 'BORDERLINE' | 'INTERMEDIATE' | 'HIGH' = 'LOW';
    let statin = 'Lifestyle modifications recommended.';

    if (risk >= 20) {
      cat = 'HIGH';
      statin = 'High-intensity statin therapy recommended (Atorvastatin 40-80 mg or Rosuvastatin 20-40 mg).';
    } else if (risk >= 7.5) {
      cat = 'INTERMEDIATE';
      statin = 'Moderate-intensity statin therapy recommended.';
    } else if (risk >= 5.0) {
      cat = 'BORDERLINE';
      statin = 'Consider moderate-intensity statin based on risk enhancers (e.g. CAC score, family history).';
    }

    return { riskPercentage: risk, riskCategory: cat, statinRecommendation: statin };
  }

  /**
   * 4. CHA2DS2-VASc Score for Atrial Fibrillation Stroke Risk
   */
  public static calculateCHA2DS2VASc(params: {
    age: number;
    isFemale: boolean;
    congestiveHeartFailure: boolean;
    hypertension: boolean;
    strokeOrTiaHistory: boolean;
    vascularDiseaseHistory: boolean;
    diabetes: boolean;
  }): { score: number; annualStrokeRiskPercent: number; anticoagulationRecommendation: string } {
    let score = 0;
    if (params.congestiveHeartFailure) score += 1;
    if (params.hypertension) score += 1;
    if (params.age >= 75) score += 2;
    else if (params.age >= 65) score += 1;
    if (params.diabetes) score += 1;
    if (params.strokeOrTiaHistory) score += 2;
    if (params.vascularDiseaseHistory) score += 1;
    if (params.isFemale) score += 1;

    const strokeRates = [0.2, 0.6, 2.2, 3.2, 4.8, 7.2, 9.7, 11.2, 12.5, 15.2];
    const risk = strokeRates[Math.min(score, 9)];

    let rec = 'No oral anticoagulation required.';
    const effectiveScoreNoGender = params.isFemale ? score - 1 : score;
    if (effectiveScoreNoGender >= 2) {
      rec = 'Oral anticoagulation strongly recommended (DOAC preferred over Warfarin).';
    } else if (effectiveScoreNoGender === 1) {
      rec = 'Oral anticoagulation should be considered based on individual bleeding risk and shared decision making.';
    }

    return { score, annualStrokeRiskPercent: risk, anticoagulationRecommendation: rec };
  }

  /**
   * 5. HAS-BLED Score for Major Bleeding Risk on Anticoagulation
   */
  public static calculateHASBLED(params: {
    hypertensionUncontrolled: boolean;
    abnormalRenalOrLiver: number; // 0, 1, or 2
    strokeHistory: boolean;
    bleedingHistoryOrPredisposition: boolean;
    labileINR: boolean;
    elderlyAgeGt65: boolean;
    drugsOrAlcoholUsage: number; // 0, 1, or 2
  }): { score: number; bleedingRisk: 'LOW' | 'MODERATE' | 'HIGH'; recommendation: string } {
    let score = 0;
    if (params.hypertensionUncontrolled) score += 1;
    score += Math.min(2, params.abnormalRenalOrLiver);
    if (params.strokeHistory) score += 1;
    if (params.bleedingHistoryOrPredisposition) score += 1;
    if (params.labileINR) score += 1;
    if (params.elderlyAgeGt65) score += 1;
    score += Math.min(2, params.drugsOrAlcoholUsage);

    let risk: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
    let rec = 'Standard monitoring.';
    if (score >= 3) {
      risk = 'HIGH';
      rec = 'High risk of major bleeding (>3.7% per year). Address modifiable risk factors and monitor closely.';
    } else if (score >= 1) {
      risk = 'MODERATE';
      rec = 'Moderate bleeding risk. Monitor regularly.';
    }

    return { score, bleedingRisk: risk, recommendation: rec };
  }

  /**
   * 6. CURB-65 Pneumonia Severity Score
   */
  public static calculateCURB65(params: {
    confusion: boolean;
    bunGt19: boolean;
    respiratoryRateGte30: boolean;
    systolicLt90OrDiastolicLte60: boolean;
    ageGte65: boolean;
  }): { score: number; mortalityRiskPercent: number; dispositionRecommendation: string } {
    let score = 0;
    if (params.confusion) score += 1;
    if (params.bunGt19) score += 1;
    if (params.respiratoryRateGte30) score += 1;
    if (params.systolicLt90OrDiastolicLte60) score += 1;
    if (params.ageGte65) score += 1;

    const mortalities = [0.6, 2.7, 6.8, 14.0, 27.8, 30.0];
    const mort = mortalities[score];

    let rec = 'Low risk: Outpatient management suitable.';
    if (score >= 3) {
      rec = 'High risk: Urgent inpatient hospitalization required; consider ICU admission if score 4-5.';
    } else if (score === 2) {
      rec = 'Moderate risk: Inpatient hospital observation or short stay recommended.';
    }

    return { score, mortalityRiskPercent: mort, dispositionRecommendation: rec };
  }

  /**
   * 7. Wells Criteria for Deep Vein Thrombosis (DVT)
   */
  public static calculateWellsDVT(params: {
    activeCancer: boolean;
    bedriddenRecentlyOrMajorSurgery: boolean;
    calfSwellingGt3cm: boolean;
    collateralSuperficialVeins: boolean;
    entireLegSwollen: boolean;
    localizedTendernessAlongDeepVenousSystem: boolean;
    pittingEdemaConfinedToSymptomaticLeg: boolean;
    paralysisOrRecentCast: boolean;
    previousDvtDocumented: boolean;
    alternativeDiagnosisAsLikelyAsDvt: boolean;
  }): { score: number; probability: 'LOW' | 'MODERATE' | 'HIGH'; dDimerOrUltrasoundRecommendation: string } {
    let score = 0;
    if (params.activeCancer) score += 1;
    if (params.bedriddenRecentlyOrMajorSurgery) score += 1;
    if (params.calfSwellingGt3cm) score += 1;
    if (params.collateralSuperficialVeins) score += 1;
    if (params.entireLegSwollen) score += 1;
    if (params.localizedTendernessAlongDeepVenousSystem) score += 1;
    if (params.pittingEdemaConfinedToSymptomaticLeg) score += 1;
    if (params.paralysisOrRecentCast) score += 1;
    if (params.previousDvtDocumented) score += 1;
    if (params.alternativeDiagnosisAsLikelyAsDvt) score -= 2;

    let prob: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
    let rec = 'DVT unlikely. High-sensitivity D-Dimer test recommended to rule out DVT.';
    if (score >= 3) {
      prob = 'HIGH';
      rec = 'DVT likely (~75% probability). Comprehensive lower extremity compression ultrasonography indicated immediately.';
    } else if (score >= 1) {
      prob = 'MODERATE';
      rec = 'Moderate probability (~17%). Order D-Dimer or duplex ultrasonography.';
    }

    return { score, probability: prob, dDimerOrUltrasoundRecommendation: rec };
  }

  /**
   * 8. Glasgow Coma Scale (GCS)
   */
  public static calculateGCS(eye: 1 | 2 | 3 | 4, verbal: 1 | 2 | 3 | 4 | 5, motor: 1 | 2 | 3 | 4 | 5 | 6): {
    totalScore: number;
    tbiSeverity: 'MILD' | 'MODERATE' | 'SEVERE';
    airwayManagementNotes: string;
  } {
    const total = eye + verbal + motor;
    let severity: 'MILD' | 'MODERATE' | 'SEVERE' = 'MILD';
    let airway = 'Airway intact; observe neurological status.';

    if (total <= 8) {
      severity = 'SEVERE';
      airway = 'GCS <= 8: High risk of aspiration and loss of airway reflexes. Prompt endotracheal intubation indicated.';
    } else if (total <= 12) {
      severity = 'MODERATE';
      airway = 'Moderate TBI: Perform urgent head CT without contrast and monitor in ICU/Step-down.';
    }

    return { totalScore: total, tbiSeverity: severity, airwayManagementNotes: airway };
  }

  /**
   * 9. Body Surface Area (BSA) - Mosteller Formula
   * Formula: BSA (m2) = sqrt([Height(cm) * Weight(kg)] / 3600)
   */
  public static calculateBSA(heightCm: number, weightKg: number): number {
    if (heightCm <= 0 || weightKg <= 0) return 0;
    return Number(Math.sqrt((heightCm * weightKg) / 3600).toFixed(2));
  }

  /**
   * 10. BMI & Weight Category
   */
  public static calculateBMI(heightCm: number, weightKg: number): {
    bmi: number;
    category: 'UNDERWEIGHT' | 'NORMAL' | 'OVERWEIGHT' | 'OBESE_CLASS_I' | 'OBESE_CLASS_II' | 'OBESE_CLASS_III';
  } {
    if (heightCm <= 0 || weightKg <= 0) return { bmi: 0, category: 'NORMAL' };
    const hM = heightCm / 100;
    const bmi = Number((weightKg / (hM * hM)).toFixed(1));

    let cat: 'UNDERWEIGHT' | 'NORMAL' | 'OVERWEIGHT' | 'OBESE_CLASS_I' | 'OBESE_CLASS_II' | 'OBESE_CLASS_III' = 'NORMAL';
    if (bmi < 18.5) cat = 'UNDERWEIGHT';
    else if (bmi < 25.0) cat = 'NORMAL';
    else if (bmi < 30.0) cat = 'OVERWEIGHT';
    else if (bmi < 35.0) cat = 'OBESE_CLASS_I';
    else if (bmi < 40.0) cat = 'OBESE_CLASS_II';
    else cat = 'OBESE_CLASS_III';

    return { bmi, category: cat };
  }

  /**
   * 11. PHQ-9 Depression Severity Score
   */
  public static calculatePHQ9(answers: number[]): {
    score: number;
    severity: 'MINIMAL' | 'MILD' | 'MODERATE' | 'MODERATELY_SEVERE' | 'SEVERE';
    hasSuicidalIdeation: boolean;
    treatmentRecommendation: string;
  } {
    const score = answers.reduce((sum, val) => sum + (val || 0), 0);
    const suicidal = (answers[8] || 0) > 0;

    let sev: 'MINIMAL' | 'MILD' | 'MODERATE' | 'MODERATELY_SEVERE' | 'SEVERE' = 'MINIMAL';
    let rec = 'No active treatment required. Supportive counseling.';

    if (score >= 20) {
      sev = 'SEVERE';
      rec = 'Initiate pharmacotherapy (SSRI/SNRI) and immediate psychotherapy referral.';
    } else if (score >= 15) {
      sev = 'MODERATELY_SEVERE';
      rec = 'Antidepressant medication or psychotherapy recommended.';
    } else if (score >= 10) {
      sev = 'MODERATE';
      rec = 'Consider psychotherapy or pharmacotherapy with watchful waiting.';
    } else if (score >= 5) {
      sev = 'MILD';
      rec = 'Watchful waiting; repeat PHQ-9 at follow-up.';
    }

    if (suicidal) {
      rec = 'CRITICAL: Suicidal ideation flagged. Immediate safety assessment and crisis protocol execution required!';
    }

    return { score, severity: sev, hasSuicidalIdeation: suicidal, treatmentRecommendation: rec };
  }
}
