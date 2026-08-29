/**
 * MediCare Connect - Specialty Clinical Protocols: Dermatology & Skin Disorders
 * Standards: Evidence-Based Clinical Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class DermatologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-DERM-PSORIASIS',
      conditionName: 'Moderate-to-Severe Plaque Psoriasis Management',
      icd10Code: 'L40.0',
      targetPopulation: 'Patients diagnosed with Moderate-to-Severe Plaque Psoriasis Management.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Calculate Psoriasis Area and Severity Index (PASI) and Body Surface Area (BSA) involvement',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Stratifies mild (<3% BSA) vs moderate-to-severe (>10% BSA) psoriasis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate IL-23 inhibitor (Risankizumab 150 mg SQ) or IL-17 inhibitor (Secukinumab 300 mg SQ)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Targeted cytokine biologics achieving PASI 90 and PASI 100 skin clearance.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Adjunctive high-potency topical corticosteroid (Clobetasol 0.05%) with Calcipotriene ointment',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Provides immediate local symptomatic plaque thinning.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Periodic screening for psoriatic arthritis with PEST questionnaire and cardiovascular risk factor optimization',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Manages systemic psoriatic comorbidities.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
      ]
    });

    this.add({
      protocolId: 'PROTO-DERM-MELANOMA',
      conditionName: 'Cutaneous Melanoma Staging & Excision Protocol',
      icd10Code: 'C43.9',
      targetPopulation: 'Patients diagnosed with Cutaneous Melanoma Staging & Excision Protocol.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Complete full-body dermoscopy, excisional punch/elliptical biopsy with 1-2 mm margins',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Provides accurate histological Breslow depth and ulceration status.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Wide local excision with surgical margins based on Breslow depth (1 cm for <1 mm; 2 cm for >2 mm)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents local recurrence.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Sentinel lymph node biopsy (SLNB) for melanomas with Breslow depth >= 0.8 mm or with ulceration',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Accurately stages microscopic nodal metastasis.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Routine total body skin examinations every 3-6 months for 5 years post-diagnosis',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Detects second primary melanomas and in-transit recurrence.'
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
