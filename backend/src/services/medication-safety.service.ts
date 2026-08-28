import mongoose from 'mongoose';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export type MedicationStatus = 'active' | 'held' | 'discontinued' | 'completed';
export type MedicationRoute = 'oral' | 'intravenous' | 'intramuscular' | 'subcutaneous' | 'topical' | 'inhaled' | 'ophthalmic' | 'otic' | 'nasal';

export interface MedicationOrder {
  orderId: string;
  patientId: string;
  prescriberId: string;
  medicationName: string;
  genericName?: string;
  strength: string;
  route: MedicationRoute;
  dose: string;
  frequency: string;
  duration?: string;
  quantity?: number;
  refills: number;
  indication: string;
  startDate: Date;
  endDate?: Date;
  status: MedicationStatus;
  highAlert: boolean;
  instructions: string[];
  reconciliationSource: 'new' | 'home_medication' | 'transfer' | 'discharge';
  createdAt: Date;
  updatedAt: Date;
}

export interface AllergyAlert {
  alertId: string;
  patientId: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life_threatening';
  verified: boolean;
  recordedBy: string;
  recordedAt: Date;
  resolvedAt?: Date;
}

export interface InteractionAlert {
  interactionId: string;
  patientId: string;
  medications: string[];
  severity: 'minor' | 'moderate' | 'major' | 'contraindicated';
  description: string;
  recommendation: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface MedicationReconciliation {
  reconciliationId: string;
  patientId: string;
  completedBy: string;
  completedAt: Date;
  source: 'admission' | 'transfer' | 'discharge' | 'outpatient_review';
  homeMedications: ReconciledMedication[];
  discrepancies: MedicationDiscrepancy[];
  resolved: boolean;
}

export interface ReconciledMedication {
  name: string;
  dose: string;
  route: MedicationRoute;
  frequency: string;
  taking: boolean;
  lastTakenAt?: Date;
  source: string;
}

export interface MedicationDiscrepancy {
  discrepancyId: string;
  medication: string;
  type: 'omission' | 'duplication' | 'dose_difference' | 'route_difference' | 'frequency_difference';
  homeValue?: string;
  prescribedValue?: string;
  resolution?: string;
  resolved: boolean;
}

export interface AdministrationRecord {
  administrationId: string;
  orderId: string;
  patientId: string;
  administeredBy: string;
  scheduledAt: Date;
  administeredAt?: Date;
  dose: string;
  route: MedicationRoute;
  status: 'scheduled' | 'administered' | 'refused' | 'held' | 'missed';
  reason?: string;
  vitalsBefore?: Record<string, number>;
  responseNotes?: string;
}

export class MedicationSafetyService {
  private readonly orders = new Map<string, MedicationOrder>();
  private readonly allergies = new Map<string, AllergyAlert>();
  private readonly interactions = new Map<string, InteractionAlert>();
  private readonly reconciliations = new Map<string, MedicationReconciliation>();
  private readonly administrations = new Map<string, AdministrationRecord>();

  async createOrder(input: Omit<MedicationOrder, 'orderId' | 'status' | 'highAlert' | 'createdAt' | 'updatedAt' | 'refills'> & { refills?: number }): Promise<MedicationOrder> {
    this.assertId(input.patientId, 'patient');
    this.assertId(input.prescriberId, 'prescriber');
    if (!input.medicationName?.trim() || !input.strength?.trim() || !input.dose?.trim() || !input.frequency?.trim()) throw new BadRequestError('Medication, strength, dose, and frequency are required');
    const allergy = await this.checkAllergy(input.patientId, input.medicationName);
    if (allergy?.severity === 'life_threatening') throw new ConflictError(`Medication conflicts with recorded allergy to ${allergy.allergen}`);
    const order: MedicationOrder = { ...input, orderId: this.id('MED'), status: 'active', highAlert: this.isHighAlert(input.medicationName), refills: input.refills || 0, createdAt: new Date(), updatedAt: new Date() };
    this.orders.set(order.orderId, order);
    logger.info(`Medication order created: ${order.orderId}`);
    return this.clone(order);
  }

