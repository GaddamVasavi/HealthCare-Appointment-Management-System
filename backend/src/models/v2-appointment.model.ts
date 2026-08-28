import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  scheduledDate: Date;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  type: 'in-person' | 'telemedicine' | 'follow-up' | 'emergency';
  status: 'pending' | 'confirmed' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  symptoms: string[];
  roomAssignment?: string;
  checkInTime?: Date;
  checkOutTime?: Date;
  followUpTo?: mongoose.Types.ObjectId; // Reference to previous appointment
  cancellationReason?: string;
}

const appointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  scheduledDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  duration: { type: Number, required: true },
  type: { type: String, enum: ['in-person', 'telemedicine', 'follow-up', 'emergency'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'checked-in', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'], default: 'pending' },
  priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
  symptoms: [{ type: String }],
  roomAssignment: { type: String },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  followUpTo: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  cancellationReason: { type: String }
}, { timestamps: true });

appointmentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'cancelled' && !this.cancellationReason) {
    next(new Error('Cancellation reason is required when status is cancelled'));
  } else {
    next();
  }
});

export const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);
