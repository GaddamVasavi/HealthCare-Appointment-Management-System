import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specializations: string[];
  qualifications: Array<{ degree: string; institution: string; year: number }>;
  experienceYears: number;
  consultationFee: number;
  bio?: string;
  availability: Array<{ dayOfWeek: number; startTime: string; endTime: string; isAvailable: boolean }>;
  department: mongoose.Types.ObjectId;
  licenseVerificationStatus: 'pending' | 'verified' | 'rejected';
  languagesSpoken: string[];
  awards: Array<{ title: string; year: number; description: string }>;
  averageRating: number;
  totalReviews: number;
}

const doctorSchema = new Schema<IDoctor>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specializations: [{ type: String, required: true }],
  qualifications: [{ degree: String, institution: String, year: Number }],
  experienceYears: { type: Number, required: true, default: 0 },
  consultationFee: { type: Number, required: true, default: 0 },
  bio: { type: String },
  availability: [{
    dayOfWeek: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
  }],
  department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  licenseVerificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  languagesSpoken: [{ type: String }],
  awards: [{ title: String, year: Number, description: String }],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

export const Doctor: Model<IDoctor> = mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', doctorSchema);
