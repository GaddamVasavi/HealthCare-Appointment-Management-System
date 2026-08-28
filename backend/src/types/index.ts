/**
 * @file index.ts
 * @description Comprehensive TypeScript type definitions for the Healthcare Appointment Management System.
 * Contains interfaces, enums, and types for all domain entities.
 */

/**
 * User Roles within the system
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  RECEPTIONIST = 'RECEPTIONIST',
  NURSE = 'NURSE'
}

/**
 * Gender options
 */
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY'
}

/**
 * Blood Groups
 */
export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

/**
 * Address Interface
 */
export interface IAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Base User Interface
 */
export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
  address: IAddress;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

/**
 * Insurance Information
 */
export interface IInsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expirationDate: Date;
  isVerified: boolean;
}

/**
 * Patient Interface
 */
export interface IPatient {
  userId: string;
  bloodGroup: BloodGroup;
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceInfo?: IInsuranceInfo;
  medicalHistory: string[];
  primaryDoctorId?: string;
  registrationDate: Date;
}

export interface IPatientDocument extends IPatient, Document {}

/**
 * Doctor Availability Schedule
 */
export interface IDoctorAvailability {
  dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isAvailable: boolean;
}

/**
 * Doctor Interface
 */
export interface IDoctor {
  userId: string;
  licenseNumber: string;
  specializations: string[];
  qualifications: string[];
  experience: number; // in years
  consultationFee: number;
  bio: string;
  availability: IDoctorAvailability[];
  rating: number;
  totalReviews: number;
  departmentId: string;
  isAcceptingPatients: boolean;
}

export interface IDoctorDocument extends IDoctor, Document {}

/**
 * Appointment Status Enums
 */
export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

/**
 * Appointment Type Enums
 */
export enum AppointmentType {
  IN_PERSON = 'IN_PERSON',
  TELEHEALTH = 'TELEHEALTH',
  HOME_VISIT = 'HOME_VISIT'
}

/**
 * Priority Enums
 */
export enum Priority {
  ROUTINE = 'ROUTINE',
  URGENT = 'URGENT',
  EMERGENCY = 'EMERGENCY'
}

/**
 * Appointment Interface
 */
export interface IAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledDate: Date;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  symptoms: string[];
  priority: Priority;
  notes?: string;
  followUpDate?: Date;
  cancelReason?: string;
  rescheduledFrom?: string; // Original appointment ID if rescheduled
  roomNumber?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
}

export interface IAppointmentDocument extends IAppointment, Document {}

/**
 * Medical Record Interface
 */
export interface IMedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  visitDate: Date;
  chiefComplaint: string;
  diagnosis: string[]; // ICD-10 codes
  treatmentPlan: string;
  notes: string;
  attachments?: string[]; // URLs to documents
}

/**
 * Prescription Interface
 */
export interface IPrescription {
  id: string;
  recordId: string;
  medicationId: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refillsAllowed: number;
  prescribedDate: Date;
}

/**
 * Lab Order Interface
 */
export interface ILabOrder {
  id: string;
  patientId: string;
  doctorId: string;
  testIds: string[]; // Reference to ILabTest IDs
  orderDate: Date;
  status: 'PENDING' | 'SAMPLE_COLLECTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  priority: Priority;
  notes?: string;
}

/**
 * Lab Result Interface
 */
export interface ILabResult {
  id: string;
  orderId: string;
  testId: string;
  resultValue: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
  remarks?: string;
  verifiedBy?: string; // Lab technician or doctor ID
  resultDate: Date;
}

/**
 * Vital Signs Interface
 */
export interface IVitalSigns {
  id: string;
  patientId: string;
  appointmentId?: string;
  recordedAt: Date;
  temperature: number; // Celsius
  bloodPressureSys: number;
  bloodPressureDia: number;
  heartRate: number; // bpm
  respiratoryRate: number; // breaths per minute
  oxygenSaturation: number; // %
  height: number; // cm
  weight: number; // kg
  bmi: number;
}

/**
 * Financial and Billing Enums
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PARTIALLY_PAID = 'PARTIALLY_PAID'
}

/**
 * Invoice Interface
 */
export interface IInvoice {
  id: string;
  patientId: string;
  appointmentId?: string;
  issuedDate: Date;
  dueDate: Date;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  balanceDue: number;
  status: PaymentStatus;
  items: IInvoiceItem[];
}

/**
 * Invoice Item Interface
 */
export interface IInvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: 'CONSULTATION' | 'PROCEDURE' | 'LAB_TEST' | 'MEDICATION' | 'OTHER';
  referenceId?: string; // Procedure, Lab Test, etc. ID
}

/**
 * Payment Interface
 */
export interface IPayment {
  id: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  paymentDate: Date;
  method: 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'BANK_TRANSFER' | 'INSURANCE';
  transactionId?: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

/**
 * Insurance Claim Interface
 */
export interface IInsuranceClaim {
  id: string;
  invoiceId: string;
  patientId: string;
  insuranceInfo: IInsuranceInfo;
  claimAmount: number;
  approvedAmount?: number;
  submissionDate: Date;
  status: ClaimStatus;
  denialReason?: string;
  processedDate?: Date;
}

/**
 * Department Interface
 */
export interface IDepartment {
  id: string;
  name: string;
  description: string;
  headDoctorId?: string;
  location: string;
  contactNumber: string;
}

/**
 * Notification Types
 */
export enum NotificationType {
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  STATUS_UPDATE = 'STATUS_UPDATE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
  TEST_RESULT = 'TEST_RESULT',
  BILLING = 'BILLING'
}

/**
 * Notification Interface
 */
export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}

/**
 * Pagination & API Interfaces
 */
export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export interface ISearchFilters {
  [key: string]: any;
}
