export interface IICD10Entry {
  code: string;
  description: string;
  category: string;
  subcategory: string;
  isCommon: boolean;
  bodySystem: string;
  relatedCodes: string[];
  excludes: string[];
  notes: string;
}

export const icd10Catalog: IICD10Entry[] = [
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    category: 'Endocrine, nutritional and metabolic diseases',
    subcategory: 'Diabetes mellitus',
    isCommon: true,
    bodySystem: 'Endocrine',
    relatedCodes: ['E11.65', 'E11.21', 'E11.40'],
    excludes: ['E10.9 (Type 1 diabetes mellitus)'],
    notes: 'Use additional code to identify control using insulin, oral antidiabetic drugs, or injectable non-insulin antidiabetic drugs.'
  },
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    category: 'Diseases of the circulatory system',
    subcategory: 'Hypertensive diseases',
    isCommon: true,
    bodySystem: 'Cardiovascular',
    relatedCodes: ['I11.9', 'I15.9'],
    excludes: ['I11 (Hypertensive heart disease)', 'I12 (Hypertensive chronic kidney disease)'],
    notes: 'Includes high blood pressure without an identified cause.'
  },
  {
    code: 'J45.909',
    description: 'Unspecified asthma, uncomplicated',
    category: 'Diseases of the respiratory system',
    subcategory: 'Chronic lower respiratory diseases',
    isCommon: true,
    bodySystem: 'Respiratory',
    relatedCodes: ['J45.20', 'J45.30', 'J45.40'],
    excludes: ['J44.9 (Chronic obstructive pulmonary disease, unspecified)'],
    notes: 'Asthma NOS, late-onset asthma.'
  },
  {
    code: 'K21.9',
    description: 'Gastro-esophageal reflux disease without esophagitis',
    category: 'Diseases of the digestive system',
    subcategory: 'Diseases of esophagus, stomach and duodenum',
    isCommon: true,
    bodySystem: 'Digestive',
    relatedCodes: ['K21.0'],
    excludes: ['K21.0 (Gastro-esophageal reflux disease with esophagitis)'],
    notes: 'Commonly known as GERD or acid reflux without evidence of esophageal mucosal injury.'
  },
  {
    code: 'M54.5',
    description: 'Low back pain',
    category: 'Diseases of the musculoskeletal system and connective tissue',
    subcategory: 'Other dorsopathies',
    isCommon: true,
    bodySystem: 'Musculoskeletal',
    relatedCodes: ['M54.4', 'M54.16'],
    excludes: ['S39.012 (Strain of muscle, fascia and tendon of lower back)', 'M51.26 (Other intervertebral disc displacement, lumbar region)'],
    notes: 'Loin pain, lumbago NOS.'
  },
  {
    code: 'N18.3',
    description: 'Chronic kidney disease, stage 3 (moderate)',
    category: 'Diseases of the genitourinary system',
    subcategory: 'Renal tubulo-interstitial diseases',
    isCommon: true,
    bodySystem: 'Genitourinary',
    relatedCodes: ['N18.1', 'N18.2', 'N18.4', 'N18.5', 'N18.6'],
    excludes: ['N18.9 (Chronic kidney disease, unspecified)'],
    notes: 'eGFR between 30 and 59 mL/min/1.73 m2.'
  }
];
