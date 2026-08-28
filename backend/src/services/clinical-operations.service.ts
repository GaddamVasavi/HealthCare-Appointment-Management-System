import mongoose from 'mongoose';
import Appointment from '../models/Appointment.model';
import Patient from '../models/Patient.model';
import User from '../models/User.model';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export type CarePlanStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type TaskStatus = 'open' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';
export type ReferralStatus = 'requested' | 'accepted' | 'scheduled' | 'completed' | 'declined' | 'cancelled';

export interface CareGoal {
  goalId: string;
  title: string;
  description: string;
  targetDate?: Date;
  measurement: string;
  baseline?: number;
  target?: number;
  current?: number;
  unit?: string;
  status: 'not_started' | 'in_progress' | 'achieved' | 'deferred';
}

export interface CarePlan {
  planId: string;
  patientId: string;
  primaryClinicianId: string;
  title: string;
  diagnosisCodes: string[];
  goals: CareGoal[];
  interventions: CareIntervention[];
  reviewIntervalDays: number;
  nextReviewDate: Date;
  status: CarePlanStatus;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface CareIntervention {
  interventionId: string;
  type: 'medication' | 'appointment' | 'education' | 'exercise' | 'diet' | 'monitoring' | 'referral';
  description: string;
  frequency?: string;
  assignedTo?: string;
  dueDate?: Date;
  completedAt?: Date;
  status: TaskStatus;
}

export interface Referral {
  referralId: string;
  patientId: string;
  requestedBy: string;
  referredToSpecialty: string;
  referredToClinician?: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  clinicalSummary: string;
  requestedServices: string[];
  status: ReferralStatus;
  requestedAt: Date;
  acceptedAt?: Date;
  scheduledAppointmentId?: string;
  completedAt?: Date;
  notes?: string;
}

export interface ClinicalTask {
  taskId: string;
  patientId: string;
  title: string;
  description: string;
  category: 'follow_up' | 'medication' | 'result_review' | 'care_plan' | 'referral' | 'administrative';
  assignedTo: string;
  priority: 'low' | 'normal' | 'high' | 'critical';
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
  completionNotes?: string;
  dependencies: string[];
}

export interface DischargePlan {
  dischargeId: string;
  patientId: string;
  encounterId?: string;
  preparedBy: string;
  dischargeDate: Date;
  diagnosisSummary: string;
  conditionAtDischarge: 'stable' | 'improving' | 'unchanged' | 'requires_escalation';
  medicationChanges: MedicationChange[];
  followUpInstructions: FollowUpInstruction[];
  warningSigns: string[];
  patientEducation: string[];
  transportPlan?: string;
  caregiverName?: string;
  status: 'draft' | 'ready' | 'signed' | 'cancelled';
  signedAt?: Date;
}

export interface MedicationChange {
  medication: string;
  action: 'start' | 'continue' | 'stop' | 'change_dose';
  dosage?: string;
  instructions: string;
  reason: string;
}

export interface FollowUpInstruction {
  department: string;
  timeframe: string;
  appointmentRequired: boolean;
  contactMethod?: string;
  notes?: string;
}

export interface CareTeamMember {
  memberId: string;
  patientId: string;
  clinicianId: string;
  role: 'primary' | 'consultant' | 'nurse' | 'care_coordinator' | 'pharmacist' | 'social_worker';
  startDate: Date;
  endDate?: Date;
  active: boolean;
  responsibilities: string[];
}

export class ClinicalOperationsService {
  private readonly plans = new Map<string, CarePlan>();
  private readonly referrals = new Map<string, Referral>();
  private readonly tasks = new Map<string, ClinicalTask>();
  private readonly discharges = new Map<string, DischargePlan>();
  private readonly careTeam = new Map<string, CareTeamMember>();

  async createCarePlan(input: {
    patientId: string;
    primaryClinicianId: string;
    title: string;
    diagnosisCodes?: string[];
    goals: Omit<CareGoal, 'goalId' | 'status'>[];
    interventions?: Omit<CareIntervention, 'interventionId' | 'status'>[];
    reviewIntervalDays?: number;
  }): Promise<CarePlan> {
    await this.assertPatientAndClinician(input.patientId, input.primaryClinicianId);
    if (!input.title?.trim() || !input.goals?.length) throw new BadRequestError('Care plan title and goals are required');
    const now = new Date();
    const interval = Math.max(1, input.reviewIntervalDays || 30);
    const plan: CarePlan = {
      planId: this.id('PLAN'),
      patientId: input.patientId,
      primaryClinicianId: input.primaryClinicianId,
      title: input.title.trim(),
      diagnosisCodes: input.diagnosisCodes || [],
      goals: input.goals.map(goal => ({ ...goal, goalId: this.id('GOAL'), status: 'not_started' })),
      interventions: (input.interventions || []).map(intervention => ({ ...intervention, interventionId: this.id('INT'), status: 'open' })),
      reviewIntervalDays: interval,
      nextReviewDate: new Date(now.getTime() + interval * 86400000),
      status: 'draft',
      createdAt: now,
      updatedAt: now,
      version: 1
    };
    this.plans.set(plan.planId, plan);
    logger.info(`Care plan created: ${plan.planId}`);
    return this.clone(plan);
  }

