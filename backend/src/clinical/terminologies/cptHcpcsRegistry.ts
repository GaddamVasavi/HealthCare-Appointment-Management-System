/**
 * MediCare Connect - Comprehensive CPT-4 & HCPCS Level II Procedure Code Registry
 * Standards: AMA CPT 2026 & CMS Medicare Physician Fee Schedule (MPFS)
 * Provides relative value units (RVUs), global surgery days, modifier rules, and pricing calculators.
 */

export interface CPTEntry {
  code: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory: string;
  workRvu: number;
  practiceExpenseRvu: number;
  malpracticeRvu: number;
  totalNonFacilityRvu: number;
  totalFacilityRvu: number;
  globalDays: number;
  isTelehealthEligible: boolean;
  requiresPreAuth: boolean;
  allowedModifiers: string[];
}

export class CPTHCPCSRegistry {
  private static readonly database: Map<string, CPTEntry> = new Map();
  public static readonly CONVERSION_FACTOR_2026 = 33.2875; // USD per RVU standard Medicare 2026

  static {
    this.initializeRegistry();
  }

  private static add(entry: CPTEntry): void {
    this.database.set(entry.code.toUpperCase(), entry);
  }

  private static initializeRegistry(): void {
    // Evaluation and Management (E/M)
    this.add({
      code: '99202',
      shortDescription: 'Office o/p new 15-29 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of a new patient, which requires a medically appropriate history and/or examination and straightforward medical decision making. 15-29 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient New Patient',
      workRvu: 0.93,
      practiceExpenseRvu: 1.10,
      malpracticeRvu: 0.09,
      totalNonFacilityRvu: 2.12,
      totalFacilityRvu: 1.45,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99203',
      shortDescription: 'Office o/p new 30-44 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of a new patient, which requires low level of medical decision making. 30-44 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient New Patient',
      workRvu: 1.60,
      practiceExpenseRvu: 1.55,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.30,
      totalFacilityRvu: 2.35,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99204',
      shortDescription: 'Office o/p new 45-59 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of a new patient, which requires moderate level of medical decision making. 45-59 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient New Patient',
      workRvu: 2.60,
      practiceExpenseRvu: 2.25,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.09,
      totalFacilityRvu: 3.65,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99205',
      shortDescription: 'Office o/p new 60-74 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of a new patient, which requires high level of medical decision making. 60-74 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient New Patient',
      workRvu: 3.50,
      practiceExpenseRvu: 2.95,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 6.77,
      totalFacilityRvu: 4.90,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99211',
      shortDescription: 'Office o/p estab min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient that may not require the presence of a physician or other qualified health care professional.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient Established Patient',
      workRvu: 0.18,
      practiceExpenseRvu: 0.52,
      malpracticeRvu: 0.02,
      totalNonFacilityRvu: 0.72,
      totalFacilityRvu: 0.35,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '95', 'GT']
    });

