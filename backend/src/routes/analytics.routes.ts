import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

const router = Router();

// Protect all analytics routes - generally only admins or directors
router.use(authMiddleware);
router.use(roleMiddleware(['admin', 'director']));

// Overviews
router.get('/dashboard', cacheMiddleware(300), (req, res) => res.send('Dashboard overview'));
router.get('/appointments', cacheMiddleware(300), (req, res) => res.send('Appointment analytics'));
router.get('/revenue', cacheMiddleware(300), (req, res) => res.send('Revenue analytics'));

// Demographics & Performance
router.get('/demographics', cacheMiddleware(86400), (req, res) => res.send('Patient demographics'));
router.get('/performance/doctors', cacheMiddleware(300), (req, res) => res.send('Doctor performance'));
router.get('/performance/departments', cacheMiddleware(300), (req, res) => res.send('Department stats'));

// Exports
router.get('/export', (req, res) => res.send('Export analytics report'));

export default router;
