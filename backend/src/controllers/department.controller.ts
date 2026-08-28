import { Request, Response, NextFunction } from 'express';
import departmentService from '../services/department.service';
export class DepartmentController {
    
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try { res.status(201).json({ success: true, data: await departmentService.create(req.body) }); } catch (error) { next(error); }
    };

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.list(req.query) }); } catch (error) { next(error); }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.getById(req.params.id) }); } catch (error) { next(error); }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.update(req.params.id, req.body) }); } catch (error) { next(error); }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try { await departmentService.remove(req.params.id); res.status(204).send(); } catch (error) { next(error); }
    };

    public getDoctors = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.getDoctors(req.params.id) }); } catch (error) { next(error); }
    };

    public getStats = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.getStats(req.params.id) }); } catch (error) { next(error); }
    };

    public assignDoctor = async (req: Request, res: Response, next: NextFunction) => {
        try { res.json({ success: true, data: await departmentService.assignDoctor(req.params.id, req.body.doctorId) }); } catch (error) { next(error); }
    };

    public removeDoctor = async (req: Request, res: Response, next: NextFunction) => {
        try { await departmentService.removeDoctor(req.params.id, req.params.doctorId); res.status(204).send(); } catch (error) { next(error); }
    };
}
