/**
 * MediCare Connect - Operating Room (OR) Suite Scheduling & Turnover Optimizer
 */

export interface ORSuite {
  suiteId: string;
  name: string;
  floor: number;
  isSpecializedHeartSuite: boolean;
  isRoboticDaVinciReady: boolean;
  isLaminarAirflow: boolean;
}

export interface SurgicalBooking {
  bookingId: string;
  suiteId: string;
  patientId: string;
  primarySurgeonId: string;
  anesthesiologistId: string;
  procedureName: string;
  cptCode: string;
  scheduledStart: string;
  estimatedDurationMinutes: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  turnoverTimeMinutes: number;
}

export class OperatingRoomScheduler {
  private static readonly suites: Map<string, ORSuite> = new Map([
    ['OR-1', { suiteId: 'OR-1', name: 'Main Surgical Suite 1 (Cardiothoracic)', floor: 2, isSpecializedHeartSuite: true, isRoboticDaVinciReady: true, isLaminarAirflow: true }],
    ['OR-2', { suiteId: 'OR-2', name: 'Main Surgical Suite 2 (Orthopedics)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
    ['OR-3', { suiteId: 'OR-3', name: 'Main Surgical Suite 3 (General / Laparoscopic)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: true, isLaminarAirflow: false }],
    ['OR-4', { suiteId: 'OR-4', name: 'Main Surgical Suite 4 (Neurosurgery)', floor: 2, isSpecializedHeartSuite: false, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
    ['OR-5', { suiteId: 'OR-5', name: 'Emergency Trauma Surgical Suite', floor: 1, isSpecializedHeartSuite: true, isRoboticDaVinciReady: false, isLaminarAirflow: true }],
  ]);

  private static readonly bookings: Map<string, SurgicalBooking> = new Map();

  public static bookSurgery(booking: SurgicalBooking): { success: boolean; message: string } {
    if (!this.suites.has(booking.suiteId)) {
      return { success: false, message: `Operating Room Suite ${booking.suiteId} not found.` };
    }

    this.bookings.set(booking.bookingId, booking);
    return { success: true, message: 'Surgery scheduled successfully.' };
  }

  public static getSuites(): ORSuite[] {
    return Array.from(this.suites.values());
  }

  public static getBookingsForSuite(suiteId: string): SurgicalBooking[] {
    return Array.from(this.bookings.values()).filter((b) => b.suiteId === suiteId);
  }
}
