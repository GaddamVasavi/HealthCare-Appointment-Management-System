/**
 * MediCare Connect - Specialty Clinical Protocols: Pediatrics & Child Health
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class PediatricProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-PED-FEBRILE-INFANT',
      conditionName: 'Young Febrile Infant (<60 Days) Evaluation',
      icd10Code: 'R50.9',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Young Febrile Infant (<60 Days) Evaluation.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Complete blood count, procalcitonin, catheterized urinalysis, and blood cultures',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Identifies invasive bacterial infection (IBI) risk.'
        },
        {
          stepNumber: 2,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Lumbar puncture for cerebrospinal fluid (CSF) analysis if high-risk markers present',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Excludes neonatal bacterial meningitis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Empiric IV Ampicillin (50 mg/kg Q6H) plus Ceftriaxone (50 mg/kg Q24H) or Gentamicin',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Provides broad coverage against GBS, E. coli, and Listeria monocytogenes.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Inpatient observation and continuous telemetry for 24-36 hours until culture negativity',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Guarantees infant clinical safety.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PED-CROUP',
      conditionName: 'Viral Laryngotracheitis (Croup) Airway Management',
      icd10Code: 'J05.0',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Viral Laryngotracheitis (Croup) Airway Management.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Assess Westley Croup Score (stridor, retractions, air entry, cyanosis, consciousness)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Quantifies upper airway obstruction severity.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Single dose oral Dexamethasone 0.6 mg/kg (max 16 mg) for all severity tiers',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces subglottic laryngeal mucosal edema.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Nebulized Racemic Epinephrine (2.25% solution 0.5 mL) for moderate-to-severe stridor at rest',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid alpha-adrenergic vasoconstriction resolves critical airway narrowing.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Observe for minimum 2-3 hours post-epinephrine for rebound stridor',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Ensures safe outpatient discharge.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PED-BRONCHIOLITIS',
      conditionName: 'Acute RSV Bronchiolitis in Infants',
      icd10Code: 'J21.0',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute RSV Bronchiolitis in Infants.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Clinical assessment of work of breathing, respiratory rate, and continuous pulse oximetry',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Evaluates respiratory fatigue and hypoxemia.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Nasal suctioning and warm humidified supplemental oxygen if SpO2 < 90%',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Maintains airway patency without unnecessary bronchodilator trials.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Hydration support via nasogastric tube or IV fluids if oral intake < 50%',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents infant dehydration and aspiration.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PED-ANAPHYLAXIS',
      conditionName: 'Pediatric Food / Drug Anaphylaxis Emergency',
      icd10Code: 'T78.2',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Pediatric Food / Drug Anaphylaxis Emergency.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Immediate ABC assessment and simultaneous detection of skin, respiratory, or GI signs',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Ensures zero-delay recognition of anaphylaxis.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Intramuscular Epinephrine (0.01 mg/kg, 1:1000 autoinjector 0.15 mg or 0.3 mg) into mid-anterolateral thigh',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'First-line life-saving alpha-1 and beta-2 adrenergic vasoconstriction and bronchodilation.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Adjunctive Diphenhydramine 1 mg/kg IV and Methylprednisolone 1 mg/kg IV',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Second-line histamine blockade and biphasic reaction prevention.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Monitor in emergency department for minimum 4-6 hours for biphasic anaphylaxis',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents secondary fatal collapse.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PED-DEHYDRATION',
      conditionName: 'Acute Gastroenteritis & Dehydration Rehydration',
      icd10Code: 'A09',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Gastroenteritis & Dehydration Rehydration.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Clinical dehydration scale assessment (general appearance, eyes, mucous membranes, tears)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Accurately categorizes mild (3-5%), moderate (6-9%), or severe (>=10%) dehydration.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Oral Rehydration Salts (ORS) solution 50-100 mL/kg over 4 hours plus Ondansetron 0.15 mg/kg oral dissolvable',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Superior to IV hydration for mild-moderate dehydration.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Early refeeding with age-appropriate regular diet once rehydrated',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Promotes enterocyte healing and shortens diarrhea duration.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-PED-STATUS-ASTHMA',
      conditionName: 'Pediatric Status Asthmaticus Emergency',
      icd10Code: 'J45.901',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Pediatric Status Asthmaticus Emergency.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'PRAM (Pediatric Respiratory Assessment Measure) score calculation',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Monitors acute bronchospasm response to therapy.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Continuous Albuterol nebulization 0.5 mg/kg/hr plus Ipratropium Bromide 500 mcg Q20 min x 3 doses',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Synergistic beta-2 and muscarinic bronchodilation.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'IV Magnesium Sulfate 50 mg/kg (max 2g) infused over 20 minutes for severe obstruction',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Inhibits smooth muscle calcium influx providing rapid bronchodilation.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'PICU admission for continuous non-invasive positive pressure ventilation (BiPAP) if refractory',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Prevents respiratory muscle exhaustion and invasive intubation.'
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
