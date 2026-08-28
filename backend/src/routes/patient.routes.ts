import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const patientController = new PatientController();

/**
 * Patient Routes
 * Base path: /api/patients
 */

// Apply auth middleware to all routes
router.use(authMiddleware);

// Profile routes
router.get('/profile', roleMiddleware(['patient']), patientController.getProfile);
router.put('/profile', roleMiddleware(['patient']), patientController.updateProfile);

// Appointments
router.get('/appointments', roleMiddleware(['patient']), patientController.getMyAppointments);

// Medical History & Records
router.get('/medical-history', roleMiddleware(['patient', 'doctor']), patientController.getMedicalHistory);
router.get('/lab-results', roleMiddleware(['patient', 'doctor']), patientController.getLabResults);
router.get('/prescriptions', roleMiddleware(['patient', 'doctor']), patientController.getPrescriptions);
router.get('/vitals', roleMiddleware(['patient', 'doctor']), patientController.getVitals);

// Insurance
router.put('/insurance', roleMiddleware(['patient']), patientController.updateInsurance);

// Doctors Search
router.get('/doctors/search', roleMiddleware(['patient']), patientController.searchDoctors);

// Dashboard
router.get('/dashboard', roleMiddleware(['patient']), patientController.getDashboardStats);

export default router;
