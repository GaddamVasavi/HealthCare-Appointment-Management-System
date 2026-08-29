/**
 * MediCare Connect - Shared Telehealth & Remote Patient Monitoring Types
 */

export type TelehealthCallStatus = 'WAITING_FOR_PATIENT' | 'WAITING_FOR_DOCTOR' | 'CONNECTING' | 'IN_CALL' | 'COMPLETED' | 'MISSED' | 'DISCONNECTED';

export interface TelehealthRoomState {
  roomId: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  callStatus: TelehealthCallStatus;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isScreenSharing: boolean;
  sessionStartTime?: string;
  sessionEndTime?: string;
  bandwidthKbps?: number;
}

export interface RPMTelemetryReading {
  readingId: string;
  deviceId: string;
  deviceType: 'CGM' | 'PULSE_OX' | 'BP_CUFF' | 'WEIGHT_SCALE' | 'SPIROMETER';
  patientId: string;
  recordedAt: string;
  measurementValue: number;
  measurementUnit: string;
  isCriticalAlert: boolean;
  batteryStatusPercent?: number;
}
