import prescriptionService, { PrescriptionRecordService } from './prescription-record.service';

export class PrescriptionService extends PrescriptionRecordService {
    async createPrescription(data: any): Promise<any> { return this.create(data); }
}
export default prescriptionService;
