import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPrescription extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  medications: Array<{
    drugName: string;
    dosage: string;
    frequency: string;
    duration: string;
    route: string;
    instructions: string;
    refillsAllowed: number;
    refillsUsed: number;
  }>;
  pharmacyInfo?: { name: string; phone: string; address: string };
  digitalSignature: string;
  interactionWarnings: string[];
  isControlledSubstance: boolean;
  expiryDate: Date;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
}

const prescriptionSchema = new Schema<IPrescription>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  medications: [{
    drugName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    route: { type: String, required: true },
    instructions: { type: String, required: true },
    refillsAllowed: { type: Number, default: 0 },
    refillsUsed: { type: Number, default: 0 }
  }],
  pharmacyInfo: {
    name: String,
    phone: String,
    address: String
  },
  digitalSignature: { type: String, required: true },
  interactionWarnings: [{ type: String }],
  isControlledSubstance: { type: Boolean, default: false },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'completed', 'expired', 'cancelled'], default: 'active' }
}, { timestamps: true });

export const Prescription: Model<IPrescription> = mongoose.models.Prescription || mongoose.model<IPrescription>('Prescription', prescriptionSchema);
