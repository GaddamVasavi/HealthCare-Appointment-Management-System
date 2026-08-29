/**
 * MediCare Connect - Specialty-Specific Clinical Documentation Templates
 * Provides structured documentation frameworks for Cardiology, Endocrinology, Pulmonology,
 * Orthopedics, Pediatrics, Psychiatry, Emergency Medicine, and General Surgery.
 */

export interface SpecialtyTemplate {
  specialtyId: string;
  specialtyName: string;
  defaultChiefComplaints: string[];
  standardHpiQuestions: string[];
  focusedExamSections: string[];
  commonOrders: string[];
  dischargeInstructions: string;
}

export class ClinicalNoteTemplates {
  private static readonly templates: Map<string, SpecialtyTemplate> = new Map();

  static {
    this.initializeTemplates();
  }

  private static add(t: SpecialtyTemplate): void {
    this.templates.set(t.specialtyId.toLowerCase(), t);
  }

  private static initializeTemplates(): void {
    this.add({
      specialtyId: 'CARDIOLOGY',
      specialtyName: 'Cardiovascular Medicine',
      defaultChiefComplaints: ['Chest pain / angina', 'Shortness of breath on exertion', 'Palpitations', 'Lower extremity edema', 'Syncope'],
      standardHpiQuestions: [
        'Onset, location, radiation (arm, neck, jaw), duration, and quality of chest discomfort',
        'Exertional relation and relief with rest or sublingual nitroglycerin',
        'Associated symptoms: diaphoresis, nausea, dyspnea, lightheadedness',
        'Orthopnea (# of pillows) and Paroxysmal Nocturnal Dyspnea (PND)'
      ],
      focusedExamSections: [
        'JVP (Jugular Venous Pressure) elevation at 45 degrees',
        'Carotid upstrokes and presence of bruits',
        'Point of Maximal Impulse (PMI) location and character',
        'Auscultation: S1, S2, S3/S4 gallops, systolic/diastolic murmurs',
        'Peripheral edema grade (1+ to 4+) and distal pulse amplitudes'
      ],
      commonOrders: ['12-Lead ECG (93000)', 'Transthoracic Echocardiogram (93306)', 'High-sensitivity Troponin I', 'NT-proBNP', 'Lipid Panel'],
      dischargeInstructions: 'Follow low-sodium diet (<2g/day), weigh daily in morning, report weight gain > 3 lbs in 24h or > 5 lbs in 1 week immediately.'
    });

    this.add({
      specialtyId: 'ENDOCRINOLOGY',
      specialtyName: 'Endocrinology, Diabetes & Metabolism',
      defaultChiefComplaints: ['Type 2 Diabetes follow-up', 'Thyroid nodule / abnormal TSH', 'Unexplained weight changes', 'Osteoporosis evaluation'],
      standardHpiQuestions: [
        'Home blood glucose log ranges (fasting, pre-meal, postprandial)',
        'Frequency of hypoglycemic episodes (<70 mg/dL) and awareness symptoms',
        'Medication adherence and injection technique review',
        'Symptoms of neuropathy (paresthesias, burning) or visual changes'
      ],
      focusedExamSections: [
        'Thyroid palpation: size, consistency, nodules, bruits',
        'Visual foot inspection and Monofilament 10g sensory exam',
        'Vibration sensation with 128 Hz tuning fork',
        'Skin examination for acanthosis nigricans, lipohypertrophy'
      ],
      commonOrders: ['Hemoglobin A1c (4548-4)', 'Comprehensive Metabolic Panel (80053)', 'Urine Albumin/Creatinine Ratio', 'TSH & Free T4'],
      dischargeInstructions: 'Continue prescribed insulin/oral agent titration protocol. Review sick-day management guidelines.'
    });

    this.add({
      specialtyId: 'PULMONOLOGY',
      specialtyName: 'Pulmonary & Critical Care Medicine',
      defaultChiefComplaints: ['Chronic cough', 'Asthma exacerbation', 'COPD follow-up', 'Dyspnea on exertion', 'Hemoptysis'],
      standardHpiQuestions: [
        'Frequency of daytime and nighttime respiratory symptoms',
        'Rescue inhaler (SABA) usage frequency per week',
        'Sputum production: volume, color, consistency',
        'Environmental triggers and smoking pack-year history'
      ],
      focusedExamSections: [
        'Work of breathing, accessory muscle use, pursed-lip breathing',
        'Chest auscultation: inspiratory/expiratory wheezing, rhonchi, crackles',
        'Vocal fremitus and percussion resonance',
        'Digital clubbing inspection'
      ],
      commonOrders: ['Spirometry & PFTs (94010)', 'Chest Radiograph 2-Views (71046)', 'Pulse Oximetry', 'Arterial Blood Gas'],
      dischargeInstructions: 'Adhere to Asthma/COPD Action Plan. Use spacer with MDI inhalers and rinse mouth after inhaled corticosteroids.'
    });
  }

  public static getTemplate(specialty: string): SpecialtyTemplate | undefined {
    return this.templates.get(specialty.toLowerCase().trim());
  }

  public static getAllTemplates(): SpecialtyTemplate[] {
    return Array.from(this.templates.values());
  }
}
