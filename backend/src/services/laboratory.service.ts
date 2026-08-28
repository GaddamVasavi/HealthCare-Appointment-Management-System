import mongoose from 'mongoose';
import { LabOrder, ILabOrder } from '../models/lab-order.model';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/errors';
import { logger } from '../utils/logger';

export interface LabOrderInput {
  patient: string;
  doctor: string;
  appointment?: string;
  tests: Array<{ testName: string; testCode: string }>;
  specimenType: string;
  priority?: 'routine' | 'stat' | 'urgent';
}

export interface LabResultInput {
  results: Array<{ testCode: string; value: string; normalRange: string; flag: 'normal' | 'high' | 'low' | 'critical' }>;
  interpretingPathologist?: string;
  reportUrl?: string;
}

export class LaboratoryService {
  async createOrder(input: LabOrderInput): Promise<ILabOrder> {
    this.assertId(input.patient, 'patient');
    this.assertId(input.doctor, 'doctor');
    if (!input.tests?.length || !input.specimenType) throw new BadRequestError('Tests and specimen type are required');
    const order = await LabOrder.create(input);
    logger.info(`Lab order created: ${order._id}`);
    return order;
  }

  async getOrder(id: string): Promise<ILabOrder> {
    this.assertId(id, 'order');
    const order = await LabOrder.findById(id).populate('patient doctor appointment').lean();
    if (!order) throw new NotFoundError('Lab order not found');
    return order as unknown as ILabOrder;
  }

  async getByPatient(patientId: string, includeCancelled = false): Promise<ILabOrder[]> {
    this.assertId(patientId, 'patient');
    const query: Record<string, unknown> = { patient: patientId };
    if (!includeCancelled) query.status = { $ne: 'cancelled' };
    return LabOrder.find(query).populate('doctor', 'firstName lastName').sort({ createdAt: -1 }).lean() as unknown as ILabOrder[];
  }

  async updateResults(id: string, input: LabResultInput): Promise<ILabOrder> {
    if (!input.results?.length) throw new BadRequestError('At least one result is required');
    const order = await LabOrder.findById(id);
    if (!order) throw new NotFoundError('Lab order not found');
    if (order.status === 'cancelled') throw new ConflictError('Cancelled orders cannot receive results');
    order.results = input.results;
    order.interpretingPathologist = input.interpretingPathologist;
    order.reportUrl = input.reportUrl;
    order.status = 'completed';
    order.criticalValueAlert = input.results.some(result => result.flag === 'critical');
    await order.save();
    logger.info(`Lab results recorded: ${id}`);
    return order;
  }

  async getResults(id: string): Promise<any> {
    const order = await this.getOrder(id);
    return { orderId: order._id, status: order.status, results: order.results, reportUrl: order.reportUrl, criticalValueAlert: order.criticalValueAlert };
  }

  async getPendingOrders(filters: { priority?: string; doctor?: string } = {}): Promise<ILabOrder[]> {
    const query: Record<string, unknown> = { status: { $in: ['ordered', 'sample_collected', 'processing'] } };
    if (filters.priority) query.priority = filters.priority;
    if (filters.doctor) { this.assertId(filters.doctor, 'doctor'); query.doctor = filters.doctor; }
    return LabOrder.find(query).populate('patient doctor', 'firstName lastName').sort({ priority: -1, createdAt: 1 }).lean() as unknown as ILabOrder[];
  }

  async updateStatus(id: string, status: ILabOrder['status']): Promise<ILabOrder> {
    const allowed: Record<string, string[]> = { ordered: ['sample_collected', 'cancelled'], sample_collected: ['processing', 'cancelled'], processing: ['completed', 'cancelled'], completed: [], cancelled: [] };
    const order = await LabOrder.findById(id);
    if (!order) throw new NotFoundError('Lab order not found');
    if (!allowed[order.status].includes(status)) throw new ConflictError(`Cannot move order from ${order.status} to ${status}`);
    order.status = status;
    await order.save();
    return order;
  }

  async cancelOrder(id: string, reason?: string): Promise<ILabOrder> {
    const order = await this.updateStatus(id, 'cancelled');
    if (reason) (order as any).cancellationReason = reason;
    return order;
  }

  async getCriticalResults(startDate?: Date, endDate?: Date): Promise<ILabOrder[]> {
    const query: Record<string, unknown> = { criticalValueAlert: true };
    if (startDate || endDate) query.createdAt = { ...(startDate ? { $gte: startDate } : {}), ...(endDate ? { $lte: endDate } : {}) };
    return LabOrder.find(query).populate('patient doctor', 'firstName lastName phone').sort({ createdAt: -1 }).lean() as unknown as ILabOrder[];
  }

  private assertId(value: string, label: string): void {
    if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`);
  }
}

export default new LaboratoryService();
