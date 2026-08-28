export interface ICPTCode {
  code: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory: string;
  rvuWork: number;
  rvuPractice: number;
  rvuMalpractice: number;
  baseCost: number;
  duration: number;
  requiresAnesthesia: boolean;
  requiresConsent: boolean;
  bodySystem: string;
  commonDiagnoses: string[];
  modifiers: string[];
}

export const cptCodesCatalog: ICPTCode[] = [
  {
    code: '99213',
    shortDescription: 'Office/outpatient visit est',
    longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and low level of medical decision making. When using time for code selection, 20-29 minutes of total time is spent on the date of the encounter.',
    category: 'Evaluation and Management',
    subcategory: 'Office or Other Outpatient Services',
    rvuWork: 1.30,
    rvuPractice: 1.39,
    rvuMalpractice: 0.09,
    baseCost: 95.00,
    duration: 20,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Multisystem',
    commonDiagnoses: ['J01.90', 'J45.909', 'I10', 'E11.9'],
    modifiers: ['25', '95', 'GT']
  },
  {
    code: '99214',
    shortDescription: 'Office/outpatient visit est',
    longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, which requires a medically appropriate history and/or examination and moderate level of medical decision making. When using time for code selection, 30-39 minutes of total time is spent on the date of the encounter.',
    category: 'Evaluation and Management',
    subcategory: 'Office or Other Outpatient Services',
    rvuWork: 1.92,
    rvuPractice: 1.83,
    rvuMalpractice: 0.12,
    baseCost: 135.00,
    duration: 30,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Multisystem',
    commonDiagnoses: ['I10', 'E11.9', 'J44.9', 'N18.3'],
    modifiers: ['25', '95', 'GT']
  },
  {
    code: '12001',
    shortDescription: 'Repair superficial wound(s)',
    longDescription: 'Simple repair of superficial wounds of scalp, neck, axillae, external genitalia, trunk and/or extremities (including hands and feet); 2.5 cm or less.',
    category: 'Surgery',
    subcategory: 'Integumentary System',
    rvuWork: 1.22,
    rvuPractice: 1.96,
    rvuMalpractice: 0.19,
    baseCost: 155.00,
    duration: 15,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Integumentary',
    commonDiagnoses: ['S01.90XA', 'S21.91XA', 'S61.419A'],
    modifiers: ['51', '59']
  },
  {
    code: '71045',
    shortDescription: 'X-ray exam chest 1 view',
    longDescription: 'Radiologic examination, chest; single view.',
    category: 'Radiology',
    subcategory: 'Diagnostic Radiology',
    rvuWork: 0.18,
    rvuPractice: 0.65,
    rvuMalpractice: 0.02,
    baseCost: 45.00,
    duration: 10,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Respiratory',
    commonDiagnoses: ['R05', 'R06.02', 'J18.9'],
    modifiers: ['26', 'TC']
  },
  {
    code: '93000',
    shortDescription: 'Electrocardiogram complete',
    longDescription: 'Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report.',
    category: 'Medicine',
    subcategory: 'Cardiovascular',
    rvuWork: 0.17,
    rvuPractice: 0.30,
    rvuMalpractice: 0.02,
    baseCost: 35.00,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Cardiovascular',
    commonDiagnoses: ['I10', 'I20.9', 'R07.9', 'R00.2'],
    modifiers: ['26', 'TC']
  }
];
