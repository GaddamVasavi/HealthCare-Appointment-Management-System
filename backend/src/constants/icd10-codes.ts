/**
 * @file icd10-codes.ts
 * @description Comprehensive typed array of ICD-10 diagnostic codes.
 * This file has been expanded to include a broad spectrum of medical conditions.
 */

export interface IICD10Code {
  code: string;
  description: string;
  category: string;
  subcategory: string;
  isCommon: boolean;
  bodySystem: string;
}

export const ICD10_CODES: IICD10Code[] = [
  {
    code: 'A00.0',
    description: 'Cholera due to Vibrio cholerae 01, biovar cholerae',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: false,
    bodySystem: 'Digestive'
  },
  {
    code: 'A00.1',
    description: 'Cholera due to Vibrio cholerae 01, biovar eltor',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: false,
    bodySystem: 'Digestive'
  },
  {
    code: 'A01.00',
    description: 'Typhoid fever, unspecified',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: false,
    bodySystem: 'Systemic'
  },
  {
    code: 'A02.0',
    description: 'Salmonella enteritis',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: true,
    bodySystem: 'Digestive'
  },
  {
    code: 'A04.4',
    description: 'Other intestinal Escherichia coli infections',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: true,
    bodySystem: 'Digestive'
  },
  {
    code: 'A08.4',
    description: 'Viral intestinal infection, unspecified',
    category: 'Infectious',
    subcategory: 'Intestinal infectious diseases',
    isCommon: true,
    bodySystem: 'Digestive'
  },
  {
    code: 'B01.9',
    description: 'Varicella without complication',
    category: 'Infectious',
    subcategory: 'Viral infections',
    isCommon: true,
    bodySystem: 'Systemic'
  },
  {
    code: 'B02.9',
    description: 'Zoster without complications',
    category: 'Infectious',
    subcategory: 'Viral infections',
    isCommon: true,
    bodySystem: 'Nervous'
  },
  {
    code: 'B20',
    description: 'Human immunodeficiency virus [HIV] disease',
    category: 'Infectious',
    subcategory: 'Viral infections',
    isCommon: false,
    bodySystem: 'Immune'
  },
  {
    code: 'B35.1',
    description: 'Tinea unguium',
    category: 'Infectious',
    subcategory: 'Mycoses',
    isCommon: true,
    bodySystem: 'Integumentary'
  },
  {
    code: 'C18.9',
    description: 'Malignant neoplasm of colon, unspecified',
    category: 'Neoplasms',
    subcategory: 'Digestive organs',
    isCommon: false,
    bodySystem: 'Digestive'
  },
  {
    code: 'C34.90',
    description: 'Malignant neoplasm of unspecified part of unspecified bronchus or lung',
    category: 'Neoplasms',
    subcategory: 'Respiratory organs',
    isCommon: false,
    bodySystem: 'Respiratory'
  },
  {
    code: 'C50.919',
    description: 'Malignant neoplasm of unspecified site of unspecified female breast',
    category: 'Neoplasms',
    subcategory: 'Breast',
    isCommon: true,
    bodySystem: 'Reproductive'
  },
  {
    code: 'C61',
    description: 'Malignant neoplasm of prostate',
    category: 'Neoplasms',
    subcategory: 'Male genital organs',
    isCommon: true,
    bodySystem: 'Reproductive'
  },
  {
    code: 'D03.9',
    description: 'Melanoma in situ, unspecified',
    category: 'Neoplasms',
    subcategory: 'In situ neoplasms',
    isCommon: true,
    bodySystem: 'Skin'
  },
  {
    code: 'D50.9',
    description: 'Iron deficiency anemia, unspecified',
    category: 'Blood',
    subcategory: 'Nutritional anemias',
    isCommon: true,
    bodySystem: 'Blood'
  },
  {
    code: 'D64.9',
    description: 'Anemia, unspecified',
    category: 'Blood',
    subcategory: 'Aplastic and other anemias',
    isCommon: true,
    bodySystem: 'Blood'
  },
  {
    code: 'E03.9',
    description: 'Hypothyroidism, unspecified',
    category: 'Endocrine',
    subcategory: 'Thyroid',
    isCommon: true,
    bodySystem: 'Endocrine'
  },
  {
    code: 'E11.9',
    description: 'Type 2 diabetes mellitus without complications',
    category: 'Endocrine',
    subcategory: 'Diabetes',
    isCommon: true,
    bodySystem: 'Endocrine'
  },
  {
    code: 'E66.9',
    description: 'Obesity, unspecified',
    category: 'Endocrine',
    subcategory: 'Metabolic',
    isCommon: true,
    bodySystem: 'Metabolic'
  },
  {
    code: 'E78.5',
    description: 'Hyperlipidemia, unspecified',
    category: 'Endocrine',
    subcategory: 'Metabolic',
    isCommon: true,
    bodySystem: 'Metabolic'
  },
  {
    code: 'F32.9',
    description: 'Major depressive disorder, single episode, unspecified',
    category: 'Mental Health',
    subcategory: 'Mood disorders',
    isCommon: true,
    bodySystem: 'Nervous'
  },
  {
    code: 'F41.1',
    description: 'Generalized anxiety disorder',
    category: 'Mental Health',
    subcategory: 'Anxiety',
    isCommon: true,
    bodySystem: 'Nervous'
  },
  {
    code: 'G20',
    description: 'Parkinson\'s disease',
    category: 'Nervous system',
    subcategory: 'Movement disorders',
    isCommon: false,
    bodySystem: 'Nervous'
  },
  {
    code: 'G30.9',
    description: 'Alzheimer\'s disease, unspecified',
    category: 'Nervous system',
    subcategory: 'Degenerative',
    isCommon: false,
    bodySystem: 'Nervous'
  },
  {
    code: 'G43.909',
    description: 'Migraine, unspecified',
    category: 'Nervous system',
    subcategory: 'Episodic',
    isCommon: true,
    bodySystem: 'Nervous'
  },
  {
    code: 'H10.9',
    description: 'Unspecified conjunctivitis',
    category: 'Eye/Ear',
    subcategory: 'Eye',
    isCommon: true,
    bodySystem: 'Eye'
  },
  {
    code: 'H25.9',
    description: 'Unspecified age-related cataract',
    category: 'Eye/Ear',
    subcategory: 'Lens',
    isCommon: true,
    bodySystem: 'Eye'
  },
  {
    code: 'I10',
    description: 'Essential (primary) hypertension',
    category: 'Circulatory',
    subcategory: 'Hypertensive',
    isCommon: true,
    bodySystem: 'Cardiovascular'
  },
  {
    code: 'I21.9',
    description: 'Acute myocardial infarction, unspecified',
    category: 'Circulatory',
    subcategory: 'Ischemic',
    isCommon: false,
    bodySystem: 'Cardiovascular'
  },
  {
    code: 'I48.91',
    description: 'Unspecified atrial fibrillation',
    category: 'Circulatory',
    subcategory: 'Arrhythmias',
    isCommon: true,
    bodySystem: 'Cardiovascular'
  },
  {
    code: 'I50.9',
    description: 'Heart failure, unspecified',
    category: 'Circulatory',
    subcategory: 'Heart failure',
    isCommon: true,
    bodySystem: 'Cardiovascular'
  },
  {
    code: 'J02.9',
    description: 'Acute pharyngitis, unspecified',
    category: 'Respiratory',
    subcategory: 'Upper respiratory',
    isCommon: true,
    bodySystem: 'Respiratory'
  },
  {
    code: 'J44.9',
    description: 'Chronic obstructive pulmonary disease, unspecified',
    category: 'Respiratory',
    subcategory: 'Lower respiratory',
    isCommon: true,
    bodySystem: 'Respiratory'
  },
  {
    code: 'J45.909',
    description: 'Unspecified asthma, uncomplicated',
    category: 'Respiratory',
    subcategory: 'Lower respiratory',
    isCommon: true,
    bodySystem: 'Respiratory'
  },
  {
    code: 'K21.9',
    description: 'Gastro-esophageal reflux disease without esophagitis',
    category: 'Digestive',
    subcategory: 'Esophagus',
    isCommon: true,
    bodySystem: 'Digestive'
  },
  {
    code: 'K35.80',
    description: 'Unspecified acute appendicitis',
    category: 'Digestive',
    subcategory: 'Appendix',
    isCommon: false,
    bodySystem: 'Digestive'
  },
  {
    code: 'L20.9',
    description: 'Atopic dermatitis, unspecified',
    category: 'Skin',
    subcategory: 'Dermatitis',
    isCommon: true,
    bodySystem: 'Integumentary'
  },
  {
    code: 'L70.0',
    description: 'Acne vulgaris',
    category: 'Skin',
    subcategory: 'Follicular',
    isCommon: true,
    bodySystem: 'Integumentary'
  },
  {
    code: 'M19.90',
    description: 'Unspecified osteoarthritis, unspecified site',
    category: 'Musculoskeletal',
    subcategory: 'Arthropathies',
    isCommon: true,
    bodySystem: 'Musculoskeletal'
  },
  {
    code: 'M54.5',
    description: 'Low back pain',
    category: 'Musculoskeletal',
    subcategory: 'Dorsopathies',
    isCommon: true,
    bodySystem: 'Musculoskeletal'
  },
  {
    code: 'N17.9',
    description: 'Acute kidney failure, unspecified',
    category: 'Genitourinary',
    subcategory: 'Renal',
    isCommon: false,
    bodySystem: 'Urinary'
  },
  {
    code: 'N39.0',
    description: 'Urinary tract infection, site not specified',
    category: 'Genitourinary',
    subcategory: 'Urinary',
    isCommon: true,
    bodySystem: 'Urinary'
  },
  {
    code: 'O20.0',
    description: 'Threatened abortion',
    category: 'Pregnancy',
    subcategory: 'Maternal',
    isCommon: false,
    bodySystem: 'Reproductive'
  },
  {
    code: 'R07.9',
    description: 'Chest pain, unspecified',
    category: 'Symptoms/Signs',
    subcategory: 'General',
    isCommon: true,
    bodySystem: 'Systemic'
  },
  {
    code: 'R50.9',
    description: 'Fever, unspecified',
    category: 'Symptoms/Signs',
    subcategory: 'General',
    isCommon: true,
    bodySystem: 'Systemic'
  },
  {
    code: 'S02.91XA',
    description: 'Unspecified fracture of skull, initial encounter for closed fracture',
    category: 'Injury',
    subcategory: 'Head',
    isCommon: false,
    bodySystem: 'Skeletal'
  },
  {
    code: 'T14.90',
    description: 'Injury, unspecified',
    category: 'Injury',
    subcategory: 'General',
    isCommon: true,
    bodySystem: 'Systemic'
  },
  {
    code: 'Z00.00',
    description: 'Encounter for general adult medical examination without abnormal findings',
    category: 'Factors',
    subcategory: 'Examinations',
    isCommon: true,
    bodySystem: 'General'
  },
  {
    code: 'Z01.419',
    description: 'Encounter for gynecological examination (general) (routine) without abnormal findings',
    category: 'Factors',
    subcategory: 'Examinations',
    isCommon: true,
    bodySystem: 'General'
  }
];
