/**
 * MediCare Connect - Specialty Clinical Protocols: Gastroenterology & Hepatology
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class GastroenterologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {

    this.add({
      protocolId: 'PROTO-GI-UPPER-BLEED',
      conditionName: 'Acute Upper Gastrointestinal Bleeding (UGIB)',
      icd10Code: 'K92.2',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Upper Gastrointestinal Bleeding (UGIB).',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Calculate Glasgow-Blatchford Score (GBS) and Rockall Risk Score immediately upon arrival',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Stratifies patients requiring urgent endoscopic intervention.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'High-dose IV Pantoprazole 80 mg bolus followed by 8 mg/hr continuous infusion',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Maintains intragastric pH > 6.0 to stabilize fibrin clots on bleeding ulcers.'
        },
        {
          stepNumber: 2,
          phase: 'Targeted Pharmacotherapy',
          action: 'Administer IV Octreotide 50 mcg bolus + 50 mcg/hr infusion if portal hypertension/varices suspected',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Splanchnic vasoconstriction reduces portal inflow pressure.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Perform Esophagogastroduodenoscopy (EGD) within 24 hours of admission (within 12h if unstable)',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Definitive endoscopic hemostasis with hemoclips, thermal coagulation, or band ligation.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-GI-ACUTE-PANCREATITIS',
      conditionName: 'Acute Pancreatitis Severity Stratification & Fluid Therapy',
      icd10Code: 'K85.90',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Acute Pancreatitis Severity Stratification & Fluid Therapy.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Measure serum Lipase (>3x upper limit of normal) and calculate BISAP score',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and predicts severe necrotizing pancreatitis risk.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Aggressive IV Lactated Ringer fluid resuscitation at 250-500 mL/hr for the first 12-24 hours',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents microvascular ischemia and pancreatic parenchymal necrosis.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Initiate early oral feeding with low-fat solid or liquid diet as soon as abdominal pain improves',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains gut mucosal barrier and prevents infected pancreatic necrosis.'
        },
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    });

    this.add({
      protocolId: 'PROTO-GI-CLOSTRIDIUM-DIFF',
      conditionName: 'Clostridioides difficile Colitis Severity Stratification',
      icd10Code: 'A04.72',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of Clostridioides difficile Colitis Severity Stratification.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Initial Diagnostic Evaluation',
          action: 'Evaluate stool C. diff NAAT / toxin EIA, WBC count, and serum Creatinine',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Stratifies non-severe (WBC <15k, Cr <1.5) vs severe disease.'
        },
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Oral Fidaxomicin 200 mg BID for 10 days (or Oral Vancomycin 125 mg QID for 10 days)',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'First-line bactericidal eradication with significantly lower recurrence rates.'
        },
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Surveillance & Long-term Care',
          action: 'Evaluate for Fecal Microbiota Transplantation (FMT) in multiple recurrent C. diff cases',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Restores colonic microbial diversity and prevents refractory colitis.'
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
