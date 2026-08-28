/**
 * @file procedures.ts
 * @description Comprehensive typed arrays for CPT procedure codes used in the Healthcare system.
 * Expanded to include a broad spectrum of medical and surgical procedures.
 */

export interface IProcedureCode {
  code: string;
  description: string;
  category: string;
  baseCost: number;
  duration: number; // minutes
  requiresAnesthesia: boolean;
  requiresConsent: boolean;
  bodySystem: string;
}

export const PROCEDURES: IProcedureCode[] = [
  {
    code: '99201',
    description: 'Office/outpatient visit new patient, straightforward complexity',
    category: 'Evaluation & Management',
    baseCost: 75,
    duration: 10,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99202',
    description: 'Office/outpatient visit new patient, straightforward to low complexity',
    category: 'Evaluation & Management',
    baseCost: 110,
    duration: 20,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99203',
    description: 'Office/outpatient visit new patient, moderate complexity',
    category: 'Evaluation & Management',
    baseCost: 150,
    duration: 30,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99204',
    description: 'Office/outpatient visit new patient, moderate to high complexity',
    category: 'Evaluation & Management',
    baseCost: 200,
    duration: 45,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99205',
    description: 'Office/outpatient visit new patient, high complexity',
    category: 'Evaluation & Management',
    baseCost: 260,
    duration: 60,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99211',
    description: 'Office/outpatient visit established patient, minimal problem',
    category: 'Evaluation & Management',
    baseCost: 40,
    duration: 5,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99212',
    description: 'Office/outpatient visit established patient, straightforward complexity',
    category: 'Evaluation & Management',
    baseCost: 65,
    duration: 10,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99213',
    description: 'Office/outpatient visit established patient, low to moderate complexity',
    category: 'Evaluation & Management',
    baseCost: 90,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99214',
    description: 'Office/outpatient visit established patient, moderate to high complexity',
    category: 'Evaluation & Management',
    baseCost: 130,
    duration: 25,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99215',
    description: 'Office/outpatient visit established patient, high complexity',
    category: 'Evaluation & Management',
    baseCost: 180,
    duration: 40,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'General'
  },
  {
    code: '99281',
    description: 'Emergency department visit, straightforward complexity',
    category: 'Evaluation & Management',
    baseCost: 100,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'General'
  },
  {
    code: '99282',
    description: 'Emergency department visit, low complexity',
    category: 'Evaluation & Management',
    baseCost: 150,
    duration: 20,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'General'
  },
  {
    code: '99283',
    description: 'Emergency department visit, moderate complexity',
    category: 'Evaluation & Management',
    baseCost: 220,
    duration: 30,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'General'
  },
  {
    code: '99284',
    description: 'Emergency department visit, high severity',
    category: 'Evaluation & Management',
    baseCost: 350,
    duration: 45,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'General'
  },
  {
    code: '99285',
    description: 'Emergency department visit, high severity with significant threat',
    category: 'Evaluation & Management',
    baseCost: 500,
    duration: 60,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'General'
  },
  {
    code: '10021',
    description: 'Fine needle aspiration biopsy, without imaging guidance',
    category: 'Surgery',
    baseCost: 200,
    duration: 20,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Integumentary'
  },
  {
    code: '12001',
    description: 'Simple repair of superficial wounds, up to 2.5 cm',
    category: 'Surgery',
    baseCost: 150,
    duration: 15,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Integumentary'
  },
  {
    code: '43239',
    description: 'Upper gastrointestinal endoscopy with biopsy',
    category: 'Surgery',
    baseCost: 850,
    duration: 60,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Digestive'
  },
  {
    code: '45380',
    description: 'Colonoscopy with biopsy',
    category: 'Surgery',
    baseCost: 1100,
    duration: 60,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Digestive'
  },
  {
    code: '66984',
    description: 'Cataract surgery with intraocular lens insertion',
    category: 'Surgery',
    baseCost: 2500,
    duration: 90,
    requiresAnesthesia: true,
    requiresConsent: true,
    bodySystem: 'Eye'
  },
  {
    code: '70450',
    description: 'CT head/brain without contrast',
    category: 'Radiology',
    baseCost: 400,
    duration: 20,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Nervous'
  },
  {
    code: '71045',
    description: 'Radiologic examination, chest; single view',
    category: 'Radiology',
    baseCost: 80,
    duration: 10,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Respiratory'
  },
  {
    code: '71046',
    description: 'Radiologic examination, chest; 2 views',
    category: 'Radiology',
    baseCost: 110,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Respiratory'
  },
  {
    code: '73030',
    description: 'Radiologic examination, shoulder; complete, minimum of 2 views',
    category: 'Radiology',
    baseCost: 120,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Musculoskeletal'
  },
  {
    code: '74176',
    description: 'CT abdomen and pelvis without contrast',
    category: 'Radiology',
    baseCost: 800,
    duration: 30,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'Digestive/Urinary'
  },
  {
    code: '76801',
    description: 'Ultrasound, pregnant uterus, first trimester',
    category: 'Radiology',
    baseCost: 250,
    duration: 30,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Reproductive'
  },
  {
    code: '90281',
    description: 'Immune globulin (Ig), human, for intramuscular use',
    category: 'Medicine',
    baseCost: 150,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: true,
    bodySystem: 'Immune'
  },
  {
    code: '93000',
    description: 'Electrocardiogram (ECG) with interpretation and report',
    category: 'Medicine',
    baseCost: 65,
    duration: 15,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Cardiovascular'
  },
  {
    code: '94010',
    description: 'Spirometry, including graphic record, total and timed vital capacity',
    category: 'Medicine',
    baseCost: 75,
    duration: 20,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Respiratory'
  },
  {
    code: '97110',
    description: 'Therapeutic exercises to develop strength, endurance, range of motion',
    category: 'Physical Therapy',
    baseCost: 100,
    duration: 45,
    requiresAnesthesia: false,
    requiresConsent: false,
    bodySystem: 'Musculoskeletal'
  }
];
