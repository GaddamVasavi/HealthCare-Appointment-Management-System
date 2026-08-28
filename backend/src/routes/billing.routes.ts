import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();
const billingController = new BillingController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Invoices
router.post('/invoices', roleMiddleware(['admin', 'billing_staff']), billingController.createInvoice);
router.get('/invoices/:id', billingController.getInvoice);
router.get('/patients/:patientId/invoices', billingController.getPatientInvoices);

// Payments
router.post('/payments', billingController.processPayment);
router.get('/patients/:patientId/balance', billingController.getOutstandingBalance);

// Insurance
router.post('/insurance/apply', roleMiddleware(['admin', 'billing_staff']), billingController.applyInsurance);

// Statements & Reports
router.get('/patients/:patientId/statements', billingController.generateStatement);
router.get('/reports/revenue', roleMiddleware(['admin']), billingController.getRevenueReport);

// Reminders & Export
router.post('/invoices/:invoiceId/reminders', roleMiddleware(['admin', 'billing_staff']), billingController.sendPaymentReminder);
router.get('/invoices/:id/export/pdf', billingController.exportInvoicePdf);

export default router;
