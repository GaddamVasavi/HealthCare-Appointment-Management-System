import mongoose from 'mongoose';
import Prescription, { IPrescription, PrescriptionStatus } from '../models/Prescription.model';
import Patient from '../models/Patient.model';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export interface PrescriptionInput {
  appointment: string;
  patient: string;
  doctor: string;
  medicines: IPrescription['medicines'];
  diagnosis: string;
  generalInstructions?: string;
  followUpDate?: Date;
  validUntil?: Date;
}

export class PrescriptionRecordService {
  async create(input: PrescriptionInput): Promise<IPrescription> {
    this.assertId(input.appointment, 'appointment');
    this.assertId(input.patient, 'patient');
    this.assertId(input.doctor, 'doctor');
    if (!input.medicines?.length || !input.diagnosis?.trim()) throw new BadRequestError('Diagnosis and medicines are required');
    const prescription = await Prescription.create({ ...input, prescriptionNumber: await this.nextNumber(), status: PrescriptionStatus.ACTIVE, isDigitallySigned: false });
    logger.info(`Prescription created: ${prescription.prescriptionNumber}`);
    return prescription;
  }

  async getById(id: string): Promise<IPrescription> {
    this.assertId(id, 'prescription');
    const prescription = await Prescription.findById(id).populate('patient doctor appointment').lean();
    if (!prescription) throw new NotFoundError('Prescription not found');
    return prescription as unknown as IPrescription;
  }

  async getByPatient(patientId: string, status?: PrescriptionStatus): Promise<IPrescription[]> {
    this.assertId(patientId, 'patient');
    const query: Record<string, unknown> = { patient: patientId };
    if (status) query.status = status;
    return Prescription.find(query).populate('doctor', 'firstName lastName').sort({ createdAt: -1 }).lean() as unknown as IPrescription[];
  }

  async getByDoctor(doctorId: string, status?: PrescriptionStatus): Promise<IPrescription[]> {
    this.assertId(doctorId, 'doctor');
    const query: Record<string, unknown> = { doctor: doctorId };
    if (status) query.status = status;
    return Prescription.find(query).populate('patient', 'firstName lastName').sort({ createdAt: -1 }).lean() as unknown as IPrescription[];
  }

  async requestRefill(id: string): Promise<IPrescription> {
    const prescription = await this.getById(id);
    if (prescription.status !== PrescriptionStatus.ACTIVE) throw new ConflictError('Only active prescriptions can be refilled');
    const hasRefills = prescription.medicines.some(medicine => (medicine.refills || 0) > 0);
    if (!hasRefills) throw new ConflictError('No refills remain on this prescription');
    await Prescription.updateOne({ _id: id }, { $set: { pharmacyNotes: 'Refill requested' } });
    return this.getById(id);
  }

  async cancel(id: string, doctorId: string): Promise<IPrescription> {
    this.assertId(doctorId, 'doctor');
    const prescription = await Prescription.findOne({ _id: id, doctor: doctorId });
    if (!prescription) throw new NotFoundError('Prescription not found for this doctor');
    if (prescription.status !== PrescriptionStatus.ACTIVE) throw new ConflictError('Only active prescriptions can be cancelled');
    prescription.status = PrescriptionStatus.CANCELLED;
    await prescription.save();
    return prescription;
  }

  async update(id: string, input: Partial<PrescriptionInput>): Promise<IPrescription> {
    const prescription = await Prescription.findById(id);
    if (!prescription) throw new NotFoundError('Prescription not found');
    if (prescription.status !== PrescriptionStatus.ACTIVE) throw new ConflictError('Only active prescriptions can be updated');
    if (input.medicines && input.medicines.length === 0) throw new BadRequestError('At least one medicine is required');
    Object.assign(prescription, input);
    await prescription.save();
    return prescription;
  }

  async sign(id: string, doctorId: string): Promise<IPrescription> {
    const prescription = await Prescription.findOne({ _id: id, doctor: doctorId });
    if (!prescription) throw new NotFoundError('Prescription not found');
    prescription.isDigitallySigned = true;
    prescription.signedAt = new Date();
    await prescription.save();
    return prescription;
  }

  async checkInteractions(medications: string[]): Promise<{ safe: boolean; warnings: string[] }> {
    if (!Array.isArray(medications) || medications.length === 0) throw new BadRequestError('Medication list is required');
    const normalized = medications.map(medication => medication.trim().toLowerCase()).filter(Boolean);
    const warnings: string[] = [];
    const pairs: Array<[string, string, string]> = [['warfarin', 'aspirin', 'Increased bleeding risk'], ['metformin', 'contrast', 'Review renal function before contrast'], ['lisinopril', 'potassium', 'Monitor potassium levels']];
    for (const [first, second, message] of pairs) if (normalized.some(m => m.includes(first)) && normalized.some(m => m.includes(second))) warnings.push(message);
    return { safe: warnings.length === 0, warnings };
  }

  private async nextNumber(): Promise<string> {
    const prefix = `RX-${new Date().getFullYear()}-`;
    const latest = await Prescription.findOne({ prescriptionNumber: new RegExp(`^${prefix}`) }).sort({ prescriptionNumber: -1 }).select('prescriptionNumber').lean();
    const sequence = latest ? Number(latest.prescriptionNumber.split('-').pop()) + 1 : 1;
    return `${prefix}${String(sequence).padStart(7, '0')}`;
  }

  private assertId(value: string, label: string): void {
    if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`);
  }
}

export default new PrescriptionRecordService();
