export { default as User, UserRole, UserStatus, Gender } from './User.model';
export type { IUser } from './User.model';

export { default as Patient, BloodGroup } from './Patient.model';
export type { IPatient, IEmergencyContact, IMedicalHistory, IAllergy, IInsurance } from './Patient.model';

export { default as Doctor } from './Doctor.model';
export type { IDoctor, IQualification, IExperience, IAward } from './Doctor.model';

export { default as Specialization } from './Specialization.model';
export type { ISpecialization } from './Specialization.model';

export { default as Schedule, DayOfWeek } from './Schedule.model';
export type { ISchedule, IScheduleDay, IBreakPeriod, IUnavailableDate } from './Schedule.model';

export { default as Appointment, AppointmentStatus, AppointmentType, CancellationReason } from './Appointment.model';
export type { IAppointment, IStatusHistory } from './Appointment.model';

export { default as Consultation, ConsultationStatus } from './Consultation.model';
export type { IConsultation, IVitalSigns } from './Consultation.model';

export { default as Prescription, PrescriptionStatus } from './Prescription.model';
export type { IPrescription, IMedicine } from './Prescription.model';

export { default as MedicalDocument, DocumentType, DocumentStatus } from './Document.model';
export type { IMedicalDocument } from './Document.model';

export { default as Notification, NotificationType, NotificationPriority } from './Notification.model';
export type { INotification } from './Notification.model';

export { default as AuditLog, AuditAction, AuditSeverity } from './AuditLog.model';
export type { IAuditLog } from './AuditLog.model';
