/**
 * MediCare Connect - Specialty Clinical Protocols: Neurology & Stroke Care
 * Guidelines: AHA/ASA Stroke Guidelines & American Academy of Neurology
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class NeurologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-NEURO-ACUTE-STROKE',
      conditionName: 'Acute Ischemic Stroke Revascularization Protocol',
      icd10Code: 'I63.9',
      targetPopulation: 'Patients presenting with acute focal neurological deficits within 4.5 hours of symptom onset or last known well.',
      exclusionCriteria: ['Intracranial hemorrhage on non-contrast head CT', 'Recent major surgery or head trauma within 3 months', 'Active internal bleeding or severe thrombocytopenia (<100,000)'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Emergency Stroke Triage',
          action: 'Perform rapid NIH Stroke Scale (NIHSS) scoring and fingerstick blood glucose immediately upon arrival.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Quantifies neurological deficit severity and rules out hypoglycemic stroke mimic.'
        },
        {
          stepNumber: 2,
          phase: 'Emergency Neuroimaging',
          action: 'Obtain non-contrast head CT and CT Angiography (CTA) of head/neck within 20 minutes of arrival (Door-to-CT).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Excludes intracranial hemorrhage and identifies large vessel occlusion (LVO) eligible for mechanical thrombectomy.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Intravenous Thrombolysis',
          action: 'Administer IV Tenecteplase 0.25 mg/kg (max 25 mg) or Alteplase 0.9 mg/kg (max 90 mg) within 4.5 hours of symptom onset if BP < 185/110 mmHg.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores cerebral perfusion and improves 90-day functional independence.'
        },
        {
          stepNumber: 2,
          phase: 'Blood Pressure Management',
          action: 'Maintain BP < 180/105 mmHg for 24 hours post-thrombolytic using IV Labetalol or Nicardipine.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Minimizes risk of secondary hemorrhagic transformation.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Neuro ICU Surveillance',
          action: 'Neurological checks and vitals every 15 min for 2 hours, then every 30 min for 6 hours, then hourly for 16 hours.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Detects early neurological decline or intracranial bleeding.'
        }
      ],
      hospitalizationCriteria: [
        'All patients receiving thrombolytic therapy or endovascular thrombectomy',
        'Acute neurological deficits with NIHSS >= 1',
        'High-risk transient ischemic attack (ABCD2 score >= 4)'
      ]
    });

    this.add({
      protocolId: 'PROTO-NEURO-STATUS-EPI',
      conditionName: 'Status Epilepticus Emergency Seizure Protocol',
      icd10Code: 'G40.909',
      targetPopulation: 'Neurology patients with Status Epilepticus Emergency Seizure Protocol.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: IV Lorazepam 4 mg, followed by Levetiracetam 60 mg/kg IV if seizure persists > 5 min.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-NEURO-PARKINSON',
      conditionName: 'Parkinson Disease Motor Fluctuation Management',
      icd10Code: 'G20',
      targetPopulation: 'Neurology patients with Parkinson Disease Motor Fluctuation Management.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: Levodopa/Carbidopa optimization, COMT inhibitors, and deep brain stimulation screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-NEURO-MIGRAINE-STATUS',
      conditionName: 'Status Migrainosus & Intractable Headache',
      icd10Code: 'G43.909',
      targetPopulation: 'Neurology patients with Status Migrainosus & Intractable Headache.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: IV Ketorolac + Metoclopramide + Dexamethasone with hydration.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-NEURO-MYASTHENIA',
      conditionName: 'Myasthenic Crisis Respiratory Failure Management',
      icd10Code: 'G70.01',
      targetPopulation: 'Neurology patients with Myasthenic Crisis Respiratory Failure Management.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: Negative inspiratory force (NIF), IVIG or plasmapheresis, avoiding neuromuscular blockers.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-NEURO-GBS',
      conditionName: 'Guillain-Barre Syndrome Acute Neuropathy',
      icd10Code: 'G61.0',
      targetPopulation: 'Neurology patients with Guillain-Barre Syndrome Acute Neuropathy.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: Albuminocytological dissociation in CSF, IVIG 2g/kg over 5 days, pulmonary monitoring.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    });
    this.add({
      protocolId: 'PROTO-NEURO-MULT-SCLEROSIS',
      conditionName: 'Acute Multiple Sclerosis Relapse Exacerbation',
      icd10Code: 'G35',
      targetPopulation: 'Neurology patients with Acute Multiple Sclerosis Relapse Exacerbation.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: High-dose Methylprednisolone 1000 mg IV daily for 3-5 days followed by oral taper.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
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
