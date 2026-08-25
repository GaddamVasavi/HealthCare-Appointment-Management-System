import { Router, Request, Response } from 'express';
import Notification from '../models/Notification.model';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/apiResponse';
import { authenticate } from '../middleware/auth.middleware';
import { notificationQueryValidation } from '../validators';
import { handleValidationErrors } from '../validators/auth.validator';
import { NotFoundError } from '../utils/errors';

const router = Router();
router.use(authenticate);

router.get('/', notificationQueryValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const query: Record<string, unknown> = { user: req.userId, isArchived: false };
  if (req.query.type) query.type = req.query.type;
  if (req.query.isRead !== undefined) query.isRead = req.query.isRead === 'true';
  if (req.query.priority) query.priority = req.query.priority;
  const notifications = await Notification.find(query).sort({ createdAt: -1 }).limit(50).lean();
  sendSuccess(res, { notifications }, 'Notifications retrieved successfully');
}));

router.patch('/:id/read', asyncHandler(async (req: Request, res: Response) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { isRead: true, readAt: new Date() },
    { new: true },
  );
  if (!notification) throw new NotFoundError('Notification not found');
  sendSuccess(res, { notification }, 'Notification marked as read');
}));

router.patch('/read-all', asyncHandler(async (req: Request, res: Response) => {
  const result = await Notification.updateMany({ user: req.userId, isRead: false }, { isRead: true, readAt: new Date() });
  sendSuccess(res, { updated: result.modifiedCount }, 'Notifications marked as read');
}));

export default router;
