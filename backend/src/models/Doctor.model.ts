import mongoose, { Document, Schema } from 'mongoose';

export interface IQualification {
  degree: string;
  institution: string;
  year: number;
  specialization?: string;
}

export interface IExperience {
  position: string;
  hospital: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
}

export interface IAward {
  title: string;
  organization: string;
  year: number;
  description?: string;
}

export interface IDoctor extends Document {
  user: mongoose.Types.ObjectId;
  specialization: mongoose.Types.ObjectId;
  licenseNumber: string;
  qualifications: IQualification[];
  experience: IExperience[];
  awards: IAward[];
  yearsOfExperience: number;
  consultationFee: number;
  followUpFee?: number;
  bio?: string;
  languages: string[];
  acceptingNewPatients: boolean;
  maxPatientsPerDay: number;
  averageRating: number;
  totalRatings: number;
  totalConsultations: number;
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
  registrationNumber?: string;
  hospital?: string;
  department?: string;
  officeAddress?: {
    building: string;
    floor?: string;
    room?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const qualificationSchema = new Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree name is required'],
      trim: true,
      maxlength: [200, 'Degree name cannot exceed 200 characters'],
    },
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
      maxlength: [300, 'Institution name cannot exceed 300 characters'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1950, 'Year must be after 1950'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    specialization: {
      type: String,
      trim: true,
      maxlength: [200, 'Specialization cannot exceed 200 characters'],
    },
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: [200, 'Position cannot exceed 200 characters'],
    },
    hospital: {
      type: String,
      required: [true, 'Hospital/Organization name is required'],
      trim: true,
      maxlength: [300, 'Hospital name cannot exceed 300 characters'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
  },
  { _id: false }
);

const awardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Award title is required'],
      trim: true,
      maxlength: [200, 'Award title cannot exceed 200 characters'],
    },
    organization: {
      type: String,
      required: [true, 'Organization is required'],
      trim: true,
      maxlength: [300, 'Organization name cannot exceed 300 characters'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
  },
  { _id: false }
);

const officeAddressSchema = new Schema(
  {
    building: { type: String, trim: true, maxlength: 200 },
    floor: { type: String, trim: true, maxlength: 50 },
    room: { type: String, trim: true, maxlength: 50 },
    street: { type: String, trim: true, maxlength: 200 },
    city: { type: String, trim: true, maxlength: 100 },
    state: { type: String, trim: true, maxlength: 100 },
    zipCode: { type: String, trim: true, maxlength: 20 },
    country: { type: String, trim: true, maxlength: 100, default: 'India' },
  },
  { _id: false }
);

const socialLinksSchema = new Schema(
  {
    website: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    researchGate: { type: String, trim: true },
  },
  { _id: false }
);

const doctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    specialization: {
      type: Schema.Types.ObjectId,
      ref: 'Specialization',
      required: [true, 'Specialization is required'],
    },
    licenseNumber: {
      type: String,
      required: [true, 'Medical license number is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'License number cannot exceed 50 characters'],
    },
    qualifications: {
      type: [qualificationSchema],
      validate: {
        validator: function (v: IQualification[]) {
          return v.length > 0;
        },
        message: 'At least one qualification is required',
      },
    },
    experience: [experienceSchema],
    awards: [awardSchema],
    yearsOfExperience: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: [0, 'Years of experience cannot be negative'],
      max: [70, 'Years of experience cannot exceed 70'],
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Consultation fee cannot be negative'],
      max: [100000, 'Consultation fee cannot exceed 100000'],
    },
    followUpFee: {
      type: Number,
      min: [0, 'Follow-up fee cannot be negative'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [2000, 'Bio cannot exceed 2000 characters'],
    },
    languages: [{
      type: String,
      trim: true,
    }],
    acceptingNewPatients: {
      type: Boolean,
      default: true,
    },
    maxPatientsPerDay: {
      type: Number,
      default: 20,
      min: [1, 'Must accept at least 1 patient per day'],
      max: [100, 'Cannot exceed 100 patients per day'],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalConsultations: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: Date,
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    registrationNumber: {
      type: String,
      trim: true,
      maxlength: [50, 'Registration number cannot exceed 50 characters'],
    },
    hospital: {
      type: String,
      trim: true,
      maxlength: [300, 'Hospital name cannot exceed 300 characters'],
    },
    department: {
      type: String,
      trim: true,
      maxlength: [200, 'Department name cannot exceed 200 characters'],
    },
    officeAddress: officeAddressSchema,
    socialLinks: socialLinksSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

doctorSchema.index({ user: 1 }, { unique: true });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ licenseNumber: 1 }, { unique: true });
doctorSchema.index({ isVerified: 1 });
doctorSchema.index({ acceptingNewPatients: 1 });
doctorSchema.index({ consultationFee: 1 });
doctorSchema.index({ averageRating: -1 });
doctorSchema.index({ yearsOfExperience: -1 });
doctorSchema.index({ createdAt: -1 });

const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
