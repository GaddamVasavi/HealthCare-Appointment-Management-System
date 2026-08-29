/**
 * MediCare Connect - Specialty Clinical Protocols: Pulmonary & Critical Care
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class PulmonologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-PULM-ARDS',
      conditionName: 'Acute Respiratory Distress Syndrome (ARDS) Lung-Protective Ventilation',
      icd10Code: 'J80',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Respiratory Distress Syndrome (ARDS) Lung-Protective Ventilation.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Verify Berlin Definition criteria: acute onset within 1 week, bilateral infiltrates, non-cardiogenic edema (PaO2/FiO2 <= 300)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Confirms ARDS and stratifies mild, moderate, or severe.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Institute Low Tidal Volume Ventilation protocol (6 mL/kg predicted body weight) with plateau pressure < 30 cmH2O',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'ARBNet proven mortality reduction by preventing ventilator-induced lung injury (VILI).'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Prone positioning for >= 16 hours/day in moderate-to-severe ARDS (PaO2/FiO2 < 150)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'PROSEVA trial proven significant reduction in 28-day mortality.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Conservative fluid management strategy once patient is out of shock',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Shortens ventilator duration and ICU length of stay.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PULM-COPD-EXACERB',
      conditionName: 'Acute COPD Exacerbation Management',
      icd10Code: 'J44.1',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute COPD Exacerbation Management.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Measure arterial blood gas (ABG) to assess hypercapnia and respiratory acidosis (pH < 7.35, PaCO2 > 45)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Identifies acute hypercapnic respiratory failure.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate Non-Invasive Positive Pressure Ventilation (NIV / BiPAP) with IPAP 10-15 and EPAP 4-5 cmH2O',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces intubation rates and in-hospital mortality in COPD acidosis.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Systemic Prednisone 40 mg PO daily for 5 days plus Azithromycin 500 mg daily x 3 days',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Shortens recovery time, improves FEV1, and treats purulent sputum bacterial triggers.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Titrate oxygen cautiously to maintain target SpO2 88-92%',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents loss of hypoxic drive and worsening hypercapnic coma.'
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
