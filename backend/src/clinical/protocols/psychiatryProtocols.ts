/**
 * MediCare Connect - Specialty Clinical Protocols: Psychiatry & Behavioral Health
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class PsychiatryProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-PSYCH-MDD',
      conditionName: 'Major Depressive Disorder (MDD) Pharmacotherapy Pathway',
      icd10Code: 'F32.9',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Major Depressive Disorder (MDD) Pharmacotherapy Pathway.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Administer baseline PHQ-9 and Columbia-Suicide Severity Rating Scale (C-SSRS)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Quantifies depression severity and flags suicide risk.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate first-line SSRI (Sertraline 50 mg, Escitalopram 10 mg) with dose titration every 4-6 weeks',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'First-line evidence-based pharmacotherapy with favorable side-effect profile.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Switch or augment with Bupropion or Aripiprazole if inadequate response at 8 weeks',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'STAR*D trial evidence-based augmentation strategy.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Repeat PHQ-9 at 4, 8, and 12 weeks with goal of clinical remission (PHQ-9 < 5)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks remission and functional recovery.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PSYCH-BIPOLAR-MANIA',
      conditionName: 'Acute Bipolar I Mania Stabilization',
      icd10Code: 'F31.13',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Bipolar I Mania Stabilization.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Evaluate YMRS (Young Mania Rating Scale), substance screen, and medical etiology',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Differentiates primary mania from substance-induced psychosis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Mood Stabilizer (Lithium 300 mg TID or Divalproex 20 mg/kg) plus Second-Generation Antipsychotic (Quetiapine 300 mg or Olanzapine 10 mg)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Combined therapy provides rapid manic symptom control.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Check serum Lithium trough levels (target 0.8-1.2 mEq/L) and renal/thyroid function at day 5',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents lithium toxicity and confirms therapeutic range.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PSYCH-ALCOHOL-WITHDRAW',
      conditionName: 'Acute Alcohol Withdrawal Syndrome (CIWA-Ar)',
      icd10Code: 'F10.239',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Alcohol Withdrawal Syndrome (CIWA-Ar).',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Administer Clinical Institute Withdrawal Assessment for Alcohol (CIWA-Ar) score every 1-2 hours',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Quantifies autonomic hyperactivity, tremor, and delirium tremens risk.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Symptom-triggered IV/oral Lorazepam 2-4 mg or Diazepam 10-20 mg when CIWA-Ar >= 10',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'GABA-A agonism prevents grand mal withdrawal seizures and delirium tremens.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Administer High-dose Thiamine (Vitamin B1) 500 mg IV TID for 3 days BEFORE any glucose infusion',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents irreversible Wernicke Encephalopathy and Korsakoff Psychosis.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Transfer to ICU if requiring > 50 mg diazepam equivalents in 2 hours',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Surveillance for refractory delirium tremens and airway protection.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PSYCH-SCHIZO-ACUTE',
      conditionName: 'Acute Psychosis & Schizophrenia First Episode',
      icd10Code: 'F20.9',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Psychosis & Schizophrenia First Episode.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'PANSS (Positive and Negative Syndrome Scale) scoring, MRI brain, and urine toxicology',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rules out organic encephalitis, Wilson disease, and drug-induced states.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Second-Generation Antipsychotic (Risperidone 2 mg, Aripiprazole 10 mg, or Olanzapine 10 mg)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Dopamine D2 and 5-HT2A antagonism resolves hallucinations and delusions with low EPS risk.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Metabolic syndrome monitoring: fasting lipid panel, glucose, and weight at baseline, 3 months, and annually',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Mitigates long-term cardiometabolic risk of atypical antipsychotics.'
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