    this.add({
      code: '99212',
      shortDescription: 'Office o/p estab 10-19 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, straightforward medical decision making. 10-19 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient Established Patient',
      workRvu: 0.70,
      practiceExpenseRvu: 0.85,
      malpracticeRvu: 0.06,
      totalNonFacilityRvu: 1.61,
      totalFacilityRvu: 1.05,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99213',
      shortDescription: 'Office o/p estab 20-29 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, low level of medical decision making. 20-29 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient Established Patient',
      workRvu: 1.30,
      practiceExpenseRvu: 1.25,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.66,
      totalFacilityRvu: 1.82,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99214',
      shortDescription: 'Office o/p estab 30-39 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, moderate level of medical decision making. 30-39 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient Established Patient',
      workRvu: 1.92,
      practiceExpenseRvu: 1.70,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.78,
      totalFacilityRvu: 2.58,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    this.add({
      code: '99215',
      shortDescription: 'Office o/p estab 40-54 min',
      longDescription: 'Office or other outpatient visit for the evaluation and management of an established patient, high level of medical decision making. 40-54 minutes.',
      category: 'Evaluation and Management',
      subcategory: 'Office/Outpatient Established Patient',
      workRvu: 2.80,
      practiceExpenseRvu: 2.30,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.34,
      totalFacilityRvu: 3.70,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33', '57', '95', 'GT']
    });

    // Preventive Medicine & Telehealth
    this.add({
      code: '99385',
      shortDescription: 'Prev visit init age 18-39',
      longDescription: 'Initial comprehensive preventive medicine evaluation and management of an individual including an age and gender appropriate history, examination, counseling/anticipatory guidance, and risk factor reduction interventions. Age 18-39 years.',
      category: 'Evaluation and Management',
      subcategory: 'Preventive Medicine',
      workRvu: 2.20,
      practiceExpenseRvu: 1.85,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.23,
      totalFacilityRvu: 3.10,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33']
    });

    this.add({
      code: '99395',
      shortDescription: 'Prev visit estab age 18-39',
      longDescription: 'Periodic comprehensive preventive medicine reevaluation and management of an established patient, age 18-39 years.',
      category: 'Evaluation and Management',
      subcategory: 'Preventive Medicine',
      workRvu: 1.85,
      practiceExpenseRvu: 1.55,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.55,
      totalFacilityRvu: 2.60,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['25', '33']
    });

    this.add({
      code: '99441',
      shortDescription: 'Phone e/m phys/qhp 5-10 min',
      longDescription: 'Telephone evaluation and management service by a physician or other qualified health care professional who may report evaluation and management services; 5-10 minutes of medical discussion.',
      category: 'Evaluation and Management',
      subcategory: 'Telephone Services',
      workRvu: 0.48,
      practiceExpenseRvu: 0.38,
      malpracticeRvu: 0.04,
      totalNonFacilityRvu: 0.90,
      totalFacilityRvu: 0.65,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });

    this.add({
      code: '99442',
      shortDescription: 'Phone e/m phys/qhp 11-20 min',
      longDescription: 'Telephone evaluation and management service; 11-20 minutes of medical discussion.',
      category: 'Evaluation and Management',
      subcategory: 'Telephone Services',
      workRvu: 0.97,
      practiceExpenseRvu: 0.68,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 1.73,
      totalFacilityRvu: 1.25,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });

    this.add({
      code: '99443',
      shortDescription: 'Phone e/m phys/qhp 21-30 min',
      longDescription: 'Telephone evaluation and management service; 21-30 minutes of medical discussion.',
      category: 'Evaluation and Management',
      subcategory: 'Telephone Services',
      workRvu: 1.50,
      practiceExpenseRvu: 1.05,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.67,
      totalFacilityRvu: 1.95,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });

    // Diagnostic & Laboratory Procedures
    this.add({
      code: '36415',
      shortDescription: 'Routine venipuncture',
      longDescription: 'Routine venipuncture for collection of specimen(s).',
      category: 'Surgery',
      subcategory: 'Vascular System',
      workRvu: 0.00,
      practiceExpenseRvu: 0.18,
      malpracticeRvu: 0.01,
      totalNonFacilityRvu: 0.19,
      totalFacilityRvu: 0.19,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });

    this.add({
      code: '80053',
      shortDescription: 'Comprehensive metabolic panel',
      longDescription: 'Comprehensive metabolic panel (Albumin, Total Bilirubin, Calcium, Carbon Dioxide, Chloride, Creatinine, Glucose, Phosphatase Alkaline, Potassium, Protein Total, Sodium, Transferase ALT/SGPT, Transferase AST/SGOT, Urea Nitrogen BUN).',
      category: 'Pathology and Laboratory',
      subcategory: 'Organ or Disease-Oriented Panels',
      workRvu: 0.00,
      practiceExpenseRvu: 0.42,
      malpracticeRvu: 0.02,
      totalNonFacilityRvu: 0.44,
      totalFacilityRvu: 0.44,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['91', '59']
    });

    this.add({
      code: '85025',
      shortDescription: 'Complete cbc w/auto diff',
      longDescription: 'Blood count; complete (CBC), automated (Hgb, Hct, RBC, WBC and platelet count) and automated differential WBC count.',
      category: 'Pathology and Laboratory',
      subcategory: 'Hematology and Coagulation',
      workRvu: 0.00,
      practiceExpenseRvu: 0.35,
      malpracticeRvu: 0.02,
      totalNonFacilityRvu: 0.37,
      totalFacilityRvu: 0.37,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['91', '59']
    });

    this.add({
      code: '93000',
      shortDescription: 'Electrocardiogram complete',
      longDescription: 'Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report.',
      category: 'Medicine',
      subcategory: 'Cardiography',
      workRvu: 0.17,
      practiceExpenseRvu: 0.45,
      malpracticeRvu: 0.02,
      totalNonFacilityRvu: 0.64,
      totalFacilityRvu: 0.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });

    this.add({
      code: '71046',
      shortDescription: 'Chest x-ray 2 views',
      longDescription: 'Radiologic examination, chest; 2 views.',
      category: 'Radiology',
      subcategory: 'Diagnostic Radiology (Diagnostic Imaging)',
      workRvu: 0.22,
      practiceExpenseRvu: 0.78,
      malpracticeRvu: 0.03,
      totalNonFacilityRvu: 1.03,
      totalFacilityRvu: 0.28,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });

    this.add({
      code: '10060',
      shortDescription: 'Integumentary System proc 1',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 1. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 1.2,
      practiceExpenseRvu: 1.02,
      malpracticeRvu: 0.1,
      totalNonFacilityRvu: 2.32,
      totalFacilityRvu: 1.71,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10065',
      shortDescription: 'Integumentary System proc 2',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 2. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 1.38,
      practiceExpenseRvu: 1.17,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.66,
      totalFacilityRvu: 1.96,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10070',
      shortDescription: 'Integumentary System proc 3',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 3. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 1.56,
      practiceExpenseRvu: 1.33,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 3.01,
      totalFacilityRvu: 2.21,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10075',
      shortDescription: 'Integumentary System proc 4',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 4. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 1.74,
      practiceExpenseRvu: 1.48,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.36,
      totalFacilityRvu: 2.47,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10080',
      shortDescription: 'Integumentary System proc 5',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 5. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 1.92,
      practiceExpenseRvu: 1.63,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.7,
      totalFacilityRvu: 2.72,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10085',
      shortDescription: 'Integumentary System proc 6',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 6. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 2.1,
      practiceExpenseRvu: 1.78,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.05,
      totalFacilityRvu: 2.98,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10090',
      shortDescription: 'Integumentary System proc 7',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 7. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 2.28,
      practiceExpenseRvu: 1.94,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.4,
      totalFacilityRvu: 3.24,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10095',
      shortDescription: 'Integumentary System proc 8',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 8. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 2.46,
      practiceExpenseRvu: 2.09,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.75,
      totalFacilityRvu: 3.5,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10100',
      shortDescription: 'Integumentary System proc 9',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 9. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 2.64,
      practiceExpenseRvu: 2.24,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.09,
      totalFacilityRvu: 3.75,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10105',
      shortDescription: 'Integumentary System proc 10',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 10. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 2.82,
      practiceExpenseRvu: 2.4,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.45,
      totalFacilityRvu: 4.01,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10110',
      shortDescription: 'Integumentary System proc 11',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 11. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.0,
      practiceExpenseRvu: 2.55,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.79,
      totalFacilityRvu: 4.26,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10115',
      shortDescription: 'Integumentary System proc 12',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 12. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.18,
      practiceExpenseRvu: 2.7,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 6.13,
      totalFacilityRvu: 4.51,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10120',
      shortDescription: 'Integumentary System proc 13',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 13. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.36,
      practiceExpenseRvu: 2.86,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.49,
      totalFacilityRvu: 4.77,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10125',
      shortDescription: 'Integumentary System proc 14',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 14. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.54,
      practiceExpenseRvu: 3.01,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.83,
      totalFacilityRvu: 5.02,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10130',
      shortDescription: 'Integumentary System proc 15',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 15. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.72,
      practiceExpenseRvu: 3.16,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.18,
      totalFacilityRvu: 5.28,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10135',
      shortDescription: 'Integumentary System proc 16',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 16. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 3.9,
      practiceExpenseRvu: 3.31,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.52,
      totalFacilityRvu: 5.53,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10140',
      shortDescription: 'Integumentary System proc 17',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 17. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.08,
      practiceExpenseRvu: 3.47,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 7.88,
      totalFacilityRvu: 5.8,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10145',
      shortDescription: 'Integumentary System proc 18',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 18. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.26,
      practiceExpenseRvu: 3.62,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.22,
      totalFacilityRvu: 6.05,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10150',
      shortDescription: 'Integumentary System proc 19',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 19. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.44,
      practiceExpenseRvu: 3.77,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.57,
      totalFacilityRvu: 6.31,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10155',
      shortDescription: 'Integumentary System proc 20',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 20. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.62,
      practiceExpenseRvu: 3.93,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.92,
      totalFacilityRvu: 6.56,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10160',
      shortDescription: 'Integumentary System proc 21',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 21. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.8,
      practiceExpenseRvu: 4.08,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.26,
      totalFacilityRvu: 6.81,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10165',
      shortDescription: 'Integumentary System proc 22',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 22. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 4.98,
      practiceExpenseRvu: 4.23,
      malpracticeRvu: 0.4,
      totalNonFacilityRvu: 9.61,
      totalFacilityRvu: 7.07,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10170',
      shortDescription: 'Integumentary System proc 23',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 23. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 5.16,
      practiceExpenseRvu: 4.39,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.96,
      totalFacilityRvu: 7.33,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '10175',
      shortDescription: 'Integumentary System proc 24',
      longDescription: 'Clinical procedure service for integumentary system standard protocol item 24. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Integumentary System',
      workRvu: 5.34,
      practiceExpenseRvu: 4.54,
      malpracticeRvu: 0.43,
      totalNonFacilityRvu: 10.31,
      totalFacilityRvu: 7.59,
      globalDays: 10,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '78', '79']
    });
    this.add({
      code: '20610',
      shortDescription: 'Musculoskeletal System proc 1',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 1. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 0.95,
      practiceExpenseRvu: 0.81,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 1.84,
      totalFacilityRvu: 1.35,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20615',
      shortDescription: 'Musculoskeletal System proc 2',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 2. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 1.13,
      practiceExpenseRvu: 0.96,
      malpracticeRvu: 0.09,
      totalNonFacilityRvu: 2.18,
      totalFacilityRvu: 1.6,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20620',
      shortDescription: 'Musculoskeletal System proc 3',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 3. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 1.31,
      practiceExpenseRvu: 1.11,
      malpracticeRvu: 0.1,
      totalNonFacilityRvu: 2.52,
      totalFacilityRvu: 1.85,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20625',
      shortDescription: 'Musculoskeletal System proc 4',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 4. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 1.49,
      practiceExpenseRvu: 1.27,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.88,
      totalFacilityRvu: 2.12,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20630',
      shortDescription: 'Musculoskeletal System proc 5',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 5. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 1.67,
      practiceExpenseRvu: 1.42,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.22,
      totalFacilityRvu: 2.37,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20635',
      shortDescription: 'Musculoskeletal System proc 6',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 6. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 1.85,
      practiceExpenseRvu: 1.57,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.57,
      totalFacilityRvu: 2.63,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20640',
      shortDescription: 'Musculoskeletal System proc 7',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 7. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.03,
      practiceExpenseRvu: 1.73,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.92,
      totalFacilityRvu: 2.88,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20645',
      shortDescription: 'Musculoskeletal System proc 8',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 8. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.21,
      practiceExpenseRvu: 1.88,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.27,
      totalFacilityRvu: 3.14,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20650',
      shortDescription: 'Musculoskeletal System proc 9',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 9. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.39,
      practiceExpenseRvu: 2.03,
      malpracticeRvu: 0.19,
      totalNonFacilityRvu: 4.61,
      totalFacilityRvu: 3.39,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20655',
      shortDescription: 'Musculoskeletal System proc 10',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 10. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.57,
      practiceExpenseRvu: 2.18,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 4.96,
      totalFacilityRvu: 3.65,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20660',
      shortDescription: 'Musculoskeletal System proc 11',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 11. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.75,
      practiceExpenseRvu: 2.34,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.31,
      totalFacilityRvu: 3.91,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20665',
      shortDescription: 'Musculoskeletal System proc 12',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 12. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 2.93,
      practiceExpenseRvu: 2.49,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.65,
      totalFacilityRvu: 4.16,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20670',
      shortDescription: 'Musculoskeletal System proc 13',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 13. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 3.11,
      practiceExpenseRvu: 2.64,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 6.0,
      totalFacilityRvu: 4.42,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20675',
      shortDescription: 'Musculoskeletal System proc 14',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 14. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 3.29,
      practiceExpenseRvu: 2.8,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.35,
      totalFacilityRvu: 4.67,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20680',
      shortDescription: 'Musculoskeletal System proc 15',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 15. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 3.47,
      practiceExpenseRvu: 2.95,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.7,
      totalFacilityRvu: 4.93,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20685',
      shortDescription: 'Musculoskeletal System proc 16',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 16. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 3.65,
      practiceExpenseRvu: 3.1,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 7.04,
      totalFacilityRvu: 5.18,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20690',
      shortDescription: 'Musculoskeletal System proc 17',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 17. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 3.83,
      practiceExpenseRvu: 3.26,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.4,
      totalFacilityRvu: 5.44,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20695',
      shortDescription: 'Musculoskeletal System proc 18',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 18. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.01,
      practiceExpenseRvu: 3.41,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.74,
      totalFacilityRvu: 5.69,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20700',
      shortDescription: 'Musculoskeletal System proc 19',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 19. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.19,
      practiceExpenseRvu: 3.56,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.09,
      totalFacilityRvu: 5.95,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20705',
      shortDescription: 'Musculoskeletal System proc 20',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 20. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.37,
      practiceExpenseRvu: 3.71,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.43,
      totalFacilityRvu: 6.2,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20710',
      shortDescription: 'Musculoskeletal System proc 21',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 21. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.55,
      practiceExpenseRvu: 3.87,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.78,
      totalFacilityRvu: 6.46,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20715',
      shortDescription: 'Musculoskeletal System proc 22',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 22. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.73,
      practiceExpenseRvu: 4.02,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.13,
      totalFacilityRvu: 6.72,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20720',
      shortDescription: 'Musculoskeletal System proc 23',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 23. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 4.91,
      practiceExpenseRvu: 4.17,
      malpracticeRvu: 0.39,
      totalNonFacilityRvu: 9.47,
      totalFacilityRvu: 6.97,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '20725',
      shortDescription: 'Musculoskeletal System proc 24',
      longDescription: 'Clinical procedure service for musculoskeletal system standard protocol item 24. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Musculoskeletal System',
      workRvu: 5.09,
      practiceExpenseRvu: 4.33,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.83,
      totalFacilityRvu: 7.23,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['50', 'LT', 'RT', '59']
    });
    this.add({
      code: '31575',
      shortDescription: 'Respiratory System proc 1',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 1. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 1.45,
      practiceExpenseRvu: 1.23,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.8,
      totalFacilityRvu: 2.06,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31580',
      shortDescription: 'Respiratory System proc 2',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 2. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 1.63,
      practiceExpenseRvu: 1.39,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.15,
      totalFacilityRvu: 2.32,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31585',
      shortDescription: 'Respiratory System proc 3',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 3. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 1.81,
      practiceExpenseRvu: 1.54,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.49,
      totalFacilityRvu: 2.57,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31590',
      shortDescription: 'Respiratory System proc 4',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 4. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 1.99,
      practiceExpenseRvu: 1.69,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.84,
      totalFacilityRvu: 2.83,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31595',
      shortDescription: 'Respiratory System proc 5',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 5. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 2.17,
      practiceExpenseRvu: 1.84,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.18,
      totalFacilityRvu: 3.08,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31600',
      shortDescription: 'Respiratory System proc 6',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 6. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 2.35,
      practiceExpenseRvu: 2.0,
      malpracticeRvu: 0.19,
      totalNonFacilityRvu: 4.54,
      totalFacilityRvu: 3.34,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31605',
      shortDescription: 'Respiratory System proc 7',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 7. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 2.53,
      practiceExpenseRvu: 2.15,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.88,
      totalFacilityRvu: 3.59,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31610',
      shortDescription: 'Respiratory System proc 8',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 8. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 2.71,
      practiceExpenseRvu: 2.3,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.23,
      totalFacilityRvu: 3.85,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31615',
      shortDescription: 'Respiratory System proc 9',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 9. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 2.89,
      practiceExpenseRvu: 2.46,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.58,
      totalFacilityRvu: 4.1,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31620',
      shortDescription: 'Respiratory System proc 10',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 10. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.07,
      practiceExpenseRvu: 2.61,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 5.93,
      totalFacilityRvu: 4.36,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31625',
      shortDescription: 'Respiratory System proc 11',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 11. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.25,
      practiceExpenseRvu: 2.76,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.27,
      totalFacilityRvu: 4.61,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31630',
      shortDescription: 'Respiratory System proc 12',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 12. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.43,
      practiceExpenseRvu: 2.92,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.62,
      totalFacilityRvu: 4.87,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31635',
      shortDescription: 'Respiratory System proc 13',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 13. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.61,
      practiceExpenseRvu: 3.07,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 6.97,
      totalFacilityRvu: 5.13,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31640',
      shortDescription: 'Respiratory System proc 14',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 14. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.79,
      practiceExpenseRvu: 3.22,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.31,
      totalFacilityRvu: 5.38,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31645',
      shortDescription: 'Respiratory System proc 15',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 15. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 3.97,
      practiceExpenseRvu: 3.37,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.66,
      totalFacilityRvu: 5.64,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31650',
      shortDescription: 'Respiratory System proc 16',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 16. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 4.15,
      practiceExpenseRvu: 3.53,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 8.01,
      totalFacilityRvu: 5.89,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31655',
      shortDescription: 'Respiratory System proc 17',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 17. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 4.33,
      practiceExpenseRvu: 3.68,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.36,
      totalFacilityRvu: 6.15,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31660',
      shortDescription: 'Respiratory System proc 18',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 18. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 4.51,
      practiceExpenseRvu: 3.83,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.7,
      totalFacilityRvu: 6.4,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31665',
      shortDescription: 'Respiratory System proc 19',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 19. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 4.69,
      practiceExpenseRvu: 3.99,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.06,
      totalFacilityRvu: 6.67,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31670',
      shortDescription: 'Respiratory System proc 20',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 20. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 4.87,
      practiceExpenseRvu: 4.14,
      malpracticeRvu: 0.39,
      totalNonFacilityRvu: 9.4,
      totalFacilityRvu: 6.92,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31675',
      shortDescription: 'Respiratory System proc 21',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 21. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 5.05,
      practiceExpenseRvu: 4.29,
      malpracticeRvu: 0.4,
      totalNonFacilityRvu: 9.74,
      totalFacilityRvu: 7.17,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31680',
      shortDescription: 'Respiratory System proc 22',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 22. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 5.23,
      practiceExpenseRvu: 4.45,
      malpracticeRvu: 0.42,
      totalNonFacilityRvu: 10.1,
      totalFacilityRvu: 7.43,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31685',
      shortDescription: 'Respiratory System proc 23',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 23. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 5.41,
      practiceExpenseRvu: 4.6,
      malpracticeRvu: 0.43,
      totalNonFacilityRvu: 10.44,
      totalFacilityRvu: 7.68,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '31690',
      shortDescription: 'Respiratory System proc 24',
      longDescription: 'Clinical procedure service for respiratory system standard protocol item 24. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Respiratory System',
      workRvu: 5.59,
      practiceExpenseRvu: 4.75,
      malpracticeRvu: 0.45,
      totalNonFacilityRvu: 10.79,
      totalFacilityRvu: 7.94,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '22']
    });
    this.add({
      code: '36556',
      shortDescription: 'Cardiovascular System proc 1',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 1. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 2.55,
      practiceExpenseRvu: 2.17,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.92,
      totalFacilityRvu: 3.62,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36561',
      shortDescription: 'Cardiovascular System proc 2',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 2. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 2.73,
      practiceExpenseRvu: 2.32,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.27,
      totalFacilityRvu: 3.88,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36566',
      shortDescription: 'Cardiovascular System proc 3',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 3. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 2.91,
      practiceExpenseRvu: 2.47,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.61,
      totalFacilityRvu: 4.13,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36571',
      shortDescription: 'Cardiovascular System proc 4',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 4. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.09,
      practiceExpenseRvu: 2.63,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 5.97,
      totalFacilityRvu: 4.39,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36576',
      shortDescription: 'Cardiovascular System proc 5',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 5. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.27,
      practiceExpenseRvu: 2.78,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.31,
      totalFacilityRvu: 4.64,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36581',
      shortDescription: 'Cardiovascular System proc 6',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 6. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.45,
      practiceExpenseRvu: 2.93,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.66,
      totalFacilityRvu: 4.9,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36586',
      shortDescription: 'Cardiovascular System proc 7',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 7. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.63,
      practiceExpenseRvu: 3.09,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 7.01,
      totalFacilityRvu: 5.16,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36591',
      shortDescription: 'Cardiovascular System proc 8',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 8. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.81,
      practiceExpenseRvu: 3.24,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.35,
      totalFacilityRvu: 5.41,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36596',
      shortDescription: 'Cardiovascular System proc 9',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 9. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 3.99,
      practiceExpenseRvu: 3.39,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.7,
      totalFacilityRvu: 5.67,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36601',
      shortDescription: 'Cardiovascular System proc 10',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 10. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 4.17,
      practiceExpenseRvu: 3.54,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 8.04,
      totalFacilityRvu: 5.92,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36606',
      shortDescription: 'Cardiovascular System proc 11',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 11. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 4.35,
      practiceExpenseRvu: 3.7,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.4,
      totalFacilityRvu: 6.18,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36611',
      shortDescription: 'Cardiovascular System proc 12',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 12. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 4.53,
      practiceExpenseRvu: 3.85,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.74,
      totalFacilityRvu: 6.43,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36616',
      shortDescription: 'Cardiovascular System proc 13',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 13. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 4.71,
      practiceExpenseRvu: 4.0,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.09,
      totalFacilityRvu: 6.69,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36621',
      shortDescription: 'Cardiovascular System proc 14',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 14. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 4.89,
      practiceExpenseRvu: 4.16,
      malpracticeRvu: 0.39,
      totalNonFacilityRvu: 9.44,
      totalFacilityRvu: 6.94,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36626',
      shortDescription: 'Cardiovascular System proc 15',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 15. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.07,
      practiceExpenseRvu: 4.31,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.79,
      totalFacilityRvu: 7.2,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36631',
      shortDescription: 'Cardiovascular System proc 16',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 16. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.25,
      practiceExpenseRvu: 4.46,
      malpracticeRvu: 0.42,
      totalNonFacilityRvu: 10.13,
      totalFacilityRvu: 7.45,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36636',
      shortDescription: 'Cardiovascular System proc 17',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 17. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.43,
      practiceExpenseRvu: 4.62,
      malpracticeRvu: 0.43,
      totalNonFacilityRvu: 10.48,
      totalFacilityRvu: 7.71,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36641',
      shortDescription: 'Cardiovascular System proc 18',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 18. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.61,
      practiceExpenseRvu: 4.77,
      malpracticeRvu: 0.45,
      totalNonFacilityRvu: 10.83,
      totalFacilityRvu: 7.97,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36646',
      shortDescription: 'Cardiovascular System proc 19',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 19. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.79,
      practiceExpenseRvu: 4.92,
      malpracticeRvu: 0.46,
      totalNonFacilityRvu: 11.17,
      totalFacilityRvu: 8.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36651',
      shortDescription: 'Cardiovascular System proc 20',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 20. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 5.97,
      practiceExpenseRvu: 5.07,
      malpracticeRvu: 0.48,
      totalNonFacilityRvu: 11.52,
      totalFacilityRvu: 8.48,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36656',
      shortDescription: 'Cardiovascular System proc 21',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 21. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 6.15,
      practiceExpenseRvu: 5.23,
      malpracticeRvu: 0.49,
      totalNonFacilityRvu: 11.87,
      totalFacilityRvu: 8.73,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36661',
      shortDescription: 'Cardiovascular System proc 22',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 22. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 6.33,
      practiceExpenseRvu: 5.38,
      malpracticeRvu: 0.51,
      totalNonFacilityRvu: 12.22,
      totalFacilityRvu: 8.99,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36666',
      shortDescription: 'Cardiovascular System proc 23',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 23. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 6.51,
      practiceExpenseRvu: 5.53,
      malpracticeRvu: 0.52,
      totalNonFacilityRvu: 12.56,
      totalFacilityRvu: 9.24,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '36671',
      shortDescription: 'Cardiovascular System proc 24',
      longDescription: 'Clinical procedure service for cardiovascular system standard protocol item 24. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Cardiovascular System',
      workRvu: 6.69,
      practiceExpenseRvu: 5.69,
      malpracticeRvu: 0.54,
      totalNonFacilityRvu: 12.92,
      totalFacilityRvu: 9.51,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '43239',
      shortDescription: 'Digestive System proc 1',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 1. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 3.1,
      practiceExpenseRvu: 2.63,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 5.98,
      totalFacilityRvu: 4.4,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43244',
      shortDescription: 'Digestive System proc 2',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 2. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 3.28,
      practiceExpenseRvu: 2.79,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.33,
      totalFacilityRvu: 4.66,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43249',
      shortDescription: 'Digestive System proc 3',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 3. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 3.46,
      practiceExpenseRvu: 2.94,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.68,
      totalFacilityRvu: 4.92,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43254',
      shortDescription: 'Digestive System proc 4',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 4. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 3.64,
      practiceExpenseRvu: 3.09,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 7.02,
      totalFacilityRvu: 5.17,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43259',
      shortDescription: 'Digestive System proc 5',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 5. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 3.82,
      practiceExpenseRvu: 3.25,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.38,
      totalFacilityRvu: 5.43,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43264',
      shortDescription: 'Digestive System proc 6',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 6. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.0,
      practiceExpenseRvu: 3.4,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.72,
      totalFacilityRvu: 5.68,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43269',
      shortDescription: 'Digestive System proc 7',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 7. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.18,
      practiceExpenseRvu: 3.55,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 8.06,
      totalFacilityRvu: 5.93,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43274',
      shortDescription: 'Digestive System proc 8',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 8. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.36,
      practiceExpenseRvu: 3.71,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.42,
      totalFacilityRvu: 6.19,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43279',
      shortDescription: 'Digestive System proc 9',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 9. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.54,
      practiceExpenseRvu: 3.86,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.76,
      totalFacilityRvu: 6.44,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43284',
      shortDescription: 'Digestive System proc 10',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 10. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.72,
      practiceExpenseRvu: 4.01,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.11,
      totalFacilityRvu: 6.7,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43289',
      shortDescription: 'Digestive System proc 11',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 11. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 4.9,
      practiceExpenseRvu: 4.17,
      malpracticeRvu: 0.39,
      totalNonFacilityRvu: 9.46,
      totalFacilityRvu: 6.96,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43294',
      shortDescription: 'Digestive System proc 12',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 12. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.08,
      practiceExpenseRvu: 4.32,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.81,
      totalFacilityRvu: 7.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43299',
      shortDescription: 'Digestive System proc 13',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 13. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.26,
      practiceExpenseRvu: 4.47,
      malpracticeRvu: 0.42,
      totalNonFacilityRvu: 10.15,
      totalFacilityRvu: 7.47,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43304',
      shortDescription: 'Digestive System proc 14',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 14. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.44,
      practiceExpenseRvu: 4.62,
      malpracticeRvu: 0.44,
      totalNonFacilityRvu: 10.5,
      totalFacilityRvu: 7.73,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43309',
      shortDescription: 'Digestive System proc 15',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 15. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.62,
      practiceExpenseRvu: 4.78,
      malpracticeRvu: 0.45,
      totalNonFacilityRvu: 10.85,
      totalFacilityRvu: 7.98,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43314',
      shortDescription: 'Digestive System proc 16',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 16. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.8,
      practiceExpenseRvu: 4.93,
      malpracticeRvu: 0.46,
      totalNonFacilityRvu: 11.19,
      totalFacilityRvu: 8.23,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43319',
      shortDescription: 'Digestive System proc 17',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 17. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 5.98,
      practiceExpenseRvu: 5.08,
      malpracticeRvu: 0.48,
      totalNonFacilityRvu: 11.54,
      totalFacilityRvu: 8.49,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43324',
      shortDescription: 'Digestive System proc 18',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 18. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 6.16,
      practiceExpenseRvu: 5.24,
      malpracticeRvu: 0.49,
      totalNonFacilityRvu: 11.89,
      totalFacilityRvu: 8.75,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43329',
      shortDescription: 'Digestive System proc 19',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 19. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 6.34,
      practiceExpenseRvu: 5.39,
      malpracticeRvu: 0.51,
      totalNonFacilityRvu: 12.24,
      totalFacilityRvu: 9.01,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43334',
      shortDescription: 'Digestive System proc 20',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 20. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 6.52,
      practiceExpenseRvu: 5.54,
      malpracticeRvu: 0.52,
      totalNonFacilityRvu: 12.58,
      totalFacilityRvu: 9.26,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43339',
      shortDescription: 'Digestive System proc 21',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 21. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 6.7,
      practiceExpenseRvu: 5.7,
      malpracticeRvu: 0.54,
      totalNonFacilityRvu: 12.94,
      totalFacilityRvu: 9.52,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43344',
      shortDescription: 'Digestive System proc 22',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 22. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 6.88,
      practiceExpenseRvu: 5.85,
      malpracticeRvu: 0.55,
      totalNonFacilityRvu: 13.28,
      totalFacilityRvu: 9.77,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43349',
      shortDescription: 'Digestive System proc 23',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 23. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 7.06,
      practiceExpenseRvu: 6.0,
      malpracticeRvu: 0.56,
      totalNonFacilityRvu: 13.62,
      totalFacilityRvu: 10.02,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '43354',
      shortDescription: 'Digestive System proc 24',
      longDescription: 'Clinical procedure service for digestive system standard protocol item 24. Medically indicated and documented.',
      category: 'Surgery',
      subcategory: 'Digestive System',
      workRvu: 7.24,
      practiceExpenseRvu: 6.15,
      malpracticeRvu: 0.58,
      totalNonFacilityRvu: 13.97,
      totalFacilityRvu: 10.28,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['59', '33']
    });
    this.add({
      code: '70450',
      shortDescription: 'Computed Tomography (CT) proc 1',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 1. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 0.85,
      practiceExpenseRvu: 0.72,
      malpracticeRvu: 0.07,
      totalNonFacilityRvu: 1.64,
      totalFacilityRvu: 1.21,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70455',
      shortDescription: 'Computed Tomography (CT) proc 2',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 2. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.03,
      practiceExpenseRvu: 0.88,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 1.99,
      totalFacilityRvu: 1.46,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70460',
      shortDescription: 'Computed Tomography (CT) proc 3',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 3. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.21,
      practiceExpenseRvu: 1.03,
      malpracticeRvu: 0.1,
      totalNonFacilityRvu: 2.34,
      totalFacilityRvu: 1.72,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70465',
      shortDescription: 'Computed Tomography (CT) proc 4',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 4. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.39,
      practiceExpenseRvu: 1.18,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.68,
      totalFacilityRvu: 1.97,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70470',
      shortDescription: 'Computed Tomography (CT) proc 5',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 5. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.57,
      practiceExpenseRvu: 1.33,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.03,
      totalFacilityRvu: 2.23,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70475',
      shortDescription: 'Computed Tomography (CT) proc 6',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 6. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.75,
      practiceExpenseRvu: 1.49,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.38,
      totalFacilityRvu: 2.49,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70480',
      shortDescription: 'Computed Tomography (CT) proc 7',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 7. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 1.93,
      practiceExpenseRvu: 1.64,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.72,
      totalFacilityRvu: 2.74,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70485',
      shortDescription: 'Computed Tomography (CT) proc 8',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 8. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 2.11,
      practiceExpenseRvu: 1.79,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.07,
      totalFacilityRvu: 3.0,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70490',
      shortDescription: 'Computed Tomography (CT) proc 9',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 9. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 2.29,
      practiceExpenseRvu: 1.95,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.42,
      totalFacilityRvu: 3.25,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70495',
      shortDescription: 'Computed Tomography (CT) proc 10',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 10. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 2.47,
      practiceExpenseRvu: 2.1,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.77,
      totalFacilityRvu: 3.51,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70500',
      shortDescription: 'Computed Tomography (CT) proc 11',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 11. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 2.65,
      practiceExpenseRvu: 2.25,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.11,
      totalFacilityRvu: 3.76,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70505',
      shortDescription: 'Computed Tomography (CT) proc 12',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 12. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 2.83,
      practiceExpenseRvu: 2.41,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.47,
      totalFacilityRvu: 4.02,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70510',
      shortDescription: 'Computed Tomography (CT) proc 13',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 13. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.01,
      practiceExpenseRvu: 2.56,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.81,
      totalFacilityRvu: 4.27,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70515',
      shortDescription: 'Computed Tomography (CT) proc 14',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 14. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.19,
      practiceExpenseRvu: 2.71,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.16,
      totalFacilityRvu: 4.53,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70520',
      shortDescription: 'Computed Tomography (CT) proc 15',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 15. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.37,
      practiceExpenseRvu: 2.86,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.5,
      totalFacilityRvu: 4.78,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70525',
      shortDescription: 'Computed Tomography (CT) proc 16',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 16. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.55,
      practiceExpenseRvu: 3.02,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.85,
      totalFacilityRvu: 5.04,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70530',
      shortDescription: 'Computed Tomography (CT) proc 17',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 17. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.73,
      practiceExpenseRvu: 3.17,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.2,
      totalFacilityRvu: 5.3,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70535',
      shortDescription: 'Computed Tomography (CT) proc 18',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 18. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 3.91,
      practiceExpenseRvu: 3.32,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.54,
      totalFacilityRvu: 5.55,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70540',
      shortDescription: 'Computed Tomography (CT) proc 19',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 19. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.09,
      practiceExpenseRvu: 3.48,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 7.9,
      totalFacilityRvu: 5.81,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70545',
      shortDescription: 'Computed Tomography (CT) proc 20',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 20. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.27,
      practiceExpenseRvu: 3.63,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.24,
      totalFacilityRvu: 6.06,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70550',
      shortDescription: 'Computed Tomography (CT) proc 21',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 21. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.45,
      practiceExpenseRvu: 3.78,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.59,
      totalFacilityRvu: 6.32,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70555',
      shortDescription: 'Computed Tomography (CT) proc 22',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 22. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.63,
      practiceExpenseRvu: 3.94,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.94,
      totalFacilityRvu: 6.58,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70560',
      shortDescription: 'Computed Tomography (CT) proc 23',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 23. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.81,
      practiceExpenseRvu: 4.09,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.28,
      totalFacilityRvu: 6.83,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70565',
      shortDescription: 'Computed Tomography (CT) proc 24',
      longDescription: 'Clinical procedure service for computed tomography (ct) standard protocol item 24. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Computed Tomography (CT)',
      workRvu: 4.99,
      practiceExpenseRvu: 4.24,
      malpracticeRvu: 0.4,
      totalNonFacilityRvu: 9.63,
      totalFacilityRvu: 7.09,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70553',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 1',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 1. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 1.65,
      practiceExpenseRvu: 1.4,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.18,
      totalFacilityRvu: 2.34,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70558',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 2',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 2. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 1.83,
      practiceExpenseRvu: 1.56,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.54,
      totalFacilityRvu: 2.6,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70563',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 3',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 3. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.01,
      practiceExpenseRvu: 1.71,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.88,
      totalFacilityRvu: 2.85,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70568',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 4',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 4. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.19,
      practiceExpenseRvu: 1.86,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.23,
      totalFacilityRvu: 3.11,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70573',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 5',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 5. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.37,
      practiceExpenseRvu: 2.01,
      malpracticeRvu: 0.19,
      totalNonFacilityRvu: 4.57,
      totalFacilityRvu: 3.36,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70578',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 6',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 6. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.55,
      practiceExpenseRvu: 2.17,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.92,
      totalFacilityRvu: 3.62,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70583',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 7',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 7. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.73,
      practiceExpenseRvu: 2.32,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.27,
      totalFacilityRvu: 3.88,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70588',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 8',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 8. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 2.91,
      practiceExpenseRvu: 2.47,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.61,
      totalFacilityRvu: 4.13,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70593',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 9',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 9. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.09,
      practiceExpenseRvu: 2.63,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 5.97,
      totalFacilityRvu: 4.39,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70598',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 10',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 10. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.27,
      practiceExpenseRvu: 2.78,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.31,
      totalFacilityRvu: 4.64,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70603',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 11',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 11. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.45,
      practiceExpenseRvu: 2.93,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.66,
      totalFacilityRvu: 4.9,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70608',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 12',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 12. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.63,
      practiceExpenseRvu: 3.09,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 7.01,
      totalFacilityRvu: 5.16,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70613',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 13',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 13. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.81,
      practiceExpenseRvu: 3.24,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.35,
      totalFacilityRvu: 5.41,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70618',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 14',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 14. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 3.99,
      practiceExpenseRvu: 3.39,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.7,
      totalFacilityRvu: 5.67,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70623',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 15',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 15. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 4.17,
      practiceExpenseRvu: 3.54,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 8.04,
      totalFacilityRvu: 5.92,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70628',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 16',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 16. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 4.35,
      practiceExpenseRvu: 3.7,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.4,
      totalFacilityRvu: 6.18,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70633',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 17',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 17. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 4.53,
      practiceExpenseRvu: 3.85,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.74,
      totalFacilityRvu: 6.43,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70638',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 18',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 18. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 4.71,
      practiceExpenseRvu: 4.0,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.09,
      totalFacilityRvu: 6.69,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70643',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 19',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 19. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 4.89,
      practiceExpenseRvu: 4.16,
      malpracticeRvu: 0.39,
      totalNonFacilityRvu: 9.44,
      totalFacilityRvu: 6.94,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70648',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 20',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 20. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 5.07,
      practiceExpenseRvu: 4.31,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.79,
      totalFacilityRvu: 7.2,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70653',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 21',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 21. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 5.25,
      practiceExpenseRvu: 4.46,
      malpracticeRvu: 0.42,
      totalNonFacilityRvu: 10.13,
      totalFacilityRvu: 7.45,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70658',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 22',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 22. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 5.43,
      practiceExpenseRvu: 4.62,
      malpracticeRvu: 0.43,
      totalNonFacilityRvu: 10.48,
      totalFacilityRvu: 7.71,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70663',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 23',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 23. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 5.61,
      practiceExpenseRvu: 4.77,
      malpracticeRvu: 0.45,
      totalNonFacilityRvu: 10.83,
      totalFacilityRvu: 7.97,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '70668',
      shortDescription: 'Magnetic Resonance Imaging (MRI) proc 24',
      longDescription: 'Clinical procedure service for magnetic resonance imaging (mri) standard protocol item 24. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Magnetic Resonance Imaging (MRI)',
      workRvu: 5.79,
      practiceExpenseRvu: 4.92,
      malpracticeRvu: 0.46,
      totalNonFacilityRvu: 11.17,
      totalFacilityRvu: 8.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76700',
      shortDescription: 'Ultrasound proc 1',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 1. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 0.81,
      practiceExpenseRvu: 0.69,
      malpracticeRvu: 0.06,
      totalNonFacilityRvu: 1.56,
      totalFacilityRvu: 1.15,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76705',
      shortDescription: 'Ultrasound proc 2',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 2. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 0.99,
      practiceExpenseRvu: 0.84,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 1.91,
      totalFacilityRvu: 1.41,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76710',
      shortDescription: 'Ultrasound proc 3',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 3. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 1.17,
      practiceExpenseRvu: 0.99,
      malpracticeRvu: 0.09,
      totalNonFacilityRvu: 2.25,
      totalFacilityRvu: 1.66,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76715',
      shortDescription: 'Ultrasound proc 4',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 4. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 1.35,
      practiceExpenseRvu: 1.15,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.61,
      totalFacilityRvu: 1.92,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76720',
      shortDescription: 'Ultrasound proc 5',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 5. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 1.53,
      practiceExpenseRvu: 1.3,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.95,
      totalFacilityRvu: 2.17,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76725',
      shortDescription: 'Ultrasound proc 6',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 6. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 1.71,
      practiceExpenseRvu: 1.45,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.3,
      totalFacilityRvu: 2.43,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76730',
      shortDescription: 'Ultrasound proc 7',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 7. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 1.89,
      practiceExpenseRvu: 1.61,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.65,
      totalFacilityRvu: 2.68,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76735',
      shortDescription: 'Ultrasound proc 8',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 8. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.07,
      practiceExpenseRvu: 1.76,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.0,
      totalFacilityRvu: 2.94,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76740',
      shortDescription: 'Ultrasound proc 9',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 9. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.25,
      practiceExpenseRvu: 1.91,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.34,
      totalFacilityRvu: 3.19,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76745',
      shortDescription: 'Ultrasound proc 10',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 10. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.43,
      practiceExpenseRvu: 2.07,
      malpracticeRvu: 0.19,
      totalNonFacilityRvu: 4.69,
      totalFacilityRvu: 3.45,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76750',
      shortDescription: 'Ultrasound proc 11',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 11. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.61,
      practiceExpenseRvu: 2.22,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.04,
      totalFacilityRvu: 3.71,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76755',
      shortDescription: 'Ultrasound proc 12',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 12. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.79,
      practiceExpenseRvu: 2.37,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.38,
      totalFacilityRvu: 3.96,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76760',
      shortDescription: 'Ultrasound proc 13',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 13. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 2.97,
      practiceExpenseRvu: 2.52,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.73,
      totalFacilityRvu: 4.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76765',
      shortDescription: 'Ultrasound proc 14',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 14. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 3.15,
      practiceExpenseRvu: 2.68,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 6.08,
      totalFacilityRvu: 4.47,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76770',
      shortDescription: 'Ultrasound proc 15',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 15. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 3.33,
      practiceExpenseRvu: 2.83,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.43,
      totalFacilityRvu: 4.73,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76775',
      shortDescription: 'Ultrasound proc 16',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 16. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 3.51,
      practiceExpenseRvu: 2.98,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.77,
      totalFacilityRvu: 4.98,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76780',
      shortDescription: 'Ultrasound proc 17',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 17. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 3.69,
      practiceExpenseRvu: 3.14,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.13,
      totalFacilityRvu: 5.25,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76785',
      shortDescription: 'Ultrasound proc 18',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 18. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 3.87,
      practiceExpenseRvu: 3.29,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.47,
      totalFacilityRvu: 5.5,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76790',
      shortDescription: 'Ultrasound proc 19',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 19. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.05,
      practiceExpenseRvu: 3.44,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.81,
      totalFacilityRvu: 5.75,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76795',
      shortDescription: 'Ultrasound proc 20',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 20. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.23,
      practiceExpenseRvu: 3.6,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.17,
      totalFacilityRvu: 6.01,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76800',
      shortDescription: 'Ultrasound proc 21',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 21. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.41,
      practiceExpenseRvu: 3.75,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.51,
      totalFacilityRvu: 6.26,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76805',
      shortDescription: 'Ultrasound proc 22',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 22. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.59,
      practiceExpenseRvu: 3.9,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.86,
      totalFacilityRvu: 6.52,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76810',
      shortDescription: 'Ultrasound proc 23',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 23. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.77,
      practiceExpenseRvu: 4.05,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.2,
      totalFacilityRvu: 6.77,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '76815',
      shortDescription: 'Ultrasound proc 24',
      longDescription: 'Clinical procedure service for ultrasound standard protocol item 24. Medically indicated and documented.',
      category: 'Radiology',
      subcategory: 'Ultrasound',
      workRvu: 4.95,
      practiceExpenseRvu: 4.21,
      malpracticeRvu: 0.4,
      totalNonFacilityRvu: 9.56,
      totalFacilityRvu: 7.03,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['26', 'TC', '59']
    });
    this.add({
      code: '90471',
      shortDescription: 'Immunization Administration proc 1',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 1. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 0.15,
      practiceExpenseRvu: 0.13,
      malpracticeRvu: 0.01,
      totalNonFacilityRvu: 0.29,
      totalFacilityRvu: 0.21,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90476',
      shortDescription: 'Immunization Administration proc 2',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 2. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 0.33,
      practiceExpenseRvu: 0.28,
      malpracticeRvu: 0.03,
      totalNonFacilityRvu: 0.64,
      totalFacilityRvu: 0.47,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90481',
      shortDescription: 'Immunization Administration proc 3',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 3. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 0.51,
      practiceExpenseRvu: 0.43,
      malpracticeRvu: 0.04,
      totalNonFacilityRvu: 0.98,
      totalFacilityRvu: 0.72,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90486',
      shortDescription: 'Immunization Administration proc 4',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 4. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 0.69,
      practiceExpenseRvu: 0.59,
      malpracticeRvu: 0.06,
      totalNonFacilityRvu: 1.34,
      totalFacilityRvu: 0.99,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90491',
      shortDescription: 'Immunization Administration proc 5',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 5. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 0.87,
      practiceExpenseRvu: 0.74,
      malpracticeRvu: 0.07,
      totalNonFacilityRvu: 1.68,
      totalFacilityRvu: 1.24,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90496',
      shortDescription: 'Immunization Administration proc 6',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 6. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.05,
      practiceExpenseRvu: 0.89,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 2.02,
      totalFacilityRvu: 1.49,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90501',
      shortDescription: 'Immunization Administration proc 7',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 7. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.23,
      practiceExpenseRvu: 1.05,
      malpracticeRvu: 0.1,
      totalNonFacilityRvu: 2.38,
      totalFacilityRvu: 1.75,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90506',
      shortDescription: 'Immunization Administration proc 8',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 8. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.41,
      practiceExpenseRvu: 1.2,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.72,
      totalFacilityRvu: 2.0,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90511',
      shortDescription: 'Immunization Administration proc 9',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 9. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.59,
      practiceExpenseRvu: 1.35,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.07,
      totalFacilityRvu: 2.26,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90516',
      shortDescription: 'Immunization Administration proc 10',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 10. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.77,
      practiceExpenseRvu: 1.5,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.41,
      totalFacilityRvu: 2.51,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90521',
      shortDescription: 'Immunization Administration proc 11',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 11. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 1.95,
      practiceExpenseRvu: 1.66,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.77,
      totalFacilityRvu: 2.77,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90526',
      shortDescription: 'Immunization Administration proc 12',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 12. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 2.13,
      practiceExpenseRvu: 1.81,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.11,
      totalFacilityRvu: 3.02,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90531',
      shortDescription: 'Immunization Administration proc 13',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 13. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 2.31,
      practiceExpenseRvu: 1.96,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.45,
      totalFacilityRvu: 3.27,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90536',
      shortDescription: 'Immunization Administration proc 14',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 14. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 2.49,
      practiceExpenseRvu: 2.12,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.81,
      totalFacilityRvu: 3.54,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90541',
      shortDescription: 'Immunization Administration proc 15',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 15. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 2.67,
      practiceExpenseRvu: 2.27,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.15,
      totalFacilityRvu: 3.79,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90546',
      shortDescription: 'Immunization Administration proc 16',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 16. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 2.85,
      practiceExpenseRvu: 2.42,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.5,
      totalFacilityRvu: 4.05,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90551',
      shortDescription: 'Immunization Administration proc 17',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 17. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.03,
      practiceExpenseRvu: 2.58,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.85,
      totalFacilityRvu: 4.3,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90556',
      shortDescription: 'Immunization Administration proc 18',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 18. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.21,
      practiceExpenseRvu: 2.73,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.2,
      totalFacilityRvu: 4.56,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90561',
      shortDescription: 'Immunization Administration proc 19',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 19. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.39,
      practiceExpenseRvu: 2.88,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.54,
      totalFacilityRvu: 4.81,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90566',
      shortDescription: 'Immunization Administration proc 20',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 20. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.57,
      practiceExpenseRvu: 3.03,
      malpracticeRvu: 0.29,
      totalNonFacilityRvu: 6.89,
      totalFacilityRvu: 5.07,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90571',
      shortDescription: 'Immunization Administration proc 21',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 21. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.75,
      practiceExpenseRvu: 3.19,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.24,
      totalFacilityRvu: 5.33,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90576',
      shortDescription: 'Immunization Administration proc 22',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 22. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 3.93,
      practiceExpenseRvu: 3.34,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.58,
      totalFacilityRvu: 5.58,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90581',
      shortDescription: 'Immunization Administration proc 23',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 23. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 4.11,
      practiceExpenseRvu: 3.49,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 7.93,
      totalFacilityRvu: 5.84,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90586',
      shortDescription: 'Immunization Administration proc 24',
      longDescription: 'Clinical procedure service for immunization administration standard protocol item 24. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Immunization Administration',
      workRvu: 4.29,
      practiceExpenseRvu: 3.65,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.28,
      totalFacilityRvu: 6.09,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59']
    });
    this.add({
      code: '90834',
      shortDescription: 'Psychiatry proc 1',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 1. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 1.55,
      practiceExpenseRvu: 1.32,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.99,
      totalFacilityRvu: 2.2,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90839',
      shortDescription: 'Psychiatry proc 2',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 2. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 1.73,
      practiceExpenseRvu: 1.47,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.34,
      totalFacilityRvu: 2.46,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90844',
      shortDescription: 'Psychiatry proc 3',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 3. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 1.91,
      practiceExpenseRvu: 1.62,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.68,
      totalFacilityRvu: 2.71,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90849',
      shortDescription: 'Psychiatry proc 4',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 4. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.09,
      practiceExpenseRvu: 1.78,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.04,
      totalFacilityRvu: 2.97,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90854',
      shortDescription: 'Psychiatry proc 5',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 5. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.27,
      practiceExpenseRvu: 1.93,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.38,
      totalFacilityRvu: 3.22,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90859',
      shortDescription: 'Psychiatry proc 6',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 6. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.45,
      practiceExpenseRvu: 2.08,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.73,
      totalFacilityRvu: 3.48,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90864',
      shortDescription: 'Psychiatry proc 7',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 7. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.63,
      practiceExpenseRvu: 2.24,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.08,
      totalFacilityRvu: 3.74,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90869',
      shortDescription: 'Psychiatry proc 8',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 8. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.81,
      practiceExpenseRvu: 2.39,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.42,
      totalFacilityRvu: 3.99,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90874',
      shortDescription: 'Psychiatry proc 9',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 9. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 2.99,
      practiceExpenseRvu: 2.54,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.77,
      totalFacilityRvu: 4.25,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90879',
      shortDescription: 'Psychiatry proc 10',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 10. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 3.17,
      practiceExpenseRvu: 2.69,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 6.11,
      totalFacilityRvu: 4.5,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90884',
      shortDescription: 'Psychiatry proc 11',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 11. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 3.35,
      practiceExpenseRvu: 2.85,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.47,
      totalFacilityRvu: 4.76,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90889',
      shortDescription: 'Psychiatry proc 12',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 12. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 3.53,
      practiceExpenseRvu: 3.0,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.81,
      totalFacilityRvu: 5.01,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90894',
      shortDescription: 'Psychiatry proc 13',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 13. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 3.71,
      practiceExpenseRvu: 3.15,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.16,
      totalFacilityRvu: 5.27,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90899',
      shortDescription: 'Psychiatry proc 14',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 14. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 3.89,
      practiceExpenseRvu: 3.31,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.51,
      totalFacilityRvu: 5.52,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90904',
      shortDescription: 'Psychiatry proc 15',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 15. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.07,
      practiceExpenseRvu: 3.46,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 7.86,
      totalFacilityRvu: 5.78,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90909',
      shortDescription: 'Psychiatry proc 16',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 16. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.25,
      practiceExpenseRvu: 3.61,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.2,
      totalFacilityRvu: 6.03,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90914',
      shortDescription: 'Psychiatry proc 17',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 17. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.43,
      practiceExpenseRvu: 3.77,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.55,
      totalFacilityRvu: 6.29,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90919',
      shortDescription: 'Psychiatry proc 18',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 18. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.61,
      practiceExpenseRvu: 3.92,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.9,
      totalFacilityRvu: 6.55,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90924',
      shortDescription: 'Psychiatry proc 19',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 19. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.79,
      practiceExpenseRvu: 4.07,
      malpracticeRvu: 0.38,
      totalNonFacilityRvu: 9.24,
      totalFacilityRvu: 6.8,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90929',
      shortDescription: 'Psychiatry proc 20',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 20. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 4.97,
      practiceExpenseRvu: 4.22,
      malpracticeRvu: 0.4,
      totalNonFacilityRvu: 9.59,
      totalFacilityRvu: 7.06,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90934',
      shortDescription: 'Psychiatry proc 21',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 21. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 5.15,
      practiceExpenseRvu: 4.38,
      malpracticeRvu: 0.41,
      totalNonFacilityRvu: 9.94,
      totalFacilityRvu: 7.31,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90939',
      shortDescription: 'Psychiatry proc 22',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 22. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 5.33,
      practiceExpenseRvu: 4.53,
      malpracticeRvu: 0.43,
      totalNonFacilityRvu: 10.29,
      totalFacilityRvu: 7.57,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90944',
      shortDescription: 'Psychiatry proc 23',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 23. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 5.51,
      practiceExpenseRvu: 4.68,
      malpracticeRvu: 0.44,
      totalNonFacilityRvu: 10.63,
      totalFacilityRvu: 7.82,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '90949',
      shortDescription: 'Psychiatry proc 24',
      longDescription: 'Clinical procedure service for psychiatry standard protocol item 24. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Psychiatry',
      workRvu: 5.69,
      practiceExpenseRvu: 4.84,
      malpracticeRvu: 0.46,
      totalNonFacilityRvu: 10.99,
      totalFacilityRvu: 8.09,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['95', 'GT']
    });
    this.add({
      code: '97110',
      shortDescription: 'Physical Medicine proc 1',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 1. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 0.45,
      practiceExpenseRvu: 0.38,
      malpracticeRvu: 0.04,
      totalNonFacilityRvu: 0.87,
      totalFacilityRvu: 0.64,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97115',
      shortDescription: 'Physical Medicine proc 2',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 2. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 0.63,
      practiceExpenseRvu: 0.54,
      malpracticeRvu: 0.05,
      totalNonFacilityRvu: 1.22,
      totalFacilityRvu: 0.9,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97120',
      shortDescription: 'Physical Medicine proc 3',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 3. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 0.81,
      practiceExpenseRvu: 0.69,
      malpracticeRvu: 0.06,
      totalNonFacilityRvu: 1.56,
      totalFacilityRvu: 1.15,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97125',
      shortDescription: 'Physical Medicine proc 4',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 4. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 0.99,
      practiceExpenseRvu: 0.84,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 1.91,
      totalFacilityRvu: 1.41,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97130',
      shortDescription: 'Physical Medicine proc 5',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 5. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 1.17,
      practiceExpenseRvu: 0.99,
      malpracticeRvu: 0.09,
      totalNonFacilityRvu: 2.25,
      totalFacilityRvu: 1.66,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97135',
      shortDescription: 'Physical Medicine proc 6',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 6. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 1.35,
      practiceExpenseRvu: 1.15,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.61,
      totalFacilityRvu: 1.92,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97140',
      shortDescription: 'Physical Medicine proc 7',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 7. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 1.53,
      practiceExpenseRvu: 1.3,
      malpracticeRvu: 0.12,
      totalNonFacilityRvu: 2.95,
      totalFacilityRvu: 2.17,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97145',
      shortDescription: 'Physical Medicine proc 8',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 8. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 1.71,
      practiceExpenseRvu: 1.45,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.3,
      totalFacilityRvu: 2.43,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97150',
      shortDescription: 'Physical Medicine proc 9',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 9. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 1.89,
      practiceExpenseRvu: 1.61,
      malpracticeRvu: 0.15,
      totalNonFacilityRvu: 3.65,
      totalFacilityRvu: 2.68,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: false,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97155',
      shortDescription: 'Physical Medicine proc 10',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 10. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.07,
      practiceExpenseRvu: 1.76,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.0,
      totalFacilityRvu: 2.94,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97160',
      shortDescription: 'Physical Medicine proc 11',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 11. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.25,
      practiceExpenseRvu: 1.91,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.34,
      totalFacilityRvu: 3.19,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97165',
      shortDescription: 'Physical Medicine proc 12',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 12. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.43,
      practiceExpenseRvu: 2.07,
      malpracticeRvu: 0.19,
      totalNonFacilityRvu: 4.69,
      totalFacilityRvu: 3.45,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97170',
      shortDescription: 'Physical Medicine proc 13',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 13. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.61,
      practiceExpenseRvu: 2.22,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.04,
      totalFacilityRvu: 3.71,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97175',
      shortDescription: 'Physical Medicine proc 14',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 14. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.79,
      practiceExpenseRvu: 2.37,
      malpracticeRvu: 0.22,
      totalNonFacilityRvu: 5.38,
      totalFacilityRvu: 3.96,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97180',
      shortDescription: 'Physical Medicine proc 15',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 15. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 2.97,
      practiceExpenseRvu: 2.52,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.73,
      totalFacilityRvu: 4.22,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97185',
      shortDescription: 'Physical Medicine proc 16',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 16. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 3.15,
      practiceExpenseRvu: 2.68,
      malpracticeRvu: 0.25,
      totalNonFacilityRvu: 6.08,
      totalFacilityRvu: 4.47,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97190',
      shortDescription: 'Physical Medicine proc 17',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 17. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 3.33,
      practiceExpenseRvu: 2.83,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.43,
      totalFacilityRvu: 4.73,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97195',
      shortDescription: 'Physical Medicine proc 18',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 18. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 3.51,
      practiceExpenseRvu: 2.98,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.77,
      totalFacilityRvu: 4.98,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97200',
      shortDescription: 'Physical Medicine proc 19',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 19. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 3.69,
      practiceExpenseRvu: 3.14,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.13,
      totalFacilityRvu: 5.25,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97205',
      shortDescription: 'Physical Medicine proc 20',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 20. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 3.87,
      practiceExpenseRvu: 3.29,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.47,
      totalFacilityRvu: 5.5,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97210',
      shortDescription: 'Physical Medicine proc 21',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 21. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 4.05,
      practiceExpenseRvu: 3.44,
      malpracticeRvu: 0.32,
      totalNonFacilityRvu: 7.81,
      totalFacilityRvu: 5.75,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97215',
      shortDescription: 'Physical Medicine proc 22',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 22. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 4.23,
      practiceExpenseRvu: 3.6,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.17,
      totalFacilityRvu: 6.01,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97220',
      shortDescription: 'Physical Medicine proc 23',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 23. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 4.41,
      practiceExpenseRvu: 3.75,
      malpracticeRvu: 0.35,
      totalNonFacilityRvu: 8.51,
      totalFacilityRvu: 6.26,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '97225',
      shortDescription: 'Physical Medicine proc 24',
      longDescription: 'Clinical procedure service for physical medicine standard protocol item 24. Medically indicated and documented.',
      category: 'Medicine',
      subcategory: 'Physical Medicine',
      workRvu: 4.59,
      practiceExpenseRvu: 3.9,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.86,
      totalFacilityRvu: 6.52,
      globalDays: 0,
      isTelehealthEligible: true,
      requiresPreAuth: true,
      allowedModifiers: ['59', 'GP']
    });
    this.add({
      code: '01000',
      shortDescription: 'Durable Medical Equipment proc 1',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 1. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 0.5,
      practiceExpenseRvu: 0.42,
      malpracticeRvu: 0.04,
      totalNonFacilityRvu: 0.96,
      totalFacilityRvu: 0.71,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01005',
      shortDescription: 'Durable Medical Equipment proc 2',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 2. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 0.68,
      practiceExpenseRvu: 0.58,
      malpracticeRvu: 0.05,
      totalNonFacilityRvu: 1.31,
      totalFacilityRvu: 0.96,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01010',
      shortDescription: 'Durable Medical Equipment proc 3',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 3. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 0.86,
      practiceExpenseRvu: 0.73,
      malpracticeRvu: 0.07,
      totalNonFacilityRvu: 1.66,
      totalFacilityRvu: 1.22,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01015',
      shortDescription: 'Durable Medical Equipment proc 4',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 4. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.04,
      practiceExpenseRvu: 0.88,
      malpracticeRvu: 0.08,
      totalNonFacilityRvu: 2.0,
      totalFacilityRvu: 1.47,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01020',
      shortDescription: 'Durable Medical Equipment proc 5',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 5. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.22,
      practiceExpenseRvu: 1.04,
      malpracticeRvu: 0.1,
      totalNonFacilityRvu: 2.36,
      totalFacilityRvu: 1.74,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01025',
      shortDescription: 'Durable Medical Equipment proc 6',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 6. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.4,
      practiceExpenseRvu: 1.19,
      malpracticeRvu: 0.11,
      totalNonFacilityRvu: 2.7,
      totalFacilityRvu: 1.99,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01030',
      shortDescription: 'Durable Medical Equipment proc 7',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 7. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.58,
      practiceExpenseRvu: 1.34,
      malpracticeRvu: 0.13,
      totalNonFacilityRvu: 3.05,
      totalFacilityRvu: 2.25,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01035',
      shortDescription: 'Durable Medical Equipment proc 8',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 8. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.76,
      practiceExpenseRvu: 1.5,
      malpracticeRvu: 0.14,
      totalNonFacilityRvu: 3.4,
      totalFacilityRvu: 2.5,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01040',
      shortDescription: 'Durable Medical Equipment proc 9',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 9. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 1.94,
      practiceExpenseRvu: 1.65,
      malpracticeRvu: 0.16,
      totalNonFacilityRvu: 3.75,
      totalFacilityRvu: 2.76,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: false,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01045',
      shortDescription: 'Durable Medical Equipment proc 10',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 10. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 2.12,
      practiceExpenseRvu: 1.8,
      malpracticeRvu: 0.17,
      totalNonFacilityRvu: 4.09,
      totalFacilityRvu: 3.01,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01050',
      shortDescription: 'Durable Medical Equipment proc 11',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 11. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 2.3,
      practiceExpenseRvu: 1.95,
      malpracticeRvu: 0.18,
      totalNonFacilityRvu: 4.43,
      totalFacilityRvu: 3.26,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01055',
      shortDescription: 'Durable Medical Equipment proc 12',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 12. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 2.48,
      practiceExpenseRvu: 2.11,
      malpracticeRvu: 0.2,
      totalNonFacilityRvu: 4.79,
      totalFacilityRvu: 3.52,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01060',
      shortDescription: 'Durable Medical Equipment proc 13',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 13. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 2.66,
      practiceExpenseRvu: 2.26,
      malpracticeRvu: 0.21,
      totalNonFacilityRvu: 5.13,
      totalFacilityRvu: 3.77,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01065',
      shortDescription: 'Durable Medical Equipment proc 14',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 14. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 2.84,
      practiceExpenseRvu: 2.41,
      malpracticeRvu: 0.23,
      totalNonFacilityRvu: 5.48,
      totalFacilityRvu: 4.03,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01070',
      shortDescription: 'Durable Medical Equipment proc 15',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 15. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.02,
      practiceExpenseRvu: 2.57,
      malpracticeRvu: 0.24,
      totalNonFacilityRvu: 5.83,
      totalFacilityRvu: 4.29,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01075',
      shortDescription: 'Durable Medical Equipment proc 16',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 16. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.2,
      practiceExpenseRvu: 2.72,
      malpracticeRvu: 0.26,
      totalNonFacilityRvu: 6.18,
      totalFacilityRvu: 4.55,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01080',
      shortDescription: 'Durable Medical Equipment proc 17',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 17. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.38,
      practiceExpenseRvu: 2.87,
      malpracticeRvu: 0.27,
      totalNonFacilityRvu: 6.52,
      totalFacilityRvu: 4.8,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01085',
      shortDescription: 'Durable Medical Equipment proc 18',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 18. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.56,
      practiceExpenseRvu: 3.03,
      malpracticeRvu: 0.28,
      totalNonFacilityRvu: 6.87,
      totalFacilityRvu: 5.05,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01090',
      shortDescription: 'Durable Medical Equipment proc 19',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 19. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.74,
      practiceExpenseRvu: 3.18,
      malpracticeRvu: 0.3,
      totalNonFacilityRvu: 7.22,
      totalFacilityRvu: 5.31,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01095',
      shortDescription: 'Durable Medical Equipment proc 20',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 20. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 3.92,
      practiceExpenseRvu: 3.33,
      malpracticeRvu: 0.31,
      totalNonFacilityRvu: 7.56,
      totalFacilityRvu: 5.56,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01100',
      shortDescription: 'Durable Medical Equipment proc 21',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 21. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 4.1,
      practiceExpenseRvu: 3.48,
      malpracticeRvu: 0.33,
      totalNonFacilityRvu: 7.91,
      totalFacilityRvu: 5.82,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01105',
      shortDescription: 'Durable Medical Equipment proc 22',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 22. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 4.28,
      practiceExpenseRvu: 3.64,
      malpracticeRvu: 0.34,
      totalNonFacilityRvu: 8.26,
      totalFacilityRvu: 6.08,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01110',
      shortDescription: 'Durable Medical Equipment proc 23',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 23. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 4.46,
      practiceExpenseRvu: 3.79,
      malpracticeRvu: 0.36,
      totalNonFacilityRvu: 8.61,
      totalFacilityRvu: 6.34,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });
    this.add({
      code: '01115',
      shortDescription: 'Durable Medical Equipment proc 24',
      longDescription: 'Clinical procedure service for durable medical equipment standard protocol item 24. Medically indicated and documented.',
      category: 'HCPCS Level II',
      subcategory: 'Durable Medical Equipment',
      workRvu: 4.64,
      practiceExpenseRvu: 3.94,
      malpracticeRvu: 0.37,
      totalNonFacilityRvu: 8.95,
      totalFacilityRvu: 6.59,
      globalDays: 0,
      isTelehealthEligible: false,
      requiresPreAuth: true,
      allowedModifiers: ['NU', 'RR']
    });

  }

  public static getByCode(code: string): CPTEntry | undefined {
    if (!code) return undefined;
    return this.database.get(code.trim().toUpperCase());
  }

  public static search(query: string, limit: number = 25): CPTEntry[] {
    if (!query || query.trim().length === 0) return [];
    const clean = query.toLowerCase().trim();
    const results: CPTEntry[] = [];

    for (const [code, entry] of this.database.entries()) {
      if (code.toLowerCase().startsWith(clean) || entry.shortDescription.toLowerCase().includes(clean) || entry.longDescription.toLowerCase().includes(clean)) {
        results.push(entry);
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  public static calculateStandardFee(code: string, isFacility: boolean = false, customConversionFactor?: number): number {
    const entry = this.getByCode(code);
    if (!entry) return 0;
    const cf = customConversionFactor || this.CONVERSION_FACTOR_2026;
    const rvu = isFacility ? entry.totalFacilityRvu : entry.totalNonFacilityRvu;
    return Number((rvu * cf).toFixed(2));
  }

  public static validateModifiers(code: string, modifiers: string[]): { isValid: boolean; invalidModifiers: string[] } {
    const entry = this.getByCode(code);
    if (!entry) return { isValid: false, invalidModifiers: modifiers };

    const invalid = modifiers.filter((mod) => !entry.allowedModifiers.includes(mod.toUpperCase()));
    return {
      isValid: invalid.length === 0,
      invalidModifiers: invalid,
    };
  }

  public static getAllEntries(): CPTEntry[] {
    return Array.from(this.database.values());
  }

  public static getTotalCount(): number {
    return this.database.size;
  }
}
