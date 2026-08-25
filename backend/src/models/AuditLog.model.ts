import mongoose, { Document, Schema } from 'mongoose';

export enum AuditAction {
  USER_CREATED = 'user_created',
  USER_UPDATED = 'user_updated',
  USER_DELETED = 'user_deleted',
  USER_SUSPENDED = 'user_suspended',
  USER_REACTIVATED = 'user_reactivated',
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_LOGIN_FAILED = 'user_login_failed',
  USER_PASSWORD_CHANGED = 'user_password_changed',
  USER_PASSWORD_RESET = 'user_password_reset',
  DOCTOR_VERIFIED = 'doctor_verified',
  DOCTOR_UNVERIFIED = 'doctor_unverified',
  APPOINTMENT_CREATED = 'appointment_created',
  APPOINTMENT_CONFIRMED = 'appointment_confirmed',
  APPOINTMENT_CANCELLED = 'appointment_cancelled',
  APPOINTMENT_RESCHEDULED = 'appointment_rescheduled',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  CONSULTATION_CREATED = 'consultation_created',
  CONSULTATION_UPDATED = 'consultation_updated',
  PRESCRIPTION_CREATED = 'prescription_created',
  PRESCRIPTION_UPDATED = 'prescription_updated',
  DOCUMENT_UPLOADED = 'document_uploaded',
  DOCUMENT_DELETED = 'document_deleted',
  DOCUMENT_SHARED = 'document_shared',
  SCHEDULE_CREATED = 'schedule_created',
  SCHEDULE_UPDATED = 'schedule_updated',
  SCHEDULE_DELETED = 'schedule_deleted',
  SPECIALIZATION_CREATED = 'specialization_created',
  SPECIALIZATION_UPDATED = 'specialization_updated',
  SPECIALIZATION_DELETED = 'specialization_deleted',
  ADMIN_ACTION = 'admin_action',
  SYSTEM_CONFIG_CHANGED = 'system_config_changed',
  DATA_EXPORT = 'data_export',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
}

export enum AuditSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface IAuditLog extends Document {
  action: AuditAction;
  performedBy: mongoose.Types.ObjectId;
  targetUser?: mongoose.Types.ObjectId;
  targetEntity?: {
    entityType: string;
    entityId: mongoose.Types.ObjectId;
  };
  description: string;
  severity: AuditSeverity;
  ipAddress?: string;
  userAgent?: string;
  requestMethod?: string;
  requestUrl?: string;
  requestBody?: Record<string, any>;
  responseStatus?: number;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  metadata?: Record<string, any>;
  sessionId?: string;
  duration?: number;
  isSuccess: boolean;
  errorMessage?: string;
  createdAt: Date;
}

const targetEntitySchema = new Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: [
        'user', 'patient', 'doctor', 'appointment', 'consultation',
        'prescription', 'document', 'schedule', 'specialization',
        'notification', 'system',
      ],
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { _id: false }
);

const auditLogSchema = new Schema<IAuditLog>(
  {
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: Object.values(AuditAction),
    },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Performer reference is required'],
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    targetEntity: targetEntitySchema,
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    severity: {
      type: String,
      enum: Object.values(AuditSeverity),
      default: AuditSeverity.LOW,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
      maxlength: [500, 'User agent cannot exceed 500 characters'],
    },
    requestMethod: {
      type: String,
      trim: true,
      enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
    requestUrl: {
      type: String,
      trim: true,
      maxlength: [500, 'Request URL cannot exceed 500 characters'],
    },
    requestBody: {
      type: Schema.Types.Mixed,
    },
    responseStatus: {
      type: Number,
    },
    previousValues: {
      type: Schema.Types.Mixed,
    },
    newValues: {
      type: Schema.Types.Mixed,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    sessionId: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: 0,
    },
    isSuccess: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      trim: true,
      maxlength: [1000, 'Error message cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

auditLogSchema.index({ performedBy: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ targetUser: 1, createdAt: -1 });
auditLogSchema.index({ severity: 1 });
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ 'targetEntity.entityType': 1, 'targetEntity.entityId': 1 });

const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);

export default AuditLog;