  async activateCarePlan(planId: string, clinicianId: string): Promise<CarePlan> {
    const plan = this.requirePlan(planId);
    if (plan.primaryClinicianId !== clinicianId) throw new ConflictError('Only the primary clinician can activate this plan');
    if (plan.status !== 'draft' && plan.status !== 'paused') throw new ConflictError('Care plan cannot be activated from its current status');
    plan.status = 'active';
    plan.updatedAt = new Date();
    plan.version++;
    return this.clone(plan);
  }

  async updateCareGoal(planId: string, goalId: string, update: Partial<Pick<CareGoal, 'current' | 'status' | 'targetDate'>>): Promise<CarePlan> {
    const plan = this.requirePlan(planId);
    if (plan.status !== 'active') throw new ConflictError('Only active plans can be updated');
    const goal = plan.goals.find(item => item.goalId === goalId);
    if (!goal) throw new NotFoundError('Care goal not found');
    Object.assign(goal, update);
    plan.updatedAt = new Date();
    plan.version++;
    if (plan.goals.every(item => item.status === 'achieved')) plan.status = 'completed';
    return this.clone(plan);
  }

  async listCarePlans(patientId: string, status?: CarePlanStatus): Promise<CarePlan[]> {
    this.assertId(patientId, 'patient');
    return [...this.plans.values()].filter(plan => plan.patientId === patientId && (!status || plan.status === status)).map(plan => this.clone(plan));
  }

  async createReferral(input: Omit<Referral, 'referralId' | 'status' | 'requestedAt'>): Promise<Referral> {
    await this.assertPatientAndClinician(input.patientId, input.requestedBy);
    if (!input.referredToSpecialty?.trim() || !input.reason?.trim()) throw new BadRequestError('Referral specialty and reason are required');
    const referral: Referral = { ...input, referralId: this.id('REF'), status: 'requested', requestedAt: new Date(), requestedServices: input.requestedServices || [] };
    this.referrals.set(referral.referralId, referral);
    await this.createTask({ patientId: input.patientId, title: `Review ${input.referredToSpecialty} referral`, description: input.reason, category: 'referral', assignedTo: input.requestedBy, priority: input.urgency === 'emergency' ? 'critical' : input.urgency === 'urgent' ? 'high' : 'normal', dueDate: new Date(Date.now() + (input.urgency === 'urgent' ? 86400000 : 7 * 86400000)), dependencies: [] });
    return this.clone(referral);
  }

  async updateReferralStatus(referralId: string, status: ReferralStatus, actorId: string, notes?: string): Promise<Referral> {
    const referral = this.requireReferral(referralId);
    const transitions: Record<ReferralStatus, ReferralStatus[]> = { requested: ['accepted', 'declined', 'cancelled'], accepted: ['scheduled', 'declined', 'cancelled'], scheduled: ['completed', 'cancelled'], completed: [], declined: [], cancelled: [] };
    if (!transitions[referral.status].includes(status)) throw new ConflictError(`Referral cannot move from ${referral.status} to ${status}`);
    referral.status = status;
    referral.notes = notes;
    if (status === 'accepted') referral.acceptedAt = new Date();
    if (status === 'completed') referral.completedAt = new Date();
    logger.info(`Referral ${referralId} changed to ${status} by ${actorId}`);
    return this.clone(referral);
  }

  async listReferrals(patientId: string, status?: ReferralStatus): Promise<Referral[]> {
    this.assertId(patientId, 'patient');
    return [...this.referrals.values()].filter(referral => referral.patientId === patientId && (!status || referral.status === status)).map(referral => this.clone(referral));
  }

  async createTask(input: Omit<ClinicalTask, 'taskId' | 'status' | 'createdAt' | 'completedAt'>): Promise<ClinicalTask> {
    this.assertId(input.patientId, 'patient');
    if (!input.title?.trim() || !input.assignedTo) throw new BadRequestError('Task title and assignee are required');
    const task: ClinicalTask = { ...input, taskId: this.id('TASK'), status: 'open', createdAt: new Date(), dependencies: input.dependencies || [] };
    this.tasks.set(task.taskId, task);
    return this.clone(task);
  }

