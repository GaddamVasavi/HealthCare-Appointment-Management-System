/**
 * MediCare Connect - Shared Enterprise Clinical Types & Data Transfer Objects (DTOs)
 */

export type ClinicalEncounterType = 'INITIAL_CONSULTATION' | 'ROUTINE_FOLLOW_UP' | 'ACUTE_URGENT' | 'TELEHEALTH_VIRTUAL' | 'ANNUAL_PREVENTIVE' | 'POST_DISCHARGE';

export type TriageAcuityLevel = 'LEVEL_1_RESUSCITATION' | 'LEVEL_2_EMERGENT' | 'LEVEL_3_URGENT' | 'LEVEL_4_LESS_URGENT' | 'LEVEL_5_NON_URGENT';

export interface VitalSignsMeasurement {
  id?: string;
  patientId: string;
  recordedAt: string;
  systolicBpMmHg: number;
  diastolicBpMmHg: number;
  heartRateBpm: number;
  respiratoryRateBpm: number;
  temperatureCelsius: number;
  spo2Percent: number;
  painScale0To10: number;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  bloodGlucoseMgDl?: number;
}

export interface ClinicalDiagnosisItem {
  code: string; // ICD-10-CM
  description: string;
  category: string;
  isPrimary: boolean;
  onsetDate?: string;
  status: 'ACTIVE' | 'RESOLVED' | 'CHRONIC' | 'REMISSION';
  hccScore?: number;
}

export interface ClinicalProcedureItem {
  code: string; // CPT-4 / HCPCS
  description: string;
  modifiers: string[];
  units: number;
  fee: number;
  performingProviderNpi: string;
  diagnosisPointers: number[];
}

export interface PrescriptionOrder {
  prescriptionId: string;
  patientId: string;
  providerId: string;
  medicationName: string;
  genericName: string;
  rxcui?: string;
  dosage: string;
  route: 'ORAL' | 'TOPICAL' | 'INHALATION' | 'INTRAVENOUS' | 'SUBCUTANEOUS' | 'INTRAMUSCULAR' | 'OPHTHALMIC' | 'OTIC';
  frequency: string;
  quantity: number;
  refillsAllowed: number;
  dispenseAsWritten: boolean;
  prescribedDate: string;
  expirationDate: string;
  specialInstructions?: string;
  deaSchedule?: string;
}

export interface LabOrderRequest {
  orderId: string;
  patientId: string;
  orderingProviderId: string;
  orderDate: string;
  testCodes: string[]; // LOINC
  clinicalIndication: string;
  fastingRequired: boolean;
  priority: 'ROUTINE' | 'URGENT' | 'STAT';
}

export interface LabResultReport {
  reportId: string;
  orderId: string;
  patientId: string;
  specimenCollectionDate: string;
  resultDate: string;
  performingLabName: string;
  results: Array<{
    loincCode: string;
    testName: string;
    value: number | string;
    unit: string;
    referenceRange: string;
    flag: 'NORMAL' | 'LOW' | 'HIGH' | 'CRITICAL_LOW' | 'CRITICAL_HIGH';
  }>;
  overallStatus: 'FINAL' | 'PRELIMINARY' | 'AMENDED';
  pathologistNotes?: string;
}
