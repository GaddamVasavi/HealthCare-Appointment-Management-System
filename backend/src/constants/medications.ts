/**
 * @file medications.ts
 * @description Typed array of medications for the Healthcare Appointment Management System.
 */

export interface IMedication {
  id: string;
  genericName: string;
  brandNames: string[];
  category: string;
  subcategory: string;
  dosageForms: string[];
  strengths: string[];
  route: string;
  schedule: string;
  sideEffects: string[];
  contraindications: string[];
  interactions: string[];
  pregnancyCategory: string;
  isControlled: boolean;
  requiresPrescription: boolean;
}

export const MEDICATIONS: IMedication[] = [
  {
    id: 'MED001',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Moxatag'],
    category: 'Antibiotics',
    subcategory: 'Penicillins',
    dosageForms: ['Capsule', 'Tablet', 'Oral Suspension'],
    strengths: ['250mg', '500mg', '875mg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Nausea', 'Vomiting', 'Diarrhea', 'Rash'],
    contraindications: ['Penicillin allergy'],
    interactions: ['Probenecid', 'Oral contraceptives', 'Allopurinol'],
    pregnancyCategory: 'B',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED002',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    category: 'Antihypertensives',
    subcategory: 'ACE Inhibitors',
    dosageForms: ['Tablet'],
    strengths: ['5mg', '10mg', '20mg', '40mg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Hyperkalemia'],
    contraindications: ['History of angioedema', 'Pregnancy'],
    interactions: ['Potassium supplements', 'NSAIDs', 'Lithium'],
    pregnancyCategory: 'D',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED003',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet'],
    category: 'Antidiabetics',
    subcategory: 'Biguanides',
    dosageForms: ['Tablet', 'Extended Release Tablet'],
    strengths: ['500mg', '850mg', '1000mg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Diarrhea', 'Nausea', 'Stomach upset', 'Lactic acidosis'],
    contraindications: ['Severe renal impairment', 'Metabolic acidosis'],
    interactions: ['Iodinated contrast', 'Alcohol', 'Cimetidine'],
    pregnancyCategory: 'B',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED004',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'Cholesterol',
    subcategory: 'Statins',
    dosageForms: ['Tablet'],
    strengths: ['10mg', '20mg', '40mg', '80mg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Muscle pain', 'Liver enzyme elevation', 'Diarrhea'],
    contraindications: ['Active liver disease', 'Pregnancy', 'Breastfeeding'],
    interactions: ['Grapefruit juice', 'Clarithromycin', 'Itraconazole'],
    pregnancyCategory: 'X',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED005',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec'],
    category: 'GI medications',
    subcategory: 'Proton Pump Inhibitors',
    dosageForms: ['Capsule', 'Tablet'],
    strengths: ['10mg', '20mg', '40mg'],
    route: 'Oral',
    schedule: 'OTC/Rx',
    sideEffects: ['Headache', 'Abdominal pain', 'Nausea', 'Diarrhea'],
    contraindications: ['Hypersensitivity to PPIs'],
    interactions: ['Clopidogrel', 'Warfarin', 'Phenytoin'],
    pregnancyCategory: 'C',
    isControlled: false,
    requiresPrescription: false
  },
  {
    id: 'MED006',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin'],
    category: 'Analgesics',
    subcategory: 'NSAIDs',
    dosageForms: ['Tablet', 'Capsule', 'Liquid'],
    strengths: ['200mg', '400mg', '600mg', '800mg'],
    route: 'Oral',
    schedule: 'OTC/Rx',
    sideEffects: ['Stomach pain', 'Heartburn', 'Bleeding', 'Kidney damage'],
    contraindications: ['Active GI bleeding', 'History of CABG surgery'],
    interactions: ['Aspirin', 'Anticoagulants', 'ACE inhibitors'],
    pregnancyCategory: 'D (in 3rd trimester)',
    isControlled: false,
    requiresPrescription: false
  },
  {
    id: 'MED007',
    genericName: 'Sertraline',
    brandNames: ['Zoloft'],
    category: 'Antidepressants',
    subcategory: 'SSRIs',
    dosageForms: ['Tablet', 'Oral Solution'],
    strengths: ['25mg', '50mg', '100mg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction', 'Weight changes'],
    contraindications: ['Concurrent use of MAOIs'],
    interactions: ['Pimozide', 'Linezolid', 'St. John\'s Wort'],
    pregnancyCategory: 'C',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED008',
    genericName: 'Hydrocodone/Acetaminophen',
    brandNames: ['Vicodin', 'Norco', 'Lortab'],
    category: 'Analgesics',
    subcategory: 'Opioids',
    dosageForms: ['Tablet', 'Liquid'],
    strengths: ['5/325mg', '7.5/325mg', '10/325mg'],
    route: 'Oral',
    schedule: 'C-II',
    sideEffects: ['Drowsiness', 'Constipation', 'Nausea', 'Respiratory depression'],
    contraindications: ['Severe respiratory depression', 'Paralytic ileus'],
    interactions: ['Alcohol', 'Benzodiazepines', 'Other CNS depressants'],
    pregnancyCategory: 'C',
    isControlled: true,
    requiresPrescription: true
  },
  {
    id: 'MED009',
    genericName: 'Levothyroxine',
    brandNames: ['Synthroid', 'Levoxyl'],
    category: 'Thyroid medications',
    subcategory: 'Thyroid Hormones',
    dosageForms: ['Tablet'],
    strengths: ['25mcg', '50mcg', '75mcg', '100mcg', '125mcg'],
    route: 'Oral',
    schedule: 'Rx',
    sideEffects: ['Palpitations', 'Weight loss', 'Insomnia', 'Heat intolerance'],
    contraindications: ['Uncorrected adrenal insufficiency', 'Acute MI'],
    interactions: ['Iron supplements', 'Calcium supplements', 'Antacids'],
    pregnancyCategory: 'A',
    isControlled: false,
    requiresPrescription: true
  },
  {
    id: 'MED010',
    genericName: 'Albuterol',
    brandNames: ['ProAir HFA', 'Ventolin HFA'],
    category: 'Bronchodilators',
    subcategory: 'SABAs',
    dosageForms: ['Inhaler', 'Nebulizer Solution'],
    strengths: ['90mcg/actuation', '2.5mg/3mL'],
    route: 'Inhalation',
    schedule: 'Rx',
    sideEffects: ['Tremor', 'Tachycardia', 'Nervousness', 'Headache'],
    contraindications: ['Hypersensitivity to albuterol'],
    interactions: ['Beta-blockers', 'MAOIs', 'Tricyclic antidepressants'],
    pregnancyCategory: 'C',
    isControlled: false,
    requiresPrescription: true
  }
];
