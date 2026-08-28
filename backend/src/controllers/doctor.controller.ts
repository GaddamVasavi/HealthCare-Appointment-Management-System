import { Request, Response, NextFunction } from 'express';
import { DoctorService } from '../services/doctor.service';

/**
 * Controller for handling doctor operations
 */
export class DoctorController {
    private doctorService: DoctorService;

    constructor() {
        this.doctorService = new DoctorService();
    }

    /**
     * Get doctor profile
     */
    public getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const profile = await this.doctorService.getProfile(doctorId);
            res.status(200).json({ success: true, data: profile });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update doctor profile
     */
    public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const updateData = req.body;
            const profile = await this.doctorService.updateProfile(doctorId, updateData);
            res.status(200).json({ success: true, data: profile, message: 'Profile updated' });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get doctor schedule
     */
    public getSchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const schedule = await this.doctorService.getSchedule(doctorId);
            res.status(200).json({ success: true, data: schedule });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Set doctor availability
     */
    public setAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const availabilityData = req.body;
            const availability = await this.doctorService.setAvailability(doctorId, availabilityData);
            res.status(200).json({ success: true, data: availability });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get doctor's patient list
     */
    public getPatientList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const patients = await this.doctorService.getPatientList(doctorId);
            res.status(200).json({ success: true, data: patients });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get today's appointments
     */
    public getTodayAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const appointments = await this.doctorService.getTodayAppointments(doctorId);
            res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get dashboard statistics
     */
    public getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const stats = await this.doctorService.getDashboardStats(doctorId);
            res.status(200).json({ success: true, data: stats });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update consultation fee
     */
    public updateConsultationFee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const { fee } = req.body;
            const updated = await this.doctorService.updateConsultationFee(doctorId, fee);
            res.status(200).json({ success: true, data: updated });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get reviews
     */
    public getReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const doctorId = req.userId;
            const reviews = await this.doctorService.getReviews(doctorId);
            res.status(200).json({ success: true, data: reviews });
        } catch (error) {
            next(error);
        }
    };
}
