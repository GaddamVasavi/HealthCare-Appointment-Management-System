/**
 * MediCare Connect - Specialty Clinical Protocols: Nephrology & Renal Medicine
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class NephrologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-NEPHRO-AKI',
      conditionName: 'Acute Kidney Injury (KDIGO) Diagnosis and Staging',
      icd10Code: 'N17.9',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Kidney Injury (KDIGO) Diagnosis and Staging.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Stage AKI per KDIGO: Stage 1 (Scr 1.5-1.9x baseline or urine output <0.5 mL/kg/h x 6h), Stage 2 (2.0-2.9x), Stage 3 (>=3.0x or Scr >= 4.0 or RRT)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Standardized staging guides clinical intervention intensity.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Discontinue all nephrotoxic medications (NSAIDs, ACEi/ARBs, aminoglycosides, IV radiocontrast)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents secondary toxic tubular necrosis.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Optimize hemodynamics with balanced isotonic crystalloids (Plasmalyte or Lactated Ringer)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores renal parenchymal perfusion pressure.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Surveillance for urgent renal replacement therapy indications (AEIOU: Acidosis, Electrolytes/Hyperkalemia, Ingestion, Overload/Pulmonary edema, Uremia)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Life-saving emergent dialysis initiation criteria.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-NEPHRO-HYPERKALEMIA',
      conditionName: 'Emergent Hyperkalemia Cardioprotective Shift Protocol',
      icd10Code: 'E87.5',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Emergent Hyperkalemia Cardioprotective Shift Protocol.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Stat 12-lead ECG to screen for peaked T waves, PR prolongation, widened QRS, or sine wave',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Determines impending lethal ventricular arrhythmias.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Calcium Gluconate 10% (10-20 mL over 2-3 minutes) for membrane stabilization if ECG changes present',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Does not lower serum K+; stabilizes cardiac myocyte membrane threshold potential.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Regular Insulin 10 units with 50 mL Dextrose 50% (D50) infused over 5 minutes',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Drives potassium into intracellular compartment within 15-30 minutes.'
        },
        {
          stepNumber: 3,
          phase: 'Targeted Pharmacotherapy',
          action: 'Nebulized Albuterol 10-20 mg over 15 minutes',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Synergistic beta-2 intracellular potassium shift.'
        },
        {
          stepNumber: 4,
          phase: 'Targeted Pharmacotherapy',
          action: 'Oral Sodium Zirconium Cyclosilicate (Lokelma 10g) or Patiromer to eliminate potassium via GI tract',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Binds potassium in exchange for sodium/calcium in the intestine.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Recheck serum potassium at 1, 2, and 4 hours post-intervention',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Surveillance for rebound hyperkalemia or insulin-induced hypoglycemia.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
