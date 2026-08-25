import { Router, Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendCreated, sendPaginatedSuccess, sendSuccess } from '../utils/apiResponse';
import appointmentService from '../services/appointment.service';
import { authenticate } from '../middleware/auth.middleware';
import { authorize, isDoctorOrAdmin, isPatient } from '../middleware/role.middleware';
import { UserRole } from '../models/User.model';
import { AppointmentStatus, CancellationReason } from '../models/Appointment.model';
import { appointmentQueryValidation, createAppointmentValidation, rescheduleAppointmentValidation, updateAppointmentStatusValidation } from '../validators';
import { handleValidationErrors, objectIdValidation, paginationValidation } from '../validators/auth.validator';

const router = Router();
router.use(authenticate);

router.post('/', isPatient, createAppointmentValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const appointment = await appointmentService.bookAppointment(req.userId!, req.body);
  sendCreated(res, { appointment }, 'Appointment booked successfully');
}));

router.get('/', paginationValidation, appointmentQueryValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const filters = { ...req.query } as any;
  if (req.userRole === UserRole.PATIENT) filters.patient = req.userId;
  if (req.userRole === UserRole.DOCTOR) filters.doctor = req.userId;
  const result = await appointmentService.getAppointments(filters);
  sendPaginatedSuccess(res, { appointments: result.appointments }, {
    page: result.page,
    limit: Math.min(Number(filters.limit) || 10, 100),
    total: result.total,
    totalPages: result.totalPages,
    hasNextPage: result.page < result.totalPages,
    hasPrevPage: result.page > 1,
  }, 'Appointments retrieved successfully');
}));

router.get('/upcoming', authorize(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN), asyncHandler(async (req: Request, res: Response) => {
  const appointments = await appointmentService.getUpcomingAppointments(req.userId!, req.userRole!, Math.min(Number(req.query.limit) || 5, 50));
  sendSuccess(res, { appointments }, 'Upcoming appointments retrieved successfully');
}));

router.get('/available-slots/:doctorId', authorize(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN), asyncHandler(async (req: Request, res: Response) => {
  const slots = await appointmentService.getAvailableSlots(req.params.doctorId, req.query.date as string);
  sendSuccess(res, { slots }, 'Available slots retrieved successfully');
}));

router.get('/:id', objectIdValidation('id'), handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const appointment = await appointmentService.getAppointment(req.params.id, req.userId!, req.userRole!);
  sendSuccess(res, { appointment }, 'Appointment retrieved successfully');
}));

router.post('/:id/reschedule', objectIdValidation('id'), rescheduleAppointmentValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const appointment = await appointmentService.rescheduleAppointment(req.params.id, req.userId!, req.userRole!, req.body.date, req.body.startTime, req.body.endTime, req.body.reason);
  sendSuccess(res, { appointment }, 'Appointment rescheduled successfully');
}));

router.post('/:id/cancel', objectIdValidation('id'), handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const appointment = await appointmentService.updateAppointmentStatus(req.params.id, AppointmentStatus.CANCELLED, req.userId!, req.userRole!, req.body.notes, CancellationReason.PATIENT_REQUEST);
  sendSuccess(res, { appointment }, 'Appointment cancelled successfully');
}));

router.patch('/:id/status', isDoctorOrAdmin, objectIdValidation('id'), updateAppointmentStatusValidation, handleValidationErrors, asyncHandler(async (req: Request, res: Response) => {
  const appointment = await appointmentService.updateAppointmentStatus(
    req.params.id,
    req.body.status as AppointmentStatus,
    req.userId!,
    req.userRole!,
    req.body.notes,
    req.body.cancellationReason as CancellationReason,
  );
  sendSuccess(res, { appointment }, 'Appointment status updated successfully');
}));

export default router;