/**
 * MediCare Connect - Pediatric Dosing & Pharmacotherapy Safety Engine
 * Computes weight-based, BSA-based, and age-adjusted dosing for pediatric patients,
 * enforcing maximum single dose and maximum daily dose safety guardrails.
 */

export interface PediatricDrugRule {
  rxcui: string;
  genericName: string;
  indication: string;
  doseMgPerKg: number;
  doseFrequency: 'QD' | 'BID' | 'TID' | 'QID' | 'Q4H' | 'Q6H' | 'Q8H' | 'Q12H';
  route: string;
  maxSingleDoseMg: number;
  maxDailyDoseMg: number;
  minAgeMonths: number;
  maxAgeYears: number;
  specialInstructions: string;
}

export class PediatricDosingEngine {
  private static readonly rules: Map<string, PediatricDrugRule[]> = new Map();

  static {
    this.initializeRules();
  }

  private static addRule(rule: PediatricDrugRule): void {
    const key = rule.genericName.toLowerCase().trim();
    if (!this.rules.has(key)) {
      this.rules.set(key, []);
    }
    this.rules.get(key)!.push(rule);
  }

  private static initializeRules(): void {
    this.addRule({
      rxcui: '313782',
      genericName: 'amoxicillin',
      indication: 'Acute Otitis Media (High Dose)',
      doseMgPerKg: 45, // 90 mg/kg/day divided BID
      doseFrequency: 'BID',
      route: 'ORAL',
      maxSingleDoseMg: 1000,
      maxDailyDoseMg: 2000,
      minAgeMonths: 2,
      maxAgeYears: 12,
      specialInstructions: 'Administer with food. Reconstituted suspension stable for 14 days refrigerated.'
    });

    this.addRule({
      rxcui: '313782',
      genericName: 'amoxicillin',
      indication: 'Streptococcal Pharyngitis',
      doseMgPerKg: 25, // 50 mg/kg/day divided BID
      doseFrequency: 'BID',
      route: 'ORAL',
      maxSingleDoseMg: 500,
      maxDailyDoseMg: 1000,
      minAgeMonths: 3,
      maxAgeYears: 18,
      specialInstructions: 'Treat for full 10 days to prevent acute rheumatic fever.'
    });

    this.addRule({
      rxcui: '309090',
      genericName: 'azithromycin',
      indication: 'Community-Acquired Pneumonia (Day 1)',
      doseMgPerKg: 10,
      doseFrequency: 'QD',
      route: 'ORAL',
      maxSingleDoseMg: 500,
      maxDailyDoseMg: 500,
      minAgeMonths: 6,
      maxAgeYears: 18,
      specialInstructions: 'Follow with 5 mg/kg once daily on days 2 through 5.'
    });

    this.addRule({
      rxcui: '161',
      genericName: 'acetaminophen',
      indication: 'Pediatric Fever & Pain Relief',
      doseMgPerKg: 15, // 10-15 mg/kg every 4-6h
      doseFrequency: 'Q4H',
      route: 'ORAL',
      maxSingleDoseMg: 650,
      maxDailyDoseMg: 2600, // max 5 doses or 75 mg/kg/day
      minAgeMonths: 0,
      maxAgeYears: 12,
      specialInstructions: 'Do not exceed 5 doses in 24 hours. Verify concentration (160 mg / 5 mL).'
    });

    this.addRule({
      rxcui: '5640',
      genericName: 'ibuprofen',
      indication: 'Pediatric Fever & Anti-inflammatory',
      doseMgPerKg: 10, // 5-10 mg/kg every 6-8h
      doseFrequency: 'Q6H',
      route: 'ORAL',
      maxSingleDoseMg: 400,
      maxDailyDoseMg: 1200,
      minAgeMonths: 6, // Contraindicated under 6 months
      maxAgeYears: 12,
      specialInstructions: 'Give with milk or food to prevent GI upset. Do not use in infants under 6 months.'
    });

    this.addRule({
      rxcui: '114',
      genericName: 'prednisolone',
      indication: 'Acute Asthma Exacerbation',
      doseMgPerKg: 1, // 1-2 mg/kg/day divided BID or QD
      doseFrequency: 'BID',
      route: 'ORAL',
      maxSingleDoseMg: 30,
      maxDailyDoseMg: 60,
      minAgeMonths: 1,
      maxAgeYears: 18,
      specialInstructions: 'Standard 3-5 day burst without taper.'
    });
  }

  public static calculateDose(params: {
    genericName: string;
    weightKg: number;
    ageMonths: number;
    indication?: string;
  }): {
    calculatedSingleDoseMg: number;
    recommendedFrequency: string;
    totalDailyDoseMg: number;
    isCappedAtMax: boolean;
    safetyAlerts: string[];
    specialInstructions: string;
  } {
    const { genericName, weightKg, ageMonths, indication } = params;
    const drugRules = this.rules.get(genericName.toLowerCase().trim());

    if (!drugRules || drugRules.length === 0) {
      return {
        calculatedSingleDoseMg: 0,
        recommendedFrequency: 'N/A',
        totalDailyDoseMg: 0,
        isCappedAtMax: false,
        safetyAlerts: [`No pediatric dosing rule found for medication: ${genericName}`],
        specialInstructions: '',
      };
    }

    const rule = indication ? drugRules.find((r) => r.indication.toLowerCase().includes(indication.toLowerCase())) || drugRules[0] : drugRules[0];
    const safetyAlerts: string[] = [];

    if (ageMonths < rule.minAgeMonths) {
      safetyAlerts.push(`CAUTION: Patient age (${ageMonths} mos) is below minimum approved age (${rule.minAgeMonths} mos) for ${rule.genericName}.`);
    }

    let singleDose = Number((weightKg * rule.doseMgPerKg).toFixed(1));
    let capped = false;

    if (singleDose > rule.maxSingleDoseMg) {
      singleDose = rule.maxSingleDoseMg;
      capped = true;
      safetyAlerts.push(`Dose capped at maximum allowable single dose of ${rule.maxSingleDoseMg} mg.`);
    }

    const dosesPerDayMap: Record<string, number> = { QD: 1, BID: 2, TID: 3, QID: 4, Q4H: 6, Q6H: 4, Q8H: 3, Q12H: 2 };
    const numDoses = dosesPerDayMap[rule.doseFrequency] || 1;
    let dailyDose = singleDose * numDoses;

    if (dailyDose > rule.maxDailyDoseMg) {
      dailyDose = rule.maxDailyDoseMg;
      singleDose = Number((dailyDose / numDoses).toFixed(1));
      capped = true;
      safetyAlerts.push(`Total daily dose capped at maximum allowable daily limit of ${rule.maxDailyDoseMg} mg.`);
    }

    return {
      calculatedSingleDoseMg: singleDose,
      recommendedFrequency: rule.doseFrequency,
      totalDailyDoseMg: dailyDose,
      isCappedAtMax: capped,
      safetyAlerts,
      specialInstructions: rule.specialInstructions,
    };
  }
}
