import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IDocument extends Document {
  patient: mongoose.Types.ObjectId;
  title: string;
  category: 'lab_report' | 'imaging' | 'consent' | 'referral' | 'insurance_card' | 'id';
  filePath: string;
  mimeType: string;
  size: number; // in bytes
  uploadedBy: mongoose.Types.ObjectId;
  accessLog: Array<{ accessedBy: mongoose.Types.ObjectId; accessedAt: Date }>;
  versionNumber: number;
  isActive: boolean;
}

const documentSchema = new Schema<IDocument>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['lab_report', 'imaging', 'consent', 'referral', 'insurance_card', 'id'], required: true },
  filePath: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  accessLog: [{ accessedBy: { type: Schema.Types.ObjectId, ref: 'User' }, accessedAt: { type: Date, default: Date.now } }],
  versionNumber: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const MedicalDocument: Model<IDocument> = mongoose.models.Document || mongoose.model<IDocument>('Document', documentSchema);
