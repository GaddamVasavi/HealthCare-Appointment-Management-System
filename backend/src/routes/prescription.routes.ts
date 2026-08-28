import { Router } from 'express';
// Note: PrescriptionController would be imported here
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
// const prescriptionController = new PrescriptionController();

// Protect all routes
router.use(authMiddleware);

// Placeholder routes
router.post('/', roleMiddleware(['doctor']), (req, res) => res.send('Create prescription'));
router.get('/:id', (req, res) => res.send('Get prescription'));
router.get('/patients/:patientId', (req, res) => res.send('Get patient prescriptions'));
router.post('/:id/refill', (req, res) => res.send('Refill prescription'));
router.delete('/:id', roleMiddleware(['doctor']), (req, res) => res.send('Cancel prescription'));
router.get('/:id/pdf', (req, res) => res.send('Generate prescription PDF'));

export default router;
