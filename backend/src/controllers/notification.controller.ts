import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';

type AuthReq = Request;

export class NotificationController {
    private service = new NotificationService();

    public getAll = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getAll(req.user?.id!);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public markRead = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.markRead(req.params.id);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public markAllRead = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.markAllRead(req.user?.id!);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public getUnreadCount = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const count = await this.service.getUnreadCount(req.user?.id!);
            res.json({ success: true, data: { count } });
        } catch (err) { next(err); }
    };

    public create = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (err) { next(err); }
    };

    public delete = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            await this.service.delete(req.params.id);
            res.json({ success: true, message: 'Deleted successfully' });
        } catch (err) { next(err); }
    };

    public getByType = async (req: AuthReq, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.getByType(req.user?.id!, req.params.type);
            res.json({ success: true, data: result });
        } catch (err) { next(err); }
    };
}
