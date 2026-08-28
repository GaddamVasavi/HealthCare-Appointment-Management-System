import { Request, Response, NextFunction } from 'express';
import { EHRService } from '../services/ehr.service';

type AuthenticatedRequest = Request;

/**
 * Controller for Electronic Health Records (EHR).
 * Manages clinical data including medical histories, vitals, allergies, and diagnoses.
 */
export class EHRController {
    private ehrService: EHRService;

    constructor() {
        this.ehrService = new EHRService();
    }

    /**
     * Create a new medical record entry for a patient
     */
    public createMedicalRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId, recordType, notes, attachmentIds } = req.body;
            const doctorId = req.user?.id;

            const record = await this.ehrService.createRecord({
                patientId,
                doctorId,
                recordType,
                notes,
                attachmentIds
            });

            res.status(201).json({ success: true, data: record });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get comprehensive electronic health records for a specific patient
     */
    public getPatientRecords = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const { type, limit, offset } = req.query;

            // RBAC Verification
            if (req.user?.role === 'patient' && patientId !== req.user.id) {
                res.status(403).json({ success: false, message: 'Forbidden: Cannot access other patient records' });
                return;
            }

            const records = await this.ehrService.getRecords(patientId, {
                type: type as string,
                limit: limit ? parseInt(limit as string, 10) : 50,
                offset: offset ? parseInt(offset as string, 10) : 0
            });

            res.status(200).json({ success: true, data: records });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Update an existing medical record
     */
    public updateRecord = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { recordId } = req.params;
            const updateData = req.body;
            const updatedBy = req.user?.id;

            const updatedRecord = await this.ehrService.updateRecord(recordId, updateData, updatedBy);
            res.status(200).json({ success: true, data: updatedRecord, message: 'Record updated' });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Record vital signs for a patient during an encounter
     */
    public addVitals = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId, heartRate, bloodPressure, temperature, weight, respiratoryRate, oxygenSaturation } = req.body;
            const recordedBy = req.user?.id;

            const vitals = await this.ehrService.addVitals(patientId, {
                heartRate,
                bloodPressure,
                temperature,
                weight,
                respiratoryRate,
                oxygenSaturation,
                recordedBy
            });

            res.status(201).json({ success: true, data: vitals });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get historical vitals for trending and charts
     */
    public getVitalsHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const { startDate, endDate } = req.query;

            const vitals = await this.ehrService.getVitalsHistory(patientId, startDate as string, endDate as string);
            res.status(200).json({ success: true, data: vitals });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Add a new allergy to the patient's chart
     */
    public addAllergy = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId, allergen, severity, reaction, identifiedDate } = req.body;
            
            const allergy = await this.ehrService.addAllergy(patientId, {
                allergen,
                severity,
                reaction,
                identifiedDate
            });

            res.status(201).json({ success: true, data: allergy });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Fetch all recorded allergies for a patient
     */
    public getAllergies = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const allergies = await this.ehrService.getAllergies(patientId);
            res.status(200).json({ success: true, data: allergies });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Record a formal clinical diagnosis
     */
    public addDiagnosis = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId, icd10Code, description, type, status, diagnosedDate } = req.body;
            const doctorId = req.user?.id;

            const diagnosis = await this.ehrService.addDiagnosis(patientId, {
                icd10Code,
                description,
                type,
                status,
                diagnosedDate,
                doctorId
            });

            res.status(201).json({ success: true, data: diagnosis });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Retrieve patient diagnoses
     */
    public getDiagnoses = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const { status } = req.query;
            
            const diagnoses = await this.ehrService.getDiagnoses(patientId, status as string);
            res.status(200).json({ success: true, data: diagnoses });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Generate a comprehensive medical summary report for the patient
     */
    public generateSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const summary = await this.ehrService.generatePatientSummary(patientId);
            res.status(200).json({ success: true, data: summary });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Upload an external medical document (PDF, DICOM, Image)
     */
    public uploadDocument = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.body;
            const file = req.file; // Provided by multer or similar upload middleware
            
            if (!file) {
                res.status(400).json({ success: false, message: 'No file provided' });
                return;
            }

            const documentRecord = await this.ehrService.uploadDocument(patientId, file, req.user?.id);
            res.status(201).json({ success: true, data: documentRecord });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Retrieve a list of documents attached to the patient's EHR
     */
    public getDocuments = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const documents = await this.ehrService.getDocuments(patientId);
            res.status(200).json({ success: true, data: documents });
        } catch (error) {
            next(error);
        }
    };
}
