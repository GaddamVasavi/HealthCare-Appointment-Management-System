import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patient.service';

/**
 * Controller for handling all patient-related operations.
 */
export class PatientController {
    private patientService: PatientService;

    constructor() {
        this.patientService = new PatientService();
    }

    /**
     * Get the profile of the current logged-in patient
     */
    public getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return;
            }
            
            const profile = await this.patientService.getProfile(patientId);
            res.status(200).json({ success: true, data: profile });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update the patient profile
     */
    public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            if (!patientId) {
                res.status(401).json({ success: false, message: 'Unauthorized' });
                return;
            }
            
            const updatedData = req.body;
            const updatedProfile = await this.patientService.updateProfile(patientId, updatedData);
            res.status(200).json({ success: true, data: updatedProfile, message: 'Profile updated successfully' });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get appointments for the patient
     */
    public getMyAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const appointments = await this.patientService.getAppointments(patientId);
            res.status(200).json({ success: true, data: appointments });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get patient's medical history
     */
    public getMedicalHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const history = await this.patientService.getMedicalHistory(patientId);
            res.status(200).json({ success: true, data: history });
        } catch (error) {
            next(error);
        }
    };
    
    /**
     * Get lab results
     */
    public getLabResults = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const results = await this.patientService.getLabResults(patientId);
            res.status(200).json({ success: true, data: results });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get prescriptions
     */
    public getPrescriptions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const prescriptions = await this.patientService.getPrescriptions(patientId);
            res.status(200).json({ success: true, data: prescriptions });
        } catch (error) {
            next(error);
        }
    };
    
    /**
     * Update insurance information
     */
    public updateInsurance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const insuranceData = req.body;
            const updatedInsurance = await this.patientService.updateInsurance(patientId, insuranceData);
            res.status(200).json({ success: true, data: updatedInsurance });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Search for doctors
     */
    public searchDoctors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const query = req.query;
            const doctors = await this.patientService.searchDoctors(query);
            res.status(200).json({ success: true, data: doctors });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get patient vitals
     */
    public getVitals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const vitals = await this.patientService.getVitals(patientId);
            res.status(200).json({ success: true, data: vitals });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get dashboard statistics
     */
    public getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const patientId = req.user?.id;
            const stats = await this.patientService.getDashboardStats(patientId);
            res.status(200).json({ success: true, data: stats });
        } catch (error) {
            next(error);
        }
    };
}
