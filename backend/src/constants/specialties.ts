/**
 * @file specialties.ts
 * @description Typed array of medical specialties for the Healthcare Appointment Management System.
 */

export interface IMedicalSpecialty {
  id: string;
  name: string;
  description: string;
  subSpecialties: string[];
  commonConditions: string[];
  typicalProcedures: string[];
  averageConsultationDuration: number; // in minutes
  averageConsultationFee: number;
  requiresReferral: boolean;
  icon: string;
}

export const MEDICAL_SPECIALTIES: IMedicalSpecialty[] = [
  {
    id: 'SPEC001',
    name: 'Cardiology',
    description: 'Medical specialty dealing with disorders of the heart as well as some parts of the circulatory system.',
    subSpecialties: ['Electrophysiology', 'Echocardiography', 'Interventional Cardiology', 'Nuclear Cardiology'],
    commonConditions: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmia', 'Hypertension'],
    typicalProcedures: ['Echocardiogram', 'Cardiac Catheterization', 'ECG/EKG', 'Stress Test'],
    averageConsultationDuration: 30,
    averageConsultationFee: 250,
    requiresReferral: true,
    icon: 'HeartIcon'
  },
  {
    id: 'SPEC002',
    name: 'Dermatology',
    description: 'Branch of medicine dealing with the skin, nails, hair and its diseases.',
    subSpecialties: ['Cosmetic Dermatology', 'Dermatopathology', 'Mohs Surgery', 'Pediatric Dermatology'],
    commonConditions: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer', 'Rosacea'],
    typicalProcedures: ['Skin Biopsy', 'Cryotherapy', 'Excision of Lesions', 'Laser Therapy'],
    averageConsultationDuration: 20,
    averageConsultationFee: 150,
    requiresReferral: false,
    icon: 'SkinIcon'
  },
  {
    id: 'SPEC003',
    name: 'Endocrinology',
    description: 'Specialty concerned with the study of the endocrine system and its diseases, dealing with hormones.',
    subSpecialties: ['Diabetes and Metabolism', 'Endocrine Oncology', 'Pediatric Endocrinology', 'Reproductive Endocrinology'],
    commonConditions: ['Diabetes Mellitus', 'Hypothyroidism', 'Hyperthyroidism', 'PCOS', 'Osteoporosis'],
    typicalProcedures: ['Thyroid Ultrasound', 'Fine Needle Aspiration', 'Bone Density Scan (DEXA)'],
    averageConsultationDuration: 30,
    averageConsultationFee: 200,
    requiresReferral: true,
    icon: 'GlandIcon'
  },
  {
    id: 'SPEC004',
    name: 'Gastroenterology',
    description: 'Branch of medicine focused on the digestive system and its disorders.',
    subSpecialties: ['Hepatology', 'Advanced Endoscopy', 'Inflammatory Bowel Disease', 'Motility'],
    commonConditions: ['GERD', 'Irritable Bowel Syndrome (IBS)', 'Crohn\'s Disease', 'Celiac Disease', 'Liver Cirrhosis'],
    typicalProcedures: ['Endoscopy', 'Colonoscopy', 'ERCP', 'Capsule Endoscopy'],
    averageConsultationDuration: 30,
    averageConsultationFee: 220,
    requiresReferral: true,
    icon: 'StomachIcon'
  },
  {
    id: 'SPEC005',
    name: 'Neurology',
    description: 'Branch of medicine dealing with disorders of the nervous system.',
    subSpecialties: ['Epilepsy', 'Headache Medicine', 'Movement Disorders', 'Neurocritical Care'],
    commonConditions: ['Migraine', 'Parkinson\'s Disease', 'Multiple Sclerosis', 'Epilepsy', 'Alzheimer\'s Disease'],
    typicalProcedures: ['EEG', 'EMG', 'Lumbar Puncture', 'Nerve Conduction Studies'],
    averageConsultationDuration: 45,
    averageConsultationFee: 280,
    requiresReferral: true,
    icon: 'BrainIcon'
  },
  {
    id: 'SPEC006',
    name: 'Orthopedics',
    description: 'Branch of surgery concerned with conditions involving the musculoskeletal system.',
    subSpecialties: ['Sports Medicine', 'Joint Replacement', 'Spine Surgery', 'Hand Surgery'],
    commonConditions: ['Osteoarthritis', 'Fractures', 'Torn Ligaments', 'Carpal Tunnel Syndrome', 'Scoliosis'],
    typicalProcedures: ['Joint Injection', 'Arthroscopy', 'Fracture Repair', 'Joint Replacement'],
    averageConsultationDuration: 30,
    averageConsultationFee: 200,
    requiresReferral: true,
    icon: 'BoneIcon'
  },
  {
    id: 'SPEC007',
    name: 'Pediatrics',
    description: 'Branch of medicine that involves the medical care of infants, children, and adolescents.',
    subSpecialties: ['Neonatology', 'Pediatric Cardiology', 'Pediatric Pulmonology', 'Pediatric Surgery'],
    commonConditions: ['Asthma', 'Ear Infections', 'ADHD', 'Chickenpox', 'Childhood Obesity'],
    typicalProcedures: ['Vaccinations', 'Well-child Checkup', 'Developmental Screening'],
    averageConsultationDuration: 20,
    averageConsultationFee: 120,
    requiresReferral: false,
    icon: 'BabyIcon'
  },
  {
    id: 'SPEC008',
    name: 'Psychiatry',
    description: 'Medical specialty devoted to the diagnosis, prevention, and treatment of mental disorders.',
    subSpecialties: ['Child and Adolescent Psychiatry', 'Geriatric Psychiatry', 'Addiction Psychiatry', 'Forensic Psychiatry'],
    commonConditions: ['Depression', 'Anxiety Disorders', 'Schizophrenia', 'Bipolar Disorder', 'PTSD'],
    typicalProcedures: ['Psychiatric Evaluation', 'Medication Management', 'Psychotherapy'],
    averageConsultationDuration: 45,
    averageConsultationFee: 220,
    requiresReferral: false,
    icon: 'BrainMindIcon'
  }
];
