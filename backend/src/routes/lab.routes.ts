import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.use(authMiddleware);

// Lab Orders
router.post('/orders', roleMiddleware(['doctor']), (req, res) => res.send('Create lab order'));
router.get('/orders/:id', (req, res) => res.send('Get lab order'));
router.get('/patients/:patientId/orders', (req, res) => res.send('Get patient lab orders'));

// Lab Results
router.post('/orders/:id/results', roleMiddleware(['lab_technician', 'admin']), (req, res) => res.send('Upload results'));
router.get('/results/:id', (req, res) => res.send('Get lab results'));
router.get('/results/:id/report', (req, res) => res.send('Download lab report PDF'));

export default router;
