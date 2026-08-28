import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPatient extends Document {
  user: mongoose.Types.ObjectId;
  dob: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  medicalHistory: Array<{ condition: string; diagnosedDate: Date; status: string }>;
  allergies: Array<{ allergen: string; severity: string; reaction: string }>;
  emergencyContacts: Array<{ name: string; relationship: string; phone: string }>;
  insuranceInfo: { provider: string; policyNumber: string; groupNumber?: string; validUntil: Date };
  primaryDoctor?: mongoose.Types.ObjectId;
  familyHistory: Array<{ condition: string; relationship: string }>;
  immunizationRecords: Array<{ vaccine: string; dateAdministered: Date; provider: string }>;
  socialHistory: { smoking: boolean; alcohol: boolean; notes?: string };
  vitalSignsHistory: Array<{ date: Date; bloodPressure: string; heartRate: number; temperature: number; weight: number }>;
  medications: Array<{ name: string; dosage: string; frequency: string }>;
}

const patientSchema = new Schema<IPatient>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  medicalHistory: [{ condition: String, diagnosedDate: Date, status: String }],
  allergies: [{ allergen: String, severity: String, reaction: String }],
  emergencyContacts: [{ name: String, relationship: String, phone: String }],
  insuranceInfo: {
    provider: { type: String, required: true },
    policyNumber: { type: String, required: true },
    groupNumber: { type: String },
    validUntil: { type: Date, required: true }
  },
  primaryDoctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  familyHistory: [{ condition: String, relationship: String }],
  immunizationRecords: [{ vaccine: String, dateAdministered: Date, provider: String }],
  socialHistory: { smoking: Boolean, alcohol: Boolean, notes: String },
  vitalSignsHistory: [{ date: Date, bloodPressure: String, heartRate: Number, temperature: Number, weight: Number }],
  medications: [{ name: String, dosage: String, frequency: String }]
}, { timestamps: true });

export const Patient: Model<IPatient> = mongoose.models.Patient || mongoose.model<IPatient>('Patient', patientSchema);
