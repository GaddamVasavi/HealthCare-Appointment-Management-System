import mongoose from 'mongoose';
import Patient, { IPatient } from '../models/Patient.model';
import User from '../models/User.model';
import Appointment from '../models/Appointment.model';
import { LabOrder } from '../models/lab-order.model';
import Prescription from '../models/Prescription.model';
import Doctor from '../models/Doctor.model';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export interface PatientProfileUpdate {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: IPatient['user'];
  bloodGroup?: IPatient['bloodGroup'];
  height?: number;
  weight?: number;
  emergencyContact?: IPatient['emergencyContact'];
  preferredLanguage?: string;
  preferredPharmacy?: string;
  lifestyle?: IPatient['lifestyle'];
}

export interface PatientSearchOptions {
  query?: string;
  specialization?: string;
  acceptingNewPatients?: boolean;
  page?: number;
  limit?: number;
}

export class PatientRecordService {
  async getProfile(userId: string): Promise<any> {
    const patient = await this.findPatient(userId);
    const user = await User.findById(patient.user).select('-password -refreshToken -passwordResetToken -emailVerificationToken');
    if (!user) throw new NotFoundError('Patient user account not found');
    return { user, patient };
  }

  async updateProfile(userId: string, input: PatientProfileUpdate): Promise<any> {
    const patient = await this.findPatient(userId);
    const userFields: Record<string, unknown> = {};
    for (const field of ['firstName', 'lastName', 'phone', 'address']) {
      if (input[field as keyof PatientProfileUpdate] !== undefined) userFields[field] = input[field as keyof PatientProfileUpdate];
    }
    const patientFields: Record<string, unknown> = {};
    for (const field of ['bloodGroup', 'height', 'weight', 'emergencyContact', 'preferredLanguage', 'preferredPharmacy', 'lifestyle']) {
      if (input[field as keyof PatientProfileUpdate] !== undefined) patientFields[field] = input[field as keyof PatientProfileUpdate];
    }
    const [user, updatedPatient] = await Promise.all([
      Object.keys(userFields).length ? User.findByIdAndUpdate(patient.user, userFields, { new: true, runValidators: true }).select('-password') : User.findById(patient.user).select('-password'),
      Object.keys(patientFields).length ? Patient.findByIdAndUpdate(patient._id, patientFields, { new: true, runValidators: true }) : Patient.findById(patient._id)
    ]);
    logger.info(`Patient profile updated: ${userId}`);
    return { user, patient: updatedPatient };
  }

  async getAppointments(userId: string, options: { status?: string; from?: Date; to?: Date; page?: number; limit?: number } = {}): Promise<any> {
    const query: Record<string, unknown> = { patient: await this.patientObjectId(userId) };
    if (options.status) query.status = options.status;
    if (options.from || options.to) query.date = { ...(options.from ? { $gte: options.from } : {}), ...(options.to ? { $lte: options.to } : {}) };
    return this.paginate(Appointment.find(query).populate('doctor', 'firstName lastName email profileImage').populate('specialization', 'name').sort({ date: -1, startTime: -1 }), options.page, options.limit);
  }

  async getMedicalHistory(userId: string): Promise<any[]> {
    const patient = await this.findPatient(userId);
    return patient.medicalHistory || [];
  }

  async getLabResults(userId: string, includePending = false): Promise<any[]> {
    const patientId = await this.patientObjectId(userId);
    const query: Record<string, unknown> = { patient: patientId };
    if (!includePending) query.status = 'completed';
    return LabOrder.find(query).sort({ createdAt: -1 }).populate('doctor', 'firstName lastName').lean();
  }

  async getPrescriptions(userId: string, activeOnly = false): Promise<any[]> {
    const patientId = await this.patientObjectId(userId);
    const query: Record<string, unknown> = { patient: patientId };
    if (activeOnly) query.status = 'active';
    return Prescription.find(query).sort({ createdAt: -1 }).populate('doctor', 'firstName lastName').lean();
  }

  async updateInsurance(userId: string, insurance: IPatient['insurance']): Promise<IPatient> {
    if (!insurance?.provider || !insurance.policyNumber) throw new BadRequestError('Insurance provider and policy number are required');
    const patient = await Patient.findOneAndUpdate({ user: await this.patientObjectId(userId) }, { insurance }, { new: true, runValidators: true });
    if (!patient) throw new NotFoundError('Patient record not found');
    return patient;
  }

  async searchDoctors(options: PatientSearchOptions): Promise<any> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 20));
    const query: Record<string, unknown> = {};
    if (options.specialization) query.specialization = options.specialization;
    if (options.acceptingNewPatients !== undefined) query.acceptingNewPatients = options.acceptingNewPatients;
    const userQuery: Record<string, unknown> = {};
    if (options.query) userQuery.$or = [{ firstName: new RegExp(options.query, 'i') }, { lastName: new RegExp(options.query, 'i') }];
    const users = await User.find(userQuery).select('_id firstName lastName email phone profileImage').lean();
    if (options.query) query.user = { $in: users.map(user => user._id) };
    const [doctors, total] = await Promise.all([Doctor.find(query).populate('user', 'firstName lastName email phone profileImage').populate('specialization', 'name').sort({ rating: -1 }).skip((page - 1) * limit).limit(limit).lean(), Doctor.countDocuments(query)]);
    return { doctors, total, page, pages: Math.ceil(total / limit) };
  }

  async getVitals(userId: string): Promise<any[]> {
    const patient = await this.findPatient(userId);
    return (patient as any).vitals || [];
  }

  async getDashboardStats(userId: string): Promise<Record<string, any>> {
    const patientId = await this.patientObjectId(userId);
    const [appointments, upcomingAppointments, activePrescriptions, pendingLabs, profile] = await Promise.all([
      Appointment.countDocuments({ patient: patientId }),
      Appointment.countDocuments({ patient: patientId, date: { $gte: new Date() }, status: { $in: ['pending', 'confirmed'] } }),
      Prescription.countDocuments({ patient: patientId, status: 'active' }),
      LabOrder.countDocuments({ patient: patientId, status: { $in: ['ordered', 'sample_collected', 'processing'] } }),
      this.findPatient(userId)
    ]);
    return { appointments, upcomingAppointments, activePrescriptions, pendingLabs, hasInsurance: Boolean(profile.insurance), profileCompletion: this.profileCompletion(profile) };
  }

  private async findPatient(userId: string): Promise<IPatient> {
    const patient = await Patient.findOne({ user: await this.patientObjectId(userId) });
    if (!patient) throw new NotFoundError('Patient record not found');
    return patient;
  }

  private async patientObjectId(userId: string): Promise<mongoose.Types.ObjectId> {
    if (!mongoose.isValidObjectId(userId)) throw new BadRequestError('Invalid patient identifier');
    return new mongoose.Types.ObjectId(userId);
  }

  private async paginate(query: any, page = 1, limit = 20): Promise<any> {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    const [items, total] = await Promise.all([query.skip((safePage - 1) * safeLimit).limit(safeLimit).lean(), query.model.countDocuments(query.getFilter())]);
    return { items, total, page: safePage, pages: Math.ceil(total / safeLimit) };
  }

  private profileCompletion(patient: IPatient): number {
    const checks = [patient.bloodGroup, patient.height, patient.weight, patient.emergencyContact, patient.insurance, patient.preferredLanguage, patient.preferredPharmacy];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }
}

export default new PatientRecordService();
