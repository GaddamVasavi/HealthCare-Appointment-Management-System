import mongoose from 'mongoose';
import Patient from '../models/Patient.model';
import User from '../models/User.model';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export type ReminderStatus = 'due' | 'scheduled' | 'completed' | 'declined' | 'expired';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface PreventiveRecommendation {
  recommendationId: string;
  patientId: string;
  category: 'immunization' | 'screening' | 'wellness' | 'chronic_disease' | 'lifestyle' | 'mental_health';
  title: string;
  description: string;
  clinicalGuideline: string;
  dueDate: Date;
  frequency?: string;
  riskLevel: RiskLevel;
  status: ReminderStatus;
  assignedClinician?: string;
  completedAt?: Date;
  completionEvidence?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImmunizationRecord {
  immunizationId: string;
  patientId: string;
  vaccine: string;
  productName?: string;
  doseNumber: number;
  administeredAt: Date;
  administeredBy: string;
  lotNumber?: string;
  expirationDate?: Date;
  site?: string;
  route?: 'oral' | 'intramuscular' | 'subcutaneous' | 'intradermal';
  reaction?: string;
  nextDueDate?: Date;
  status: 'administered' | 'refused' | 'contraindicated';
}

export interface ScreeningResult {
  screeningId: string;
  patientId: string;
  screeningType: string;
  orderedBy: string;
  orderedAt: Date;
  performedAt?: Date;
  result?: 'normal' | 'abnormal' | 'inconclusive' | 'pending';
  resultSummary?: string;
  followUpRequired: boolean;
  followUpDueDate?: Date;
  followUpPlan?: string;
  status: 'ordered' | 'scheduled' | 'completed' | 'cancelled';
}

export interface RiskAssessment {
  assessmentId: string;
  patientId: string;
  assessedBy: string;
  assessedAt: Date;
  cardiovascularRisk: RiskLevel;
  diabetesRisk: RiskLevel;
  fallRisk: RiskLevel;
  depressionRisk: RiskLevel;
  tobaccoRisk: RiskLevel;
  overallRisk: RiskLevel;
  factors: RiskFactor[];
  recommendations: string[];
  reassessmentDue: Date;
}

export interface RiskFactor {
  factor: string;
  value: string;
  weight: number;
  modifiable: boolean;
}

export interface WellnessPlan {
  planId: string;
  patientId: string;
  createdBy: string;
  createdAt: Date;
  reviewDate: Date;
  nutritionGoals: WellnessGoal[];
  activityGoals: WellnessGoal[];
  sleepGoals: WellnessGoal[];
  stressGoals: WellnessGoal[];
  status: 'draft' | 'active' | 'completed' | 'paused';
}

export interface WellnessGoal {
  goalId: string;
  description: string;
  target: string;
  measurement: string;
  frequency: string;
  progress: number;
  lastUpdated?: Date;
}

export class PreventiveCareService {
  private readonly recommendations = new Map<string, PreventiveRecommendation>();
  private readonly immunizations = new Map<string, ImmunizationRecord>();
  private readonly screenings = new Map<string, ScreeningResult>();
  private readonly assessments = new Map<string, RiskAssessment>();
  private readonly wellnessPlans = new Map<string, WellnessPlan>();

  async createRecommendation(input: Omit<PreventiveRecommendation, 'recommendationId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<PreventiveRecommendation> {
    await this.assertPatient(input.patientId);
    if (!input.title?.trim() || !input.description?.trim()) throw new BadRequestError('Recommendation title and description are required');
    const recommendation: PreventiveRecommendation = { ...input, recommendationId: this.id('PREV'), status: 'due', createdAt: new Date(), updatedAt: new Date() };
    this.recommendations.set(recommendation.recommendationId, recommendation);
    return this.clone(recommendation);
  }

  async listRecommendations(patientId: string, options: { status?: ReminderStatus; category?: PreventiveRecommendation['category']; includeExpired?: boolean } = {}): Promise<PreventiveRecommendation[]> {
    this.assertId(patientId, 'patient');
    const now = new Date();
    return [...this.recommendations.values()].filter(item => item.patientId === patientId && (!options.status || item.status === options.status) && (!options.category || item.category === options.category) && (options.includeExpired || item.status !== 'expired')).map(item => {
      if (item.status === 'due' && item.dueDate < now) item.status = 'expired';
      return this.clone(item);
    });
  }

  async scheduleRecommendation(recommendationId: string, clinicianId: string, appointmentDate: Date): Promise<PreventiveRecommendation> {
    const recommendation = this.requireRecommendation(recommendationId);
    if (recommendation.status !== 'due' && recommendation.status !== 'expired') throw new ConflictError('Recommendation is not available for scheduling');
    if (appointmentDate < new Date()) throw new BadRequestError('Appointment date must be in the future');
    recommendation.assignedClinician = clinicianId;
    recommendation.dueDate = appointmentDate;
    recommendation.status = 'scheduled';
    recommendation.updatedAt = new Date();
    return this.clone(recommendation);
  }

  async completeRecommendation(recommendationId: string, clinicianId: string, evidence: string): Promise<PreventiveRecommendation> {
    const recommendation = this.requireRecommendation(recommendationId);
    if (!evidence?.trim()) throw new BadRequestError('Completion evidence is required');
    recommendation.status = 'completed';
    recommendation.assignedClinician = clinicianId;
    recommendation.completedAt = new Date();
    recommendation.completionEvidence = evidence;
    recommendation.updatedAt = new Date();
    return this.clone(recommendation);
  }

  async declineRecommendation(recommendationId: string, patientId: string, reason: string): Promise<PreventiveRecommendation> {
    const recommendation = this.requireRecommendation(recommendationId);
    if (recommendation.patientId !== patientId) throw new ConflictError('Recommendation does not belong to patient');
    if (!reason?.trim()) throw new BadRequestError('Decline reason is required');
    recommendation.status = 'declined';
    recommendation.completionEvidence = `Declined: ${reason}`;
    recommendation.updatedAt = new Date();
    return this.clone(recommendation);
  }

  async recordImmunization(input: Omit<ImmunizationRecord, 'immunizationId'>): Promise<ImmunizationRecord> {
    await this.assertPatient(input.patientId);
    if (!input.vaccine?.trim() || input.doseNumber < 1 || !input.administeredBy) throw new BadRequestError('Vaccine, dose number, and administrator are required');
    if (input.expirationDate && input.expirationDate < input.administeredAt) throw new BadRequestError('Vaccine was expired when administered');
    const record: ImmunizationRecord = { ...input, immunizationId: this.id('IMM') };
    this.immunizations.set(record.immunizationId, record);
    logger.info(`Immunization recorded: ${record.immunizationId}`);
    return this.clone(record);
  }

  async listImmunizations(patientId: string, vaccine?: string): Promise<ImmunizationRecord[]> {
    this.assertId(patientId, 'patient');
    return [...this.immunizations.values()].filter(record => record.patientId === patientId && (!vaccine || record.vaccine.toLowerCase() === vaccine.toLowerCase())).sort((a, b) => b.administeredAt.getTime() - a.administeredAt.getTime()).map(record => this.clone(record));
  }

  async recordVaccineRefusal(patientId: string, vaccine: string, recordedBy: string, reason: string): Promise<ImmunizationRecord> {
    return this.recordImmunization({ patientId, vaccine, doseNumber: 1, administeredAt: new Date(), administeredBy: recordedBy, reaction: reason, status: 'refused' });
  }

  async orderScreening(input: Omit<ScreeningResult, 'screeningId' | 'orderedAt' | 'status' | 'followUpRequired'>): Promise<ScreeningResult> {
    await this.assertPatient(input.patientId);
    this.assertId(input.orderedBy, 'ordering clinician');
    if (!input.screeningType?.trim()) throw new BadRequestError('Screening type is required');
    const screening: ScreeningResult = { ...input, screeningId: this.id('SCREEN'), orderedAt: new Date(), status: 'ordered', followUpRequired: false };
    this.screenings.set(screening.screeningId, screening);
    return this.clone(screening);
  }

  async scheduleScreening(screeningId: string, performedAt: Date): Promise<ScreeningResult> {
    const screening = this.requireScreening(screeningId);
    if (screening.status !== 'ordered') throw new ConflictError('Only ordered screenings can be scheduled');
    if (performedAt < new Date()) throw new BadRequestError('Screening date must be in the future');
    screening.performedAt = performedAt;
    screening.status = 'scheduled';
    return this.clone(screening);
  }

  async recordScreeningResult(screeningId: string, result: NonNullable<ScreeningResult['result']>, summary: string, followUp?: { dueDate: Date; plan: string }): Promise<ScreeningResult> {
    const screening = this.requireScreening(screeningId);
    if (!['scheduled', 'ordered'].includes(screening.status)) throw new ConflictError('Screening is not ready for results');
    screening.status = 'completed';
    screening.performedAt = screening.performedAt || new Date();
    screening.result = result;
    screening.resultSummary = summary;
    screening.followUpRequired = Boolean(followUp);
    if (followUp) { screening.followUpDueDate = followUp.dueDate; screening.followUpPlan = followUp.plan; }
    return this.clone(screening);
  }

  async performRiskAssessment(input: { patientId: string; assessedBy: string; factors: RiskFactor[] }): Promise<RiskAssessment> {
    await this.assertPatient(input.patientId);
    this.assertId(input.assessedBy, 'assessing clinician');
    if (!input.factors?.length) throw new BadRequestError('Risk factors are required');
    const scores = { cardiovascularRisk: this.score(input.factors, 'cardiovascular'), diabetesRisk: this.score(input.factors, 'diabetes'), fallRisk: this.score(input.factors, 'fall'), depressionRisk: this.score(input.factors, 'depression'), tobaccoRisk: this.score(input.factors, 'tobacco') };
    const levels = Object.values(scores);
    const rank: Record<RiskLevel, number> = { low: 1, moderate: 2, high: 3, critical: 4 };
    const overallRisk = levels.sort((a, b) => rank[b] - rank[a])[0] || 'low';
    const assessment: RiskAssessment = { assessmentId: this.id('RISK'), patientId: input.patientId, assessedBy: input.assessedBy, assessedAt: new Date(), ...scores, overallRisk, factors: input.factors, recommendations: this.recommendationsFor(overallRisk, input.factors), reassessmentDue: new Date(Date.now() + (overallRisk === 'critical' ? 30 : overallRisk === 'high' ? 90 : 180) * 86400000) };
    this.assessments.set(assessment.assessmentId, assessment);
    return this.clone(assessment);
  }

  async getLatestRiskAssessment(patientId: string): Promise<RiskAssessment | null> {
    this.assertId(patientId, 'patient');
    const assessments = [...this.assessments.values()].filter(item => item.patientId === patientId).sort((a, b) => b.assessedAt.getTime() - a.assessedAt.getTime());
    return assessments[0] ? this.clone(assessments[0]) : null;
  }

  async createWellnessPlan(input: Omit<WellnessPlan, 'planId' | 'createdAt' | 'status'>): Promise<WellnessPlan> {
    await this.assertPatient(input.patientId);
    if (!input.createdBy || !input.reviewDate) throw new BadRequestError('Creator and review date are required');
    const plan: WellnessPlan = { ...input, planId: this.id('WELLNESS'), createdAt: new Date(), status: 'draft' };
    this.wellnessPlans.set(plan.planId, plan);
    return this.clone(plan);
  }

  async activateWellnessPlan(planId: string, clinicianId: string): Promise<WellnessPlan> {
    const plan = this.requireWellness(planId);
    if (plan.createdBy !== clinicianId) throw new ConflictError('Only the plan creator can activate it');
    if (plan.status !== 'draft' && plan.status !== 'paused') throw new ConflictError('Plan cannot be activated');
    plan.status = 'active';
    return this.clone(plan);
  }

  async updateWellnessGoal(planId: string, goalId: string, progress: number): Promise<WellnessPlan> {
    const plan = this.requireWellness(planId);
    if (plan.status !== 'active') throw new ConflictError('Wellness plan is not active');
    if (progress < 0 || progress > 100) throw new BadRequestError('Progress must be between 0 and 100');
    const goal = [...plan.nutritionGoals, ...plan.activityGoals, ...plan.sleepGoals, ...plan.stressGoals].find(item => item.goalId === goalId);
    if (!goal) throw new NotFoundError('Wellness goal not found');
    goal.progress = progress;
    goal.lastUpdated = new Date();
    if ([...plan.nutritionGoals, ...plan.activityGoals, ...plan.sleepGoals, ...plan.stressGoals].every(item => item.progress >= 100)) plan.status = 'completed';
    return this.clone(plan);
  }

  private async assertPatient(id: string): Promise<void> { this.assertId(id, 'patient'); if (!await Patient.exists({ _id: id })) throw new NotFoundError('Patient not found'); }
  private assertId(value: string, label: string): void { if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`); }
  private requireRecommendation(id: string): PreventiveRecommendation { const item = this.recommendations.get(id); if (!item) throw new NotFoundError('Preventive recommendation not found'); return item; }
  private requireScreening(id: string): ScreeningResult { const item = this.screenings.get(id); if (!item) throw new NotFoundError('Screening not found'); return item; }
  private requireWellness(id: string): WellnessPlan { const item = this.wellnessPlans.get(id); if (!item) throw new NotFoundError('Wellness plan not found'); return item; }
  private score(factors: RiskFactor[], keyword: string): RiskLevel { const value = factors.filter(factor => factor.factor.toLowerCase().includes(keyword)).reduce((sum, factor) => sum + factor.weight, 0); return value >= 10 ? 'critical' : value >= 6 ? 'high' : value >= 3 ? 'moderate' : 'low'; }
  private recommendationsFor(level: RiskLevel, factors: RiskFactor[]): string[] { const recommendations = ['Review preventive screening schedule', 'Confirm medication and allergy reconciliation']; if (level === 'high' || level === 'critical') recommendations.push('Schedule clinician follow-up within 30 days'); if (factors.some(factor => factor.modifiable)) recommendations.push('Create a shared lifestyle modification plan'); return recommendations; }
  private id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
  private clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
}

export default new PreventiveCareService();