  async updateOrder(orderId: string, update: Partial<Pick<MedicationOrder, 'dose' | 'frequency' | 'duration' | 'quantity' | 'refills' | 'instructions' | 'endDate'>>, actorId: string): Promise<MedicationOrder> {
    const order = this.requireOrder(orderId);
    if (order.status !== 'active') throw new ConflictError('Only active orders can be updated');
    if (!actorId) throw new BadRequestError('Actor is required');
    Object.assign(order, update, { updatedAt: new Date() });
    return this.clone(order);
  }

  async discontinueOrder(orderId: string, actorId: string, reason: string): Promise<MedicationOrder> {
    const order = this.requireOrder(orderId);
    if (!reason?.trim()) throw new BadRequestError('Discontinuation reason is required');
    order.status = 'discontinued';
    order.endDate = new Date();
    order.instructions = [...order.instructions, `Discontinued by ${actorId}: ${reason}`];
    order.updatedAt = new Date();
    return this.clone(order);
  }

  async listActiveOrders(patientId: string): Promise<MedicationOrder[]> {
    this.assertId(patientId, 'patient');
    return [...this.orders.values()].filter(order => order.patientId === patientId && order.status === 'active').map(order => this.clone(order));
  }

  async recordAllergy(input: Omit<AllergyAlert, 'alertId' | 'verified' | 'recordedAt' | 'resolvedAt'>): Promise<AllergyAlert> {
    this.assertId(input.patientId, 'patient');
    if (!input.allergen?.trim() || !input.reaction?.trim()) throw new BadRequestError('Allergen and reaction are required');
    const allergy: AllergyAlert = { ...input, alertId: this.id('ALLERGY'), verified: false, recordedAt: new Date() };
    this.allergies.set(allergy.alertId, allergy);
    return this.clone(allergy);
  }

  async verifyAllergy(alertId: string, clinicianId: string): Promise<AllergyAlert> {
    const allergy = this.allergies.get(alertId);
    if (!allergy) throw new NotFoundError('Allergy alert not found');
    allergy.verified = true;
    allergy.recordedBy = clinicianId;
    return this.clone(allergy);
  }

  async resolveAllergy(alertId: string, clinicianId: string, reason: string): Promise<AllergyAlert> {
    const allergy = this.allergies.get(alertId);
    if (!allergy) throw new NotFoundError('Allergy alert not found');
    if (!reason?.trim()) throw new BadRequestError('Resolution reason is required');
    allergy.resolvedAt = new Date();
    allergy.reaction = `${allergy.reaction} [Resolved by ${clinicianId}: ${reason}]`;
    return this.clone(allergy);
  }

  async checkAllergy(patientId: string, medicationName: string): Promise<AllergyAlert | undefined> {
    const name = medicationName.toLowerCase();
    return [...this.allergies.values()].find(alert => alert.patientId === patientId && !alert.resolvedAt && (name.includes(alert.allergen.toLowerCase()) || alert.allergen.toLowerCase().includes(name)));
  }

  async checkInteractions(patientId: string, medicationNames: string[]): Promise<InteractionAlert[]> {
    this.assertId(patientId, 'patient');
    if (!medicationNames?.length) throw new BadRequestError('At least one medication is required');
    const normalized = medicationNames.map(name => name.toLowerCase());
    const known: Array<[string, string, InteractionAlert['severity'], string, string]> = [
      ['warfarin', 'aspirin', 'major', 'Combined anticoagulant effect', 'Avoid combination unless specifically approved and monitor bleeding'],
      ['simvastatin', 'clarithromycin', 'contraindicated', 'Increased statin toxicity', 'Use an alternative antibiotic'],
      ['lisinopril', 'spironolactone', 'moderate', 'Risk of hyperkalemia', 'Monitor potassium and renal function'],
      ['metformin', 'contrast', 'moderate', 'Potential lactic acidosis risk', 'Review renal function and hold when clinically indicated'],
      ['opioid', 'benzodiazepine', 'major', 'Additive respiratory depression', 'Avoid combination or use enhanced monitoring']
    ];
    const alerts: InteractionAlert[] = [];
    for (const [first, second, severity, description, recommendation] of known) {
      if (normalized.some(name => name.includes(first)) && normalized.some(name => name.includes(second))) {
        const alert: InteractionAlert = { interactionId: this.id('INTERACTION'), patientId, medications: [first, second], severity, description, recommendation, acknowledged: false };
        this.interactions.set(alert.interactionId, alert);
        alerts.push(this.clone(alert));
      }
    }
    return alerts;
  }

