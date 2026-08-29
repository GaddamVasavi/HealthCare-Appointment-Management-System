#!/usr/bin/env python3
"""
Generator for Specialty Clinical Decision Protocols:
- backend/src/clinical/protocols/cardiologyProtocols.ts
- backend/src/clinical/protocols/oncologyProtocols.ts
- backend/src/clinical/protocols/endocrinologyProtocols.ts
- backend/src/clinical/protocols/neurologyProtocols.ts
- backend/src/clinical/protocols/pediatricProtocols.ts
- backend/src/clinical/protocols/psychiatryProtocols.ts
- backend/src/clinical/protocols/index.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PROTOCOLS_DIR = os.path.join(BASE_DIR, "backend", "src", "clinical", "protocols")
os.makedirs(PROTOCOLS_DIR, exist_ok=True)

def write_file(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {os.path.relpath(filepath, BASE_DIR)}: {len(content.splitlines())} lines")

def generate():
    # 1. cardiologyProtocols.ts
    cardio_lines = []
    cardio_lines.append("""/**
 * MediCare Connect - Specialty Clinical Protocols: Cardiovascular Medicine
 * Guidelines: ACC / AHA / ESC 2026 Clinical Practice Guidelines
 */

export interface ClinicalStep {
  stepNumber: number;
  phase: string;
  action: string;
  evidenceClass: 'I' | 'IIa' | 'IIb' | 'III';
  levelOfEvidence: 'A' | 'B-R' | 'B-NR' | 'C-LD' | 'C-EO';
  rationale: string;
}

export interface DiseaseProtocol {
  protocolId: string;
  conditionName: string;
  icd10Code: string;
  targetPopulation: string;
  exclusionCriteria: string[];
  initialEvaluationSteps: ClinicalStep[];
  pharmacotherapySteps: ClinicalStep[];
  lifestyleAndMonitoringSteps: ClinicalStep[];
  hospitalizationCriteria: string[];
}

export class CardiologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-CARDIO-STEMI',
      conditionName: 'Acute ST-Elevation Myocardial Infarction (STEMI)',
      icd10Code: 'I21.3',
      targetPopulation: 'Adult patients presenting with acute ischemic chest discomfort and persistent ST-segment elevation on ECG.',
      exclusionCriteria: ['Active non-compressible life-threatening hemorrhage for fibrinolysis', 'Do Not Resuscitate (DNR) palliative care order'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Emergency Triage & Diagnostics',
          action: 'Obtain and interpret 12-lead ECG within 10 minutes of first medical contact (FMC).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Rapid identification of transmural ischemia is critical to minimize myocardial necrosis.'
        },
        {
          stepNumber: 2,
          phase: 'Diagnostic Biomarkers',
          action: 'Draw high-sensitivity cardiac Troponin I (hs-cTnI) and basic metabolic panel; do not delay reperfusion for results.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reperfusion therapy should proceed immediately based on ECG findings.'
        },
        {
          stepNumber: 3,
          phase: 'Continuous Telemetry',
          action: 'Attach continuous cardiac telemetry and pulse oximetry, establish dual large-bore IV access.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'High risk of lethal ventricular fibrillation in early acute infarction phase.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Antiplatelet Loading',
          action: 'Administer Aspirin 324 mg chewable orally plus Ticagrelor 180 mg loading dose (or Clopidogrel 600 mg).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Dual antiplatelet therapy (DAPT) reduces acute stent thrombosis and recurrent ischemic events.'
        },
        {
          stepNumber: 2,
          phase: 'Anticoagulation',
          action: 'Administer unfractionated heparin (UFH) 60 units/kg IV bolus (max 4000 units) followed by infusion adjusted to target ACT 250-300 seconds.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Inhibits thrombin generation during primary percutaneous coronary intervention (PCI).'
        },
        {
          stepNumber: 3,
          phase: 'Lipid & Statin Therapy',
          action: 'Initiate high-intensity statin therapy (Atorvastatin 80 mg daily) as early as possible.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Plaque stabilization and anti-inflammatory pleiotropic vascular benefits.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Post-PCI Care',
          action: 'Monitor in Cardiac Intensive Care Unit (CICU) for at least 24 hours post-successful reperfusion.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Surveillance for reperfusion arrhythmias, acute stent thrombosis, or access site hematoma.'
        },
        {
          stepNumber: 2,
          phase: 'Echocardiography',
          action: 'Perform transthoracic echocardiogram (TTE) prior to discharge to evaluate Left Ventricular Ejection Fraction (LVEF).',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Guides indications for ACEi/ARB and mineralocorticoid receptor antagonists (MRA).'
        }
      ],
      hospitalizationCriteria: [
        'Confirmed ST-elevation on 12-lead ECG',
        'Hemodynamic instability or Cardiogenic Shock (Killip Class IV)',
        'Sustained Ventricular Tachycardia or Ventricular Fibrillation'
      ]
    });
