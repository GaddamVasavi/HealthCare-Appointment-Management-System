import { Router } from 'express';
import { EHRController } from '../controllers/ehr.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

// Initialize router and controller
const router = Router();
const ehrController = new EHRController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Medical Records (Encounter Notes)
router.post('/records', roleMiddleware(['doctor']), ehrController.createMedicalRecord);
router.get('/patients/:patientId/records', ehrController.getPatientRecords);
router.put('/records/:recordId', roleMiddleware(['doctor', 'admin']), ehrController.updateRecord);

// Vitals
router.post('/vitals', roleMiddleware(['doctor', 'nurse']), ehrController.addVitals);
router.get('/patients/:patientId/vitals', ehrController.getVitalsHistory);

// Allergies
router.post('/allergies', roleMiddleware(['doctor', 'nurse']), ehrController.addAllergy);
router.get('/patients/:patientId/allergies', ehrController.getAllergies);

// Diagnoses (ICD-10)
router.post('/diagnoses', roleMiddleware(['doctor']), ehrController.addDiagnosis);
router.get('/patients/:patientId/diagnoses', ehrController.getDiagnoses);

// Clinical Summary
router.get('/patients/:patientId/summary', ehrController.generateSummary);

// Documents
// Note: Requires multer middleware for file upload handling in the actual app implementation
router.post('/documents', roleMiddleware(['doctor', 'nurse', 'patient']), ehrController.uploadDocument);
router.get('/patients/:patientId/documents', ehrController.getDocuments);

export default router;
