import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ILabOrder extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  tests: Array<{ testName: string; testCode: string }>;
  specimenType: string;
  priority: 'routine' | 'stat' | 'urgent';
  status: 'ordered' | 'sample_collected' | 'processing' | 'completed' | 'cancelled';
  results: Array<{ testCode: string; value: string; normalRange: string; flag: 'normal' | 'high' | 'low' | 'critical' }>;
  interpretingPathologist?: string;
  reportUrl?: string;
  criticalValueAlert?: boolean;
}

const labOrderSchema = new Schema<ILabOrder>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  tests: [{ testName: { type: String, required: true }, testCode: { type: String, required: true } }],
  specimenType: { type: String, required: true },
  priority: { type: String, enum: ['routine', 'stat', 'urgent'], default: 'routine' },
  status: { type: String, enum: ['ordered', 'sample_collected', 'processing', 'completed', 'cancelled'], default: 'ordered' },
  results: [{
    testCode: String,
    value: String,
    normalRange: String,
    flag: { type: String, enum: ['normal', 'high', 'low', 'critical'] }
  }],
  interpretingPathologist: String,
  reportUrl: String,
  criticalValueAlert: { type: Boolean, default: false }
}, { timestamps: true });

export const LabOrder: Model<ILabOrder> = mongoose.models.LabOrder || mongoose.model<ILabOrder>('LabOrder', labOrderSchema);
