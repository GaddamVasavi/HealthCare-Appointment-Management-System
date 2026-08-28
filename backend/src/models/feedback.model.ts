import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IFeedback extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  rating: number; // 1 to 5
  categories: {
    waitingTime: number;
    communication: number;
    cleanliness: number;
    professionalism: number;
  };
  comment?: string;
  doctorResponse?: string;
  isAnonymous: boolean;
  flaggedForReview: boolean;
  sentimentScore?: number;
}

const feedbackSchema = new Schema<IFeedback>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  categories: {
    waitingTime: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    cleanliness: { type: Number, min: 1, max: 5 },
    professionalism: { type: Number, min: 1, max: 5 }
  },
  comment: String,
  doctorResponse: String,
  isAnonymous: { type: Boolean, default: false },
  flaggedForReview: { type: Boolean, default: false },
  sentimentScore: Number
}, { timestamps: true });

export const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);
