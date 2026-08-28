import { Request, Response, NextFunction } from 'express';
import clinicalOperationsService from '../services/clinical-operations.service';

export class ClinicalOperationsController {
  createCarePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await clinicalOperationsService.createCarePlan(req.body) }); } catch (error) { next(error); }
  };
  activateCarePlan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.activateCarePlan(req.params.planId, req.userId!) }); } catch (error) { next(error); }
  };
  updateGoal = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.updateCareGoal(req.params.planId, req.params.goalId, req.body) }); } catch (error) { next(error); }
  };
  listCarePlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.listCarePlans(req.params.patientId, req.query.status as any) }); } catch (error) { next(error); }
  };
  createReferral = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await clinicalOperationsService.createReferral({ ...req.body, requestedBy: req.userId! }) }); } catch (error) { next(error); }
  };
  updateReferral = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.updateReferralStatus(req.params.referralId, req.body.status, req.userId!, req.body.notes) }); } catch (error) { next(error); }
  };
  listReferrals = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.listReferrals(req.params.patientId, req.query.status as any) }); } catch (error) { next(error); }
  };
  createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await clinicalOperationsService.createTask(req.body) }); } catch (error) { next(error); }
  };
  updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.updateTask(req.params.taskId, req.body.status, req.userId!, req.body.completionNotes) }); } catch (error) { next(error); }
  };
  getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.getOpenTasks({ patientId: req.query.patientId as string, assignedTo: req.query.assignedTo as string, priority: req.query.priority as any }) }); } catch (error) { next(error); }
  };
  createDischarge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await clinicalOperationsService.createDischargePlan({ ...req.body, preparedBy: req.userId! }) }); } catch (error) { next(error); }
  };
  signDischarge = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.signDischargePlan(req.params.dischargeId, req.userId!) }); } catch (error) { next(error); }
  };
  addTeamMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await clinicalOperationsService.addCareTeamMember(req.body) }); } catch (error) { next(error); }
  };
  getTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.getCareTeam(req.params.patientId) }); } catch (error) { next(error); }
  };
  getSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { res.json({ success: true, data: await clinicalOperationsService.getCareCoordinationSummary(req.params.patientId) }); } catch (error) { next(error); }
  };
}

export default new ClinicalOperationsController();
