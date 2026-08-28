export class LabService {
    public async createOrder(data: any): Promise<any> {
        return { id: `LAB-${Date.now()}`, ...data, status: 'ORDERED' };
    }

    public async getOrder(id: string): Promise<any> {
        return { id, status: 'ORDERED' };
    }

    public async getByPatient(patientId: string): Promise<any[]> {
        return [];
    }

    public async updateResults(id: string, data: any): Promise<any> {
        return { id, status: 'COMPLETED', results: data };
    }

    public async getResults(id: string): Promise<any> {
        return { id, results: {} };
    }

    public async getPendingOrders(): Promise<any[]> {
        return [];
    }
}
