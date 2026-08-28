/**
 * @fileoverview Medical type definitions for the Healthcare Appointment Management System.
 * Defines medical records, prescriptions, lab results, allergies, and vital signs.
 */

/**
 * Represents a patient's medical record.
 */
export interface MedicalRecord {
  /** Unique identifier for the medical record. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** ID of the doctor who created or last updated the record. */
  doctorId: string;
  /** ID of the associated appointment, if any. */
  appointmentId?: string;
  /** Date the record was created. */
  recordDate: string;
  /** Clinical diagnosis. */
  diagnosis: string;
  /** List of ICD-10 codes associated with the diagnosis. */
  icd10Codes: string[];
  /** Symptoms reported by the patient. */
  symptoms: string[];
  /** Doctor's observations and physical examination notes. */
  observations: string;
  /** Treatment plan and recommendations. */
  treatmentPlan: string;
  /** Follow-up instructions. */
  followUpInstructions?: string;
  /** Array of prescription IDs linked to this record. */
  prescriptionIds: string[];
  /** Array of lab order IDs linked to this record. */
  labOrderIds: string[];
  /** Array of attachment URLs (e.g., scanned documents). */
  attachments: string[];
  /** Timestamp when created. */
  createdAt: string;
  /** Timestamp when last updated. */
  updatedAt: string;
}

/**
 * Represents a medication prescription.
 */
export interface Prescription {
  /** Unique identifier for the prescription. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** ID of the prescribing doctor. */
  doctorId: string;
  /** ID of the associated medical record. */
  medicalRecordId?: string;
  /** Name of the medication. */
  medicationName: string;
  /** Generic name of the medication. */
  genericName?: string;
  /** Dosage amount and unit (e.g., '500 mg'). */
  dosage: string;
  /** Form of the medication (e.g., 'Tablet', 'Capsule', 'Syrup'). */
  form: string;
  /** Route of administration (e.g., 'Oral', 'Intravenous'). */
  route: string;
  /** Frequency of intake (e.g., 'Twice a day', 'Every 8 hours'). */
  frequency: string;
  /** Duration to take the medication (e.g., '7 days', '1 month'). */
  duration: string;
  /** Total quantity to dispense. */
  quantity: number;
  /** Number of refills allowed. */
  refills: number;
  /** Special instructions for the patient or pharmacist. */
  instructions: string;
  /** Indicates if generic substitution is allowed. */
  dispenseAsWritten: boolean;
  /** Status of the prescription. */
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  /** Date prescribed. */
  prescribedDate: string;
  /** Expiration date. */
  expirationDate: string;
}

/**
 * Represents a patient's vital signs reading.
 */
export interface VitalSigns {
  /** Unique identifier for the reading. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** ID of the associated appointment, if any. */
  appointmentId?: string;
  /** ID of the user (e.g., nurse) who recorded the vitals. */
  recordedBy: string;
  /** Date and time recorded. */
  recordedAt: string;
  /** Body temperature in Celsius. */
  temperatureCelsius?: number;
  /** Systolic blood pressure (mmHg). */
  bloodPressureSystolic?: number;
  /** Diastolic blood pressure (mmHg). */
  bloodPressureDiastolic?: number;
  /** Heart rate in beats per minute. */
  heartRate?: number;
  /** Respiratory rate in breaths per minute. */
  respiratoryRate?: number;
  /** Oxygen saturation level (SpO2 percentage). */
  oxygenSaturation?: number;
  /** Weight in kilograms. */
  weightKg?: number;
  /** Height in centimeters. */
  heightCm?: number;
  /** Calculated Body Mass Index. */
  bmi?: number;
  /** Pain level on a scale of 0-10. */
  painLevel?: number;
  /** Additional notes. */
  notes?: string;
}

/**
 * Represents a patient's allergy record.
 */
export interface Allergy {
  /** Unique identifier for the allergy record. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** Type of allergy (e.g., 'DRUG', 'FOOD', 'ENVIRONMENTAL'). */
  allergyType: 'DRUG' | 'FOOD' | 'ENVIRONMENTAL' | 'OTHER';
  /** Name of the allergen (e.g., 'Penicillin', 'Peanuts'). */
  allergen: string;
  /** Severity level. */
  severity: 'MILD' | 'MODERATE' | 'SEVERE' | 'LIFE_THREATENING';
  /** Description of the reaction (e.g., 'Rash', 'Anaphylaxis'). */
  reaction: string;
  /** Date the allergy was first identified. */
  identifiedDate?: string;
  /** Current status of the allergy. */
  status: 'ACTIVE' | 'INACTIVE' | 'RESOLVED';
  /** Clinical notes. */
  notes?: string;
}

/**
 * Represents a laboratory test order.
 */
export interface LabOrder {
  /** Unique identifier for the lab order. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** ID of the ordering doctor. */
  doctorId: string;
  /** ID of the associated medical record. */
  medicalRecordId?: string;
  /** Type of test ordered. */
  testName: string;
  /** Panel or category (e.g., 'Lipid Panel', 'CBC'). */
  testPanel?: string;
  /** Reason for ordering the test. */
  reason: string;
  /** Status of the order. */
  status: 'ORDERED' | 'SAMPLE_COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  /** Priority of the test. */
  priority: 'ROUTINE' | 'URGENT' | 'STAT';
  /** Date ordered. */
  orderedAt: string;
  /** Expected completion date. */
  expectedCompletionDate?: string;
  /** ID of the lab technician processing it. */
  technicianId?: string;
}

/**
 * Represents the results of a laboratory test.
 */
export interface LabResult {
  /** Unique identifier for the result. */
  id: string;
  /** ID of the associated lab order. */
  labOrderId: string;
  /** ID of the patient. */
  patientId: string;
  /** Name of the specific marker tested (e.g., 'Cholesterol, Total'). */
  markerName: string;
  /** Measured value. */
  value: string | number;
  /** Unit of measurement (e.g., 'mg/dL'). */
  unit: string;
  /** Standard reference range (e.g., '125-200'). */
  referenceRange: string;
  /** Flag indicating if the result is abnormal. */
  isAbnormal: boolean;
  /** Interpretation or flag (e.g., 'High', 'Low', 'Normal'). */
  interpretation: 'HIGH' | 'LOW' | 'NORMAL' | 'CRITICAL' | 'INCONCLUSIVE';
  /** Notes from the lab technician or pathologist. */
  notes?: string;
  /** Date and time the result was finalized. */
  finalizedAt: string;
  /** ID of the user who finalized the result. */
  finalizedBy: string;
}
