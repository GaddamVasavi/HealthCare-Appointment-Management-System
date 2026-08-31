import * as crypto from 'crypto';

export interface TelehealthRoom {
  roomId: string;
  appointmentId: string;
  doctorUserId: string;
  patientUserId: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  recordingUrl?: string;
  consultationNotes: string[];
  participants: Array<{
    userId: string;
    role: 'doctor' | 'patient' | 'nurse' | 'interpreter';
    joinedAt: string;
    connectionState: 'connected' | 'reconnecting' | 'disconnected';
  }>;
}

export class SessionRoomService {
  private static rooms: Map<string, TelehealthRoom> = new Map();

  /**
   * Initializes a secure room token and session for a scheduled telehealth encounter
   */
  public static createRoom(appointmentId: string, doctorUserId: string, patientUserId: string): TelehealthRoom {
    const roomId = `room-${crypto.randomBytes(8).toString('hex')}`;
    const room: TelehealthRoom = {
      roomId,
      appointmentId,
      doctorUserId,
      patientUserId,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      consultationNotes: [],
      participants: [],
    };
    this.rooms.set(roomId, room);
    return room;
  }

  /**
   * Handles participant joining a consultation room
   */
  public static joinRoom(roomId: string, userId: string, role: 'doctor' | 'patient' | 'nurse' | 'interpreter'): TelehealthRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }

    const existingIdx = room.participants.findIndex(p => p.userId === userId);
    if (existingIdx >= 0) {
      room.participants[existingIdx].connectionState = 'connected';
    } else {
      room.participants.push({
        userId,
        role,
        joinedAt: new Date().toISOString(),
        connectionState: 'connected',
      });
    }

    if (room.status === 'scheduled') {
      room.status = 'active';
      room.startedAt = new Date().toISOString();
    }

    this.rooms.set(roomId, room);
    return room;
  }

  /**
   * Appends real-time clinical notes to the active telehealth session
   */
  public static appendConsultationNote(roomId: string, note: string): TelehealthRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }
    room.consultationNotes.push(`[${new Date().toISOString()}] ${note}`);
    this.rooms.set(roomId, room);
    return room;
  }

  /**
   * Concludes the telehealth consultation and archives session summary
   */
  public static completeRoom(roomId: string, recordingUrl?: string): TelehealthRoom {
    const room = this.rooms.get(roomId);
    if (!room) {
      throw new Error(`Room ${roomId} not found`);
    }
    room.status = 'completed';
    room.endedAt = new Date().toISOString();
    if (recordingUrl) {
      room.recordingUrl = recordingUrl;
    }
    this.rooms.set(roomId, room);
    return room;
  }

  public static getRoom(roomId: string): TelehealthRoom | undefined {
    return this.rooms.get(roomId);
  }
}
