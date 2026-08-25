import { Router, Request, Response } from 'express';
import User from '../models/User.model';
import Appointment, { AppointmentStatus } from '../models/Appointment.model';
import { authenticate } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import { adminUserQueryValidation, updateUserStatusValidation, reportQueryValidation } from '../validators';
import { handleValidationErrors } from '../validators/auth.validator';
import { NotFoundError } from '../utils/errors';

const router = Router();
router.use(authenticate, isAdmin);

router.get('/users', adminUserQueryValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const query: Record<string, unknown> = {};
  if (req.query.role) query.role = req.query.role;
  if (req.query.status) query.status = req.query.status;
  if (req.query.search) query.$or = [
    { firstName: new RegExp(String(req.query.search), 'i') },
    { lastName: new RegExp(String(req.query.search), 'i') },
    { email: new RegExp(String(req.query.search), 'i') },
  ];
  const users = await User.find(query).select('-password -refreshToken').sort({ createdAt: -1 }).limit(100).lean();
  sendSuccess(res, { users }, 'Users retrieved successfully');
}));

router.patch('/users/:id/status', updateUserStatusValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).select('-password -refreshToken');
  if (!user) throw new NotFoundError('User not found');
  sendSuccess(res, { user }, 'User status updated successfully');
}));

router.get('/reports/overview', reportQueryValidation, handleValidationErrors, asyncHandler(async (_req: Request, res: Response) => {
  const [patients, doctors, appointments, completed, cancelled] = await Promise.all([
    User.countDocuments({ role: 'patient' }),
    User.countDocuments({ role: 'doctor', status: 'active' }),
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: AppointmentStatus.COMPLETED }),
    Appointment.countDocuments({ status: AppointmentStatus.CANCELLED }),
  ]);
  sendSuccess(res, { patients, doctors, appointments, completed, cancelled, completionRate: appointments ? completed / appointments : 0 }, 'Report generated successfully');
}));

export default router;
