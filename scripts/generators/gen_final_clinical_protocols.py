#!/usr/bin/env python3
"""
Generator for Final Specialty Clinical Protocols:
- backend/src/clinical/protocols/rheumatologyProtocols.ts
- backend/src/clinical/protocols/dermatologyProtocols.ts
- backend/src/clinical/protocols/obstetricsProtocols.ts
- backend/src/clinical/protocols/ophthalmologyProtocols.ts
- backend/src/clinical/protocols/geriatricsProtocols.ts
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
    def make_protocol_file(class_name, specialty_name, protocols_data):
        lines = []
        lines.append(f"""/**
 * MediCare Connect - Specialty Clinical Protocols: {specialty_name}
 * Standards: Evidence-Based Clinical Guidelines
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
      targetPopulation: 'Patients diagnosed with {p_name}.',
      exclusionCriteria: ['Terminal hospice palliative care', 'Contraindications to first-line agents'],
      initialEvaluationSteps: [""")
            for idx, (action, rat) in enumerate(eval_steps, 1):
                lines.append(f"""        {{
          stepNumber: {idx},
          phase: 'Diagnostic & Laboratory Evaluation',
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
          phase: 'Clinical Surveillance & Follow-up',
          action: '{action}',
          evidenceClass: 'I',
          levelOfEvidence: 'B-R',
          rationale: '{rat}'
        }},""")
            lines.append(f"""      ],
      hospitalizationCriteria: [
        'Acute sight, limb, or life-threatening organ complication',
        'Severe toxicity from immunosuppressive or biological agents',
        'Intractable pain or metabolic instability'
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

    # 1. Rheumatology
    rheum_data = [
        ("PROTO-RHEUM-RA", "Rheumatoid Arthritis Treat-to-Target Protocol", "M06.9",
         [("Calculate CDAI (Clinical Disease Activity Index) / DAS28 score, check anti-CCP and RF titers", "Quantifies inflammatory synovitis and seropositivity."),
          ("Baseline CBC, CMP, hepatitis B/C serologies, and QuantiFERON-TB Gold screening", "Screens for latent infections prior to initiating DMARDs or biologics.")],
         [("Initiate Methotrexate 15 mg/week orally + Folic Acid 1 mg daily; titrate to 25 mg/week", "Anchor disease-modifying antirheumatic drug (csDMARD) to halt erosive joint destruction."),
          ("Add TNF-alpha inhibitor (Adalimumab 40 mg SQ biweekly) or JAK inhibitor if active disease at 3-6 months", "Advanced biological therapy for rapid remission.")],
         [("Evaluate CDAI every 1-3 months with goal of low disease activity or remission (CDAI <= 2.8)", "Treat-to-target strategy proven to prevent long-term functional disability.")]),
        ("PROTO-RHEUM-SLE", "Systemic Lupus Erythematosus (SLE) & Lupus Nephritis", "M32.9",
         [("Check ANA, anti-dsDNA, anti-Smith, complement C3/C4 levels, and spot urine protein/creatinine ratio", "Monitors systemic immunological activity and renal involvement.")],
         [("Hydroxychloroquine 5 mg/kg actual body weight daily (max 400 mg/day) for ALL patients", "Decreases flare rates, reduces thrombotic risk, and improves overall survival."),
          ("Mycophenolate Mofetil 2-3g/day or IV Cyclophosphamide for active biopsy-proven Class III/IV Lupus Nephritis", "Induction therapy to preserve renal nephron mass.")],
         [("Annual baseline and periodic comprehensive dilated ophthalmologic exam with visual field testing", "Surveillance for hydroxychloroquine maculopathy / retinal toxicity.")]),
        ("PROTO-RHEUM-GOUT", "Acute Gout Flare & Urate Lowering Therapy (ULT)", "M10.9",
         [("Serum uric acid measurement and polarized light microscopy for needle-shaped negative birefringent crystals", "Definitive diagnosis of monosodium urate crystal arthritis.")],
         [("Initiate low-dose Colchicine (1.2 mg stat followed by 0.6 mg 1h later) or oral Prednisone 35 mg/day x 5 days", "Rapid reduction of neutrophil activation and IL-1beta inflammatory cascade."),
          ("Initiate Allopurinol 100 mg daily (titrate up to target uric acid < 6.0 mg/dL) with anti-inflammatory prophylaxis", "Prevents tophus formation and recurrent crystal-induced arthritis.")],
         [("Check serum uric acid every 2-4 weeks during allopurinol dose titration until target achieved", "Confirms adequate xanthine oxidase inhibition.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "rheumatologyProtocols.ts"), make_protocol_file("RheumatologyProtocols", "Rheumatology & Autoimmune Diseases", rheum_data))

    # 2. Dermatology
    derm_data = [
        ("PROTO-DERM-PSORIASIS", "Moderate-to-Severe Plaque Psoriasis Management", "L40.0",
         [("Calculate Psoriasis Area and Severity Index (PASI) and Body Surface Area (BSA) involvement", "Stratifies mild (<3% BSA) vs moderate-to-severe (>10% BSA) psoriasis.")],
         [("Initiate IL-23 inhibitor (Risankizumab 150 mg SQ) or IL-17 inhibitor (Secukinumab 300 mg SQ)", "Targeted cytokine biologics achieving PASI 90 and PASI 100 skin clearance."),
          ("Adjunctive high-potency topical corticosteroid (Clobetasol 0.05%) with Calcipotriene ointment", "Provides immediate local symptomatic plaque thinning.")],
         [("Periodic screening for psoriatic arthritis with PEST questionnaire and cardiovascular risk factor optimization", "Manages systemic psoriatic comorbidities.")]),
        ("PROTO-DERM-MELANOMA", "Cutaneous Melanoma Staging & Excision Protocol", "C43.9",
         [("Complete full-body dermoscopy, excisional punch/elliptical biopsy with 1-2 mm margins", "Provides accurate histological Breslow depth and ulceration status.")],
         [("Wide local excision with surgical margins based on Breslow depth (1 cm for <1 mm; 2 cm for >2 mm)", "Prevents local recurrence."),
          ("Sentinel lymph node biopsy (SLNB) for melanomas with Breslow depth >= 0.8 mm or with ulceration", "Accurately stages microscopic nodal metastasis.")],
         [("Routine total body skin examinations every 3-6 months for 5 years post-diagnosis", "Detects second primary melanomas and in-transit recurrence.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "dermatologyProtocols.ts"), make_protocol_file("DermatologyProtocols", "Dermatology & Skin Disorders", derm_data))

    # 3. Obstetrics
    ob_data = [
        ("PROTO-OB-PREECLAMPSIA", "Severe Preeclampsia & Eclampsia Magnesium Sulfate Protocol", "O14.10",
         [("Verify diagnostic criteria: BP >= 160/110 mmHg on 2 occasions 4h apart with severe features (headache, vision changes, platelets <100k, Cr >1.1)", "Identifies severe preeclampsia requiring immediate seizure prophylaxis.")],
         [("IV Magnesium Sulfate 4g to 6g loading dose over 20 minutes followed by 2g/hr continuous IV maintenance infusion", "First-line neuroprotection to prevent maternal eclamptic convulsions."),
          ("IV Hydralazine 5-10 mg or IV Labetalol 20-40 mg to maintain SBP 140-150 mmHg and DBP 90-100 mmHg", "Prevents acute maternal hemorrhagic stroke.")],
         [("Hourly monitoring of patellar deep tendon reflexes, respiratory rate (>12 bpm), and urine output (>30 mL/hr)", "Screens for magnesium toxicity; maintain IV Calcium Gluconate at bedside as antidote.")]),
        ("PROTO-OB-PPH", "Postpartum Hemorrhage (PPH) Resuscitation Protocol", "O72.1",
         [("Quantify cumulative blood loss (QBL) (>500 mL post-vaginal delivery or >1000 mL post-cesarean)", "Early trigger for active maternal hemorrhage bundle.")],
         [("Bimanual uterine massage plus Oxytocin 20-40 units in 1000 mL normal saline IV infusion", "First-line uterotonic for uterine atony (the cause of 80% of PPH)."),
          ("Second-line uterotonics: Methylergonovine 0.2 mg IM (if not hypertensive) or Misoprostol 800 mcg PR", "Rapid sustained myometrial contraction.")],
         [("Tranexamic Acid (TXA) 1g IV within 3 hours of delivery for refractory hemorrhage", "WOMAN trial proven reduction in maternal mortality from bleeding.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "obstetricsProtocols.ts"), make_protocol_file("ObstetricsProtocols", "Obstetrics & Maternal-Fetal Medicine", ob_data))

    # 4. Ophthalmology
    oph_data = [
        ("PROTO-OPH-ACUTE-GLAUCOMA", "Acute Angle-Closure Glaucoma Emergency", "H40.20X0",
         [("Stat intraocular pressure (IOP) tonometry measurement (typically > 40-50 mmHg) and slit-lamp exam", "Confirms ocular emergency and shallow anterior chamber.")],
         [("Administer combination eye drops: Timolol 0.5% + Apraclonidine 1% + Pilocarpine 2% each 1 drop 1 min apart", "Reduces aqueous humor production and induces pupillary miosis."),
          ("IV Acetazolamide 500 mg stat plus IV Mannitol 1-2 g/kg if IOP > 50 mmHg", "Rapid osmotic dehydration of the vitreous body.")],
         [("Urgent ophthalmology consult for definitive laser peripheral iridotomy (LPI)", "Creates permanent bypass channel for aqueous humor outflow.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "ophthalmologyProtocols.ts"), make_protocol_file("OphthalmologyProtocols", "Ophthalmology & Eye Care", oph_data))

    # 5. Geriatrics
    geri_data = [
        ("PROTO-GERI-DELIRIUM", "Acute Delirium in the Elderly (CAM Algorithm)", "F05",
         [("Administer Confusion Assessment Method (CAM): acute onset/fluctuation, inattention, plus either disorganized thinking or altered level of consciousness", "Validates presence of acute delirium vs baseline dementia.")],
         [("Identify and treat underlying precipitating trigger (Infection/UTI, Dehydration, Drug toxicity, Constipation, Pain)", "Addressing underlying medical etiologies resolves delirium."),
          ("Deprescribe anticholinergic and sedative-hypnotic medications per Beers Criteria", "Eliminates iatrogenic neurocognitive impairment.")],
         [("Implement non-pharmacological delirium bundle: frequent reorientation, family presence, sleep hygiene, early mobility", "Proven reduction in delirium duration without antipsychotic harm.")]),
    ]
    write_file(os.path.join(PROTOCOLS_DIR, "geriatricsProtocols.ts"), make_protocol_file("GeriatricsProtocols", "Geriatric Medicine & Elder Care", geri_data))

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
export * from './rheumatologyProtocols';
export * from './dermatologyProtocols';
export * from './obstetricsProtocols';
export * from './ophthalmologyProtocols';
export * from './geriatricsProtocols';
"""
    write_file(os.path.join(PROTOCOLS_DIR, "index.ts"), proto_idx)

if __name__ == "__main__":
    generate()
