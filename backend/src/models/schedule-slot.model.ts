import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IScheduleSlot extends Document {
  doctor: mongoose.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: 'available' | 'booked' | 'blocked' | 'break';
  appointment?: mongoose.Types.ObjectId;
  recurrenceRules?: string;
  overrideFlag: boolean;
  patientQueuePosition?: number;
}

const scheduleSlotSchema = new Schema<IScheduleSlot>({
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['available', 'booked', 'blocked', 'break'], default: 'available' },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  recurrenceRules: String,
  overrideFlag: { type: Boolean, default: false },
  patientQueuePosition: Number
}, { timestamps: true });

export const ScheduleSlot: Model<IScheduleSlot> = mongoose.models.ScheduleSlot || mongoose.model<IScheduleSlot>('ScheduleSlot', scheduleSlotSchema);