  async acknowledgeInteraction(interactionId: string, clinicianId: string, overrideReason?: string): Promise<InteractionAlert> {
    const interaction = this.interactions.get(interactionId);
    if (!interaction) throw new NotFoundError('Interaction alert not found');
    if (interaction.severity === 'contraindicated' && !overrideReason?.trim()) throw new ConflictError('Override reason is required for contraindicated interaction');
    interaction.acknowledged = true;
    interaction.acknowledgedBy = clinicianId;
    interaction.acknowledgedAt = new Date();
    if (overrideReason) interaction.recommendation += ` Override: ${overrideReason}`;
    return this.clone(interaction);
  }

  async reconcileMedications(input: Omit<MedicationReconciliation, 'reconciliationId' | 'completedAt' | 'resolved'>): Promise<MedicationReconciliation> {
    this.assertId(input.patientId, 'patient');
    const discrepancies = input.discrepancies || [];
    const reconciliation: MedicationReconciliation = { ...input, reconciliationId: this.id('RECON'), completedAt: new Date(), discrepancies, resolved: discrepancies.every(item => item.resolved) };
    this.reconciliations.set(reconciliation.reconciliationId, reconciliation);
    return this.clone(reconciliation);
  }

  async resolveDiscrepancy(reconciliationId: string, discrepancyId: string, resolution: string): Promise<MedicationReconciliation> {
    const reconciliation = this.reconciliations.get(reconciliationId);
    if (!reconciliation) throw new NotFoundError('Medication reconciliation not found');
    const discrepancy = reconciliation.discrepancies.find(item => item.discrepancyId === discrepancyId);
    if (!discrepancy) throw new NotFoundError('Medication discrepancy not found');
    if (!resolution?.trim()) throw new BadRequestError('Resolution is required');
    discrepancy.resolution = resolution;
    discrepancy.resolved = true;
    reconciliation.resolved = reconciliation.discrepancies.every(item => item.resolved);
    return this.clone(reconciliation);
  }

  async scheduleAdministration(input: Omit<AdministrationRecord, 'administrationId' | 'status'>): Promise<AdministrationRecord> {
    const order = this.requireOrder(input.orderId);
    if (order.status !== 'active') throw new ConflictError('Medication order is not active');
    if (order.patientId !== input.patientId) throw new ConflictError('Medication order does not belong to patient');
    const administration: AdministrationRecord = { ...input, administrationId: this.id('ADMIN'), status: 'scheduled' };
    this.administrations.set(administration.administrationId, administration);
    return this.clone(administration);
  }

  async administer(administrationId: string, actorId: string, responseNotes?: string, vitalsBefore?: Record<string, number>): Promise<AdministrationRecord> {
    const administration = this.administrations.get(administrationId);
    if (!administration) throw new NotFoundError('Administration record not found');
    if (administration.status !== 'scheduled') throw new ConflictError('Administration is not scheduled');
    administration.status = 'administered';
    administration.administeredBy = actorId;
    administration.administeredAt = new Date();
    administration.responseNotes = responseNotes;
    administration.vitalsBefore = vitalsBefore;
    return this.clone(administration);
  }

  async refuseAdministration(administrationId: string, actorId: string, reason: string): Promise<AdministrationRecord> {
    const administration = this.administrations.get(administrationId);
    if (!administration) throw new NotFoundError('Administration record not found');
    if (!reason?.trim()) throw new BadRequestError('Refusal reason is required');
    administration.status = 'refused';
    administration.administeredBy = actorId;
    administration.reason = reason;
    administration.administeredAt = new Date();
    return this.clone(administration);
  }

  private requireOrder(id: string): MedicationOrder { const order = this.orders.get(id); if (!order) throw new NotFoundError('Medication order not found'); return order; }
  private isHighAlert(name: string): boolean { return ['insulin', 'heparin', 'warfarin', 'opioid', 'chemotherapy', 'potassium chloride'].some(item => name.toLowerCase().includes(item)); }
  private assertId(value: string, label: string): void { if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`); }
  private id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
  private clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
}

export default new MedicationSafetyService();
