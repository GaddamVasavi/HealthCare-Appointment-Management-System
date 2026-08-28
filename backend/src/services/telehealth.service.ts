import mongoose from 'mongoose';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export type TelehealthStatus = 'requested' | 'scheduled' | 'waiting_room' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
export type ConnectionStatus = 'offline' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface TelehealthSession {
  sessionId: string;
  appointmentId: string;
  patientId: string;
  clinicianId: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  status: TelehealthStatus;
  connection: ConnectionStatus;
  roomName: string;
  accessToken?: string;
  patientJoinedAt?: Date;
  clinicianJoinedAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  durationSeconds?: number;
  recording: RecordingPolicy;
  consent: ConsentRecord[];
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RecordingPolicy {
  requested: boolean;
  enabled: boolean;
  consentRequired: boolean;
  storageKey?: string;
  retentionDays: number;
  deletedAt?: Date;
}

export interface ConsentRecord {
  consentId: string;
  participantId: string;
  consentType: 'telehealth' | 'recording' | 'screen_share';
  granted: boolean;
  capturedAt: Date;
  method: 'portal' | 'verbal' | 'staff_entered';
  withdrawnAt?: Date;
}

export interface Participant {
  participantId: string;
  role: 'patient' | 'clinician' | 'interpreter' | 'caregiver';
  displayName: string;
  joinedAt?: Date;
  leftAt?: Date;
  connection: ConnectionStatus;
}

export interface TelehealthMessage {
  messageId: string;
  sessionId: string;
  senderId: string;
  recipientId?: string;
  body: string;
  sentAt: Date;
  readAt?: Date;
  attachmentKeys: string[];
  urgent: boolean;
}

export interface TechnicalEvent {
  eventId: string;
  sessionId: string;
  participantId?: string;
  type: 'connection' | 'disconnection' | 'quality' | 'permission' | 'device' | 'error';
  details: Record<string, unknown>;
  occurredAt: Date;
}

export class TelehealthService {
  private readonly sessions = new Map<string, TelehealthSession>();
  private readonly messages = new Map<string, TelehealthMessage>();
  private readonly events = new Map<string, TechnicalEvent>();

  async createSession(input: Omit<TelehealthSession, 'sessionId' | 'status' | 'connection' | 'roomName' | 'consent' | 'participants' | 'createdAt' | 'updatedAt'>): Promise<TelehealthSession> {
    this.assertId(input.appointmentId, 'appointment');
    this.assertId(input.patientId, 'patient');
    this.assertId(input.clinicianId, 'clinician');
    if (input.scheduledEnd <= input.scheduledStart) throw new BadRequestError('Session end must be after session start');
    const session: TelehealthSession = { ...input, sessionId: this.id('VIDEO'), status: 'requested', connection: 'offline', roomName: `medicare-${this.id('ROOM').toLowerCase()}`, consent: [], participants: [], createdAt: new Date(), updatedAt: new Date() };
    this.sessions.set(session.sessionId, session);
    logger.info(`Telehealth session created: ${session.sessionId}`);
    return this.clone(session);
  }

  async scheduleSession(sessionId: string, actorId: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (!actorId) throw new BadRequestError('Scheduling actor is required');
    if (session.status !== 'requested') throw new ConflictError('Only requested sessions can be scheduled');
    session.status = 'scheduled';
    session.updatedAt = new Date();
    return this.clone(session);
  }

  async enterWaitingRoom(sessionId: string, participantId: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    this.assertId(participantId, 'participant');
    if (!['scheduled', 'waiting_room'].includes(session.status)) throw new ConflictError('Session is not available for waiting room entry');
    session.status = 'waiting_room';
    this.joinParticipant(session, participantId);
    session.updatedAt = new Date();
    return this.clone(session);
  }

  async grantConsent(sessionId: string, input: Omit<ConsentRecord, 'consentId' | 'capturedAt'>): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    this.assertId(input.participantId, 'participant');
    const existing = session.consent.find(consent => consent.participantId === input.participantId && consent.consentType === input.consentType && !consent.withdrawnAt);
    if (existing) throw new ConflictError('Consent has already been recorded');
    session.consent.push({ ...input, consentId: this.id('CONSENT'), capturedAt: new Date() });
    session.updatedAt = new Date();
    return this.clone(session);
  }

  async withdrawConsent(sessionId: string, participantId: string, consentType: ConsentRecord['consentType']): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    const consent = session.consent.find(item => item.participantId === participantId && item.consentType === consentType && !item.withdrawnAt);
    if (!consent) throw new NotFoundError('Active consent not found');
    consent.withdrawnAt = new Date();
    if (consentType === 'recording') session.recording.enabled = false;
    return this.clone(session);
  }

  async startSession(sessionId: string, clinicianId: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (session.clinicianId !== clinicianId) throw new ConflictError('Only the assigned clinician can start the session');
    if (!session.consent.some(consent => consent.participantId === session.patientId && consent.consentType === 'telehealth' && consent.granted && !consent.withdrawnAt)) throw new ConflictError('Patient telehealth consent is required');
    if (session.status !== 'waiting_room') throw new ConflictError('Both participants must enter the waiting room first');
    session.status = 'in_progress';
    session.startedAt = new Date();
    session.connection = 'connected';
    session.updatedAt = new Date();
    return this.clone(session);
  }

  async endSession(sessionId: string, actorId: string, notes?: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (![session.patientId, session.clinicianId].includes(actorId)) throw new ConflictError('Participant is not part of this session');
    if (session.status !== 'in_progress') throw new ConflictError('Only active sessions can be ended');
    session.status = 'completed';
    session.endedAt = new Date();
    session.connection = 'disconnected';
    session.durationSeconds = session.startedAt ? Math.round((session.endedAt.getTime() - session.startedAt.getTime()) / 1000) : 0;
    if (notes) this.recordEvent(sessionId, { type: 'connection', details: { endedBy: actorId, notes } });
    return this.clone(session);
  }

  async cancelSession(sessionId: string, actorId: string, reason: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (!reason?.trim()) throw new BadRequestError('Cancellation reason is required');
    if (![session.patientId, session.clinicianId].includes(actorId)) throw new ConflictError('Participant is not part of this session');
    if (['completed', 'cancelled'].includes(session.status)) throw new ConflictError('Session is already closed');
    session.status = 'cancelled';
    session.updatedAt = new Date();
    this.recordEvent(sessionId, { type: 'connection', details: { cancelledBy: actorId, reason } });
    return this.clone(session);
  }

  async updateConnection(sessionId: string, participantId: string, status: ConnectionStatus, metrics?: Record<string, number>): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    const participant = session.participants.find(item => item.participantId === participantId);
    if (!participant) throw new NotFoundError('Session participant not found');
    participant.connection = status;
    session.connection = status === 'connected' ? 'connected' : status;
    this.recordEvent(sessionId, { participantId, type: status === 'connected' ? 'connection' : 'disconnection', details: metrics || {} });
    return this.clone(session);
  }

  async sendMessage(input: Omit<TelehealthMessage, 'messageId' | 'sentAt' | 'readAt' | 'attachmentKeys'> & { attachmentKeys?: string[] }): Promise<TelehealthMessage> {
    const session = this.requireSession(input.sessionId);
    if (session.status !== 'in_progress') throw new ConflictError('Messages can only be sent during an active session');
    if (!input.body?.trim()) throw new BadRequestError('Message body is required');
    const message: TelehealthMessage = { ...input, messageId: this.id('MSG'), sentAt: new Date(), attachmentKeys: input.attachmentKeys || [] };
    this.messages.set(message.messageId, message);
    if (input.urgent) this.recordEvent(session.sessionId, { participantId: input.senderId, type: 'error', details: { urgentMessage: message.messageId } });
    return this.clone(message);
  }

  async markMessageRead(messageId: string, participantId: string): Promise<TelehealthMessage> {
    const message = this.messages.get(messageId);
    if (!message) throw new NotFoundError('Telehealth message not found');
    if (message.recipientId && message.recipientId !== participantId) throw new ConflictError('Message is not addressed to this participant');
    message.readAt = new Date();
    return this.clone(message);
  }

  async getSessionMessages(sessionId: string, participantId: string): Promise<TelehealthMessage[]> {
    const session = this.requireSession(sessionId);
    if (![session.patientId, session.clinicianId].includes(participantId)) throw new ConflictError('Participant is not part of this session');
    return [...this.messages.values()].filter(message => message.sessionId === sessionId && (!message.recipientId || [session.patientId, session.clinicianId].includes(message.recipientId))).sort((a, b) => a.sentAt.getTime() - b.sentAt.getTime()).map(message => this.clone(message));
  }

  async enableRecording(sessionId: string, clinicianId: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (session.clinicianId !== clinicianId) throw new ConflictError('Only the clinician can enable recording');
    const consent = session.consent.find(item => item.participantId === session.patientId && item.consentType === 'recording' && item.granted && !item.withdrawnAt);
    if (!consent) throw new ConflictError('Recording consent is required');
    session.recording.enabled = true;
    session.recording.requested = true;
    session.updatedAt = new Date();
    return this.clone(session);
  }

  async disableRecording(sessionId: string, actorId: string): Promise<TelehealthSession> {
    const session = this.requireSession(sessionId);
    if (![session.patientId, session.clinicianId].includes(actorId)) throw new ConflictError('Participant is not part of this session');
    session.recording.enabled = false;
    session.recording.deletedAt = new Date();
    return this.clone(session);
  }

  async getTechnicalEvents(sessionId: string, participantId: string): Promise<TechnicalEvent[]> {
    const session = this.requireSession(sessionId);
    if (![session.patientId, session.clinicianId].includes(participantId)) throw new ConflictError('Participant is not part of this session');
    return [...this.events.values()].filter(event => event.sessionId === sessionId).sort((a, b) => a.occurredAt.getTime() - b.occurredAt.getTime()).map(event => this.clone(event));
  }

  private joinParticipant(session: TelehealthSession, participantId: string): void {
    const role: Participant['role'] = participantId === session.patientId ? 'patient' : 'clinician';
    const current = session.participants.find(participant => participant.participantId === participantId);
    if (current) { current.joinedAt = current.joinedAt || new Date(); current.connection = 'connected'; return; }
    session.participants.push({ participantId, role, displayName: role === 'patient' ? 'Patient' : 'Clinician', joinedAt: new Date(), connection: 'connected' });
    if (role === 'patient') session.patientJoinedAt = new Date();
    if (role === 'clinician') session.clinicianJoinedAt = new Date();
  }

  private recordEvent(sessionId: string, input: Omit<TechnicalEvent, 'eventId' | 'sessionId' | 'occurredAt'>): void {
    this.events.set(this.id('EVENT'), { ...input, eventId: this.id('EVENT'), sessionId, occurredAt: new Date() });
  }
  private requireSession(id: string): TelehealthSession { const session = this.sessions.get(id); if (!session) throw new NotFoundError('Telehealth session not found'); return session; }
  private assertId(value: string, label: string): void { if (!value || !mongoose.isValidObjectId(value)) throw new BadRequestError(`Invalid ${label} identifier`); }
  private id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
  private clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
}

export default new TelehealthService();
