import { Router } from 'express';
import adminRoutes from './admin.routes';
import appointmentRoutes from './appointment.routes';
import authRoutes from './auth.routes';
import clinicalRoutes from './clinical.routes';
import doctorRoutes from './doctor.routes';
import notificationRoutes from './notification.routes';
import scheduleRoutes from './schedule.routes';
import specializationRoutes from './specialization.routes';
import patientRoutes from './patient.routes';
// Import other routes as they are created

const router = Router();

/**
 * API Routes Registry
 */

router.use('/admin', adminRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/auth', authRoutes);
router.use('/clinical', clinicalRoutes);
router.use('/doctors', doctorRoutes);
router.use('/notifications', notificationRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/specializations', specializationRoutes);
router.use('/patients', patientRoutes);

export default router;
