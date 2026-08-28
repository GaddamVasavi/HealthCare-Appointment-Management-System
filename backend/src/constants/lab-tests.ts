/**
 * @file lab-tests.ts
 * @description Comprehensive typed array of laboratory tests for the Healthcare system.
 * Expanded to cover hematology, chemistry, endocrinology, urinalysis, and immunology.
 */

export interface ILabTest {
  id: string;
  code: string;
  name: string;
  category: string;
  specimen: string;
  normalRange: { min?: number; max?: number; unit: string; notes?: string };
  turnaroundTime: string;
  cost: number;
  requiresFasting: boolean;
  description: string;
}

export const LAB_TESTS: ILabTest[] = [
  {
    id: 'LT001',
    code: '85025',
    name: 'Complete Blood Count (CBC) with Differential',
    category: 'Hematology',
    specimen: 'Blood (Lavender Top)',
    normalRange: { notes: 'Varies by component (WBC, RBC, Hgb, Hct, Plt)', unit: 'mixed' },
    turnaroundTime: '24 hours',
    cost: 45.00,
    requiresFasting: false,
    description: 'Measures components of blood, including RBC, WBC, and platelets.'
  },
  {
    id: 'LT002',
    code: '80053',
    name: 'Comprehensive Metabolic Panel (CMP)',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { notes: 'Varies by component (Glucose, Calcium, BUN, Liver enzymes)', unit: 'mixed' },
    turnaroundTime: '24 hours',
    cost: 55.00,
    requiresFasting: true,
    description: 'Panel of 14 blood tests detailing body\'s metabolism.'
  },
  {
    id: 'LT003',
    code: '80061',
    name: 'Lipid Panel',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { notes: 'Total Cholesterol < 200, LDL < 100, HDL > 40', unit: 'mg/dL' },
    turnaroundTime: '24 hours',
    cost: 40.00,
    requiresFasting: true,
    description: 'Measures total cholesterol, LDL, HDL, and triglycerides.'
  },
  {
    id: 'LT004',
    code: '84443',
    name: 'Thyroid Stimulating Hormone (TSH)',
    category: 'Endocrinology',
    specimen: 'Blood (SST)',
    normalRange: { min: 0.4, max: 4.0, unit: 'mIU/L' },
    turnaroundTime: '24-48 hours',
    cost: 35.00,
    requiresFasting: false,
    description: 'Evaluates thyroid gland function.'
  },
  {
    id: 'LT005',
    code: '83036',
    name: 'Hemoglobin A1c (HbA1c)',
    category: 'Endocrinology',
    specimen: 'Blood (Lavender Top)',
    normalRange: { min: 4.0, max: 5.6, unit: '%' },
    turnaroundTime: '24 hours',
    cost: 45.00,
    requiresFasting: false,
    description: 'Measures average blood sugar levels over the past 2-3 months.'
  },
  {
    id: 'LT006',
    code: '81000',
    name: 'Urinalysis, Complete',
    category: 'Urinalysis',
    specimen: 'Urine',
    normalRange: { notes: 'Negative for glucose, ketones, blood, protein.', unit: 'N/A' },
    turnaroundTime: '2-4 hours',
    cost: 25.00,
    requiresFasting: false,
    description: 'Examination of urine properties to detect disorders.'
  },
  {
    id: 'LT007',
    code: '82306',
    name: 'Vitamin D, 25-Hydroxy',
    category: 'Vitamins/Minerals',
    specimen: 'Blood (SST)',
    normalRange: { min: 30.0, max: 100.0, unit: 'ng/mL' },
    turnaroundTime: '48-72 hours',
    cost: 65.00,
    requiresFasting: false,
    description: 'Determines vitamin D deficiency or toxicity.'
  },
  {
    id: 'LT008',
    code: '85610',
    name: 'Prothrombin Time (PT) / INR',
    category: 'Coagulation',
    specimen: 'Blood (Light Blue Top)',
    normalRange: { min: 0.8, max: 1.1, unit: 'INR' },
    turnaroundTime: '24 hours',
    cost: 30.00,
    requiresFasting: false,
    description: 'Evaluates blood clotting capabilities.'
  },
  {
    id: 'LT009',
    code: '82040',
    name: 'Albumin, Serum',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 3.4, max: 5.4, unit: 'g/dL' },
    turnaroundTime: '24 hours',
    cost: 20.00,
    requiresFasting: false,
    description: 'Measures the amount of albumin in the clear liquid portion of the blood.'
  },
  {
    id: 'LT010',
    code: '82247',
    name: 'Bilirubin, Total',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 0.1, max: 1.2, unit: 'mg/dL' },
    turnaroundTime: '24 hours',
    cost: 22.00,
    requiresFasting: false,
    description: 'Evaluates liver function by measuring total bilirubin.'
  },
  {
    id: 'LT011',
    code: '82565',
    name: 'Creatinine, Serum',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 0.6, max: 1.2, unit: 'mg/dL' },
    turnaroundTime: '24 hours',
    cost: 25.00,
    requiresFasting: false,
    description: 'Measures kidney function.'
  },
  {
    id: 'LT012',
    code: '82947',
    name: 'Glucose, Fasting',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 70, max: 99, unit: 'mg/dL' },
    turnaroundTime: '24 hours',
    cost: 18.00,
    requiresFasting: true,
    description: 'Measures blood sugar level after fasting.'
  },
  {
    id: 'LT013',
    code: '83540',
    name: 'Iron, Total',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 60, max: 170, unit: 'mcg/dL' },
    turnaroundTime: '24 hours',
    cost: 28.00,
    requiresFasting: true,
    description: 'Measures the amount of iron in the blood.'
  },
  {
    id: 'LT014',
    code: '84155',
    name: 'Protein, Total',
    category: 'Chemistry',
    specimen: 'Blood (SST)',
    normalRange: { min: 6.0, max: 8.3, unit: 'g/dL' },
    turnaroundTime: '24 hours',
    cost: 20.00,
    requiresFasting: false,
    description: 'Measures the total amount of two classes of proteins found in the fluid portion of your blood.'
  },
  {
    id: 'LT015',
    code: '84436',
    name: 'Thyroxine (T4), Free',
    category: 'Endocrinology',
    specimen: 'Blood (SST)',
    normalRange: { min: 0.9, max: 1.7, unit: 'ng/dL' },
    turnaroundTime: '24-48 hours',
    cost: 32.00,
    requiresFasting: false,
    description: 'Measures the free, unbound form of T4.'
  }
];