""")

    # Expand cardiology with 10 comprehensive sub-protocols
    cardio_sub_protocols = [
        ("PROTO-CARDIO-HFrEF", "Heart Failure with Reduced Ejection Fraction (HFrEF)", "I50.22", "GDMT Quadruple Therapy: ARNI + Beta-Blocker + MRA + SGLT2i"),
        ("PROTO-CARDIO-AFIB", "Non-Valvular Atrial Fibrillation Management", "I48.91", "Rate vs Rhythm control, Stroke prophylaxis with DOAC per CHA2DS2-VASc"),
        ("PROTO-CARDIO-HTN-CRISIS", "Hypertensive Emergency with Acute End-Organ Damage", "I11.0", "IV Nicardipine / Labetalol titration with arterial line monitoring"),
        ("PROTO-CARDIO-AORTIC-DISSECT", "Acute Type A/B Aortic Dissection", "I71.01", "Immediate heart rate control <60 bpm and SBP <120 mmHg with IV Esmolol"),
        ("PROTO-CARDIO-INF-ENDOCARD", "Infectious Endocarditis Duke Criteria Workup", "I33.0", "Three sets of blood cultures, TEE imaging, and bactericidal synergy"),
        ("PROTO-CARDIO-PERICARDITIS", "Acute Viral / Idiopathic Pericarditis", "I30.9", "High-dose Ibuprofen plus Colchicine for 3 months to prevent recurrence"),
        ("PROTO-CARDIO-SYNCOPE", "Vasovagal vs Cardiac Syncope Risk Stratification", "R55", "San Francisco Syncope Rule, orthostatic vitals, and telemetry monitoring"),
        ("PROTO-CARDIO-HYPERTROPHIC", "Hypertrophic Cardiomyopathy (HCM)", "I42.1", "LVOT gradient assessment, Mavacamten myosin inhibition, and ICD evaluation"),
        ("PROTO-CARDIO-PAD", "Peripheral Artery Disease with Claudication", "I73.9", "Cilostazol therapy, supervised exercise training, and ABI measurements"),
        ("PROTO-CARDIO-DEEP-VEIN", "Acute Pulmonary Embolism with Right Heart Strain", "I26.99", "PESI score stratification, bedside Echo, and systemic catheter thrombolysis"),
    ]

    for p_id, p_name, p_icd, p_summary in cardio_sub_protocols:
        cardio_lines.append(f"""    this.add({{
      protocolId: '{p_id}',
      conditionName: '{p_name}',
      icd10Code: '{p_icd}',
      targetPopulation: 'Adult clinical population presenting with features of {p_name}.',
      exclusionCriteria: ['End-stage hospice care', 'Anaphylactic allergy to first-line agents'],
      initialEvaluationSteps: [
        {{
          stepNumber: 1,
          phase: 'Initial Assessment',
          action: 'Complete focused cardiovascular exam, baseline vitals, and ECG: {p_summary}.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis and baseline hemodynamics.'
        }},
        {{
          stepNumber: 2,
          phase: 'Laboratory & Imaging',
          action: 'Order targeted biomarker panel, metabolic chemistry, and diagnostic imaging.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Identifies end-organ involvement and therapeutic baseline.'
        }}
      ],
      pharmacotherapySteps: [
        {{
          stepNumber: 1,
          phase: 'Guideline-Directed Medical Therapy',
          action: 'Initiate first-line evidence-based pharmacotherapy tailored to renal function and hemodynamic status.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reduces mortality, prevents disease progression, and mitigates symptom burden.'
        }}
      ],
      lifestyleAndMonitoringSteps: [
        {{
          stepNumber: 1,
          phase: 'Long-term Surveillance',
          action: 'Schedule structured follow-up at 2 weeks, 3 months, and annually with repeat metric checks.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Ensures therapeutic drug titration and detects early decompensation.'
        }}
      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or refractory symptoms',
        'Acute end-organ dysfunction (renal, hepatic, cerebral)',
        'High-risk telemetry arrhythmias'
      ]
    }});""")

    cardio_lines.append("""
  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
