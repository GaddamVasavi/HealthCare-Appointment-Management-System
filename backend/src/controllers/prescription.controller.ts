import { Request, Response, NextFunction } from 'express';
import { PrescriptionService } from '../services/prescription.service';

interface AuthReq extends Request { user?: { id: string; role: string } }

export class PrescriptionController {
    private service = new PrescriptionService();

    public create = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const data = { ...req.body, doctorId: req.user?.id };
            const result = await this.service.createPrescription(data);
            res.status(201).json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getById = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getById(req.params.id);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getByPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getByPatient(req.params.patientId);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getByDoctor = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getByDoctor(req.user?.id!);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public refill = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.requestRefill(req.params.id);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public cancel = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.cancel(req.params.id, req.user?.id!);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public update = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public checkInteractions = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.checkInteractions(req.body.medications);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };
}
