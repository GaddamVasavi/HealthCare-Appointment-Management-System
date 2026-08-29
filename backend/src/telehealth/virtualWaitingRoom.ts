/**
 * MediCare Connect - Intelligent Telehealth Virtual Waiting Room & Queue Prioritizer
 */

export interface WaitingPatient {
  patientId: string;
  appointmentId: string;
  patientName: string;
  checkInTime: string;
  scheduledTime: string;
  triagePriorityScore: number; // 1 (Highest/Urgent) to 5 (Routine)
  isDoctorReady: boolean;
}

export class VirtualWaitingRoom {
  private static readonly queue: WaitingPatient[] = [];

  public static checkIn(patient: WaitingPatient): void {
    this.queue.push(patient);
    this.sortQueue();
  }

  private static sortQueue(): void {
    this.queue.sort((a, b) => {
      // First by triage priority, then by check-in time
      if (a.triagePriorityScore !== b.triagePriorityScore) {
        return a.triagePriorityScore - b.triagePriorityScore;
      }
      return new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime();
    });
  }

  public static getNextPatient(): WaitingPatient | undefined {
    return this.queue.shift();
  }

  public static getWaitingQueue(): WaitingPatient[] {
    return [...this.queue];
  }
}
