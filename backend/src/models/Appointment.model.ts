import mongoose, { Document, Schema } from 'mongoose';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
  NO_SHOW = 'no_show',
  IN_PROGRESS = 'in_progress',
}

export enum AppointmentType {
  CONSULTATION = 'consultation',
  FOLLOW_UP = 'follow_up',
  ROUTINE_CHECKUP = 'routine_checkup',
  EMERGENCY = 'emergency',
  SPECIALIST_REFERRAL = 'specialist_referral',
}

export enum CancellationReason {
  PATIENT_REQUEST = 'patient_request',
  DOCTOR_UNAVAILABLE = 'doctor_unavailable',
  EMERGENCY = 'emergency',
  RESCHEDULED = 'rescheduled',
  NO_SHOW = 'no_show',
  OTHER = 'other',
}

export interface IStatusHistory {
  status: AppointmentStatus;
  changedAt: Date;
  changedBy: mongoose.Types.ObjectId;
  reason?: string;
  notes?: string;
}

export interface IAppointment extends Document {
  appointmentNumber: string;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  specialization: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  status: AppointmentStatus;
  type: AppointmentType;
  reason: string;
  symptoms?: string[];
  notes?: string;
  patientNotes?: string;
  doctorNotes?: string;
  cancellationReason?: CancellationReason;
  cancellationNotes?: string;
  cancelledBy?: mongoose.Types.ObjectId;
  cancelledAt?: Date;
  rescheduledFrom?: mongoose.Types.ObjectId;
  rescheduledTo?: mongoose.Types.ObjectId;
  confirmedAt?: Date;
  confirmedBy?: mongoose.Types.ObjectId;
  completedAt?: Date;
  checkedInAt?: Date;
  statusHistory: IStatusHistory[];
  consultationFee: number;
  isPaid: boolean;
  paymentMethod?: string;
  paymentReference?: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  followUpNotes?: string;
  reminderSent: boolean;
  reminderSentAt?: Date;
  rating?: number;
  review?: string;
  isFirstVisit: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const statusHistorySchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(AppointmentStatus),
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
    changedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [500, 'Reason cannot exceed 500 characters'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
  },
  { _id: false }
);

const appointmentSchema = new Schema<IAppointment>(
  {
    appointmentNumber: {
      type: String,
      unique: true,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient is required'],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor is required'],
    },
    specialization: {
      type: Schema.Types.ObjectId,
      ref: 'Specialization',
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [5, 'Duration must be at least 5 minutes'],
      max: [240, 'Duration cannot exceed 240 minutes'],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(AppointmentStatus),
        message: 'Invalid appointment status',
      },
      default: AppointmentStatus.PENDING,
    },
    type: {
      type: String,
      enum: {
        values: Object.values(AppointmentType),
        message: 'Invalid appointment type',
      },
      default: AppointmentType.CONSULTATION,
    },
    reason: {
      type: String,
      required: [true, 'Reason for appointment is required'],
      trim: true,
      maxlength: [500, 'Reason cannot exceed 500 characters'],
    },
    symptoms: [{
      type: String,
      trim: true,
      maxlength: [100, 'Symptom description cannot exceed 100 characters'],
    }],
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    patientNotes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Patient notes cannot exceed 1000 characters'],
    },
    doctorNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Doctor notes cannot exceed 2000 characters'],
    },
    cancellationReason: {
      type: String,
      enum: Object.values(CancellationReason),
    },
    cancellationNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Cancellation notes cannot exceed 500 characters'],
    },
    cancelledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    cancelledAt: Date,
    rescheduledFrom: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    rescheduledTo: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    confirmedAt: Date,
    confirmedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    completedAt: Date,
    checkedInAt: Date,
    statusHistory: [statusHistorySchema],
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Fee cannot be negative'],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    paymentReference: {
      type: String,
      trim: true,
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: Date,
    followUpNotes: {
      type: String,
      trim: true,
      maxlength: [500, 'Follow-up notes cannot exceed 500 characters'],
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    reminderSentAt: Date,
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      trim: true,
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
    isFirstVisit: {
      type: Boolean,
      default: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// CRITICAL: Compound unique index to prevent double-booking
// Only applies to non-cancelled/non-rescheduled appointments
appointmentSchema.index(
  { doctor: 1, date: 1, startTime: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED] },
    },
  }
);

appointmentSchema.index({ appointmentNumber: 1 }, { unique: true });
appointmentSchema.index({ patient: 1, date: -1 });
appointmentSchema.index({ doctor: 1, date: -1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ patient: 1, status: 1 });
appointmentSchema.index({ doctor: 1, status: 1 });
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ specialization: 1 });

// Auto-generate appointment number
appointmentSchema.pre<IAppointment>('save', async function (next) {
  if (this.isNew && !this.appointmentNumber) {
    const date = new Date();
    const prefix = 'APT';
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const timestamp = Date.now().toString().slice(-4);
    this.appointmentNumber = `${prefix}-${dateStr}-${timestamp}${random}`;
  }

  // Add status to history on creation
  if (this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
      changedBy: this.patient,
      reason: 'Appointment created',
    });
  }

  next();
});

const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
