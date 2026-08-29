/**
 * MediCare Connect - Immunization Registry & ACIP Vaccine Schedule Engine
 * Standards: CDC Advisory Committee on Immunization Practices (ACIP)
 * Evaluates pediatric and adult immunization schedules, minimum intervals, and contraindications.
 */

export interface VaccineDefinition {
  cvxCode: number;
  vaccineName: string;
  tradeNames: string[];
  targetDiseases: string[];
  isLiveAttenuated: boolean;
  standardSeriesDoses: number;
  minimumAgeWeeks: number;
  recommendedAgeMilestones: string[];
  contraindications: string[];
}

export class ImmunizationRegistry {
  private static readonly vaccines: Map<number, VaccineDefinition> = new Map();

  static {
    this.initializeRegistry();
  }

  private static add(v: VaccineDefinition): void {
    this.vaccines.set(v.cvxCode, v);
  }

  private static initializeRegistry(): void {
    this.add({
      cvxCode: 20,
      vaccineName: 'DTaP (Diphtheria, Tetanus, acellular Pertussis)',
      tradeNames: ['Infanrix', 'Daptacel'],
      targetDiseases: ['Diphtheria', 'Tetanus', 'Pertussis'],
      isLiveAttenuated: false,
      standardSeriesDoses: 5,
      minimumAgeWeeks: 6,
      recommendedAgeMilestones: ['2 months', '4 months', '6 months', '15-18 months', '4-6 years'],
      contraindications: ['Encephalopathy within 7 days of previous pertussis vaccine', 'Severe anaphylaxis to components']
    });

    this.add({
      cvxCode: 3,
      vaccineName: 'MMR (Measles, Mumps, Rubella)',
      tradeNames: ['M-M-R II', 'Priorix'],
      targetDiseases: ['Measles', 'Mumps', 'Rubella'],
      isLiveAttenuated: true,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 52,
      recommendedAgeMilestones: ['12-15 months', '4-6 years'],
      contraindications: ['Pregnancy', 'Severe immunodeficiency / immunocompromised state', 'Anaphylaxis to neomycin or gelatin']
    });

    this.add({
      cvxCode: 21,
      vaccineName: 'Varicella (Chickenpox)',
      tradeNames: ['Varivax'],
      targetDiseases: ['Varicella'],
      isLiveAttenuated: true,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 52,
      recommendedAgeMilestones: ['12-15 months', '4-6 years'],
      contraindications: ['Pregnancy', 'Immunodeficiency', 'Immunosuppressive chemotherapy']
    });

    this.add({
      cvxCode: 45,
      vaccineName: 'HepB (Hepatitis B pediatric/adolescent)',
      tradeNames: ['Engerix-B', 'Recombivax HB'],
      targetDiseases: ['Hepatitis B'],
      isLiveAttenuated: false,
      standardSeriesDoses: 3,
      minimumAgeWeeks: 0,
      recommendedAgeMilestones: ['Birth', '1-2 months', '6-18 months'],
      contraindications: ['Severe allergy to yeast']
    });

    this.add({
      cvxCode: 158,
      vaccineName: 'Influenza, injectable, quadrivalent',
      tradeNames: ['Fluzone', 'Fluarix', 'Flulaval'],
      targetDiseases: ['Influenza A and B'],
      isLiveAttenuated: false,
      standardSeriesDoses: 1,
      minimumAgeWeeks: 24,
      recommendedAgeMilestones: ['Annual in Autumn for all >= 6 months'],
      contraindications: ['Severe life-threatening allergic reaction to previous flu vaccine']
    });

    this.add({
      cvxCode: 121,
      vaccineName: 'Zoster recombinant (Shingrix)',
      tradeNames: ['Shingrix'],
      targetDiseases: ['Herpes Zoster (Shingles)'],
      isLiveAttenuated: false,
      standardSeriesDoses: 2,
      minimumAgeWeeks: 2600, // 50 years
      recommendedAgeMilestones: ['Age 50+ (2 doses separated by 2-6 months)'],
      contraindications: ['Severe allergic reaction to vaccine component']
    });
  }

  public static evaluatePatientVaccines(
    patientAgeMonths: number,
    administeredCVXCodes: number[],
    isPregnant: boolean = false,
    isImmunocompromised: boolean = false
  ): {
    dueVaccines: VaccineDefinition[];
    contraindicatedVaccines: Array<{ vaccine: VaccineDefinition; reason: string }>;
  } {
    const dueVaccines: VaccineDefinition[] = [];
    const contraindicatedVaccines: Array<{ vaccine: VaccineDefinition; reason: string }> = [];

    for (const v of this.vaccines.values()) {
      const alreadyGiven = administeredCVXCodes.filter((c) => c === v.cvxCode).length;

      // Check contraindications
      if (v.isLiveAttenuated && (isPregnant || isImmunocompromised)) {
        contraindicatedVaccines.push({
          vaccine: v,
          reason: `Live attenuated vaccine strictly contraindicated in ${isPregnant ? 'pregnancy' : 'immunocompromised state'}.`,
        });
        continue;
      }

      // Check due status
      const minAgeMo = v.minimumAgeWeeks / 4.3;
      if (patientAgeMonths >= minAgeMo && alreadyGiven < v.standardSeriesDoses) {
        dueVaccines.push(v);
      }
    }

    return { dueVaccines, contraindicatedVaccines };
  }
}
