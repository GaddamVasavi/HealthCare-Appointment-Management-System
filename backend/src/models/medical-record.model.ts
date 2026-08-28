import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMedicalRecord extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  chiefComplaint: string;
  hpi: string; // History of Present Illness
  examFindings: string;
  diagnoses: Array<{ icd10Code: string; description: string; type: 'primary' | 'secondary' }>;
  treatmentPlan: string;
  followUpInstructions?: string;
  attachments: Array<{ fileUrl: string; description: string }>;
  vitalsSnapshot: { bloodPressure?: string; heartRate?: number; temperature?: number; weight?: number; oxygenSaturation?: number };
  allergiesChecked: boolean;
  reviewOfSystems: string;
}

const medicalRecordSchema = new Schema<IMedicalRecord>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  chiefComplaint: { type: String, required: true },
  hpi: { type: String, required: true },
  examFindings: { type: String, required: true },
  diagnoses: [{
    icd10Code: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['primary', 'secondary'], required: true }
  }],
  treatmentPlan: { type: String, required: true },
  followUpInstructions: { type: String },
  attachments: [{ fileUrl: String, description: String }],
  vitalsSnapshot: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    weight: Number,
    oxygenSaturation: Number
  },
  allergiesChecked: { type: Boolean, default: false },
  reviewOfSystems: { type: String }
}, { timestamps: true });

export const MedicalRecord: Model<IMedicalRecord> = mongoose.models.MedicalRecord || mongoose.model<IMedicalRecord>('MedicalRecord', medicalRecordSchema);
