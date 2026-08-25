import mongoose, { Document, Schema } from 'mongoose';

export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export interface IEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface IMedicalHistory {
  condition: string;
  diagnosedDate?: Date;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

export interface IAllergy {
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction?: string;
}

export interface IInsurance {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  expiryDate?: Date;
  coverageType?: string;
}

export interface IPatient extends Document {
  user: mongoose.Types.ObjectId;
  bloodGroup?: BloodGroup;
  height?: number;
  weight?: number;
  allergies: IAllergy[];
  medicalHistory: IMedicalHistory[];
  currentMedications: string[];
  emergencyContact?: IEmergencyContact;
  insurance?: IInsurance;
  familyHistory?: string;
  lifestyle?: {
    smoking: 'never' | 'former' | 'current';
    alcohol: 'never' | 'occasional' | 'moderate' | 'heavy';
    exercise: 'sedentary' | 'light' | 'moderate' | 'active';
    diet?: string;
  };
  notes?: string;
  preferredLanguage?: string;
  preferredPharmacy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const emergencyContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true,
      maxlength: [50, 'Relationship cannot exceed 50 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { _id: false }
);

const medicalHistorySchema = new Schema(
  {
    condition: {
      type: String,
      required: [true, 'Condition name is required'],
      trim: true,
      maxlength: [200, 'Condition name cannot exceed 200 characters'],
    },
    diagnosedDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'resolved', 'chronic'],
      default: 'active',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  { _id: false }
);

const allergySchema = new Schema(
  {
    allergen: {
      type: String,
      required: [true, 'Allergen name is required'],
      trim: true,
      maxlength: [100, 'Allergen name cannot exceed 100 characters'],
    },
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe'],
      required: [true, 'Severity is required'],
    },
    reaction: {
      type: String,
      trim: true,
      maxlength: [200, 'Reaction description cannot exceed 200 characters'],
    },
  },
  { _id: false }
);

const insuranceSchema = new Schema(
  {
    provider: {
      type: String,
      required: [true, 'Insurance provider is required'],
      trim: true,
      maxlength: [200, 'Provider name cannot exceed 200 characters'],
    },
    policyNumber: {
      type: String,
      required: [true, 'Policy number is required'],
      trim: true,
      maxlength: [50, 'Policy number cannot exceed 50 characters'],
    },
    groupNumber: {
      type: String,
      trim: true,
      maxlength: [50, 'Group number cannot exceed 50 characters'],
    },
    expiryDate: {
      type: Date,
    },
    coverageType: {
      type: String,
      trim: true,
      maxlength: [100, 'Coverage type cannot exceed 100 characters'],
    },
  },
  { _id: false }
);

const lifestyleSchema = new Schema(
  {
    smoking: {
      type: String,
      enum: ['never', 'former', 'current'],
      default: 'never',
    },
    alcohol: {
      type: String,
      enum: ['never', 'occasional', 'moderate', 'heavy'],
      default: 'never',
    },
    exercise: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active'],
      default: 'moderate',
    },
    diet: {
      type: String,
      trim: true,
      maxlength: [200, 'Diet description cannot exceed 200 characters'],
    },
  },
  { _id: false }
);

const patientSchema = new Schema<IPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: Object.values(BloodGroup),
        message: 'Invalid blood group',
      },
    },
    height: {
      type: Number,
      min: [30, 'Height must be at least 30 cm'],
      max: [300, 'Height cannot exceed 300 cm'],
    },
    weight: {
      type: Number,
      min: [1, 'Weight must be at least 1 kg'],
      max: [500, 'Weight cannot exceed 500 kg'],
    },
    allergies: [allergySchema],
    medicalHistory: [medicalHistorySchema],
    currentMedications: [{
      type: String,
      trim: true,
      maxlength: [200, 'Medication name cannot exceed 200 characters'],
    }],
    emergencyContact: emergencyContactSchema,
    insurance: insuranceSchema,
    familyHistory: {
      type: String,
      trim: true,
      maxlength: [2000, 'Family history cannot exceed 2000 characters'],
    },
    lifestyle: lifestyleSchema,
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
    },
    preferredLanguage: {
      type: String,
      trim: true,
      default: 'English',
    },
    preferredPharmacy: {
      type: String,
      trim: true,
      maxlength: [200, 'Pharmacy name cannot exceed 200 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.index({ user: 1 }, { unique: true });
patientSchema.index({ bloodGroup: 1 });
patientSchema.index({ createdAt: -1 });

const Patient = mongoose.model<IPatient>('Patient', patientSchema);

export default Patient;
