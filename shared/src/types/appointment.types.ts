/**
 * @fileoverview Appointment type definitions for the Healthcare Appointment Management System.
 * Defines appointment status, types, slots, booking requests, and related structures.
 */

/**
 * Represents the current status of an appointment.
 */
export enum AppointmentStatus {
  /** Appointment has been scheduled but not yet confirmed. */
  SCHEDULED = 'SCHEDULED',
  /** Appointment has been confirmed by the provider or clinic. */
  CONFIRMED = 'CONFIRMED',
  /** Patient has checked in at the clinic. */
  CHECKED_IN = 'CHECKED_IN',
  /** Patient is currently being seen by the doctor. */
  IN_PROGRESS = 'IN_PROGRESS',
  /** Appointment has been completed. */
  COMPLETED = 'COMPLETED',
  /** Appointment was canceled by the patient or provider. */
  CANCELED = 'CANCELED',
  /** Patient did not show up for the appointment. */
  NO_SHOW = 'NO_SHOW',
  /** Appointment requires rescheduling. */
  RESCHEDULING_REQUESTED = 'RESCHEDULING_REQUESTED',
}

/**
 * Represents the type of appointment or consultation.
 */
export enum AppointmentType {
  /** Standard in-person consultation. */
  IN_PERSON = 'IN_PERSON',
  /** Remote video or phone consultation. */
  TELEHEALTH = 'TELEHEALTH',
  /** Home visit by a healthcare professional. */
  HOME_VISIT = 'HOME_VISIT',
  /** Emergency or urgent care visit. */
  URGENT_CARE = 'URGENT_CARE',
  /** Routine follow-up visit. */
  FOLLOW_UP = 'FOLLOW_UP',
  /** Routine health checkup. */
  ROUTINE_CHECKUP = 'ROUTINE_CHECKUP',
  /** Specialized diagnostic procedure or test. */
  DIAGNOSTIC_TEST = 'DIAGNOSTIC_TEST',
  /** Immunization or vaccination appointment. */
  VACCINATION = 'VACCINATION',
}

/**
 * Represents the priority level of an appointment.
 */
export enum AppointmentPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

/**
 * Core appointment interface representing a booking in the system.
 */
export interface Appointment {
  /** Unique identifier for the appointment. */
  id: string;
  /** ID of the patient booking the appointment. */
  patientId: string;
  /** ID of the doctor or provider. */
  doctorId: string;
  /** ID of the clinic or hospital branch. */
  clinicId: string;
  /** The scheduled start time (ISO 8601 format). */
  startTime: string;
  /** The scheduled end time (ISO 8601 format). */
  endTime: string;
  /** The type of appointment. */
  type: AppointmentType;
  /** The current status. */
  status: AppointmentStatus;
  /** Priority level. */
  priority: AppointmentPriority;
  /** Chief complaint or reason for visit provided by the patient. */
  reasonForVisit: string;
  /** Additional notes from the patient. */
  patientNotes?: string;
  /** Notes from the doctor (usually added during or after the visit). */
  doctorNotes?: string;
  /** Internal notes for staff (not visible to patient). */
  staffNotes?: string;
  /** If telehealth, the URL or link to join the meeting. */
  telehealthLink?: string;
  /** Indicates if a reminder has been sent. */
  reminderSent: boolean;
  /** Timestamp when the appointment was created. */
  createdAt: string;
  /** Timestamp when the appointment was last updated. */
  updatedAt: string;
  /** ID of the user who created the appointment (could be patient, receptionist). */
  createdBy: string;
  /** ID of the user who last canceled the appointment, if applicable. */
  canceledBy?: string;
  /** Reason for cancellation, if applicable. */
  cancellationReason?: string;
}

/**
 * Represents a time slot for scheduling.
 */
export interface TimeSlot {
  /** Unique identifier for the slot. */
  id: string;
  /** ID of the doctor this slot belongs to. */
  doctorId: string;
  /** ID of the clinic. */
  clinicId: string;
  /** Start time of the slot. */
  startTime: string;
  /** End time of the slot. */
  endTime: string;
  /** Indicates if the slot is currently available for booking. */
  isAvailable: boolean;
  /** If booked, the ID of the appointment. */
  appointmentId?: string;
  /** Slot type, e.g., 'REGULAR', 'URGENT_ONLY'. */
  slotType: 'REGULAR' | 'URGENT_ONLY' | 'TELEHEALTH_ONLY' | 'WALK_IN';
}

/**
 * Request payload for creating a new appointment.
 */
export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  clinicId: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  reasonForVisit: string;
  patientNotes?: string;
  priority?: AppointmentPriority;
}

/**
 * Request payload for updating an existing appointment.
 */
export interface UpdateAppointmentRequest {
  status?: AppointmentStatus;
  startTime?: string;
  endTime?: string;
  type?: AppointmentType;
  reasonForVisit?: string;
  doctorNotes?: string;
  staffNotes?: string;
  telehealthLink?: string;
}

/**
 * Represents a doctor's working schedule for a specific day.
 */
export interface DailySchedule {
  /** ID of the schedule record. */
  id: string;
  /** ID of the doctor. */
  doctorId: string;
  /** ID of the clinic. */
  clinicId: string;
  /** The date this schedule applies to (YYYY-MM-DD). */
  date: string;
  /** Shift start time (e.g., '09:00'). */
  shiftStartTime: string;
  /** Shift end time (e.g., '17:00'). */
  shiftEndTime: string;
  /** List of break periods during the day. */
  breaks: { startTime: string; endTime: string; description?: string }[];
  /** Standard duration of an appointment in minutes. */
  slotDurationMinutes: number;
  /** Buffer time between appointments in minutes. */
  bufferMinutes: number;
  /** Indicates if the doctor is on leave or unavailable for the entire day. */
  isUnavailable: boolean;
  /** Reason for unavailability (e.g., 'VACATION', 'SICK_LEAVE'). */
  unavailabilityReason?: string;
}

/**
 * Filter parameters for searching appointments.
 */
export interface AppointmentFilter {
  patientId?: string;
  doctorId?: string;
  clinicId?: string;
  status?: AppointmentStatus | AppointmentStatus[];
  type?: AppointmentType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'startTime' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
