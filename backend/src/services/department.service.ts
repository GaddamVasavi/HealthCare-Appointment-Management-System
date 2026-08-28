import mongoose from 'mongoose';
import { Department, IDepartment } from '../models/department.model';
import Doctor from '../models/Doctor.model';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export interface DepartmentInput {
  name: string;
  description: string;
  headDoctor?: string;
  location: { building: string; floor: string };
  contact: { phone: string; email: string };
  operatingHours: string;
  budget?: number;
  equipmentList?: string[];
}

export interface DepartmentFilters {
  search?: string;
  building?: string;
  page?: number;
  limit?: number;
}

export class DepartmentService {
  async create(input: DepartmentInput): Promise<IDepartment> {
    this.validateInput(input);
    const existing = await Department.findOne({ name: input.name.trim() });
    if (existing) throw new ConflictError('A department with this name already exists');
    const department = await Department.create({ ...input, name: input.name.trim(), equipmentList: input.equipmentList || [] });
    logger.info(`Department created: ${department._id}`);
    return department;
  }

  async list(filters: DepartmentFilters = {}): Promise<{ departments: IDepartment[]; total: number; page: number; pages: number }> {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(100, Math.max(1, filters.limit || 20));
    const query: Record<string, unknown> = {};
    if (filters.search) query.$or = [{ name: new RegExp(filters.search, 'i') }, { description: new RegExp(filters.search, 'i') }];
    if (filters.building) query['location.building'] = filters.building;
    const [departments, total] = await Promise.all([
      Department.find(query).populate('headDoctor', 'firstName lastName specialization').sort({ name: 1 }).skip((page - 1) * limit).limit(limit),
      Department.countDocuments(query)
    ]);
    return { departments, total, page, pages: Math.ceil(total / limit) };
  }

  async getById(id: string): Promise<IDepartment> {
    this.assertObjectId(id);
    const department = await Department.findById(id).populate('headDoctor', 'firstName lastName specialization');
    if (!department) throw new NotFoundError('Department not found');
    return department;
  }

  async update(id: string, input: Partial<DepartmentInput>): Promise<IDepartment> {
    this.assertObjectId(id);
    if (input.name) {
      const duplicate = await Department.findOne({ name: input.name.trim(), _id: { $ne: id } });
      if (duplicate) throw new ConflictError('A department with this name already exists');
      input.name = input.name.trim();
    }
    const department = await Department.findByIdAndUpdate(id, input, { new: true, runValidators: true }).populate('headDoctor', 'firstName lastName specialization');
    if (!department) throw new NotFoundError('Department not found');
    logger.info(`Department updated: ${id}`);
    return department;
  }

  async remove(id: string): Promise<void> {
    this.assertObjectId(id);
    const doctorCount = await Doctor.countDocuments({ department: id });
    if (doctorCount > 0) throw new ConflictError('Move assigned doctors before deleting this department');
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundError('Department not found');
    logger.info(`Department deleted: ${id}`);
  }

  async getDoctors(id: string): Promise<any[]> {
    this.assertObjectId(id);
    await this.getById(id);
    return Doctor.find({ department: id }).populate('user', 'firstName lastName email phone').sort({ createdAt: -1 }).lean();
  }

  async assignDoctor(id: string, doctorId: string): Promise<any> {
    this.assertObjectId(id);
    this.assertObjectId(doctorId);
    await this.getById(id);
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { department: id }, { new: true, runValidators: true }).populate('user', 'firstName lastName email');
    if (!doctor) throw new NotFoundError('Doctor not found');
    return doctor;
  }

  async removeDoctor(id: string, doctorId: string): Promise<void> {
    this.assertObjectId(id);
    this.assertObjectId(doctorId);
    const result = await Doctor.updateOne({ _id: doctorId, department: id }, { $unset: { department: 1 } });
    if (result.matchedCount === 0) throw new NotFoundError('Doctor is not assigned to this department');
  }

  async getStats(id: string): Promise<Record<string, number>> {
    this.assertObjectId(id);
    await this.getById(id);
    const [totalDoctors, acceptingPatients, verifiedDoctors] = await Promise.all([
      Doctor.countDocuments({ department: id }),
      Doctor.countDocuments({ department: id, acceptingNewPatients: true }),
      Doctor.countDocuments({ department: id, isVerified: true })
    ]);
    return { totalDoctors, acceptingPatients, verifiedDoctors, unavailableDoctors: totalDoctors - acceptingPatients };
  }

  private validateInput(input: DepartmentInput): void {
    if (!input.name?.trim() || !input.description?.trim()) throw new BadRequestError('Name and description are required');
    if (!input.location?.building || !input.location.floor) throw new BadRequestError('Location building and floor are required');
    if (!input.contact?.phone || !input.contact.email) throw new BadRequestError('Phone and email are required');
    if (input.budget !== undefined && (!Number.isFinite(input.budget) || input.budget < 0)) throw new BadRequestError('Budget must be a non-negative number');
  }

  private assertObjectId(id: string): void {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestError('Invalid department identifier');
  }
}

export default new DepartmentService();
