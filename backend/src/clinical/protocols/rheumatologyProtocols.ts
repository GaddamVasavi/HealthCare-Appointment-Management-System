/**
 * MediCare Connect - Specialty Clinical Protocols: Rheumatology & Autoimmune Diseases
 * Standards: Evidence-Based Clinical Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class RheumatologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-RHEUM-RA',
      conditionName: 'Rheumatoid Arthritis Treat-to-Target Protocol',
      icd10Code: 'M06.9',
      targetPopulation: 'Patients diagnosed with Rheumatoid Arthritis Treat-to-Target Protocol.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Calculate CDAI (Clinical Disease Activity Index) / DAS28 score, check anti-CCP and RF titers',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Quantifies inflammatory synovitis and seropositivity.'
        },
        {
          stepNumber: 2,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Baseline CBC, CMP, hepatitis B/C serologies, and QuantiFERON-TB Gold screening',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Screens for latent infections prior to initiating DMARDs or biologics.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Methotrexate 15 mg/week orally + Folic Acid 1 mg daily; titrate to 25 mg/week',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Anchor disease-modifying antirheumatic drug (csDMARD) to halt erosive joint destruction.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Add TNF-alpha inhibitor (Adalimumab 40 mg SQ biweekly) or JAK inhibitor if active disease at 3-6 months',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Advanced biological therapy for rapid remission.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Evaluate CDAI every 1-3 months with goal of low disease activity or remission (CDAI <= 2.8)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Treat-to-target strategy proven to prevent long-term functional disability.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
      ]
    });

    this.add({
      protocolId: 'PROTO-RHEUM-SLE',
      conditionName: 'Systemic Lupus Erythematosus (SLE) & Lupus Nephritis',
      icd10Code: 'M32.9',
      targetPopulation: 'Patients diagnosed with Systemic Lupus Erythematosus (SLE) & Lupus Nephritis.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Check ANA, anti-dsDNA, anti-Smith, complement C3/C4 levels, and spot urine protein/creatinine ratio',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Monitors systemic immunological activity and renal involvement.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Hydroxychloroquine 5 mg/kg actual body weight daily (max 400 mg/day) for ALL patients',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Decreases flare rates, reduces thrombotic risk, and improves overall survival.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Mycophenolate Mofetil 2-3g/day or IV Cyclophosphamide for active biopsy-proven Class III/IV Lupus Nephritis',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Induction therapy to preserve renal nephron mass.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Annual baseline and periodic comprehensive dilated ophthalmologic exam with visual field testing',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Surveillance for hydroxychloroquine maculopathy / retinal toxicity.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
      ]
    });

    this.add({
      protocolId: 'PROTO-RHEUM-GOUT',
      conditionName: 'Acute Gout Flare & Urate Lowering Therapy (ULT)',
      icd10Code: 'M10.9',
      targetPopulation: 'Patients diagnosed with Acute Gout Flare & Urate Lowering Therapy (ULT).',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Serum uric acid measurement and polarized light microscopy for needle-shaped negative birefringent crystals',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis of monosodium urate crystal arthritis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate low-dose Colchicine (1.2 mg stat followed by 0.6 mg 1h later) or oral Prednisone 35 mg/day x 5 days',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid reduction of neutrophil activation and IL-1beta inflammatory cascade.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Allopurinol 100 mg daily (titrate up to target uric acid < 6.0 mg/dL) with anti-inflammatory prophylaxis',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents tophus formation and recurrent crystal-induced arthritis.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Check serum uric acid every 2-4 weeks during allopurinol dose titration until target achieved',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Confirms adequate xanthine oxidase inhibition.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
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