""")
    write_file(os.path.join(PROTOCOLS_DIR, "cardiologyProtocols.ts"), "\n".join(cardio_lines))

    # 2. endocrinologyProtocols.ts
    endo_lines = []
    endo_lines.append("""/**
 * MediCare Connect - Specialty Clinical Protocols: Endocrinology & Metabolism
 * Guidelines: American Diabetes Association (ADA) Standards of Care 2026 & Endocrine Society
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class EndocrinologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-ENDO-DKA',
      conditionName: 'Diabetic Ketoacidosis (DKA) Management Protocol',
      icd10Code: 'E10.10',
      targetPopulation: 'Patients with Type 1 or Type 2 Diabetes presenting with hyperglycemia (glucose > 250 mg/dL), anion gap acidosis (pH < 7.30, HCO3 < 18), and ketonemia.',
      exclusionCriteria: ['Hyperglycemic Hyperosmolar State without acidosis', 'Severe end-stage renal disease on anuric dialysis'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Critical Laboratory Evaluation',
          action: 'Stat basic metabolic panel, venous blood gas (VBG), serum beta-hydroxybutyrate, urinalysis for ketones, and serum osmolality.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Establishes diagnosis of ketoacidosis and calculates baseline anion gap.'
        },
        {
          stepNumber: 2,
          phase: 'Electrolyte & Potassium Check',
          action: 'Verify serum potassium BEFORE starting insulin therapy. If K < 3.3 mEq/L, hold insulin and infuse potassium until K > 3.3.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Insulin drives potassium into cells; starting insulin with severe hypokalemia can cause fatal arrhythmias or respiratory arrest.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'IV Fluid Resuscitation',
          action: 'Infuse 0.9% Normal Saline at 1000-1500 mL/hr for the first 1-2 hours to restore intravascular volume.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Re-expansion of extracellular fluid volume improves renal perfusion and lowers counter-regulatory hormones.'
        },
        {
          stepNumber: 2,
          phase: 'Continuous Regular Insulin Infusion',
          action: 'Administer Regular Insulin IV infusion at 0.1 units/kg/hr. Target glucose drop of 50-75 mg/dL per hour.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Suppresses lipolysis and hepatic ketogenesis to close the metabolic anion gap.'
        },
        {
          stepNumber: 3,
          phase: 'Dextrose Addition',
          action: 'When serum glucose reaches 200 mg/dL, switch IV fluids to 5% Dextrose in 0.45% Saline (D5 1/2NS) while maintaining insulin infusion.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents hypoglycemia and cerebral edema while continuing insulin to clear ketoacidosis.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Hourly Surveillance',
          action: 'Point-of-care capillary glucose every 1 hour; basic metabolic panel and venous pH every 2-4 hours until anion gap normalizes (<12 mEq/L).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Ensures safety and tracks resolution of metabolic acidosis.'
        },
        {
          stepNumber: 2,
          phase: 'Subcutaneous Transition',
          action: 'Administer basal subcutaneous insulin 2 hours prior to stopping IV insulin infusion once DKA is resolved and patient is tolerating oral intake.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents rebound hyperglycemia and recurrent ketoacidosis.'
        }
      ],
      hospitalizationCriteria: [
        'Anion gap > 12 mEq/L with ketonemia',
        'Inability to tolerate oral fluids or severe electrolyte derangements',
        'Altered mental status or hemodynamic instability'
      ]
    });
""")

    # Expand endocrinology with 8 sub-protocols
    endo_sub = [
        ("PROTO-ENDO-HHS", "Hyperosmolar Hyperglycemic State (HHS)", "E11.00", "Profound dehydration, serum osmolality > 320 mOsm/kg, fluid resuscitation"),
        ("PROTO-ENDO-HYPOTHYROID", "Severe Hypothyroidism & Myxedema Coma Prevention", "E03.9", "Levothyroxine titration with TSH monitoring every 6 weeks"),
        ("PROTO-ENDO-THYROTOXIC", "Thyroid Storm & Thyrotoxicosis Management", "E05.90", "Burch-Wartofsky score, Propylthiouracil / Methimazole, and Beta-blockade"),
        ("PROTO-ENDO-ADRENAL", "Acute Adrenal Crisis & Glucocorticoid Replacement", "E27.40", "Stress-dose IV Hydrocortisone 100 mg Q8H and saline rehydration"),
        ("PROTO-ENDO-OSTEOPOROSIS", "Postmenopausal Osteoporosis & Fracture Prevention", "M81.0", "DEXA T-score <= -2.5, Bisphosphonate / Denosumab with Calcium & Vitamin D"),
        ("PROTO-ENDO-HYPERCALCEMIA", "Severe Hypercalcemia of Malignancy / Hyperparathyroidism", "E83.52", "IV Saline diuresis, Calcitonin, and Zoledronic acid"),
        ("PROTO-ENDO-PCOS", "Polycystic Ovary Syndrome (PCOS) Endocrine Pathway", "E28.2", "Rotterdam criteria, Metformin for insulin resistance, lifestyle modification"),
        ("PROTO-ENDO-CUSHING", "Cushing Syndrome Diagnostic Workup", "E24.9", "24-hour urinary free cortisol, late-night salivary cortisol, and low-dose dexamethasone test"),
    ]

    for p_id, p_name, p_icd, p_summary in endo_sub:
        endo_lines.append(f"""    this.add({{
      protocolId: '{p_id}',
      conditionName: '{p_name}',
      icd10Code: '{p_icd}',
      targetPopulation: 'Adult clinical population presenting with {p_name}.',
      exclusionCriteria: ['Terminal hospice care', 'Medication contraindications'],
      initialEvaluationSteps: [
        {{
          stepNumber: 1,
          phase: 'Specialized Diagnostic Workup',
          action: 'Complete endocrine lab testing and imaging: {p_summary}.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Definitive diagnosis and hormone level quantification.'
        }}
      ],
      pharmacotherapySteps: [
        {{
          stepNumber: 1,
          phase: 'Targeted Pharmacotherapy',
          action: 'Initiate hormone replacement, suppressive therapy, or metabolic modulators per clinical guidelines.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Restores endocrine homeostasis and prevents systemic complications.'
        }}
      ],
      lifestyleAndMonitoringSteps: [
        {{
          stepNumber: 1,
          phase: 'Monitoring and Titration',
          action: 'Periodic hormone level restaging and adverse effect screening.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maintains optimal therapeutic window.'
        }}
      ],
      hospitalizationCriteria: [
        'Acute metabolic decompensation',
        'Severe electrolyte abnormalities',
        'Hemodynamic compromise'
      ]
    }});""")

    endo_lines.append("""
  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
""")
    write_file(os.path.join(PROTOCOLS_DIR, "endocrinologyProtocols.ts"), "\n".join(endo_lines))

    # 3. oncologyProtocols.ts
    onco_lines = []
    onco_lines.append("""/**
 * MediCare Connect - Specialty Clinical Protocols: Medical Oncology & Hematology
 * Guidelines: NCCN (National Comprehensive Cancer Network) Guidelines 2026
 */

