import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import controller from '../controllers/clinical-operations.controller';

const router = Router();
router.use(authMiddleware);
const clinicians = roleMiddleware(['doctor', 'nurse', 'admin']);
const coordinators = roleMiddleware(['doctor', 'nurse', 'admin', 'receptionist']);

router.post('/care-plans', clinicians, controller.createCarePlan);
router.get('/patients/:patientId/care-plans', controller.listCarePlans);
router.post('/care-plans/:planId/activate', clinicians, controller.activateCarePlan);
router.patch('/care-plans/:planId/goals/:goalId', clinicians, controller.updateGoal);
router.post('/referrals', clinicians, controller.createReferral);
router.get('/patients/:patientId/referrals', controller.listReferrals);
router.patch('/referrals/:referralId/status', clinicians, controller.updateReferral);
router.post('/tasks', coordinators, controller.createTask);
router.get('/tasks', coordinators, controller.getTasks);
router.patch('/tasks/:taskId', coordinators, controller.updateTask);
router.post('/discharge-plans', clinicians, controller.createDischarge);
router.post('/discharge-plans/:dischargeId/sign', clinicians, controller.signDischarge);
router.post('/care-team', clinicians, controller.addTeamMember);
router.get('/patients/:patientId/care-team', controller.getTeam);
router.get('/patients/:patientId/summary', controller.getSummary);

export default router;
