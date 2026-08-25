import { Router, Request, Response } from 'express';
import Schedule from '../models/Schedule.model';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { authenticate } from '../middleware/auth.middleware';
import { isDoctor } from '../middleware/role.middleware';
import { createScheduleValidation } from '../validators';
import { handleValidationErrors } from '../validators/auth.validator';
import { NotFoundError } from '../utils/errors';

const router = Router();
router.use(authenticate);

router.get('/me', isDoctor, asyncHandler(async (req: Request, res: Response) => {
  const schedules = await Schedule.find({ doctor: req.userId }).sort({ effectiveFrom: -1 }).lean();
  sendSuccess(res, { schedules }, 'Schedules retrieved successfully');
}));

router.post('/', isDoctor, createScheduleValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const schedule = await Schedule.create({ ...req.body, doctor: req.userId });
  sendCreated(res, { schedule }, 'Schedule created successfully');
}));

router.patch('/:id', isDoctor, asyncHandler(async (req: Request, res: Response) => {
  const schedule = await Schedule.findOneAndUpdate(
    { _id: req.params.id, doctor: req.userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!schedule) throw new NotFoundError('Schedule not found');
  sendSuccess(res, { schedule }, 'Schedule updated successfully');
}));

router.delete('/:id', isDoctor, asyncHandler(async (req: Request, res: Response) => {
  const schedule = await Schedule.findOneAndUpdate(
    { _id: req.params.id, doctor: req.userId },
    { isActive: false },
    { new: true },
  );
  if (!schedule) throw new NotFoundError('Schedule not found');
  sendSuccess(res, { schedule }, 'Schedule disabled successfully');
}));

export default router;