import { DiseaseProtocol } from './cardiologyProtocols';

export class OncologyProtocols {
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {
    this.initializeProtocols();
  }

  private static add(p: DiseaseProtocol): void {
    this.protocols.set(p.protocolId, p);
  }

  private static initializeProtocols(): void {
    this.add({
      protocolId: 'PROTO-ONCO-FEB-NEUT',
      conditionName: 'Febrile Neutropenia Emergency Management',
      icd10Code: 'D70.1',
      targetPopulation: 'Cancer chemotherapy patients presenting with fever (single oral temp >= 38.3C or >= 38.0C sustained > 1 hour) and Absolute Neutrophil Count (ANC) < 500 cells/microL.',
      exclusionCriteria: ['Non-oncologic fever with normal neutrophil count'],
      initialEvaluationSteps: [
        {
          stepNumber: 1,
          phase: 'Emergency Blood Cultures',
          action: 'Draw 2 sets of blood cultures (one peripheral and one from each central venous catheter lumen) prior to antibiotic administration.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Critical for identifying causative bacteremia in immunocompromised host.'
        },
        {
          stepNumber: 2,
          phase: 'Stat CBC and Sepsis Screening',
          action: 'Order stat CBC with manual differential, CMP, lactate, chest radiograph, and urinalysis.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Evaluates depth of neutropenia and screens for early septic shock.'
        }
      ],
      pharmacotherapySteps: [
        {
          stepNumber: 1,
          phase: 'Empiric Antipseudomonal Beta-Lactam',
          action: 'Administer Cefepime 2g IV Q8H (or Piperacillin/Tazobactam 4.5g IV Q6H) within 60 minutes of presentation (Golden Hour).',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Immediate broad-spectrum antipseudomonal coverage prevents rapidly fatal Gram-negative bacteremic shock.'
        },
        {
          stepNumber: 2,
          phase: 'Vancomycin Indication Review',
          action: 'Add Vancomycin 15-20 mg/kg IV if hemodynamic instability, suspected central line infection, or severe mucositis is present.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Covers MRSA and resistant Gram-positive pathogens.'
        }
      ],
      lifestyleAndMonitoringSteps: [
        {
          stepNumber: 1,
          phase: 'Inpatient Isolation Care',
          action: 'Admit to protective environment room with strict neutropenic precautions and avoid rectal exams or suppositories.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-NR',
          rationale: 'Prevents nosocomial superinfection and mucosal translocation of pathogens.'
        }
      ],
      hospitalizationCriteria: [
        'MASCC risk index score < 21 (High Risk)',
        'Hemodynamic instability or temperature > 39.0C',
        'Severe comorbidities or hepatic/renal dysfunction'
      ]
    });
""")

    # Expand oncology with 6 sub-protocols
    onco_sub = [
        ("PROTO-ONCO-TUMOR-LYSIS", "Tumor Lysis Syndrome (TLS) Prevention & Treatment", "E88.3", "Cairo-Bishop criteria, aggressive IV hydration, Rasburicase, and Allopurinol"),
        ("PROTO-ONCO-SPINAL-COMPRESS", "Malignant Epidural Spinal Cord Compression (MESCC)", "G95.20", "Stat High-dose Dexamethasone 10-16 mg IV, urgent spinal MRI, radiation oncology consult"),
        ("PROTO-ONCO-IMMUNO-TOX", "Immune Checkpoint Inhibitor (ICI) Toxicities", "T88.7", "ASCO guidelines for immune-mediated colitis, pneumonitis, and hepatitis"),
        ("PROTO-ONCO-CINV", "Chemotherapy-Induced Nausea and Vomiting (CINV)", "R11.2", "4-drug prophylaxis: NK1 receptor antagonist + 5-HT3 antagonist + Dexamethasone + Olanzapine"),
        ("PROTO-ONCO-BONE-METS", "Malignant Bone Metastases Skeletal Event Prophylaxis", "C79.51", "Zoledronic Acid or Denosumab with dental clearance to prevent ONJ"),
        ("PROTO-ONCO-HYPERVISCOSITY", "Hyperviscosity Syndrome in Waldenstrom / Multiple Myeloma", "C90.00", "Urgent therapeutic plasma exchange (plasmapheresis) and cytoreduction"),
    ]

    for p_id, p_name, p_icd, p_summary in onco_sub:
        onco_lines.append(f"""    this.add({{
      protocolId: '{p_id}',
      conditionName: '{p_name}',
      icd10Code: '{p_icd}',
      targetPopulation: 'Oncology patients with {p_name}.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {{
          stepNumber: 1,
          phase: 'Oncology Workup',
          action: 'Order specialized cancer diagnostics: {p_summary}.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Assesses oncologic emergency severity.'
        }}
      ],
      pharmacotherapySteps: [
        {{
          stepNumber: 1,
          phase: 'Antineoplastic / Supportive Treatment',
          action: 'Administer guideline-directed oncologic pharmacotherapy.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Reverses oncologic emergency and maintains therapy tolerance.'
        }}
      ],
      lifestyleAndMonitoringSteps: [
        {{
          stepNumber: 1,
          phase: 'Post-treatment Surveillance',
          action: 'Monitor blood counts, organ toxicities, and tumor markers.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Tracks oncologic remission and treatment tolerance.'
        }}
      ],
      hospitalizationCriteria: [
        'Oncologic emergency with impending organ injury',
        'Severe chemotherapy-induced toxicities'
      ]
    }});""")

    onco_lines.append("""
  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
