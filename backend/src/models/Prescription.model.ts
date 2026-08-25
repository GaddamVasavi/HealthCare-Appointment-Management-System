import mongoose, { Document, Schema } from 'mongoose';

export enum PrescriptionStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export interface IMedicine {
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions?: string;
  quantity?: number;
  refills?: number;
  beforeFood: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface IPrescription extends Document {
  prescriptionNumber: string;
  appointment: mongoose.Types.ObjectId;
  consultation?: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  medicines: IMedicine[];
  diagnosis: string;
  generalInstructions?: string;
  dietaryAdvice?: string;
  lifestyleRecommendations?: string;
  followUpDate?: Date;
  followUpInstructions?: string;
  warnings?: string[];
  allergiesNoted?: string[];
  status: PrescriptionStatus;
  validUntil?: Date;
  isDigitallySigned: boolean;
  signedAt?: Date;
  pharmacyNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
      maxlength: [200, 'Medicine name cannot exceed 200 characters'],
    },
    genericName: {
      type: String,
      trim: true,
      maxlength: [200, 'Generic name cannot exceed 200 characters'],
    },
    dosage: {
      type: String,
      required: [true, 'Dosage is required'],
      trim: true,
      maxlength: [100, 'Dosage cannot exceed 100 characters'],
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      trim: true,
      maxlength: [100, 'Frequency cannot exceed 100 characters'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
      maxlength: [100, 'Duration cannot exceed 100 characters'],
    },
    route: {
      type: String,
      required: [true, 'Route of administration is required'],
      trim: true,
      enum: ['oral', 'topical', 'injection', 'inhalation', 'sublingual', 'rectal', 'transdermal', 'intravenous', 'intramuscular', 'ophthalmic', 'otic', 'nasal', 'other'],
      default: 'oral',
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [500, 'Instructions cannot exceed 500 characters'],
    },
    quantity: {
      type: Number,
      min: [1, 'Quantity must be at least 1'],
    },
    refills: {
      type: Number,
      min: [0, 'Refills cannot be negative'],
      default: 0,
    },
    beforeFood: {
      type: Boolean,
      default: false,
    },
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

const prescriptionSchema = new Schema<IPrescription>(
  {
    prescriptionNumber: {
      type: String,
      unique: true,
      required: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: [true, 'Appointment reference is required'],
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient reference is required'],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor reference is required'],
    },
    medicines: {
      type: [medicineSchema],
      validate: {
        validator: function (v: IMedicine[]) {
          return v.length > 0;
        },
        message: 'At least one medicine is required',
      },
    },
    diagnosis: {
      type: String,
      required: [true, 'Diagnosis is required'],
      trim: true,
      maxlength: [1000, 'Diagnosis cannot exceed 1000 characters'],
    },
    generalInstructions: {
      type: String,
      trim: true,
      maxlength: [2000, 'General instructions cannot exceed 2000 characters'],
    },
    dietaryAdvice: {
      type: String,
      trim: true,
      maxlength: [1000, 'Dietary advice cannot exceed 1000 characters'],
    },
    lifestyleRecommendations: {
      type: String,
      trim: true,
      maxlength: [1000, 'Lifestyle recommendations cannot exceed 1000 characters'],
    },
    followUpDate: Date,
    followUpInstructions: {
      type: String,
      trim: true,
      maxlength: [1000, 'Follow-up instructions cannot exceed 1000 characters'],
    },
    warnings: [{
      type: String,
      trim: true,
      maxlength: [300, 'Warning cannot exceed 300 characters'],
    }],
    allergiesNoted: [{
      type: String,
      trim: true,
      maxlength: [200, 'Allergy note cannot exceed 200 characters'],
    }],
    status: {
      type: String,
      enum: Object.values(PrescriptionStatus),
      default: PrescriptionStatus.ACTIVE,
    },
    validUntil: Date,
    isDigitallySigned: {
      type: Boolean,
      default: false,
    },
    signedAt: Date,
    pharmacyNotes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Pharmacy notes cannot exceed 1000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

prescriptionSchema.index({ prescriptionNumber: 1 }, { unique: true });
prescriptionSchema.index({ patient: 1, createdAt: -1 });
prescriptionSchema.index({ doctor: 1, createdAt: -1 });
prescriptionSchema.index({ appointment: 1 });
prescriptionSchema.index({ status: 1 });

prescriptionSchema.pre<IPrescription>('save', async function (next) {
  if (this.isNew && !this.prescriptionNumber) {
    const date = new Date();
    const prefix = 'RX';
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.prescriptionNumber = `${prefix}-${dateStr}-${random}`;
  }
  next();
});

const Prescription = mongoose.model<IPrescription>('Prescription', prescriptionSchema);

export default Prescription;
