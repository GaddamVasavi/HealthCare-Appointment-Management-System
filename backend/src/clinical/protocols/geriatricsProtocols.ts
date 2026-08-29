/**
 * MediCare Connect - Specialty Clinical Protocols: Geriatric Medicine & Elder Care
 * Standards: Evidence-Based Clinical Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class GeriatricsProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-GERI-DELIRIUM',
      conditionName: 'Acute Delirium in the Elderly (CAM Algorithm)',
      icd10Code: 'F05',
      targetPopulation: 'Patients diagnosed with Acute Delirium in the Elderly (CAM Algorithm).',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Administer Confusion Assessment Method (CAM): acute onset/fluctuation, inattention, plus either disorganized thinking or altered level of consciousness',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Validates presence of acute delirium vs baseline dementia.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Identify and treat underlying precipitating trigger (Infection/UTI, Dehydration, Drug toxicity, Constipation, Pain)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Addressing underlying medical etiologies resolves delirium.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Deprescribe anticholinergic and sedative-hypnotic medications per Beers Criteria',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Eliminates iatrogenic neurocognitive impairment.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Implement non-pharmacological delirium bundle: frequent reorientation, family presence, sleep hygiene, early mobility',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Proven reduction in delirium duration without antipsychotic harm.'
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
