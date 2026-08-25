import { Router, Request, Response } from 'express';
import Consultation from '../models/Consultation.model';
import Prescription from '../models/Prescription.model';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { authenticate } from '../middleware/auth.middleware';
import { isDoctor, isDoctorOrAdmin, isPatient } from '../middleware/role.middleware';
import { createConsultationValidation, createPrescriptionValidation } from '../validators';
import { handleValidationErrors } from '../validators/auth.validator';
import { ForbiddenError, NotFoundError } from '../utils/errors';

const router = Router();
router.use(authenticate);

router.get('/consultations', isDoctorOrAdmin, asyncHandler(async (req: Request, res: Response) => {
  const query = req.userRole === 'doctor' ? { doctor: req.userId } : {};
  const consultations = await Consultation.find(query).sort({ createdAt: -1 }).lean();
  sendSuccess(res, { consultations }, 'Consultations retrieved successfully');
}));

router.post('/consultations', isDoctor, createConsultationValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const consultation = await Consultation.create({ ...req.body, doctor: req.userId });
  sendCreated(res, { consultation }, 'Consultation created successfully');
}));

router.get('/prescriptions', isPatient, asyncHandler(async (req: Request, res: Response) => {
  const prescriptions = await Prescription.find({ patient: req.userId }).sort({ createdAt: -1 }).lean();
  sendSuccess(res, { prescriptions }, 'Prescriptions retrieved successfully');
}));

router.post('/prescriptions', isDoctor, createPrescriptionValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const prescription = await Prescription.create({ ...req.body, doctor: req.userId });
  sendCreated(res, { prescription }, 'Prescription created successfully');
}));

router.get('/prescriptions/:id', asyncHandler(async (req: Request, res: Response) => {
  const prescription = await Prescription.findById(req.params.id).lean();
  if (!prescription) throw new NotFoundError('Prescription not found');
  const canView = req.userRole === 'admin' || prescription.patient.toString() === req.userId || prescription.doctor.toString() === req.userId;
  if (!canView) throw new ForbiddenError('You are not authorized to view this prescription');
  sendSuccess(res, { prescription }, 'Prescription retrieved successfully');
}));

export default router;
