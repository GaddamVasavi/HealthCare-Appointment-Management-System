/**
 * MediCare Connect - Specialty Clinical Protocols: Endocrinology & Metabolism
 * Guidelines: American Diabetes Association (ADA) Standards of Care 2026 & Endocrine Society
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class EndocrinologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-ENDO-DKA',
      conditionName: 'Diabetic Ketoacidosis (DKA) Management Protocol',
      icd10Code: 'E10.10',
      targetPopulation: 'Patients with Type 1 or Type 2 Diabetes presenting with hyperglycemia (glucose > 250 mg/dL), anion gap acidosis (pH < 7.30, HCO3 < 18), and ketonemia.',
      exclusionCriteria: ['Hyperglycemic Hyperosmolar State without acidosis', 'Severe end-stage renal disease on anuric dialysis'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Critical Laboratory Evaluation',
          action: 'Stat basic metabolic panel, venous blood gas (VBG), serum beta-hydroxybutyrate, urinalysis for ketones, and serum osmolality.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis of ketoacidosis and calculates baseline anion gap.'
        },
        {
          stepNumber: 2,
          phase: 'Electrolyte & Potassium Check',
          action: 'Verify serum potassium BEFORE starting insulin therapy. If K < 3.3 mEq/L, hold insulin and infuse potassium until K > 3.3.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Insulin drives potassium into cells; starting insulin with severe hypokalemia can cause fatal arrhythmias or respiratory arrest.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'IV Fluid Resuscitation',
          action: 'Infuse 0.9% Normal Saline at 1000-1500 mL/hr for the first 1-2 hours to restore intravascular volume.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Re-expansion of extracellular fluid volume improves renal perfusion and lowers counter-regulatory hormones.'
        },
        {
          stepNumber: 2,
          phase: 'Continuous Regular Insulin Infusion',
          action: 'Administer Regular Insulin IV infusion at 0.1 units/kg/hr. Target glucose drop of 50-75 mg/dL per hour.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Suppresses lipolysis and hepatic ketogenesis to close the metabolic anion gap.'
        },
        {
          stepNumber: 3,
          phase: 'Dextrose Addition',
          action: 'When serum glucose reaches 200 mg/dL, switch IV fluids to 5% Dextrose in 0.45% Saline (D5 1/2NS) while maintaining insulin infusion.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents hypoglycemia and cerebral edema while continuing insulin to clear ketoacidosis.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Hourly Surveillance',
          action: 'Point-of-care capillary glucose every 1 hour; basic metabolic panel and venous pH every 2-4 hours until anion gap normalizes (<12 mEq/L).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Ensures safety and tracks resolution of metabolic acidosis.'
        },
        {
          stepNumber: 2,
          phase: 'Subcutaneous Transition',
          action: 'Administer basal subcutaneous insulin 2 hours prior to stopping IV insulin infusion once DKA is resolved and patient is tolerating oral intake.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents rebound hyperglycemia and recurrent ketoacidosis.'
        }
      ],
      hospitalizationCriteria: [
        'Anion gap > 12 mEq/L with ketonemia',
        'Inability to tolerate oral fluids or severe electrolyte derangements',
        'Altered mental status or hemodynamic instability'
      ]
    });

    this.add({
      protocolId: 'PROTO-ENDO-HHS',
      conditionName: 'Hyperosmolar Hyperglycemic State (HHS)',
      icd10Code: 'E11.00',
      targetPopulation: 'Adult clinical population presenting with Hyperosmolar Hyperglycemic State (HHS).',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: Profound dehydration, serum osmolality > 320 mOsm/kg, fluid resuscitation.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-HYPOTHYROID',
      conditionName: 'Severe Hypothyroidism & Myxedema Coma Prevention',
      icd10Code: 'E03.9',
      targetPopulation: 'Adult clinical population presenting with Severe Hypothyroidism & Myxedema Coma Prevention.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: Levothyroxine titration with TSH monitoring every 6 weeks.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-THYROTOXIC',
      conditionName: 'Thyroid Storm & Thyrotoxicosis Management',
      icd10Code: 'E05.90',
      targetPopulation: 'Adult clinical population presenting with Thyroid Storm & Thyrotoxicosis Management.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: Burch-Wartofsky score, Propylthiouracil / Methimazole, and Beta-blockade.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-ADRENAL',
      conditionName: 'Acute Adrenal Crisis & Glucocorticoid Replacement',
      icd10Code: 'E27.40',
      targetPopulation: 'Adult clinical population presenting with Acute Adrenal Crisis & Glucocorticoid Replacement.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: Stress-dose IV Hydrocortisone 100 mg Q8H and saline rehydration.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-OSTEOPOROSIS',
      conditionName: 'Postmenopausal Osteoporosis & Fracture Prevention',
      icd10Code: 'M81.0',
      targetPopulation: 'Adult clinical population presenting with Postmenopausal Osteoporosis & Fracture Prevention.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: DEXA T-score <= -2.5, Bisphosphonate / Denosumab with Calcium & Vitamin D.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-HYPERCALCEMIA',
      conditionName: 'Severe Hypercalcemia of Malignancy / Hyperparathyroidism',
      icd10Code: 'E83.52',
      targetPopulation: 'Adult clinical population presenting with Severe Hypercalcemia of Malignancy / Hyperparathyroidism.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: IV Saline diuresis, Calcitonin, and Zoledronic acid.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-PCOS',
      conditionName: 'Polycystic Ovary Syndrome (PCOS) Endocrine Pathway',
      icd10Code: 'E28.2',
      targetPopulation: 'Adult clinical population presenting with Polycystic Ovary Syndrome (PCOS) Endocrine Pathway.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: Rotterdam criteria, Metformin for insulin resistance, lifestyle modification.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-ENDO-CUSHING',
      conditionName: 'Cushing Syndrome Diagnostic Workup',
      icd10Code: 'E24.9',
      targetPopulation: 'Adult clinical population presenting with Cushing Syndrome Diagnostic Workup.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: 24-hour urinary free cortisol, late-night salivary cortisol, and low-dose dexamethasone test.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
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
