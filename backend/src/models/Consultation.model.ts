import mongoose, { Document, Schema } from 'mongoose';

export enum ConsultationStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FOLLOW_UP_REQUIRED = 'follow_up_required',
}

export interface IVitalSigns {
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
}

export interface IConsultation extends Document {
  appointment: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  consultationNumber: string;
  chiefComplaint: string;
  presentIllnessHistory?: string;
  pastMedicalHistory?: string;
  familyHistory?: string;
  socialHistory?: string;
  vitalSigns?: IVitalSigns;
  physicalExamination?: string;
  diagnosis: string;
  differentialDiagnosis?: string[];
  investigationsOrdered?: string[];
  investigationResults?: string;
  treatmentPlan?: string;
  procedures?: string[];
  referrals?: string[];
  clinicalNotes: string;
  privateNotes?: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  followUpInstructions?: string;
  status: ConsultationStatus;
  duration?: number;
  attachments?: string[];
  icdCodes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const vitalSignsSchema = new Schema(
  {
    bloodPressureSystolic: {
      type: Number,
      min: [50, 'Systolic BP must be at least 50'],
      max: [300, 'Systolic BP cannot exceed 300'],
    },
    bloodPressureDiastolic: {
      type: Number,
      min: [30, 'Diastolic BP must be at least 30'],
      max: [200, 'Diastolic BP cannot exceed 200'],
    },
    heartRate: {
      type: Number,
      min: [20, 'Heart rate must be at least 20'],
      max: [300, 'Heart rate cannot exceed 300'],
    },
    temperature: {
      type: Number,
      min: [30, 'Temperature must be at least 30°C'],
      max: [45, 'Temperature cannot exceed 45°C'],
    },
    respiratoryRate: {
      type: Number,
      min: [5, 'Respiratory rate must be at least 5'],
      max: [60, 'Respiratory rate cannot exceed 60'],
    },
    oxygenSaturation: {
      type: Number,
      min: [0, 'Oxygen saturation must be at least 0%'],
      max: [100, 'Oxygen saturation cannot exceed 100%'],
    },
    weight: {
      type: Number,
      min: [0.5, 'Weight must be at least 0.5 kg'],
      max: [500, 'Weight cannot exceed 500 kg'],
    },
    height: {
      type: Number,
      min: [20, 'Height must be at least 20 cm'],
      max: [300, 'Height cannot exceed 300 cm'],
    },
    bmi: {
      type: Number,
      min: [5, 'BMI must be at least 5'],
      max: [100, 'BMI cannot exceed 100'],
    },
  },
  { _id: false }
);

const consultationSchema = new Schema<IConsultation>(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: [true, 'Appointment reference is required'],
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
    consultationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    chiefComplaint: {
      type: String,
      required: [true, 'Chief complaint is required'],
      trim: true,
      maxlength: [500, 'Chief complaint cannot exceed 500 characters'],
    },
    presentIllnessHistory: {
      type: String,
      trim: true,
      maxlength: [3000, 'Present illness history cannot exceed 3000 characters'],
    },
    pastMedicalHistory: {
      type: String,
      trim: true,
      maxlength: [3000, 'Past medical history cannot exceed 3000 characters'],
    },
    familyHistory: {
      type: String,
      trim: true,
      maxlength: [2000, 'Family history cannot exceed 2000 characters'],
    },
    socialHistory: {
      type: String,
      trim: true,
      maxlength: [2000, 'Social history cannot exceed 2000 characters'],
    },
    vitalSigns: vitalSignsSchema,
    physicalExamination: {
      type: String,
      trim: true,
      maxlength: [5000, 'Physical examination notes cannot exceed 5000 characters'],
    },
    diagnosis: {
      type: String,
      required: [true, 'Diagnosis is required'],
      trim: true,
      maxlength: [1000, 'Diagnosis cannot exceed 1000 characters'],
    },
    differentialDiagnosis: [{
      type: String,
      trim: true,
      maxlength: [500, 'Differential diagnosis cannot exceed 500 characters'],
    }],
    investigationsOrdered: [{
      type: String,
      trim: true,
      maxlength: [300, 'Investigation name cannot exceed 300 characters'],
    }],
    investigationResults: {
      type: String,
      trim: true,
      maxlength: [5000, 'Investigation results cannot exceed 5000 characters'],
    },
    treatmentPlan: {
      type: String,
      trim: true,
      maxlength: [5000, 'Treatment plan cannot exceed 5000 characters'],
    },
    procedures: [{
      type: String,
      trim: true,
      maxlength: [300, 'Procedure name cannot exceed 300 characters'],
    }],
    referrals: [{
      type: String,
      trim: true,
      maxlength: [300, 'Referral cannot exceed 300 characters'],
    }],
    clinicalNotes: {
      type: String,
      required: [true, 'Clinical notes are required'],
      trim: true,
      maxlength: [10000, 'Clinical notes cannot exceed 10000 characters'],
    },
    privateNotes: {
      type: String,
      trim: true,
      maxlength: [5000, 'Private notes cannot exceed 5000 characters'],
      select: false,
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: Date,
    followUpInstructions: {
      type: String,
      trim: true,
      maxlength: [2000, 'Follow-up instructions cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: Object.values(ConsultationStatus),
      default: ConsultationStatus.IN_PROGRESS,
    },
    duration: {
      type: Number,
      min: [1, 'Duration must be at least 1 minute'],
      max: [480, 'Duration cannot exceed 480 minutes'],
    },
    attachments: [{
      type: String,
    }],
    icdCodes: [{
      type: String,
      trim: true,
      maxlength: [20, 'ICD code cannot exceed 20 characters'],
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

consultationSchema.index({ appointment: 1 });
consultationSchema.index({ patient: 1, createdAt: -1 });
consultationSchema.index({ doctor: 1, createdAt: -1 });
consultationSchema.index({ consultationNumber: 1 }, { unique: true });
consultationSchema.index({ status: 1 });
consultationSchema.index({ diagnosis: 'text', chiefComplaint: 'text' });

consultationSchema.pre<IConsultation>('save', async function (next) {
  if (this.isNew && !this.consultationNumber) {
    const date = new Date();
    const prefix = 'CON';
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.consultationNumber = `${prefix}-${dateStr}-${random}`;
  }
  next();
});

const Consultation = mongoose.model<IConsultation>('Consultation', consultationSchema);

export default Consultation;
