/**
 * @fileoverview Role-based permissions matrix for the Healthcare Appointment Management System.
 */
import { UserRole } from '../types/user.types';

export enum ResourceType {
  APPOINTMENT = 'APPOINTMENT',
  PATIENT_RECORD = 'PATIENT_RECORD',
  MEDICAL_RECORD = 'MEDICAL_RECORD',
  PRESCRIPTION = 'PRESCRIPTION',
  LAB_RESULT = 'LAB_RESULT',
  INVOICE = 'INVOICE',
  USER = 'USER',
  CLINIC_SCHEDULE = 'CLINIC_SCHEDULE'
}

export enum Action {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE'
}

type PermissionMap = Record<UserRole, Record<ResourceType, Action[]>>;

export const Permissions: PermissionMap = {
  [UserRole.ADMIN]: {
    APPOINTMENT: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
    PATIENT_RECORD: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
    MEDICAL_RECORD: [Action.READ],
    PRESCRIPTION: [Action.READ],
    LAB_RESULT: [Action.READ],
    INVOICE: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
    USER: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
    CLINIC_SCHEDULE: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
  },
  [UserRole.DOCTOR]: {
    APPOINTMENT: [Action.READ, Action.UPDATE],
    PATIENT_RECORD: [Action.READ],
    MEDICAL_RECORD: [Action.CREATE, Action.READ, Action.UPDATE],
    PRESCRIPTION: [Action.CREATE, Action.READ, Action.UPDATE],
    LAB_RESULT: [Action.READ, Action.UPDATE, Action.APPROVE],
    INVOICE: [Action.READ],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [Action.READ, Action.UPDATE],
  },
  [UserRole.PATIENT]: {
    APPOINTMENT: [Action.CREATE, Action.READ, Action.UPDATE],
    PATIENT_RECORD: [Action.READ, Action.UPDATE],
    MEDICAL_RECORD: [Action.READ],
    PRESCRIPTION: [Action.READ],
    LAB_RESULT: [Action.READ],
    INVOICE: [Action.READ],
    USER: [Action.READ, Action.UPDATE],
    CLINIC_SCHEDULE: [Action.READ],
  },
  [UserRole.NURSE]: {
    APPOINTMENT: [Action.READ, Action.UPDATE],
    PATIENT_RECORD: [Action.READ, Action.UPDATE],
    MEDICAL_RECORD: [Action.READ, Action.UPDATE],
    PRESCRIPTION: [Action.READ],
    LAB_RESULT: [Action.READ],
    INVOICE: [],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [Action.READ],
  },
  [UserRole.RECEPTIONIST]: {
    APPOINTMENT: [Action.CREATE, Action.READ, Action.UPDATE],
    PATIENT_RECORD: [Action.CREATE, Action.READ, Action.UPDATE],
    MEDICAL_RECORD: [],
    PRESCRIPTION: [],
    LAB_RESULT: [],
    INVOICE: [Action.READ],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [Action.READ],
  },
  [UserRole.PHARMACIST]: {
    APPOINTMENT: [],
    PATIENT_RECORD: [Action.READ],
    MEDICAL_RECORD: [Action.READ],
    PRESCRIPTION: [Action.READ, Action.UPDATE],
    LAB_RESULT: [],
    INVOICE: [Action.CREATE, Action.READ],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [],
  },
  [UserRole.LAB_TECHNICIAN]: {
    APPOINTMENT: [],
    PATIENT_RECORD: [Action.READ],
    MEDICAL_RECORD: [Action.READ],
    PRESCRIPTION: [],
    LAB_RESULT: [Action.CREATE, Action.READ, Action.UPDATE],
    INVOICE: [],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [],
  },
  [UserRole.BILLING_STAFF]: {
    APPOINTMENT: [Action.READ],
    PATIENT_RECORD: [Action.READ],
    MEDICAL_RECORD: [],
    PRESCRIPTION: [],
    LAB_RESULT: [],
    INVOICE: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE, Action.APPROVE],
    USER: [Action.READ],
    CLINIC_SCHEDULE: [],
  },
};
