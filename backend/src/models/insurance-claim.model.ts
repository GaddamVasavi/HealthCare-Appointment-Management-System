import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IInsuranceClaim extends Document {
  patient: mongoose.Types.ObjectId;
  invoice: mongoose.Types.ObjectId;
  insuranceProvider: string;
  claimNumber: string;
  filingDate: Date;
  diagnosisCodes: string[];
  procedureCodes: string[];
  billedAmount: number;
  allowedAmount?: number;
  paidAmount?: number;
  patientResponsibility?: number;
  status: 'submitted' | 'pending' | 'approved' | 'denied' | 'appealed';
  eobDetails?: string;
  adjudicationNotes?: string;
}

const insuranceClaimSchema = new Schema<IInsuranceClaim>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  invoice: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
  insuranceProvider: { type: String, required: true },
  claimNumber: { type: String, required: true, unique: true },
  filingDate: { type: Date, default: Date.now },
  diagnosisCodes: [{ type: String }],
  procedureCodes: [{ type: String }],
  billedAmount: { type: Number, required: true },
  allowedAmount: Number,
  paidAmount: Number,
  patientResponsibility: Number,
  status: { type: String, enum: ['submitted', 'pending', 'approved', 'denied', 'appealed'], default: 'submitted' },
  eobDetails: String,
  adjudicationNotes: String
}, { timestamps: true });

export const InsuranceClaim: Model<IInsuranceClaim> = mongoose.models.InsuranceClaim || mongoose.model<IInsuranceClaim>('InsuranceClaim', insuranceClaimSchema);
