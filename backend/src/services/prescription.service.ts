export class PrescriptionService {
    public async createPrescription(data: any): Promise<any> { return { id: `RX-${Date.now()}`, ...data }; }
    public async getById(id: string): Promise<any> { return { id }; }
    public async getByPatient(patientId: string): Promise<any[]> { return []; }
    public async getByDoctor(doctorId: string): Promise<any[]> { return []; }
    public async requestRefill(id: string): Promise<any> { return { id, status: 'REFILL_REQUESTED' }; }
    public async cancel(id: string, doctorId: string): Promise<any> { return { id, status: 'CANCELLED' }; }
    public async update(id: string, data: any): Promise<any> { return { id, ...data }; }
    public async checkInteractions(medications: string[]): Promise<any> { return { safe: true, warnings: [] }; }
}
