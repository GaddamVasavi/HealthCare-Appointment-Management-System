/**
 * MediCare Connect - Specialty Clinical Protocols: Obstetrics & Maternal-Fetal Medicine
 * Standards: Evidence-Based Clinical Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class ObstetricsProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-OB-PREECLAMPSIA',
      conditionName: 'Severe Preeclampsia & Eclampsia Magnesium Sulfate Protocol',
      icd10Code: 'O14.10',
      targetPopulation: 'Patients diagnosed with Severe Preeclampsia & Eclampsia Magnesium Sulfate Protocol.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Verify diagnostic criteria: BP >= 160/110 mmHg on 2 occasions 4h apart with severe features (headache, vision changes, platelets <100k, Cr >1.1)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Identifies severe preeclampsia requiring immediate seizure prophylaxis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Magnesium Sulfate 4g to 6g loading dose over 20 minutes followed by 2g/hr continuous IV maintenance infusion',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'First-line neuroprotection to prevent maternal eclamptic convulsions.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Hydralazine 5-10 mg or IV Labetalol 20-40 mg to maintain SBP 140-150 mmHg and DBP 90-100 mmHg',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents acute maternal hemorrhagic stroke.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Hourly monitoring of patellar deep tendon reflexes, respiratory rate (>12 bpm), and urine output (>30 mL/hr)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Screens for magnesium toxicity; maintain IV Calcium Gluconate at bedside as antidote.'
        },
      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
      ]
    });

    this.add({
      protocolId: 'PROTO-OB-PPH',
      conditionName: 'Postpartum Hemorrhage (PPH) Resuscitation Protocol',
      icd10Code: 'O72.1',
      targetPopulation: 'Patients diagnosed with Postpartum Hemorrhage (PPH) Resuscitation Protocol.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Diagnostic & Laboratory Evaluation',
          action: 'Quantify cumulative blood loss (QBL) (>500 mL post-vaginal delivery or >1000 mL post-cesarean)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Early trigger for active maternal hemorrhage bundle.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Bimanual uterine massage plus Oxytocin 20-40 units in 1000 mL normal saline IV infusion',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'First-line uterotonic for uterine atony (the cause of 80% of PPH).'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Second-line uterotonics: Methylergonovine 0.2 mg IM (if not hypertensive) or Misoprostol 800 mcg PR',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid sustained myometrial contraction.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Clinical Surveillance & Follow-up',
          action: 'Tranexamic Acid (TXA) 1g IV within 3 hours of delivery for refractory hemorrhage',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'WOMAN trial proven reduction in maternal mortality from bleeding.'
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
