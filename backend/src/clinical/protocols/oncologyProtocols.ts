/**
 * MediCare Connect - Specialty Clinical Protocols: Medical Oncology & Hematology
 * Guidelines: NCCN (National Comprehensive Cancer Network) Guidelines 2026
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class OncologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-ONCO-FEB-NEUT',
      conditionName: 'Febrile Neutropenia Emergency Management',
      icd10Code: 'D70.1',
      targetPopulation: 'Cancer chemotherapy patients presenting with fever (single oral temp >= 38.3C or >= 38.0C sustained > 1 hour) and Absolute Neutrophil Count (ANC) < 500 cells/microL.',
      exclusionCriteria: ['Non-oncologic fever with normal neutrophil count'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Emergency Blood Cultures',
          action: 'Draw 2 sets of blood cultures (one peripheral and one from each central venous catheter lumen) prior to antibiotic administration.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Critical for identifying causative bacteremia in immunocompromised host.'
        },
        {
          stepNumber: 2,
          phase: 'Stat CBC and Sepsis Screening',
          action: 'Order stat CBC with manual differential, CMP, lactate, chest radiograph, and urinalysis.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Evaluates depth of neutropenia and screens for early septic shock.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Empiric Antipseudomonal Beta-Lactam',
          action: 'Administer Cefepime 2g IV Q8H (or Piperacillin/Tazobactam 4.5g IV Q6H) within 60 minutes of presentation (Golden Hour).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Immediate broad-spectrum antipseudomonal coverage prevents rapidly fatal Gram-negative bacteremic shock.'
        },
        {
          stepNumber: 2,
          phase: 'Vancomycin Indication Review',
          action: 'Add Vancomycin 15-20 mg/kg IV if hemodynamic instability, suspected central line infection, or severe mucositis is present.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Covers MRSA and resistant Gram-positive pathogens.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Inpatient Isolation Care',
          action: 'Admit to protective environment room with strict neutropenic precautions and avoid rectal exams or suppositories.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Prevents nosocomial superinfection and mucosal translocation of pathogens.'
        }
      ],
      hospitalizationCriteria: [
        'MASCC risk index score < 21 (High Risk)',
        'Hemodynamic instability or temperature > 39.0C',
        'Severe comorbidities or hepatic/renal dysfunction'
      ]
    });

    this.add({
      protocolId: 'PROTO-ONCO-TUMOR-LYSIS',
      conditionName: 'Tumor Lysis Syndrome (TLS) Prevention & Treatment',
      icd10Code: 'E88.3',
      targetPopulation: 'Oncology patients with Tumor Lysis Syndrome (TLS) Prevention & Treatment.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: Cairo-Bishop criteria, aggressive IV hydration, Rasburicase, and Allopurinol.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    });
    this.add({
      protocolId: 'PROTO-ONCO-SPINAL-COMPRESS',
      conditionName: 'Malignant Epidural Spinal Cord Compression (MESCC)',
      icd10Code: 'G95.20',
      targetPopulation: 'Oncology patients with Malignant Epidural Spinal Cord Compression (MESCC).',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: Stat High-dose Dexamethasone 10-16 mg IV, urgent spinal MRI, radiation oncology consult.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    });
    this.add({
      protocolId: 'PROTO-ONCO-IMMUNO-TOX',
      conditionName: 'Immune Checkpoint Inhibitor (ICI) Toxicities',
      icd10Code: 'T88.7',
      targetPopulation: 'Oncology patients with Immune Checkpoint Inhibitor (ICI) Toxicities.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: ASCO guidelines for immune-mediated colitis, pneumonitis, and hepatitis.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    });
    this.add({
      protocolId: 'PROTO-ONCO-CINV',
      conditionName: 'Chemotherapy-Induced Nausea and Vomiting (CINV)',
      icd10Code: 'R11.2',
      targetPopulation: 'Oncology patients with Chemotherapy-Induced Nausea and Vomiting (CINV).',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: 4-drug prophylaxis: NK1 receptor antagonist + 5-HT3 antagonist + Dexamethasone + Olanzapine.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    });
    this.add({
      protocolId: 'PROTO-ONCO-BONE-METS',
      conditionName: 'Malignant Bone Metastases Skeletal Event Prophylaxis',
      icd10Code: 'C79.51',
      targetPopulation: 'Oncology patients with Malignant Bone Metastases Skeletal Event Prophylaxis.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: Zoledronic Acid or Denosumab with dental clearance to prevent ONJ.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    });
    this.add({
      protocolId: 'PROTO-ONCO-HYPERVISCOSITY',
      conditionName: 'Hyperviscosity Syndrome in Waldenstrom / Multiple Myeloma',
      icd10Code: 'C90.00',
      targetPopulation: 'Oncology patients with Hyperviscosity Syndrome in Waldenstrom / Multiple Myeloma.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: Urgent therapeutic plasma exchange (plasmapheresis) and cytoreduction.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
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
