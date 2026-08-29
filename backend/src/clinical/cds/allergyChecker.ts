/**
 * MediCare Connect - Allergy & Hypersensitivity Cross-Reactivity Safety Engine
 * Analyzes drug allergies against structural chemical classes, side-chain homology, and cross-sensitivities.
 */

export interface AllergenGroup {
  id: string;
  name: string;
  members: string[];
  crossReactivityGroups: Array<{
    targetGroup: string;
    riskLevel: 'HIGH' | 'MODERATE' | 'LOW' | 'NEGLIGIBLE';
    estimatedPercentage: number;
    clinicalNotes: string;
  }>;
}

export class AllergyCheckerEngine {
  private static readonly allergenGroups: Map<string, AllergenGroup> = new Map();

  static {
    this.initializeAllergens();
  }

  private static addGroup(group: AllergenGroup): void {
    this.allergenGroups.set(group.id.toLowerCase(), group);
    this.allergenGroups.set(group.name.toLowerCase(), group);
  }

  private static initializeAllergens(): void {
    this.addGroup({
      id: 'PENICILLIN',
      name: 'Penicillins (Beta-lactams)',
      members: ['penicillin', 'amoxicillin', 'ampicillin', 'piperacillin', 'nafcillin', 'oxacillin', 'amoxicillin/clavulanate'],
      crossReactivityGroups: [
        {
          targetGroup: 'CEPHALOSPORIN_1ST_GEN',
          riskLevel: 'LOW',
          estimatedPercentage: 2.0,
          clinicalNotes: '1st generation cephalosporins share similar R1 side chains (e.g. cefazolin, cephalexin). Cross-reactivity is ~1-3%.'
        },
        {
          targetGroup: 'CEPHALOSPORIN_3RD_GEN',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.5,
          clinicalNotes: '3rd/4th generation cephalosporins (ceftriaxone, cefepime) have distinct side-chains; cross-reactivity < 1%.'
        },
        {
          targetGroup: 'CARBAPENEMS',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.8,
          clinicalNotes: 'Carbapenems (meropenem, ertapenem) have <1% cross-reactivity with penicillin allergy.'
        },
        {
          targetGroup: 'AZTREONAM',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.0,
          clinicalNotes: 'Monobactams (aztreonam) do not cross-react with penicillins (except ceftazidime due to identical side chain).'
        }
      ]
    });

    this.addGroup({
      id: 'SULFONAMIDE_ANTIBIOTIC',
      name: 'Sulfonamide Antimicrobials (Arylamines)',
      members: ['sulfamethoxazole', 'sulfadiazine', 'sulfisoxazole', 'bactrim', 'septra'],
      crossReactivityGroups: [
        {
          targetGroup: 'SULFONAMIDE_NON_ANTIBIOTIC',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.2,
          clinicalNotes: 'Non-antimicrobial sulfonamides (furosemide, celecoxib, HCTZ, sumatriptan) lack the N4 arylamine and do NOT cross-react.'
        }
      ]
    });

    this.addGroup({
      id: 'NSAID',
      name: 'Nonsteroidal Anti-inflammatory Drugs (COX-1 Inhibitors)',
      members: ['aspirin', 'ibuprofen', 'naproxen', 'ketorolac', 'indomethacin', 'meloxicam', 'diclofenac'],
      crossReactivityGroups: [
        {
          targetGroup: 'COX2_SELECTIVE',
          riskLevel: 'LOW',
          estimatedPercentage: 3.0,
          clinicalNotes: 'Selective COX-2 inhibitors (celecoxib) are generally well tolerated in AERD / aspirin-exacerbated respiratory disease.'
        },
        {
          targetGroup: 'ACETAMINOPHEN',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 1.0,
          clinicalNotes: 'Acetaminophen at doses < 1000 mg has minimal cross-reactivity in aspirin-sensitive patients.'
        }
      ]
    });

    this.addGroup({
      id: 'OPIOIDS_PHENANTHRENE',
      name: 'Phenanthrene Opioids (Morphine Group)',
      members: ['morphine', 'codeine', 'hydrocodone', 'hydromorphone', 'oxycodone', 'oxymorphone'],
      crossReactivityGroups: [
        {
          targetGroup: 'OPIOIDS_PHENYLPIPERIDINE',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.0,
          clinicalNotes: 'Phenylpiperidines (fentanyl, meperidine) have completely distinct structures and do not cross-react with morphine allergies.'
        },
        {
          targetGroup: 'OPIOIDS_DIPHENYLHEPTANE',
          riskLevel: 'NEGLIGIBLE',
          estimatedPercentage: 0.0,
          clinicalNotes: 'Methadone is structurally unrelated to phenanthrenes.'
        }
      ]
    });
  }

  public static checkAllergyConflict(patientAllergies: string[], prescribedMedication: string): {
    hasConflict: boolean;
    directMatch: boolean;
    crossReactivityAlerts: Array<{
      allergy: string;
      prescribed: string;
      riskLevel: 'HIGH' | 'MODERATE' | 'LOW' | 'NEGLIGIBLE';
      estimatedPercentage: number;
      clinicalNotes: string;
    }>;
  } {
    const medLower = prescribedMedication.toLowerCase().trim();
    const crossReactivityAlerts: Array<{
      allergy: string;
      prescribed: string;
      riskLevel: 'HIGH' | 'MODERATE' | 'LOW' | 'NEGLIGIBLE';
      estimatedPercentage: number;
      clinicalNotes: string;
    }> = [];

    let hasConflict = false;
    let directMatch = false;

    for (const allergy of patientAllergies) {
      const allLower = allergy.toLowerCase().trim();

      // Direct string match or membership
      if (allLower === medLower || medLower.includes(allLower) || allLower.includes(medLower)) {
        hasConflict = true;
        directMatch = true;
        crossReactivityAlerts.push({
          allergy,
          prescribed: prescribedMedication,
          riskLevel: 'HIGH',
          estimatedPercentage: 100,
          clinicalNotes: `Direct match: Patient has documented hypersensitivity to ${allergy}.`,
        });
        continue;
      }

      // Check group cross-reactivity
      for (const group of this.allergenGroups.values()) {
        const isMemberOfAllergyGroup = group.members.some((m) => allLower.includes(m));
        if (isMemberOfAllergyGroup) {
          for (const cross of group.crossReactivityGroups) {
            const target = this.allergenGroups.get(cross.targetGroup.toLowerCase());
            if (target && target.members.some((m) => medLower.includes(m))) {
              hasConflict = true;
              crossReactivityAlerts.push({
                allergy,
                prescribed: prescribedMedication,
                riskLevel: cross.riskLevel,
                estimatedPercentage: cross.estimatedPercentage,
                clinicalNotes: cross.clinicalNotes,
              });
            }
          }
        }
      }
    }

    return {
      hasConflict,
      directMatch,
      crossReactivityAlerts,
    };
  }
}
