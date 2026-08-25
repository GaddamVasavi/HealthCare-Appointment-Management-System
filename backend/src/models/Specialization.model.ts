import mongoose, { Document, Schema } from 'mongoose';

export interface ISpecialization extends Document {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  isActive: boolean;
  doctorCount: number;
  displayOrder: number;
  parentSpecialization?: mongoose.Types.ObjectId;
  subSpecializations?: string[];
  commonConditions: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const specializationSchema = new Schema<ISpecialization>(
  {
    name: {
      type: String,
      required: [true, 'Specialization name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Specialization name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    icon: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    doctorCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    parentSpecialization: {
      type: Schema.Types.ObjectId,
      ref: 'Specialization',
    },
    subSpecializations: [{
      type: String,
      trim: true,
    }],
    commonConditions: [{
      type: String,
      trim: true,
      maxlength: [200, 'Condition name cannot exceed 200 characters'],
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

specializationSchema.index({ name: 1 }, { unique: true });
specializationSchema.index({ slug: 1 }, { unique: true });
specializationSchema.index({ isActive: 1 });
specializationSchema.index({ displayOrder: 1 });
specializationSchema.index({ tags: 1 });

specializationSchema.pre<ISpecialization>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Specialization = mongoose.model<ISpecialization>(
  'Specialization',
  specializationSchema
);

export default Specialization;