  async updateTask(taskId: string, status: TaskStatus, actorId: string, completionNotes?: string): Promise<ClinicalTask> {
    const task = this.tasks.get(taskId);
    if (!task) throw new NotFoundError('Clinical task not found');
    if (task.status === 'completed' || task.status === 'cancelled') throw new ConflictError('Closed tasks cannot be changed');
    const blocking = task.dependencies.some(dependency => this.tasks.get(dependency)?.status !== 'completed');
    if (status === 'in_progress' && blocking) throw new ConflictError('Complete task dependencies first');
    task.status = status;
    if (status === 'completed') { task.completedAt = new Date(); task.completionNotes = completionNotes || `Completed by ${actorId}`; }
    return this.clone(task);
  }

  async getOpenTasks(filters: { patientId?: string; assignedTo?: string; priority?: ClinicalTask['priority'] } = {}): Promise<ClinicalTask[]> {
    return [...this.tasks.values()].filter(task => task.status !== 'completed' && task.status !== 'cancelled' && (!filters.patientId || task.patientId === filters.patientId) && (!filters.assignedTo || task.assignedTo === filters.assignedTo) && (!filters.priority || task.priority === filters.priority)).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()).map(task => this.clone(task));
  }

  async createDischargePlan(input: Omit<DischargePlan, 'dischargeId' | 'status' | 'signedAt'>): Promise<DischargePlan> {
    this.assertId(input.patientId, 'patient');
    if (!input.diagnosisSummary?.trim() || !input.followUpInstructions?.length) throw new BadRequestError('Diagnosis summary and follow-up instructions are required');
    const plan: DischargePlan = { ...input, dischargeId: this.id('DISCHARGE'), status: 'draft' };
    this.discharges.set(plan.dischargeId, plan);
    return this.clone(plan);
  }

  async signDischargePlan(dischargeId: string, clinicianId: string): Promise<DischargePlan> {
    const plan = this.discharges.get(dischargeId);
    if (!plan) throw new NotFoundError('Discharge plan not found');
    if (plan.preparedBy !== clinicianId) throw new ConflictError('Only the preparing clinician can sign this plan');
    if (plan.status !== 'ready') throw new ConflictError('Discharge plan must be ready before signing');
    plan.status = 'signed';
    plan.signedAt = new Date();
    return this.clone(plan);
  }

  async addCareTeamMember(input: Omit<CareTeamMember, 'memberId' | 'startDate' | 'active'>): Promise<CareTeamMember> {
    await this.assertPatientAndClinician(input.patientId, input.clinicianId);
    if (!input.responsibilities?.length) throw new BadRequestError('At least one responsibility is required');
    const member: CareTeamMember = { ...input, memberId: this.id('TEAM'), startDate: new Date(), active: true };
    this.careTeam.set(member.memberId, member);
    return this.clone(member);
  }

  async removeCareTeamMember(memberId: string, actorId: string): Promise<void> {
    const member = this.careTeam.get(memberId);
    if (!member) throw new NotFoundError('Care team member not found');
    member.active = false;
    member.endDate = new Date();
    logger.info(`Care team member ${memberId} removed by ${actorId}`);
  }

  async getCareTeam(patientId: string): Promise<CareTeamMember[]> {
    return [...this.careTeam.values()].filter(member => member.patientId === patientId && member.active).map(member => this.clone(member));
  }

  async getCareCoordinationSummary(patientId: string): Promise<Record<string, unknown>> {
    const [plans, referrals, tasks, team, appointments] = await Promise.all([this.listCarePlans(patientId), this.listReferrals(patientId), this.getOpenTasks({ patientId }), this.getCareTeam(patientId), Appointment.countDocuments({ patient: patientId, date: { $gte: new Date() }, status: { $in: ['pending', 'confirmed'] } })]);
    return { patientId, activePlans: plans.filter(plan => plan.status === 'active').length, openReferrals: referrals.filter(referral => !['completed', 'cancelled', 'declined'].includes(referral.status)).length, openTasks: tasks.length, careTeamMembers: team.length, upcomingAppointments: appointments, generatedAt: new Date() };
  }

  private async assertPatientAndClinician(patientId: string, clinicianId: string): Promise<void> {
    this.assertId(patientId, 'patient');
    this.assertId(clinicianId, 'clinician');
    const [patient, clinician] = await Promise.all([Patient.exists({ _id: patientId }), User.exists({ _id: clinicianId })]);
    if (!patient) throw new NotFoundError('Patient not found');
    if (!clinician) throw new NotFoundError('Clinician not found');
  }

  private requirePlan(id: string): CarePlan { const plan = this.plans.get(id); if (!plan) throw new NotFoundError('Care plan not found'); return plan; }
  private requireReferral(id: string): Referral { const referral = this.referrals.get(id); if (!referral) throw new NotFoundError('Referral not found'); return referral; }
  private assertId(value: string, label: string): void { if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`); }
  private id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
  private clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
}

export default new ClinicalOperationsService();
