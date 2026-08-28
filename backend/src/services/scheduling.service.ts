export class SchedulingService {
    public async generateSlots(doctorId: string, date: string): Promise<any[]> {
        return [];
    }

    public async detectConflicts(doctorId: string, time: string): Promise<boolean> {
        return false;
    }

    public async handleWaitlist(appointmentId: string): Promise<void> {}
}
