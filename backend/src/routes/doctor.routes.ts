import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import doctorService from '../services/doctor.service';
import { optionalAuth } from '../middleware/auth.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { isDoctor } from '../middleware/role.middleware';
import { searchValidation, handleValidationErrors, objectIdValidation } from '../validators/auth.validator';

const router = Router();

router.get('/', optionalAuth, searchValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const result = await doctorService.searchDoctors({
    name: req.query.name as string,
    specialization: req.query.specialization as string,
    specializationSlug: req.query.specializationSlug as string,
    language: req.query.language as string,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
  });
  sendSuccess(res, result, 'Doctors retrieved successfully');
}));

router.get('/top', asyncHandler(async (req: Request, res: Response) => {
  const doctors = await doctorService.getTopDoctors(Math.min(Number(req.query.limit) || 10, 50));
  sendSuccess(res, { doctors }, 'Top doctors retrieved successfully');
}));

router.get('/:id', objectIdValidation('id'), handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const doctor = await doctorService.getDoctorProfile(req.params.id);
  sendSuccess(res, { doctor }, 'Doctor profile retrieved successfully');
}));

router.patch('/me', authenticate, isDoctor, asyncHandler(async (req: Request, res: Response) => {
  const doctor = await doctorService.updateDoctorProfile(req.userId!, req.body);
  sendSuccess(res, { doctor }, 'Doctor profile updated successfully');
}));

export default router;
