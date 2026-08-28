import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  description: string;
  headDoctor?: mongoose.Types.ObjectId;
  location: { building: string; floor: string };
  contact: { phone: string; email: string };
  operatingHours: string;
  budget?: number;
  equipmentList: string[];
  doctorCount: number; // Virtual
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  headDoctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  location: {
    building: { type: String, required: true },
    floor: { type: String, required: true }
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  operatingHours: { type: String, required: true },
  budget: { type: Number },
  equipmentList: [{ type: String }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

departmentSchema.virtual('doctorCount', {
  ref: 'Doctor',
  localField: '_id',
  foreignField: 'department',
  count: true
});

export const Department: Model<IDepartment> = mongoose.models.Department || mongoose.model<IDepartment>('Department', departmentSchema);
