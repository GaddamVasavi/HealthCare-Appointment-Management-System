import { Router, Request, Response } from 'express';
import Specialization from '../models/Specialization.model';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { authenticate } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';
import { createSpecializationValidation } from '../validators';
import { handleValidationErrors } from '../validators/auth.validator';

const router = Router();

router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const specializations = await Specialization.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).lean();
  sendSuccess(res, { specializations }, 'Specializations retrieved successfully');
}));

router.post('/', authenticate, isAdmin, createSpecializationValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const specialization = await Specialization.create(req.body);
  sendCreated(res, { specialization }, 'Specialization created successfully');
}));

export default router;
