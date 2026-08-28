import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
    private service = new AnalyticsService();

    public getDashboardOverview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getDashboardOverview();
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getAppointmentAnalytics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getAppointmentAnalytics(req.query);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getRevenueAnalytics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getRevenueAnalytics(req.query);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getPatientDemographics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getPatientDemographics();
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getDoctorPerformance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getDoctorPerformance(req.query);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };
}
