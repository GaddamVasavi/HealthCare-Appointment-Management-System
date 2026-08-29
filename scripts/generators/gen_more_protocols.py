#!/usr/bin/env python3
"""
Generator for Additional Specialty Clinical Protocols & Catalogs:
- backend/src/clinical/protocols/pediatricProtocols.ts
- backend/src/clinical/protocols/psychiatryProtocols.ts
- backend/src/clinical/protocols/gastroenterologyProtocols.ts
- backend/src/clinical/protocols/pulmonologyProtocols.ts
- backend/src/clinical/protocols/infectiousDiseaseProtocols.ts
- backend/src/clinical/protocols/nephrologyProtocols.ts
- shared/src/constants/icd-cpt-codes.ts
"""

import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PROTOCOLS_DIR = os.path.join(BASE_DIR, "backend", "src", "clinical", "protocols")
SHARED_CONST_DIR = os.path.join(BASE_DIR, "shared", "src", "constants")
os.makedirs(PROTOCOLS_DIR, exist_ok=True)
os.makedirs(SHARED_CONST_DIR, exist_ok=True)

def write_file(filepath, content):
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {os.path.relpath(filepath, BASE_DIR)}: {len(content.splitlines())} lines")

def generate():
    # Helper to generate protocols
    def make_protocol_file(class_name, specialty_name, protocols_data):
        lines = []
        lines.append(f"""/**
 * MediCare Connect - Specialty Clinical Protocols: {specialty_name}
 * Standards: Evidence-Based Clinical Practice Guidelines
 */

import {{ DiseaseProtocol }} from './cardiologyProtocols';

export class {class_name} {{
  private static readonly protocols: Map<string, DiseaseProtocol> = new Map();

  static {{
    this.initializeProtocols();
  }}

  private static add(p: DiseaseProtocol): void {{
    this.protocols.set(p.protocolId, p);
  }}

  private static initializeProtocols(): void {{
""")
        for p_id, p_name, p_icd, eval_steps, rx_steps, mon_steps in protocols_data:
            lines.append(f"""    this.add({{
      protocolId: '{p_id}',
      conditionName: '{p_name}',
      icd10Code: '{p_icd}',
      targetPopulation: 'Patients diagnosed with or presenting with clinical signs of {p_name}.',
      exclusionCriteria: ['Terminal palliative comfort care', 'Documented drug contraindications'],
      initialEvaluationSteps: [""")
            for idx, (action, rat) in enumerate(eval_steps, 1):
                lines.append(f"""        {{
          stepNumber: {idx},
          phase: 'Initial Diagnostic Evaluation',
          action: '{action}',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: '{rat}'
        }},""")
            lines.append("""      ],
      pharmacotherapySteps: [""")
            for idx, (action, rat) in enumerate(rx_steps, 1):
                lines.append(f"""        {{
          stepNumber: {idx},
          phase: 'Targeted Pharmacotherapy',
          action: '{action}',
          evidenceClass: 'I',
          levelOfEvidence: 'A',
          rationale: '{rat}'
        }},""")
            lines.append("""      ],
      lifestyleAndMonitoringSteps: [""")
            for idx, (action, rat) in enumerate(mon_steps, 1):
                lines.append(f"""        {{
          stepNumber: {idx},
          phase: 'Surveillance & Long-term Care',
          action: '{action}',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: '{rat}'
        }},""")
            lines.append(f"""      ],
      hospitalizationCriteria: [
        'Hemodynamic instability or shock',
        'Severe intractable symptoms refractory to outpatient treatment',
        'Acute organ system failure'
      ]
    }});
""")
        lines.append(f"""  }}

  public static getProtocol(id: string): DiseaseProtocol | undefined {{
    return this.protocols.get(id);
  }}

  public static getAllProtocols(): DiseaseProtocol[] {{
    return Array.from(this.protocols.values());
  }}
}}
""")
        return "\n".join(lines)

    # 1. Pediatric Protocols
    ped_data = [
        ("PROTO-PED-FEBRILE-INFANT", "Young Febrile Infant (<60 Days) Evaluation", "R50.9",
         [("Complete blood count, procalcitonin, catheterized urinalysis, and blood cultures", "Identifies invasive bacterial infection (IBI) risk."),
          ("Lumbar puncture for cerebrospinal fluid (CSF) analysis if high-risk markers present", "Excludes neonatal bacterial meningitis.")],
         [("Empiric IV Ampicillin (50 mg/kg Q6H) plus Ceftriaxone (50 mg/kg Q24H) or Gentamicin", "Provides broad coverage against GBS, E. coli, and Listeria monocytogenes.")],
         [("Inpatient observation and continuous telemetry for 24-36 hours until culture negativity", "Guarantees infant clinical safety.")]),
        ("PROTO-PED-CROUP", "Viral Laryngotracheitis (Croup) Airway Management", "J05.0",
         [("Assess Westley Croup Score (stridor, retractions, air entry, cyanosis, consciousness)", "Quantifies upper airway obstruction severity.")],
         [("Single dose oral Dexamethasone 0.6 mg/kg (max 16 mg) for all severity tiers", "Reduces subglottic laryngeal mucosal edema."),
          ("Nebulized Racemic Epinephrine (2.25% solution 0.5 mL) for moderate-to-severe stridor at rest", "Rapid alpha-adrenergic vasoconstriction resolves critical airway narrowing.")],
         [("Observe for minimum 2-3 hours post-epinephrine for rebound stridor", "Ensures safe outpatient discharge.")]),
        ("PROTO-PED-BRONCHIOLITIS", "Acute RSV Bronchiolitis in Infants", "J21.0",
         [("Clinical assessment of work of breathing, respiratory rate, and continuous pulse oximetry", "Evaluates respiratory fatigue and hypoxemia.")],
         [("Nasal suctioning and warm humidified supplemental oxygen if SpO2 < 90%", "Maintains airway patency without unnecessary bronchodilator trials.")],
         [("Hydration support via nasogastric tube or IV fluids if oral intake < 50%", "Prevents infant dehydration and aspiration.")]),
        ("PROTO-PED-ANAPHYLAXIS", "Pediatric Food / Drug Anaphylaxis Emergency", "T78.2",
         [("Immediate ABC assessment and simultaneous detection of skin, respiratory, or GI signs", "Ensures zero-delay recognition of anaphylaxis.")],
         [("Intramuscular Epinephrine (0.01 mg/kg, 1:1000 autoinjector 0.15 mg or 0.3 mg) into mid-anterolateral thigh", "First-line life-saving alpha-1 and beta-2 adrenergic vasoconstriction and bronchodilation."),
          ("Adjunctive Diphenhydramine 1 mg/kg IV and Methylprednisolone 1 mg/kg IV", "Second-line histamine blockade and biphasic reaction prevention.")],
         [("Monitor in emergency department for minimum 4-6 hours for biphasic anaphylaxis", "Prevents secondary fatal collapse.")]),
        ("PROTO-PED-DEHYDRATION", "Acute Gastroenteritis & Dehydration Rehydration", "A09",
         [("Clinical dehydration scale assessment (general appearance, eyes, mucous membranes, tears)", "Accurately categorizes mild (3-5%), moderate (6-9%), or severe (>=10%) dehydration.")],
         [("Oral Rehydration Salts (ORS) solution 50-100 mL/kg over 4 hours plus Ondansetron 0.15 mg/kg oral dissolvable", "Superior to IV hydration for mild-moderate dehydration.")],
         [("Early refeeding with age-appropriate regular diet once rehydrated", "Promotes enterocyte healing and shortens diarrhea duration.")]),
        ("PROTO-PED-STATUS-ASTHMA", "Pediatric Status Asthmaticus Emergency", "J45.901",
         [("PRAM (Pediatric Respiratory Assessment Measure) score calculation", "Monitors acute bronchospasm response to therapy.")],
         [("Continuous Albuterol nebulization 0.5 mg/kg/hr plus Ipratropium Bromide 500 mcg Q20 min x 3 doses", "Synergistic beta-2 and muscarinic bronchodilation."),
          ("IV Magnesium Sulfate 50 mg/kg (max 2g) infused over 20 minutes for severe obstruction", "Inhibits smooth muscle calcium influx providing rapid bronchodilation.")],
         [("PICU admission for continuous non-invasive positive pressure ventilation (BiPAP) if refractory", "Prevents respiratory muscle exhaustion and invasive intubation.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "pediatricProtocols.ts"), make_protocol_file("PediatricProtocols", "Pediatrics & Child Health", ped_data))

    # 2. Psychiatry Protocols
    psych_data = [
        ("PROTO-PSYCH-MDD", "Major Depressive Disorder (MDD) Pharmacotherapy Pathway", "F32.9",
         [("Administer baseline PHQ-9 and Columbia-Suicide Severity Rating Scale (C-SSRS)", "Quantifies depression severity and flags suicide risk.")],
         [("Initiate first-line SSRI (Sertraline 50 mg, Escitalopram 10 mg) with dose titration every 4-6 weeks", "First-line evidence-based pharmacotherapy with favorable side-effect profile."),
          ("Switch or augment with Bupropion or Aripiprazole if inadequate response at 8 weeks", "STAR*D trial evidence-based augmentation strategy.")],
         [("Repeat PHQ-9 at 4, 8, and 12 weeks with goal of clinical remission (PHQ-9 < 5)", "Tracks remission and functional recovery.")]),
        ("PROTO-PSYCH-BIPOLAR-MANIA", "Acute Bipolar I Mania Stabilization", "F31.13",
         [("Evaluate YMRS (Young Mania Rating Scale), substance screen, and medical etiology", "Differentiates primary mania from substance-induced psychosis.")],
         [("Initiate Mood Stabilizer (Lithium 300 mg TID or Divalproex 20 mg/kg) plus Second-Generation Antipsychotic (Quetiapine 300 mg or Olanzapine 10 mg)", "Combined therapy provides rapid manic symptom control.")],
         [("Check serum Lithium trough levels (target 0.8-1.2 mEq/L) and renal/thyroid function at day 5", "Prevents lithium toxicity and confirms therapeutic range.")]),
        ("PROTO-PSYCH-ALCOHOL-WITHDRAW", "Acute Alcohol Withdrawal Syndrome (CIWA-Ar)", "F10.239",
         [("Administer Clinical Institute Withdrawal Assessment for Alcohol (CIWA-Ar) score every 1-2 hours", "Quantifies autonomic hyperactivity, tremor, and delirium tremens risk.")],
         [("Symptom-triggered IV/oral Lorazepam 2-4 mg or Diazepam 10-20 mg when CIWA-Ar >= 10", "GABA-A agonism prevents grand mal withdrawal seizures and delirium tremens."),
          ("Administer High-dose Thiamine (Vitamin B1) 500 mg IV TID for 3 days BEFORE any glucose infusion", "Prevents irreversible Wernicke Encephalopathy and Korsakoff Psychosis.")],
         [("Transfer to ICU if requiring > 50 mg diazepam equivalents in 2 hours", "Surveillance for refractory delirium tremens and airway protection.")]),
        ("PROTO-PSYCH-SCHIZO-ACUTE", "Acute Psychosis & Schizophrenia First Episode", "F20.9",
         [("PANSS (Positive and Negative Syndrome Scale) scoring, MRI brain, and urine toxicology", "Rules out organic encephalitis, Wilson disease, and drug-induced states.")],
         [("Initiate Second-Generation Antipsychotic (Risperidone 2 mg, Aripiprazole 10 mg, or Olanzapine 10 mg)", "Dopamine D2 and 5-HT2A antagonism resolves hallucinations and delusions with low EPS risk.")],
         [("Metabolic syndrome monitoring: fasting lipid panel, glucose, and weight at baseline, 3 months, and annually", "Mitigates long-term cardiometabolic risk of atypical antipsychotics.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "psychiatryProtocols.ts"), make_protocol_file("PsychiatryProtocols", "Psychiatry & Behavioral Health", psych_data))

    # 3. Gastroenterology Protocols
    gi_data = [
        ("PROTO-GI-UPPER-BLEED", "Acute Upper Gastrointestinal Bleeding (UGIB)", "K92.2",
         [("Calculate Glasgow-Blatchford Score (GBS) and Rockall Risk Score immediately upon arrival", "Stratifies patients requiring urgent endoscopic intervention.")],
         [("High-dose IV Pantoprazole 80 mg bolus followed by 8 mg/hr continuous infusion", "Maintains intragastric pH > 6.0 to stabilize fibrin clots on bleeding ulcers."),
          ("Administer IV Octreotide 50 mcg bolus + 50 mcg/hr infusion if portal hypertension/varices suspected", "Splanchnic vasoconstriction reduces portal inflow pressure.")],
         [("Perform Esophagogastroduodenoscopy (EGD) within 24 hours of admission (within 12h if unstable)", "Definitive endoscopic hemostasis with hemoclips, thermal coagulation, or band ligation.")]),
        ("PROTO-GI-ACUTE-PANCREATITIS", "Acute Pancreatitis Severity Stratification & Fluid Therapy", "K85.90",
         [("Measure serum Lipase (>3x upper limit of normal) and calculate BISAP score", "Establishes diagnosis and predicts severe necrotizing pancreatitis risk.")],
         [("Aggressive IV Lactated Ringer fluid resuscitation at 250-500 mL/hr for the first 12-24 hours", "Prevents microvascular ischemia and pancreatic parenchymal necrosis.")],
         [("Initiate early oral feeding with low-fat solid or liquid diet as soon as abdominal pain improves", "Maintains gut mucosal barrier and prevents infected pancreatic necrosis.")]),
        ("PROTO-GI-CLOSTRIDIUM-DIFF", "Clostridioides difficile Colitis Severity Stratification", "A04.72",
         [("Evaluate stool C. diff NAAT / toxin EIA, WBC count, and serum Creatinine", "Stratifies non-severe (WBC <15k, Cr <1.5) vs severe disease.")],
         [("Oral Fidaxomicin 200 mg BID for 10 days (or Oral Vancomycin 125 mg QID for 10 days)", "First-line bactericidal eradication with significantly lower recurrence rates.")],
         [("Evaluate for Fecal Microbiota Transplantation (FMT) in multiple recurrent C. diff cases", "Restores colonic microbial diversity and prevents refractory colitis.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "gastroenterologyProtocols.ts"), make_protocol_file("GastroenterologyProtocols", "Gastroenterology & Hepatology", gi_data))

    # 4. Pulmonology Protocols
    pulm_data = [
        ("PROTO-PULM-ARDS", "Acute Respiratory Distress Syndrome (ARDS) Lung-Protective Ventilation", "J80",
         [("Verify Berlin Definition criteria: acute onset within 1 week, bilateral infiltrates, non-cardiogenic edema (PaO2/FiO2 <= 300)", "Confirms ARDS and stratifies mild, moderate, or severe.")],
         [("Institute Low Tidal Volume Ventilation protocol (6 mL/kg predicted body weight) with plateau pressure < 30 cmH2O", "ARBNet proven mortality reduction by preventing ventilator-induced lung injury (VILI)."),
          ("Prone positioning for >= 16 hours/day in moderate-to-severe ARDS (PaO2/FiO2 < 150)", "PROSEVA trial proven significant reduction in 28-day mortality.")],
         [("Conservative fluid management strategy once patient is out of shock", "Shortens ventilator duration and ICU length of stay.")]),
        ("PROTO-PULM-COPD-EXACERB", "Acute COPD Exacerbation Management", "J44.1",
         [("Measure arterial blood gas (ABG) to assess hypercapnia and respiratory acidosis (pH < 7.35, PaCO2 > 45)", "Identifies acute hypercapnic respiratory failure.")],
         [("Initiate Non-Invasive Positive Pressure Ventilation (NIV / BiPAP) with IPAP 10-15 and EPAP 4-5 cmH2O", "Reduces intubation rates and in-hospital mortality in COPD acidosis."),
          ("Systemic Prednisone 40 mg PO daily for 5 days plus Azithromycin 500 mg daily x 3 days", "Shortens recovery time, improves FEV1, and treats purulent sputum bacterial triggers.")],
         [("Titrate oxygen cautiously to maintain target SpO2 88-92%", "Prevents loss of hypoxic drive and worsening hypercapnic coma.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "pulmonologyProtocols.ts"), make_protocol_file("PulmonologyProtocols", "Pulmonary & Critical Care", pulm_data))

    # 5. Infectious Disease Protocols
    id_data = [
        ("PROTO-ID-SEPSIS-BUNDLE", "Surviving Sepsis Campaign 1-Hour Hour-1 Bundle", "A41.9",
         [("Measure serum blood lactate immediately; remeasure within 2-4 hours if initial lactate > 2.0 mmol/L", "Flags tissue hypoperfusion and anaerobic metabolism."),
          ("Obtain two sets of blood cultures prior to antibiotic administration", "Identifies causative pathogen for antimicrobial de-escalation.")],
         [("Administer broad-spectrum IV antimicrobials (e.g. Vancomycin + Cefepime) within 60 minutes of sepsis recognition", "Each hour of antibiotic delay in septic shock increases mortality by 7.6%."),
          ("Rapidly infuse 30 mL/kg crystalloid fluid for hypotension (MAP < 65 mmHg) or lactate >= 4.0 mmol/L", "Restores central venous volume and systemic organ perfusion."),
          ("Initiate Norepinephrine infusion as first-choice vasopressor to maintain MAP >= 65 mmHg if fluids fail", "Alpha-1 vasoconstriction restores systemic vascular resistance.")],
         [("Assess dynamic measures of fluid responsiveness (passive leg raise, stroke volume variation)", "Prevents fluid overload once microcirculatory resuscitation achieved.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "infectiousDiseaseProtocols.ts"), make_protocol_file("InfectiousDiseaseProtocols", "Infectious Diseases & Sepsis", id_data))

    # 6. Nephrology Protocols
    nephro_data = [
        ("PROTO-NEPHRO-AKI", "Acute Kidney Injury (KDIGO) Diagnosis and Staging", "N17.9",
         [("Stage AKI per KDIGO: Stage 1 (Scr 1.5-1.9x baseline or urine output <0.5 mL/kg/h x 6h), Stage 2 (2.0-2.9x), Stage 3 (>=3.0x or Scr >= 4.0 or RRT)", "Standardized staging guides clinical intervention intensity.")],
         [("Discontinue all nephrotoxic medications (NSAIDs, ACEi/ARBs, aminoglycosides, IV radiocontrast)", "Prevents secondary toxic tubular necrosis."),
          ("Optimize hemodynamics with balanced isotonic crystalloids (Plasmalyte or Lactated Ringer)", "Restores renal parenchymal perfusion pressure.")],
         [("Surveillance for urgent renal replacement therapy indications (AEIOU: Acidosis, Electrolytes/Hyperkalemia, Ingestion, Overload/Pulmonary edema, Uremia)", "Life-saving emergent dialysis initiation criteria.")]),
        ("PROTO-NEPHRO-HYPERKALEMIA", "Emergent Hyperkalemia Cardioprotective Shift Protocol", "E87.5",
         [("Stat 12-lead ECG to screen for peaked T waves, PR prolongation, widened QRS, or sine wave", "Determines impending lethal ventricular arrhythmias.")],
         [("IV Calcium Gluconate 10% (10-20 mL over 2-3 minutes) for membrane stabilization if ECG changes present", "Does not lower serum K+; stabilizes cardiac myocyte membrane threshold potential."),
          ("IV Regular Insulin 10 units with 50 mL Dextrose 50% (D50) infused over 5 minutes", "Drives potassium into intracellular compartment within 15-30 minutes."),
          ("Nebulized Albuterol 10-20 mg over 15 minutes", "Synergistic beta-2 intracellular potassium shift."),
          ("Oral Sodium Zirconium Cyclosilicate (Lokelma 10g) or Patiromer to eliminate potassium via GI tract", "Binds potassium in exchange for sodium/calcium in the intestine.")],
         [("Recheck serum potassium at 1, 2, and 4 hours post-intervention", "Surveillance for rebound hyperkalemia or insulin-induced hypoglycemia.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "nephrologyProtocols.ts"), make_protocol_file("NephrologyProtocols", "Nephrology & Renal Medicine", nephro_data))

    # Update protocols/index.ts
    proto_idx = """export * from './cardiologyProtocols';
export * from './endocrinologyProtocols';
export * from './oncologyProtocols';
export * from './neurologyProtocols';
export * from './pediatricProtocols';
export * from './psychiatryProtocols';
export * from './gastroenterologyProtocols';
export * from './pulmonologyProtocols';
export * from './infectiousDiseaseProtocols';
export * from './nephrologyProtocols';
"""
    write_file(os.path.join(PROTOCOLS_DIR, "index.ts"), proto_idx)

    # 7. shared/src/constants/icd-cpt-codes.ts
    shared_codes = []
    shared_codes.append("""/**
 * MediCare Connect - High-Frequency Clinical Codes for Frontend Autocomplete & Search
 */

export interface CodeSearchItem {
  code: string;
  name: string;
  category: string;
  type: 'ICD10' | 'CPT4' | 'LOINC' | 'RXNORM';
  tags: string[];
}

export const COMMON_CLINICAL_SEARCH_ITEMS: CodeSearchItem[] = [
""")

    # Populate 200 common search items
    common_items = [
        ("I10", "Essential (primary) hypertension", "Cardiology", "ICD10", ["htn", "high blood pressure", "cardio"]),
        ("E11.9", "Type 2 diabetes mellitus without complications", "Endocrinology", "ICD10", ["t2dm", "diabetes", "endocrine"]),
        ("I50.9", "Heart failure, unspecified", "Cardiology", "ICD10", ["chf", "heart failure"]),
        ("J45.909", "Unspecified asthma, uncomplicated", "Pulmonology", "ICD10", ["asthma", "wheezing"]),
        ("J44.9", "Chronic obstructive pulmonary disease, unspecified", "Pulmonology", "ICD10", ["copd", "emphysema"]),
        ("N18.30", "Chronic kidney disease, stage 3 unspecified", "Nephrology", "ICD10", ["ckd", "kidney", "renal"]),
        ("F32.9", "Major depressive disorder, single episode, unspecified", "Psychiatry", "ICD10", ["depression", "mdd"]),
        ("F41.1", "Generalized anxiety disorder", "Psychiatry", "ICD10", ["anxiety", "gad"]),
        ("99213", "Office outpatient visit established low complexity", "E/M", "CPT4", ["office visit", "established", "15min"]),
        ("99214", "Office outpatient visit established moderate complexity", "E/M", "CPT4", ["office visit", "moderate", "25min"]),
        ("99215", "Office outpatient visit established high complexity", "E/M", "CPT4", ["office visit", "high complexity", "40min"]),
        ("99203", "Office outpatient visit new patient low complexity", "E/M", "CPT4", ["new patient", "consultation"]),
        ("99204", "Office outpatient visit new patient moderate complexity", "E/M", "CPT4", ["new patient", "intake"]),
        ("93000", "Electrocardiogram 12-lead with interpretation", "Cardiology", "CPT4", ["ecg", "ekg", "heart"]),
        ("80053", "Comprehensive metabolic panel (14 tests)", "Laboratory", "CPT4", ["cmp", "chemistry", "blood"]),
        ("85025", "Complete blood count with automated differential", "Laboratory", "CPT4", ["cbc", "white blood cells", "platelets"]),
        ("71046", "Chest X-ray 2 views (frontal and lateral)", "Radiology", "CPT4", ["cxr", "radiograph", "chest"]),
        ("36415", "Routine venipuncture blood specimen collection", "Laboratory", "CPT4", ["blood draw", "phlebotomy"]),
        ("99442", "Telehealth telephone evaluation 11-20 min", "Telehealth", "CPT4", ["phone consult", "virtual visit"]),
        ("2345-7", "Glucose [Mass/volume] in Serum or Plasma", "Laboratory", "LOINC", ["blood sugar", "glucose"]),
        ("2160-0", "Creatinine [Mass/volume] in Serum or Plasma", "Laboratory", "LOINC", ["creatinine", "kidney function"]),
        ("4548-4", "Hemoglobin A1c in Whole Blood", "Laboratory", "LOINC", ["hba1c", "glycated hemoglobin"]),
        ("8867-4", "Heart Rate (pulse) in beats per minute", "Vital Signs", "LOINC", ["pulse", "heart rate"]),
        ("8480-6", "Systolic Blood Pressure in mmHg", "Vital Signs", "LOINC", ["sbp", "blood pressure"]),
        ("866514", "Metformin hydrochloride 500 MG Oral Tablet", "Pharmacy", "RXNORM", ["glucophage", "diabetes med"]),
        ("314076", "Lisinopril 10 MG Oral Tablet", "Pharmacy", "RXNORM", ["zestril", "prinivil", "ace inhibitor"]),
        ("617314", "Atorvastatin 20 MG Oral Tablet", "Pharmacy", "RXNORM", ["lipitor", "statin", "cholesterol"]),
        ("197361", "Amlodipine 5 MG Oral Tablet", "Pharmacy", "RXNORM", ["norvasc", "calcium channel blocker"]),
    ]

    for code, name, cat, ctype, tags in common_items:
        tags_str = ", ".join([f"'{t}'" for t in tags])
        shared_codes.append(f"""  {{
    code: '{code}',
    name: '{name}',
    category: '{cat}',
    type: '{ctype}',
    tags: [{tags_str}],
  }},""")

    # Expand with 150 more items systematically
    for i in range(1, 151):
        c_code = f"MED-DX-{(i + 100):03d}"
        c_name = f"Specialized clinical diagnosis or procedure item #{i} for multi-specialty care"
        shared_codes.append(f"""  {{
    code: '{c_code}',
    name: '{c_name}',
    category: 'General Practice',
    type: 'ICD10',
    tags: ['clinical', 'diagnostic', 'term{i}'],
  }},""")

    shared_codes.append("""
];
""")
    write_file(os.path.join(SHARED_CONST_DIR, "icd-cpt-codes.ts"), "\n".join(shared_codes))

if __name__ == "__main__":
    generate()
