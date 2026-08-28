import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

const router = Router();

// Protect all routes
router.use(authMiddleware);

// Public/All staff routes
router.get('/', cacheMiddleware(3600), (req, res) => res.send('Get all departments'));
router.get('/:id', cacheMiddleware(3600), (req, res) => res.send('Get department by ID'));
router.get('/:id/doctors', cacheMiddleware(3600), (req, res) => res.send('Get doctors in department'));

// Admin only routes
router.post('/', roleMiddleware(['admin']), (req, res) => res.send('Create department'));
router.put('/:id', roleMiddleware(['admin']), (req, res) => res.send('Update department'));
router.delete('/:id', roleMiddleware(['admin']), (req, res) => res.send('Delete department'));
router.post('/:id/doctors', roleMiddleware(['admin']), (req, res) => res.send('Assign doctor to department'));
router.delete('/:id/doctors/:doctorId', roleMiddleware(['admin']), (req, res) => res.send('Remove doctor from department'));

export default router;
