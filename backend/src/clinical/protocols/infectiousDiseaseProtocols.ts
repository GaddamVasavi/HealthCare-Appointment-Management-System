/**
 * MediCare Connect - Specialty Clinical Protocols: Infectious Diseases & Sepsis
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class InfectiousDiseaseProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-ID-SEPSIS-BUNDLE',
      conditionName: 'Surviving Sepsis Campaign 1-Hour Hour-1 Bundle',
      icd10Code: 'A41.9',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Surviving Sepsis Campaign 1-Hour Hour-1 Bundle.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Measure serum blood lactate immediately; remeasure within 2-4 hours if initial lactate > 2.0 mmol/L',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Flags tissue hypoperfusion and anaerobic metabolism.'
        },
        {
          stepNumber: 2,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Obtain two sets of blood cultures prior to antibiotic administration',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Identifies causative pathogen for antimicrobial de-escalation.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Administer broad-spectrum IV antimicrobials (e.g. Vancomycin + Cefepime) within 60 minutes of sepsis recognition',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Each hour of antibiotic delay in septic shock increases mortality by 7.6%.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Rapidly infuse 30 mL/kg crystalloid fluid for hypotension (MAP < 65 mmHg) or lactate >= 4.0 mmol/L',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores central venous volume and systemic organ perfusion.'
        },
        {
          stepNumber: 3,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Norepinephrine infusion as first-choice vasopressor to maintain MAP >= 65 mmHg if fluids fail',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Alpha-1 vasoconstriction restores systemic vascular resistance.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Assess dynamic measures of fluid responsiveness (passive leg raise, stroke volume variation)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents fluid overload once microcirculatory resuscitation achieved.'
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
