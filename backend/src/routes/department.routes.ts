import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';
import { DepartmentController } from '../controllers/department.controller';

const router = Router();
const controller = new DepartmentController();

// Protect all routes
router.use(authMiddleware);

// Public/All staff routes
router.get('/', cacheMiddleware(3600), controller.getAll);
router.get('/:id', cacheMiddleware(3600), controller.getById);
router.get('/:id/doctors', cacheMiddleware(3600), controller.getDoctors);

// Admin only routes
router.post('/', roleMiddleware(['admin']), controller.create);
router.put('/:id', roleMiddleware(['admin']), controller.update);
router.delete('/:id', roleMiddleware(['admin']), controller.delete);
router.post('/:id/doctors', roleMiddleware(['admin']), controller.assignDoctor);
router.delete('/:id/doctors/:doctorId', roleMiddleware(['admin']), controller.removeDoctor);

export default router;
