import mongoose, { Document, Schema } from 'mongoose';

export enum DocumentType {
  LAB_REPORT = 'lab_report',
  PRESCRIPTION = 'prescription',
  MEDICAL_RECORD = 'medical_record',
  INSURANCE = 'insurance',
  IMAGING = 'imaging',
  DISCHARGE_SUMMARY = 'discharge_summary',
  REFERRAL_LETTER = 'referral_letter',
  VACCINATION_RECORD = 'vaccination_record',
  ALLERGY_REPORT = 'allergy_report',
  OTHER = 'other',
}

export enum DocumentStatus {
  UPLOADED = 'uploaded',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export interface IMedicalDocument extends Document {
  patient: mongoose.Types.ObjectId;
  uploadedBy: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  documentType: DocumentType;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  fileHash?: string;
  appointment?: mongoose.Types.ObjectId;
  consultation?: mongoose.Types.ObjectId;
  tags: string[];
  status: DocumentStatus;
  isConfidential: boolean;
  sharedWith: mongoose.Types.ObjectId[];
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  rejectionReason?: string;
  expiryDate?: Date;
  metadata?: {
    labName?: string;
    reportDate?: Date;
    testType?: string;
    doctorName?: string;
    hospitalName?: string;
  };
  accessLog: {
    user: mongoose.Types.ObjectId;
    action: string;
    accessedAt: Date;
    ipAddress?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const accessLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['view', 'download', 'share', 'unshare', 'delete'],
    },
    accessedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
  },
  { _id: false }
);

const documentMetadataSchema = new Schema(
  {
    labName: { type: String, trim: true, maxlength: 200 },
    reportDate: Date,
    testType: { type: String, trim: true, maxlength: 200 },
    doctorName: { type: String, trim: true, maxlength: 200 },
    hospitalName: { type: String, trim: true, maxlength: 300 },
  },
  { _id: false }
);

const medicalDocumentSchema = new Schema<IMedicalDocument>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Patient reference is required'],
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    documentType: {
      type: String,
      required: [true, 'Document type is required'],
      enum: {
        values: Object.values(DocumentType),
        message: 'Invalid document type',
      },
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    originalName: {
      type: String,
      required: [true, 'Original file name is required'],
      trim: true,
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required'],
      trim: true,
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required'],
      min: [1, 'File size must be positive'],
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
      select: false,
    },
    fileHash: {
      type: String,
      trim: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    consultation: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation',
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
    status: {
      type: String,
      enum: Object.values(DocumentStatus),
      default: DocumentStatus.UPLOADED,
    },
    isConfidential: {
      type: Boolean,
      default: false,
    },
    sharedWith: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: Date,
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: [500, 'Rejection reason cannot exceed 500 characters'],
    },
    expiryDate: Date,
    metadata: documentMetadataSchema,
    accessLog: [accessLogSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

medicalDocumentSchema.index({ patient: 1, createdAt: -1 });
medicalDocumentSchema.index({ uploadedBy: 1 });
medicalDocumentSchema.index({ documentType: 1 });
medicalDocumentSchema.index({ status: 1 });
medicalDocumentSchema.index({ appointment: 1 });
medicalDocumentSchema.index({ tags: 1 });
medicalDocumentSchema.index({ title: 'text', description: 'text' });

const MedicalDocument = mongoose.model<IMedicalDocument>(
  'MedicalDocument',
  medicalDocumentSchema
);

export default MedicalDocument;
