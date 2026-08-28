/**
 * @fileoverview Comprehensive user type definitions for the Healthcare Appointment Management System.
 * Defines roles, permissions, user profiles, and specialized user types.
 */

/**
 * Represents the primary roles within the healthcare system.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
  PHARMACIST = 'PHARMACIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  BILLING_STAFF = 'BILLING_STAFF',
}

/**
 * Represents the current status of a user account.
 */
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ARCHIVED = 'ARCHIVED',
}

/**
 * Represents a user's address information.
 */
export interface Address {
  /** The primary street address. */
  street1: string;
  /** Secondary address information, e.g., apartment number. */
  street2?: string;
  /** The city name. */
  city: string;
  /** The state or province. */
  state: string;
  /** The postal code or ZIP code. */
  zipCode: string;
  /** The country code, preferably ISO 3166-1 alpha-2. */
  country: string;
  /** Geographical latitude for location-based services. */
  latitude?: number;
  /** Geographical longitude for location-based services. */
  longitude?: number;
}

/**
 * Represents a user's contact information.
 */
export interface ContactInfo {
  /** Primary email address used for login and communication. */
  email: string;
  /** Primary phone number. */
  phone: string;
  /** Alternative phone number. */
  alternatePhone?: string;
  /** Emergency contact name. */
  emergencyContactName?: string;
  /** Emergency contact phone number. */
  emergencyContactPhone?: string;
  /** Emergency contact relationship to the user. */
  emergencyContactRelationship?: string;
}

/**
 * Base User interface containing common properties for all user types.
 */
export interface BaseUser {
  /** Unique identifier for the user. */
  id: string;
  /** First name. */
  firstName: string;
  /** Last name. */
  lastName: string;
  /** Middle name, if any. */
  middleName?: string;
  /** Date of birth in YYYY-MM-DD format. */
  dateOfBirth: string;
  /** User's gender. */
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  /** The role assigned to the user. */
  role: UserRole;
  /** The current status of the user's account. */
  status: UserStatus;
  /** URL to the user's profile picture. */
  profilePictureUrl?: string;
  /** Contact information details. */
  contact: ContactInfo;
  /** Physical address details. */
  address: Address;
  /** Timestamp when the user was created. */
  createdAt: string;
  /** Timestamp when the user was last updated. */
  updatedAt: string;
  /** Timestamp of the last login. */
  lastLoginAt?: string;
}

/**
 * Represents a Patient user in the system.
 */
export interface Patient extends BaseUser {
  role: UserRole.PATIENT;
  /** Medical Record Number, a unique identifier in the healthcare system. */
  mrn: string;
  /** Primary insurance provider name. */
  insuranceProvider?: string;
  /** Insurance policy number. */
  insurancePolicyNumber?: string;
  /** ID of the primary care physician assigned to the patient. */
  primaryCarePhysicianId?: string;
  /** Patient's blood type. */
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  /** Patient's preferred language. */
  preferredLanguage?: string;
}

/**
 * Represents a Doctor/Physician in the system.
 */
export interface Doctor extends BaseUser {
  role: UserRole.DOCTOR;
  /** Medical license number. */
  licenseNumber: string;
  /** Doctor's primary specialty (e.g., Cardiology, Pediatrics). */
  specialty: string;
  /** List of secondary specialties or sub-specialties. */
  subSpecialties?: string[];
  /** Years of experience. */
  yearsOfExperience: number;
  /** Educational qualifications (e.g., MD, MBBS). */
  qualifications: string[];
  /** Board certifications. */
  boardCertifications: string[];
  /** Affiliated hospitals or clinics. */
  affiliations: string[];
  /** Standard consultation fee. */
  consultationFee: number;
  /** A brief biography or professional summary. */
  bio?: string;
  /** The department ID the doctor belongs to. */
  departmentId: string;
  /** Indicates if the doctor is currently accepting new patients. */
  acceptingNewPatients: boolean;
}

/**
 * Represents a Nurse in the system.
 */
export interface Nurse extends BaseUser {
  role: UserRole.NURSE;
  /** Nursing license number. */
  licenseNumber: string;
  /** Specific nursing department or ward. */
  department: string;
  /** Supervising doctor's ID, if applicable. */
  supervisorId?: string;
  /** Nursing specialty, if any. */
  specialty?: string;
}

/**
 * Represents an Administrative user in the system.
 */
export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
  /** Specific admin level or title. */
  adminLevel: 'SUPER_ADMIN' | 'HOSPITAL_ADMIN' | 'SYSTEM_ADMIN';
  /** List of managed department IDs. */
  managedDepartments?: string[];
}

/**
 * Represents a generic staff member like Receptionist, Lab Technician, etc.
 */
export interface Staff extends BaseUser {
  role: UserRole.RECEPTIONIST | UserRole.LAB_TECHNICIAN | UserRole.BILLING_STAFF | UserRole.PHARMACIST;
  /** Employee ID number. */
  employeeId: string;
  /** Department ID where the staff works. */
  departmentId: string;
  /** Name of the immediate supervisor. */
  supervisorName?: string;
  /** Staff's specific shift (e.g., 'MORNING', 'NIGHT'). */
  shift?: string;
}

/**
 * Union type representing any user in the system.
 */
export type AnyUser = Patient | Doctor | Nurse | Admin | Staff;

/**
 * Interface for user preferences.
 */
export interface UserPreferences {
  /** User ID these preferences belong to. */
  userId: string;
  /** Enable email notifications. */
  emailNotifications: boolean;
  /** Enable SMS notifications. */
  smsNotifications: boolean;
  /** Enable push notifications. */
  pushNotifications: boolean;
  /** Preferred theme (e.g., 'light', 'dark', 'system'). */
  theme: 'light' | 'dark' | 'system';
  /** Timezone for displaying times. */
  timezone: string;
  /** Preferred language code (e.g., 'en-US', 'es-ES'). */
  language: string;
}
