import mongoose, { Document, Schema } from 'mongoose';

export enum NotificationType {
  APPOINTMENT_CREATED = 'appointment_created',
  APPOINTMENT_CONFIRMED = 'appointment_confirmed',
  APPOINTMENT_CANCELLED = 'appointment_cancelled',
  APPOINTMENT_RESCHEDULED = 'appointment_rescheduled',
  APPOINTMENT_REMINDER = 'appointment_reminder',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  PRESCRIPTION_CREATED = 'prescription_created',
  CONSULTATION_COMPLETED = 'consultation_completed',
  DOCUMENT_UPLOADED = 'document_uploaded',
  DOCUMENT_SHARED = 'document_shared',
  ACCOUNT_VERIFIED = 'account_verified',
  ACCOUNT_SUSPENDED = 'account_suspended',
  ACCOUNT_REACTIVATED = 'account_reactivated',
  PASSWORD_CHANGED = 'password_changed',
  ADMIN_ANNOUNCEMENT = 'admin_announcement',
  SYSTEM_NOTIFICATION = 'system_notification',
  FOLLOW_UP_REMINDER = 'follow_up_reminder',
  NEW_REVIEW = 'new_review',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  readAt?: Date;
  isArchived: boolean;
  archivedAt?: Date;
  actionUrl?: string;
  actionLabel?: string;
  relatedEntity?: {
    entityType: string;
    entityId: mongoose.Types.ObjectId;
  };
  sender?: mongoose.Types.ObjectId;
  metadata?: Record<string, any>;
  expiresAt?: Date;
  emailSent: boolean;
  emailSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const relatedEntitySchema = new Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ['appointment', 'consultation', 'prescription', 'document', 'user'],
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { _id: false }
);

const notificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    type: {
      type: String,
      required: [true, 'Notification type is required'],
      enum: {
        values: Object.values(NotificationType),
        message: 'Invalid notification type',
      },
    },
    priority: {
      type: String,
      enum: Object.values(NotificationPriority),
      default: NotificationPriority.MEDIUM,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    isArchived: {
      type: Boolean,
      default: false,
    },
    archivedAt: Date,
    actionUrl: {
      type: String,
      trim: true,
    },
    actionLabel: {
      type: String,
      trim: true,
      maxlength: [100, 'Action label cannot exceed 100 characters'],
    },
    relatedEntity: relatedEntitySchema,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    expiresAt: Date,
    emailSent: {
      type: Boolean,
      default: false,
    },
    emailSentAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, type: 1 });
notificationSchema.index({ user: 1, isArchived: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