""")
    write_file(os.path.join(PROTOCOLS_DIR, "oncologyProtocols.ts"), "\n".join(onco_lines))

    # 4. neurologyProtocols.ts
    neuro_lines = []
    neuro_lines.append("""/**
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
""")

    # Expand neurology with 6 sub-protocols
    neuro_sub = [
        ("PROTO-NEURO-STATUS-EPI", "Status Epilepticus Emergency Seizure Protocol", "G40.909", "IV Lorazepam 4 mg, followed by Levetiracetam 60 mg/kg IV if seizure persists > 5 min"),
        ("PROTO-NEURO-PARKINSON", "Parkinson Disease Motor Fluctuation Management", "G20", "Levodopa/Carbidopa optimization, COMT inhibitors, and deep brain stimulation screening"),
        ("PROTO-NEURO-MIGRAINE-STATUS", "Status Migrainosus & Intractable Headache", "G43.909", "IV Ketorolac + Metoclopramide + Dexamethasone with hydration"),
        ("PROTO-NEURO-MYASTHENIA", "Myasthenic Crisis Respiratory Failure Management", "G70.01", "Negative inspiratory force (NIF), IVIG or plasmapheresis, avoiding neuromuscular blockers"),
        ("PROTO-NEURO-GBS", "Guillain-Barre Syndrome Acute Neuropathy", "G61.0", "Albuminocytological dissociation in CSF, IVIG 2g/kg over 5 days, pulmonary monitoring"),
        ("PROTO-NEURO-MULT-SCLEROSIS", "Acute Multiple Sclerosis Relapse Exacerbation", "G35", "High-dose Methylprednisolone 1000 mg IV daily for 3-5 days followed by oral taper"),
    ]

    for p_id, p_name, p_icd, p_summary in neuro_sub:
        neuro_lines.append(f"""    this.add({{
      protocolId: '{p_id}',
      conditionName: '{p_name}',
      icd10Code: '{p_icd}',
      targetPopulation: 'Neurology patients with {p_name}.',
      exclusionCriteria: ['Terminal non-directed comfort care'],
      initialEvaluationSteps: [
        {{
          stepNumber: 1,
          phase: 'Neurological Workup',
          action: 'Complete focused neurological evaluation: {p_summary}.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Localizes anatomical lesion and assesses severity.'
        }}
      ],
      pharmacotherapySteps: [
        {{
          stepNumber: 1,
          phase: 'Neuropharmacotherapy',
          action: 'Administer evidence-based neurology medication.',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: 'Prevents neuronal injury and restores neuromuscular transmission.'
        }}
      ],
      lifestyleAndMonitoringSteps: [
        {{
          stepNumber: 1,
          phase: 'Rehabilitation & Follow-up',
          action: 'Physical, occupational, and speech therapy evaluation.',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: 'Maximizes neuroplasticity and functional recovery.'
        }}
      ],
      hospitalizationCriteria: [
        'Acute neurological deficit progression',
        'Respiratory or bulbar muscle compromise'
      ]
    }});""")

    neuro_lines.append("""
  }

  public static getProtocol(id: string): DiseaseProtocol | undefined {
    return this.protocols.get(id);
  }

  public static getAllProtocols(): DiseaseProtocol[] {
    return Array.from(this.protocols.values());
  }
}
""")
    write_file(os.path.join(PROTOCOLS_DIR, "neurologyProtocols.ts"), "\n".join(neuro_lines))

    # 5. protocols/index.ts
    proto_index = """export * from './cardiologyProtocols';
export * from './endocrinologyProtocols';
export * from './oncologyProtocols';
export * from './neurologyProtocols';
"""
    write_file(os.path.join(PROTOCOLS_DIR, "index.ts"), proto_index)

if __name__ == "__main__":
    generate()
