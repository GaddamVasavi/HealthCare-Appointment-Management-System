/**
 * MediCare Connect - Renal Dose Adjustment & Pharmacokinetic Adaptation Engine
 * Adjusts medication dosages and dosing intervals based on patient eGFR or CrCl (mL/min).
 */

export interface RenalDosingGuideline {
  genericName: string;
  normalDose: string;
  adjustments: Array<{
    minCrCl: number;
    maxCrCl: number;
    adjustedDose: string;
    adjustedFrequency: string;
    percentReduction: number;
    clinicalRationale: string;
  }>;
  hemodialysisSupplement: string;
  crrtRecommendation: string;
}

export class RenalAdjustmentEngine {
  private static readonly guidelines: Map<string, RenalDosingGuideline> = new Map();

  static {
    this.initializeGuidelines();
  }

  private static add(g: RenalDosingGuideline): void {
    this.guidelines.set(g.genericName.toLowerCase().trim(), g);
  }

  private static initializeGuidelines(): void {
    this.add({
      genericName: 'metformin',
      normalDose: '1000 mg BID with meals',
      adjustments: [
        {
          minCrCl: 45,
          maxCrCl: 59,
          adjustedDose: '500 mg BID (Max 1000 mg/day)',
          adjustedFrequency: 'BID',
          percentReduction: 50,
          clinicalRationale: 'Mild-moderate renal impairment: monitor eGFR every 3-6 months.'
        },
        {
          minCrCl: 30,
          maxCrCl: 44,
          adjustedDose: '500 mg QD (Max 500 mg/day)',
          adjustedFrequency: 'QD',
          percentReduction: 75,
          clinicalRationale: 'Do not initiate. If already on therapy, reduce to 500 mg daily with frequent renal monitoring.'
        },
        {
          minCrCl: 0,
          maxCrCl: 29,
          adjustedDose: 'CONTRAINDICATED',
          adjustedFrequency: 'N/A',
          percentReduction: 100,
          clinicalRationale: 'Absolute contraindication due to high risk of life-threatening lactic acidosis.'
        }
      ],
      hemodialysisSupplement: 'Contraindicated in dialysis patients.',
      crrtRecommendation: 'Avoid use.'
    });

    this.add({
      genericName: 'gabapentin',
      normalDose: '300 mg TID (900 mg/day) up to 1200 mg TID',
      adjustments: [
        {
          minCrCl: 30,
          maxCrCl: 59,
          adjustedDose: '200 to 700 mg',
          adjustedFrequency: 'BID',
          percentReduction: 40,
          clinicalRationale: 'Gabapentin eliminated solely by renal excretion.'
        },
        {
          minCrCl: 15,
          maxCrCl: 29,
          adjustedDose: '100 to 300 mg',
          adjustedFrequency: 'QD',
          percentReduction: 70,
          clinicalRationale: 'Risk of profound somnolence, encephalopathy, and myoclonus.'
        },
        {
          minCrCl: 0,
          maxCrCl: 14,
          adjustedDose: '100 to 300 mg',
          adjustedFrequency: 'Every other day',
          percentReduction: 85,
          clinicalRationale: 'Substantially extended elimination half-life (up to 130 hours).'
        }
      ],
      hemodialysisSupplement: 'Post-hemodialysis supplemental dose of 125-350 mg after each 4-hour dialysis session.',
      crrtRecommendation: '100 to 300 mg every 12 to 24 hours.'
    });

    this.add({
      genericName: 'ciprofloxacin',
      normalDose: '500 mg Q12H',
      adjustments: [
        {
          minCrCl: 30,
          maxCrCl: 50,
          adjustedDose: '250 to 500 mg',
          adjustedFrequency: 'Q12H',
          percentReduction: 25,
          clinicalRationale: 'Maintain adequate peak levels for concentration-dependent bactericidal action.'
        },
        {
          minCrCl: 0,
          maxCrCl: 29,
          adjustedDose: '250 to 500 mg',
          adjustedFrequency: 'Q18H-Q24H',
          percentReduction: 50,
          clinicalRationale: 'Prolonged half-life with decreased clearance.'
        }
      ],
      hemodialysisSupplement: '250 to 500 mg administered every 24 hours after hemodialysis.',
      crrtRecommendation: '400 mg IV every 12 hours.'
    });

    this.add({
      genericName: 'apixaban',
      normalDose: '5 mg BID',
      adjustments: [
        {
          minCrCl: 0,
          maxCrCl: 29,
          adjustedDose: '2.5 mg BID if Serum Creatinine >= 1.5 mg/dL with Age >= 80 or Weight <= 60 kg',
          adjustedFrequency: 'BID',
          percentReduction: 50,
          clinicalRationale: 'Dose reduction criteria: Patient has at least 2 of: Age >= 80, Weight <= 60 kg, Scr >= 1.5 mg/dL.'
        }
      ],
      hemodialysisSupplement: '5 mg BID (or 2.5 mg BID if >= 80 yrs or <= 60 kg) per FDA hemodialysis label.',
      crrtRecommendation: '2.5 mg BID with anti-Xa monitoring.'
    });
  }

  public static getRenalAdjustment(genericName: string, crclOrEgfr: number): {
    requiresAdjustment: boolean;
    adjustedDose: string;
    adjustedFrequency: string;
    percentReduction: number;
    clinicalRationale: string;
    hemodialysisSupplement: string;
  } {
    const g = this.guidelines.get(genericName.toLowerCase().trim());
    if (!g) {
      return {
        requiresAdjustment: false,
        adjustedDose: 'Standard dosing',
        adjustedFrequency: 'Standard',
        percentReduction: 0,
        clinicalRationale: 'No specific renal adjustment guideline on file.',
        hemodialysisSupplement: 'Consult nephrology / clinical pharmacy specialist.',
      };
    }

    for (const adj of g.adjustments) {
      if (crclOrEgfr >= adj.minCrCl && crclOrEgfr <= adj.maxCrCl) {
        return {
          requiresAdjustment: true,
          adjustedDose: adj.adjustedDose,
          adjustedFrequency: adj.adjustedFrequency,
          percentReduction: adj.percentReduction,
          clinicalRationale: adj.clinicalRationale,
          hemodialysisSupplement: g.hemodialysisSupplement,
        };
      }
    }

    return {
      requiresAdjustment: false,
      adjustedDose: g.normalDose,
      adjustedFrequency: 'Standard',
      percentReduction: 0,
      clinicalRationale: 'Renal function is within normal range for standard medication dosing.',
      hemodialysisSupplement: g.hemodialysisSupplement,
    };
  }
}
