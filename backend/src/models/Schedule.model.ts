import mongoose, { Document, Schema } from 'mongoose';

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export interface IBreakPeriod {
  startTime: string;
  endTime: string;
  label?: string;
}

export interface IScheduleDay {
  day: DayOfWeek;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
  breaks: IBreakPeriod[];
  maxPatients?: number;
}

export interface IUnavailableDate {
  date: Date;
  reason?: string;
  isFullDay: boolean;
  startTime?: string;
  endTime?: string;
}

export interface ISchedule extends Document {
  doctor: mongoose.Types.ObjectId;
  scheduleDays: IScheduleDay[];
  slotDuration: number;
  bufferTime: number;
  unavailableDates: IUnavailableDate[];
  isActive: boolean;
  effectiveFrom: Date;
  effectiveTo?: Date;
  timezone: string;
  autoConfirm: boolean;
  advanceBookingDays: number;
  minBookingNotice: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const breakPeriodSchema = new Schema(
  {
    startTime: {
      type: String,
      required: [true, 'Break start time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format'],
    },
    endTime: {
      type: String,
      required: [true, 'Break end time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format'],
    },
    label: {
      type: String,
      trim: true,
      maxlength: [100, 'Label cannot exceed 100 characters'],
    },
  },
  { _id: false }
);

const scheduleDaySchema = new Schema(
  {
    day: {
      type: String,
      required: [true, 'Day is required'],
      enum: {
        values: Object.values(DayOfWeek),
        message: 'Invalid day of week',
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
    breaks: [breakPeriodSchema],
    maxPatients: {
      type: Number,
      min: [1, 'Must allow at least 1 patient'],
    },
  },
  { _id: false }
);

const unavailableDateSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    reason: {
      type: String,
      trim: true,
      maxlength: [200, 'Reason cannot exceed 200 characters'],
    },
    isFullDay: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: String,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in HH:mm format'],
    },
    endTime: {
      type: String,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in HH:mm format'],
    },
  },
  { _id: false }
);

const scheduleSchema = new Schema<ISchedule>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor reference is required'],
    },
    scheduleDays: {
      type: [scheduleDaySchema],
      validate: {
        validator: function (v: IScheduleDay[]) {
          return v.length > 0 && v.length <= 7;
        },
        message: 'Schedule must have between 1 and 7 days',
      },
    },
    slotDuration: {
      type: Number,
      required: [true, 'Slot duration is required'],
      min: [5, 'Slot duration must be at least 5 minutes'],
      max: [120, 'Slot duration cannot exceed 120 minutes'],
      default: 30,
    },
    bufferTime: {
      type: Number,
      default: 5,
      min: [0, 'Buffer time cannot be negative'],
      max: [60, 'Buffer time cannot exceed 60 minutes'],
    },
    unavailableDates: [unavailableDateSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    effectiveFrom: {
      type: Date,
      required: [true, 'Effective from date is required'],
    },
    effectiveTo: {
      type: Date,
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata',
      trim: true,
    },
    autoConfirm: {
      type: Boolean,
      default: false,
    },
    advanceBookingDays: {
      type: Number,
      default: 30,
      min: [1, 'Advance booking must be at least 1 day'],
      max: [365, 'Advance booking cannot exceed 365 days'],
    },
    minBookingNotice: {
      type: Number,
      default: 60,
      min: [0, 'Minimum notice cannot be negative'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

scheduleSchema.index({ doctor: 1 });
scheduleSchema.index({ doctor: 1, isActive: 1 });
scheduleSchema.index({ effectiveFrom: 1, effectiveTo: 1 });

const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);

export default Schedule;
