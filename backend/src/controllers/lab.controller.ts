import { Request, Response, NextFunction } from 'express';
import { LabService } from '../services/lab.service';

interface AuthReq extends Request { user?: { id: string; role: string } }

export class LabController {
    private service = new LabService();

    public createOrder = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const data = { ...req.body, orderedBy: req.user?.id };
            const result = await this.service.createOrder(data);
            res.status(201).json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getOrder = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getOrder(req.params.id);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getByPatient = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getByPatient(req.params.patientId);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public updateResults = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const data = { ...req.body, processedBy: req.user?.id };
            const result = await this.service.updateResults(req.params.id, data);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getResults = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getResults(req.params.id);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getPendingOrders = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getPendingOrders();
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };
}
