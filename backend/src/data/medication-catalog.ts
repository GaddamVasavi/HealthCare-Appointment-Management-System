export interface IMedicationEntry {
  id: string;
  genericName: string;
  brandNames: string[];
  category: string;
  subcategory: string;
  class: string;
  dosageForms: string[];
  strengths: string[];
  route: string;
  schedule: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  blackBoxWarning: string;
  pregnancyCategory: string;
  isControlled: boolean;
  requiresPrescription: boolean;
  halfLife: string;
  onsetOfAction: string;
}

export const medicationCatalog: IMedicationEntry[] = [
  {
    id: 'MED-001',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'Cardiovascular Agents',
    subcategory: 'Antihyperlipidemics',
    class: 'HMG-CoA Reductase Inhibitor',
    dosageForms: ['Tablet'],
    strengths: ['10 mg', '20 mg', '40 mg', '80 mg'],
    route: 'Oral',
    schedule: 'Rx',
    indications: ['Hyperlipidemia', 'Prevention of cardiovascular disease'],
    contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding'],
    sideEffects: ['Myalgia', 'Diarrhea', 'Arthralgia', 'Nasopharyngitis'],
    interactions: ['Clarithromycin', 'Itraconazole', 'Grapefruit juice'],
    blackBoxWarning: 'None',
    pregnancyCategory: 'X',
    isControlled: false,
    requiresPrescription: true,
    halfLife: '14 hours',
    onsetOfAction: '3-5 days'
  },
  {
    id: 'MED-002',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    category: 'Cardiovascular Agents',
    subcategory: 'Antihypertensives',
    class: 'ACE Inhibitor',
    dosageForms: ['Tablet'],
    strengths: ['2.5 mg', '5 mg', '10 mg', '20 mg', '30 mg', '40 mg'],
    route: 'Oral',
    schedule: 'Rx',
    indications: ['Hypertension', 'Heart failure', 'Acute myocardial infarction'],
    contraindications: ['History of angioedema', 'Concurrent use with aliskiren in diabetics'],
    sideEffects: ['Cough', 'Dizziness', 'Headache', 'Hypotension'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium'],
    blackBoxWarning: 'Fetal toxicity. Discontinue as soon as pregnancy is detected.',
    pregnancyCategory: 'D',
    isControlled: false,
    requiresPrescription: true,
    halfLife: '12 hours',
    onsetOfAction: '1 hour'
  },
  {
    id: 'MED-003',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet', 'Glumetza'],
    category: 'Endocrine and Metabolic Agents',
    subcategory: 'Antidiabetic Agents',
    class: 'Biguanide',
    dosageForms: ['Tablet', 'Tablet Extended Release', 'Oral Solution'],
    strengths: ['500 mg', '850 mg', '1000 mg'],
    route: 'Oral',
    schedule: 'Rx',
    indications: ['Type 2 Diabetes Mellitus', 'Polycystic ovary syndrome (off-label)'],
    contraindications: ['Severe renal impairment (eGFR < 30)', 'Metabolic acidosis'],
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Flatulence', 'Asthenia'],
    interactions: ['Iodinated contrast media', 'Carbonic anhydrase inhibitors', 'Alcohol'],
    blackBoxWarning: 'Lactic acidosis. Risk increases with renal impairment, age, and radiological studies using intravascular iodinated contrast materials.',
    pregnancyCategory: 'B',
    isControlled: false,
    requiresPrescription: true,
    halfLife: '6.2 hours',
    onsetOfAction: 'Days to weeks for maximum effect'
  },
  {
    id: 'MED-004',
    genericName: 'Levothyroxine',
    brandNames: ['Synthroid', 'Levoxyl', 'Tirosint'],
    category: 'Endocrine and Metabolic Agents',
    subcategory: 'Thyroid Agents',
    class: 'Thyroid Hormone',
    dosageForms: ['Tablet', 'Capsule', 'Injection'],
    strengths: ['25 mcg', '50 mcg', '75 mcg', '88 mcg', '100 mcg', '112 mcg', '125 mcg', '137 mcg', '150 mcg', '175 mcg', '200 mcg'],
    route: 'Oral, Intravenous',
    schedule: 'Rx',
    indications: ['Hypothyroidism', 'Pituitary TSH suppression'],
    contraindications: ['Uncorrected adrenal insufficiency', 'Acute myocardial infarction'],
    sideEffects: ['Palpitations', 'Sweating', 'Weight loss', 'Nervousness'],
    interactions: ['Calcium carbonate', 'Iron supplements', 'Antacids'],
    blackBoxWarning: 'Not for treatment of obesity or for weight loss.',
    pregnancyCategory: 'A',
    isControlled: false,
    requiresPrescription: true,
    halfLife: '6-7 days',
    onsetOfAction: '3-5 days'
  },
  {
    id: 'MED-005',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Moxatag'],
    category: 'Anti-infectives',
    subcategory: 'Antibiotics',
    class: 'Penicillin',
    dosageForms: ['Capsule', 'Tablet', 'Chewable Tablet', 'Oral Suspension'],
    strengths: ['250 mg', '500 mg', '875 mg'],
    route: 'Oral',
    schedule: 'Rx',
    indications: ['Otitis media', 'Streptococcal pharyngitis', 'Pneumonia', 'Skin infections'],
    contraindications: ['History of severe hypersensitivity to penicillins'],
    sideEffects: ['Diarrhea', 'Nausea', 'Vomiting', 'Rash'],
    interactions: ['Probenecid', 'Oral contraceptives', 'Allopurinol'],
    blackBoxWarning: 'None',
    pregnancyCategory: 'B',
    isControlled: false,
    requiresPrescription: true,
    halfLife: '1 hour',
    onsetOfAction: '1-2 hours'
  }
];
