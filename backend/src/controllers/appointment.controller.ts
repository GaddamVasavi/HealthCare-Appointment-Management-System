import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';

/**
 * Controller for handling appointment operations
 */
export class AppointmentController {
    private appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const appointmentData = req.body;
            appointmentData.patientId = req.user?.id;
            const appointment = await this.appointmentService.createAppointment(appointmentData);
            res.status(201).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const appointment = await this.appointmentService.getById(id);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const appointment = await this.appointmentService.update(id, updateData);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public cancel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const appointment = await this.appointmentService.cancel(id);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public reschedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { newDate, newSlotId } = req.body;
            const appointment = await this.appointmentService.reschedule(id, newDate, newSlotId);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public checkIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const appointment = await this.appointmentService.checkIn(id);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public complete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const appointment = await this.appointmentService.complete(id);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public getAvailableSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { doctorId, date } = req.query;
            const slots = await this.appointmentService.getAvailableSlots(doctorId as string, date as string);
            res.status(200).json({ success: true, data: slots });
        } catch (error) {
            next(error);
        }
    };

    public addNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { notes } = req.body;
            const appointment = await this.appointmentService.addNotes(id, notes);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public addFollowUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const followUpData = req.body;
            const appointment = await this.appointmentService.addFollowUp(id, followUpData);
            res.status(200).json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    };

    public getByDateRange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { startDate, endDate } = req.query;
            const appointments = await this.appointmentService.getByDateRange(startDate as string, endDate as string);
            res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            next(error);
        }
    };

    public getByDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { doctorId } = req.params;
            const appointments = await this.appointmentService.getByDoctor(doctorId);
            res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            next(error);
        }
    };

    public getByPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const appointments = await this.appointmentService.getByPatient(patientId);
            res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            next(error);
        }
    };
}
