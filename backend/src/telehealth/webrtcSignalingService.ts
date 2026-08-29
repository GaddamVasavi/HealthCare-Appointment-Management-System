/**
 * MediCare Connect - WebRTC Signaling & Video Consultation Session Manager
 */

export interface WebRTCSession {
  sessionId: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  status: 'INITIALIZING' | 'CONNECTED' | 'IN_CONSULTATION' | 'TERMINATED';
  iceCandidates: any[];
  offerSdp?: string;
  answerSdp?: string;
}

export class WebRTCSignalingService {
  private static readonly sessions: Map<string, WebRTCSession> = new Map();

  public static createSession(appointmentId: string, patientId: string, doctorId: string): WebRTCSession {
    const sessionId = `VCONF-${appointmentId}-${Date.now().toString(36)}`;
    const session: WebRTCSession = {
      sessionId,
      appointmentId,
      patientId,
      doctorId,
      createdAt: new Date().toISOString(),
      status: 'INITIALIZING',
      iceCandidates: [],
    };
    this.sessions.set(sessionId, session);
    return session;
  }

  public static registerOffer(sessionId: string, sdp: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.offerSdp = sdp;
    return true;
  }

  public static registerAnswer(sessionId: string, sdp: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.answerSdp = sdp;
    session.status = 'CONNECTED';
    return true;
  }

  public static addICECandidate(sessionId: string, candidate: any): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.iceCandidates.push(candidate);
    return true;
  }

  public static getSession(sessionId: string): WebRTCSession | undefined {
    return this.sessions.get(sessionId);
  }
}
