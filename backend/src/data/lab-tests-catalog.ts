export interface ILabTestEntry {
  id: string;
  loincCode: string;
  testName: string;
  commonName: string;
  category: string;
  specimen: string;
  container: string;
  volume: string;
  transportCondition: string;
  normalRange: {
    male?: { min: number; max: number };
    female?: { min: number; max: number };
    pediatric?: { min: number; max: number };
    unit: string;
    criticalLow?: number;
    criticalHigh?: number;
  };
  turnaroundTime: string;
  cost: number;
  requiresFasting: boolean;
  clinicalSignificance: string;
  interfering: string[];
}

export const labTestsCatalog: ILabTestEntry[] = [
  {
    id: 'LT-001',
    loincCode: '1751-7',
    testName: 'Albumin, Serum',
    commonName: 'Albumin',
    category: 'Chemistry',
    specimen: 'Serum',
    container: 'SST or Red Top',
    volume: '1.0 mL',
    transportCondition: 'Refrigerated',
    normalRange: {
      male: { min: 3.5, max: 5.2 },
      female: { min: 3.5, max: 5.2 },
      pediatric: { min: 3.8, max: 5.4 },
      unit: 'g/dL',
      criticalLow: 1.5
    },
    turnaroundTime: '1 day',
    cost: 15.00,
    requiresFasting: false,
    clinicalSignificance: 'Evaluates nutritional status, liver function, and kidney disease.',
    interfering: ['Hemolysis', 'Lipemia', 'Bilirubin']
  },
  {
    id: 'LT-002',
    loincCode: '4544-3',
    testName: 'Hematocrit',
    commonName: 'HCT',
    category: 'Hematology',
    specimen: 'Whole Blood',
    container: 'Lavender Top (EDTA)',
    volume: '2.0 mL',
    transportCondition: 'Room Temperature',
    normalRange: {
      male: { min: 38.3, max: 48.6 },
      female: { min: 35.5, max: 44.9 },
      pediatric: { min: 36, max: 40 },
      unit: '%',
      criticalLow: 20,
      criticalHigh: 60
    },
    turnaroundTime: '4 hours',
    cost: 12.50,
    requiresFasting: false,
    clinicalSignificance: 'Measures the proportion of red blood cells in the blood; used to evaluate anemia, polycythemia, and hydration status.',
    interfering: ['Cold agglutinins', 'High white blood cell count']
  },
  {
    id: 'LT-003',
    loincCode: '14927-8',
    testName: 'Hemoglobin A1c',
    commonName: 'HbA1c',
    category: 'Chemistry',
    specimen: 'Whole Blood',
    container: 'Lavender Top (EDTA)',
    volume: '1.0 mL',
    transportCondition: 'Refrigerated',
    normalRange: {
      male: { min: 4.0, max: 5.6 },
      female: { min: 4.0, max: 5.6 },
      unit: '%',
      criticalHigh: 9.0
    },
    turnaroundTime: '1-2 days',
    cost: 25.00,
    requiresFasting: false,
    clinicalSignificance: 'Reflects average blood glucose levels over the past 2-3 months; used for diabetes diagnosis and monitoring.',
    interfering: ['Hemoglobinopathies', 'Hemolytic anemia', 'Recent blood transfusion']
  },
  {
    id: 'LT-004',
    loincCode: '2093-3',
    testName: 'Cholesterol, Total',
    commonName: 'Total Cholesterol',
    category: 'Chemistry',
    specimen: 'Serum',
    container: 'SST or Red Top',
    volume: '1.0 mL',
    transportCondition: 'Refrigerated',
    normalRange: {
      male: { min: 125, max: 200 },
      female: { min: 125, max: 200 },
      unit: 'mg/dL'
    },
    turnaroundTime: '1 day',
    cost: 18.00,
    requiresFasting: true,
    clinicalSignificance: 'Assesses the risk of developing cardiovascular disease.',
    interfering: ['Ascorbic acid', 'Bilirubin']
  },
  {
    id: 'LT-005',
    loincCode: '3094-0',
    testName: 'Blood Urea Nitrogen',
    commonName: 'BUN',
    category: 'Chemistry',
    specimen: 'Serum or Plasma',
    container: 'SST or Green Top',
    volume: '1.0 mL',
    transportCondition: 'Refrigerated',
    normalRange: {
      male: { min: 8, max: 24 },
      female: { min: 6, max: 21 },
      pediatric: { min: 5, max: 18 },
      unit: 'mg/dL',
      criticalHigh: 100
    },
    turnaroundTime: '1 day',
    cost: 14.00,
    requiresFasting: false,
    clinicalSignificance: 'Evaluates kidney function and hydration status.',
    interfering: ['High protein diet', 'Gastrointestinal bleeding']
  }
];
