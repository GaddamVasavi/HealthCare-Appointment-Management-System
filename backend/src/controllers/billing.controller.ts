import { Request, Response, NextFunction } from 'express';
import { BillingService } from '../services/billing.service';

/**
 * Interface for custom request containing user info
 */
type AuthenticatedRequest = Request;

/**
 * Controller for handling all billing and financial operations.
 * Includes invoice creation, payment processing, insurance claims, and statements.
 */
export class BillingController {
    private billingService: BillingService;

    constructor() {
        this.billingService = new BillingService();
    }

    /**
     * Create a new invoice for an appointment or service
     * 
     * @param req - Express Request object containing line items, patient ID, etc.
     * @param res - Express Response object
     * @param next - Express Next function for error propagation
     */
    public createInvoice = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId, appointmentId, lineItems, discount, taxRate } = req.body;
            const createdBy = req.user?.id;

            if (!patientId || !lineItems || lineItems.length === 0) {
                res.status(400).json({ success: false, message: 'Patient ID and line items are required' });
                return;
            }

            const invoice = await this.billingService.generateInvoice({
                patientId,
                appointmentId,
                lineItems,
                discount,
                taxRate,
                createdBy
            });

            res.status(201).json({ success: true, data: invoice, message: 'Invoice created successfully' });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get a specific invoice by its ID
     */
    public getInvoice = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const invoice = await this.billingService.getInvoiceById(id);
            
            if (!invoice) {
                res.status(404).json({ success: false, message: 'Invoice not found' });
                return;
            }

            // Optional: Check if the user is authorized to view this invoice (patient themselves, or admin/billing staff)
            if (req.user?.role === 'patient' && invoice.patientId !== req.user.id) {
                res.status(403).json({ success: false, message: 'Not authorized to view this invoice' });
                return;
            }

            res.status(200).json({ success: true, data: invoice });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Retrieve all invoices for a specific patient
     */
    public getPatientInvoices = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const statusFilter = req.query.status as string;
            
            // Security check for patients requesting their own records
            if (req.user?.role === 'patient' && patientId !== req.user.id) {
                res.status(403).json({ success: false, message: 'Not authorized to view these records' });
                return;
            }

            const invoices = await this.billingService.getInvoicesByPatient(patientId, statusFilter);
            res.status(200).json({ success: true, data: invoices, count: invoices.length });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Process a payment against an invoice
     */
    public processPayment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { invoiceId, amount, paymentMethod, transactionId } = req.body;
            
            if (!invoiceId || !amount || !paymentMethod) {
                res.status(400).json({ success: false, message: 'Missing required payment details' });
                return;
            }

            const paymentResult = await this.billingService.processPayment(invoiceId, {
                amount,
                paymentMethod,
                transactionId,
                processedBy: req.user?.id
            });

            res.status(200).json({ 
                success: true, 
                data: paymentResult, 
                message: 'Payment processed successfully' 
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Apply insurance coverage to an invoice
     */
    public applyInsurance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { invoiceId, insuranceClaimId, coverageAmount } = req.body;

            const updatedInvoice = await this.billingService.applyInsuranceCoverage(
                invoiceId, 
                insuranceClaimId, 
                coverageAmount
            );

            res.status(200).json({ success: true, data: updatedInvoice });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Generate a comprehensive billing statement for a patient
     */
    public generateStatement = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            const { startDate, endDate } = req.query;

            const statement = await this.billingService.generatePatientStatement(
                patientId, 
                startDate as string, 
                endDate as string
            );

            res.status(200).json({ success: true, data: statement });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get aggregate revenue reports (Admin/Billing staff only)
     */
    public getRevenueReport = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { startDate, endDate, department } = req.query;
            
            const report = await this.billingService.calculateRevenue(
                startDate as string, 
                endDate as string, 
                department as string
            );

            res.status(200).json({ success: true, data: report });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get total outstanding balance for a patient
     */
    public getOutstandingBalance = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { patientId } = req.params;
            
            if (req.user?.role === 'patient' && patientId !== req.user.id) {
                res.status(403).json({ success: false, message: 'Not authorized' });
                return;
            }

            const balance = await this.billingService.getOutstandingBalance(patientId);
            res.status(200).json({ success: true, data: { balance } });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Send payment reminder for overdue invoices
     */
    public sendPaymentReminder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { invoiceId } = req.params;
            const result = await this.billingService.sendPaymentReminder(invoiceId);
            res.status(200).json({ success: true, message: 'Reminder sent successfully', data: result });
        } catch (error) {
            next(error);
        }
    };

    /**
     * Export invoice as PDF format
     */
    public exportInvoicePdf = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const pdfBuffer = await this.billingService.generateInvoicePdf(id);
            
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=invoice-${id}.pdf`);
            res.status(200).send(pdfBuffer);
        } catch (error) {
            next(error);
        }
    };
}
