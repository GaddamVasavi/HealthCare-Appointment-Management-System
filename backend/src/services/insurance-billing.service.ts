/**
 * Insurance and Billing Service
 * 
 * Comprehensive service for managing patient insurance information,
 * claims processing, billing calculations, invoicing, and financial records.
 */

import { logger } from '../utils/logger';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/errors';

interface InsurancePlan {
  planId: string;
  planName: string;
  provider: string;
  coverageType: 'HMO' | 'PPO' | 'HDHP' | 'POS';
  deductible: number;
  copay: number;
  coinsurance: number;
  outOfPocketMax: number;
  networkProviders: string[];
  coveredServices: string[];
  exclusions: string[];
  deductibleMet: boolean;
  outOfPocketSpent: number;
  renewalDate: Date;
  status: 'active' | 'inactive' | 'expired';
}

interface InsuranceClaim {
  claimId: string;
  patientId: string;
  appointmentId: string;
  serviceDate: Date;
  serviceDescription: string;
  serviceCode: string;
  providerId: string;
  providerName: string;
  chargedAmount: number;
  allowedAmount: number;
  patientResponsibility: number;
  insuranceResponsibility: number;
  deductibleApplied: number;
  coinsuranceAmount: number;
  status: 'submitted' | 'pending' | 'approved' | 'denied' | 'appealed' | 'paid';
  submissionDate: Date;
  approvalDate?: Date;
  denialReason?: string;
  paymentDate?: Date;
  amountPaid?: number;
  notes?: string;
}

interface Invoice {
  invoiceId: string;
  patientId: string;
  appointmentId: string;
  issueDate: Date;
  dueDate: Date;
  items: Array<{
    description: string;
    code: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    insuranceCovered: boolean;
  }>;
  subtotal: number;
  tax: number;
  discount?: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: 'draft' | 'issued' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  paymentMethod?: string;
  paymentDate?: Date;
  notes?: string;
}

interface BillingRecord {
  recordId: string;
  patientId: string;
  invoiceId: string;
  transactionDate: Date;
  amount: number;
  type: 'charge' | 'payment' | 'credit' | 'refund' | 'adjustment';
  description: string;
  paymentMethod?: string;
  referenceNumber?: string;
  notes?: string;
}

interface InsuranceElligibilityCheck {
  checkId: string;
  patientId: string;
  planId: string;
  checkDate: Date;
  elligible: boolean;
  coverage: {
    deductible: number;
    deductibleMet: number;
    coinsurance: number;
    outOfPocketMax: number;
    outOfPocketSpent: number;
  };
  excludedServices: string[];
  preAuthorizationRequired: boolean;
  notes: string;
}

export class InsuranceAndBillingService {
  /**
   * Get patient's insurance information
   */
  public async getPatientInsurance(patientId: string): Promise<InsurancePlan[]> {
    try {
      logger.info(`Retrieving insurance information for patient: ${patientId}`);

      if (!patientId) {
        throw new BadRequestError('Patient ID is required');
      }

      const mockPlans: InsurancePlan[] = [
        {
          planId: 'PLAN-001',
          planName: 'Premium Health Plus',
          provider: 'Blue Cross Blue Shield',
          coverageType: 'PPO',
          deductible: 1500,
          copay: 25,
          coinsurance: 20,
          outOfPocketMax: 5000,
          networkProviders: ['Provider1', 'Provider2', 'Provider3'],
          coveredServices: ['Emergency', 'Hospitalization', 'Preventive Care', 'Lab Work'],
          exclusions: ['Cosmetic Surgery', 'Experimental Treatments'],
          deductibleMet: true,
          outOfPocketSpent: 1500,
          renewalDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          status: 'active'
        },
        {
          planId: 'PLAN-002',
          planName: 'Family Coverage',
          provider: 'Aetna',
          coverageType: 'HMO',
          deductible: 2000,
          copay: 20,
          coinsurance: 15,
          outOfPocketMax: 6000,
          networkProviders: ['NetworkProvider1', 'NetworkProvider2'],
          coveredServices: ['Primary Care', 'Specialist', 'Dental', 'Vision'],
          exclusions: ['Experimental Treatments'],
          deductibleMet: false,
          outOfPocketSpent: 500,
          renewalDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          status: 'active'
        }
      ];

      logger.info(`Retrieved ${mockPlans.length} insurance plans for patient: ${patientId}`);
      return mockPlans;
    } catch (error) {
      logger.error(`Failed to retrieve patient insurance: ${error}`);
      throw error;
    }
  }

  /**
   * Verify insurance eligibility
   */
  public async verifyEligibility(patientId: string, planId: string): Promise<InsuranceElligibilityCheck> {
    try {
      logger.info(`Verifying eligibility for patient: ${patientId}, plan: ${planId}`);

      if (!patientId || !planId) {
        throw new BadRequestError('Patient ID and plan ID are required');
      }

      const check: InsuranceElligibilityCheck = {
        checkId: `CHECK-${Date.now()}`,
        patientId,
        planId,
        checkDate: new Date(),
        elligible: true,
        coverage: {
          deductible: 1500,
          deductibleMet: 1500,
          coinsurance: 20,
          outOfPocketMax: 5000,
          outOfPocketSpent: 1500
        },
        excludedServices: ['Cosmetic Surgery'],
        preAuthorizationRequired: false,
        notes: 'Coverage is active and valid'
      };

      logger.info(`Eligibility verified for patient: ${patientId}`);
      return check;
    } catch (error) {
      logger.error(`Failed to verify eligibility: ${error}`);
      throw error;
    }
  }

  /**
   * Submit insurance claim
   */
  public async submitClaim(claimData: Partial<InsuranceClaim>): Promise<InsuranceClaim> {
    try {
      logger.info(`Submitting insurance claim`);

      if (!claimData.patientId || !claimData.serviceDate || !claimData.chargedAmount) {
        throw new BadRequestError('Patient ID, service date, and charged amount are required');
      }

      const claim: InsuranceClaim = {
        claimId: `CLAIM-${Date.now()}`,
        patientId: claimData.patientId,
        appointmentId: claimData.appointmentId || '',
        serviceDate: claimData.serviceDate,
        serviceDescription: claimData.serviceDescription || 'Medical Service',
        serviceCode: claimData.serviceCode || '99213',
        providerId: claimData.providerId || 'PROV-001',
        providerName: claimData.providerName || 'Unknown Provider',
        chargedAmount: claimData.chargedAmount,
        allowedAmount: claimData.chargedAmount * 0.8, // 80% of charged amount
        patientResponsibility: claimData.chargedAmount * 0.25,
        insuranceResponsibility: claimData.chargedAmount * 0.75,
        deductibleApplied: 0,
        coinsuranceAmount: claimData.chargedAmount * 0.2,
        status: 'submitted',
        submissionDate: new Date(),
        notes: claimData.notes
      };

      logger.info(`Claim submitted: ${claim.claimId}`);
      return claim;
    } catch (error) {
      logger.error(`Failed to submit claim: ${error}`);
      throw error;
    }
  }

  /**
   * Get claim status
   */
  public async getClaimStatus(claimId: string): Promise<InsuranceClaim> {
    try {
      logger.info(`Retrieving claim status for claim: ${claimId}`);

      if (!claimId) {
        throw new BadRequestError('Claim ID is required');
      }

      const claim: InsuranceClaim = {
        claimId,
        patientId: 'PAT-001',
        appointmentId: 'APT-001',
        serviceDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        serviceDescription: 'Office Visit - Follow-up',
        serviceCode: '99213',
        providerId: 'PROV-001',
        providerName: 'Dr. Smith',
        chargedAmount: 200,
        allowedAmount: 160,
        patientResponsibility: 50,
        insuranceResponsibility: 110,
        deductibleApplied: 0,
        coinsuranceAmount: 40,
        status: 'approved',
        submissionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        approvalDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        paymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        amountPaid: 110
      };

      logger.info(`Claim status retrieved: ${claim.status}`);
      return claim;
    } catch (error) {
      logger.error(`Failed to get claim status: ${error}`);
      throw error;
    }
  }

  /**
   * Create invoice
   */
  public async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    try {
      logger.info(`Creating invoice for patient: ${invoiceData.patientId}`);

      if (!invoiceData.patientId || !invoiceData.items || invoiceData.items.length === 0) {
        throw new BadRequestError('Patient ID and invoice items are required');
      }

      const subtotal = invoiceData.items.reduce((sum, item) => sum + item.totalPrice, 0);
      const tax = subtotal * 0.08; // 8% tax
      const totalAmount = subtotal + tax;

      const invoice: Invoice = {
        invoiceId: `INV-${Date.now()}`,
        patientId: invoiceData.patientId,
        appointmentId: invoiceData.appointmentId || '',
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        items: invoiceData.items,
        subtotal,
        tax,
        discount: invoiceData.discount || 0,
        totalAmount: totalAmount - (invoiceData.discount || 0),
        amountPaid: 0,
        balanceDue: totalAmount - (invoiceData.discount || 0),
        status: 'issued',
        notes: invoiceData.notes
      };

      logger.info(`Invoice created: ${invoice.invoiceId}`);
      return invoice;
    } catch (error) {
      logger.error(`Failed to create invoice: ${error}`);
      throw error;
    }
  }

  /**
   * Record payment
   */
  public async recordPayment(
    invoiceId: string,
    amount: number,
    paymentMethod: string,
    referenceNumber?: string
  ): Promise<{ invoice: Invoice; record: BillingRecord }> {
    try {
      logger.info(`Recording payment for invoice: ${invoiceId}`);

      if (!invoiceId || amount <= 0) {
        throw new BadRequestError('Invoice ID and valid amount are required');
      }

      const record: BillingRecord = {
        recordId: `BIL-${Date.now()}`,
        patientId: 'PAT-001',
        invoiceId,
        transactionDate: new Date(),
        amount,
        type: 'payment',
        description: `Payment received - ${paymentMethod}`,
        paymentMethod,
        referenceNumber,
        notes: `Payment of $${amount} received`
      };

      const updatedInvoice: Invoice = {
        invoiceId,
        patientId: 'PAT-001',
        appointmentId: 'APT-001',
        issueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
        items: [],
        subtotal: 300,
        tax: 24,
        totalAmount: 324,
        amountPaid: amount,
        balanceDue: Math.max(0, 324 - amount),
        status: amount >= 324 ? 'paid' : 'sent'
      };

      logger.info(`Payment recorded: ${record.recordId}`);
      return { invoice: updatedInvoice, record };
    } catch (error) {
      logger.error(`Failed to record payment: ${error}`);
      throw error;
    }
  }

  /**
   * Get patient billing history
   */
  public async getBillingHistory(
    patientId: string,
    options?: { startDate?: Date; endDate?: Date; limit?: number }
  ): Promise<BillingRecord[]> {
    try {
      logger.info(`Retrieving billing history for patient: ${patientId}`);

      const mockRecords: BillingRecord[] = [
        {
          recordId: 'BIL-001',
          patientId,
          invoiceId: 'INV-001',
          transactionDate: new Date(),
          amount: 100,
          type: 'payment',
          description: 'Office visit payment',
          paymentMethod: 'Credit Card',
          referenceNumber: 'REF-123456'
        },
        {
          recordId: 'BIL-002',
          patientId,
          invoiceId: 'INV-002',
          transactionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          amount: -50,
          type: 'credit',
          description: 'Insurance adjustment',
          notes: 'Overpayment credit'
        },
        {
          recordId: 'BIL-003',
          patientId,
          invoiceId: 'INV-003',
          transactionDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          amount: 150,
          type: 'charge',
          description: 'Lab work charges',
          referenceNumber: 'LAB-789'
        }
      ];

      let filtered = mockRecords;
      if (options?.startDate) {
        filtered = filtered.filter(r => r.transactionDate >= options.startDate!);
      }
      if (options?.endDate) {
        filtered = filtered.filter(r => r.transactionDate <= options.endDate!);
      }

      const limit = options?.limit || 50;
      return filtered.slice(0, limit);
    } catch (error) {
      logger.error(`Failed to retrieve billing history: ${error}`);
      throw error;
    }
  }

  /**
   * Get financial summary for patient
   */
  public async getFinancialSummary(patientId: string): Promise<any> {
    try {
      logger.info(`Retrieving financial summary for patient: ${patientId}`);

      const summary = {
        patientId,
        generatedAt: new Date(),
        totalCharges: 5000,
        totalPayments: 4200,
        totalAdjustments: -100,
        totalCredits: 0,
        outstandingBalance: 900,
        averageMonthlyCharges: 625,
        paymentHistory: {
          onTime: 8,
          late: 2,
          missed: 0
        },
        insuranceClaims: {
          submitted: 5,
          approved: 3,
          denied: 1,
          pending: 1
        }
      };

      logger.info(`Financial summary generated for patient: ${patientId}`);
      return summary;
    } catch (error) {
      logger.error(`Failed to retrieve financial summary: ${error}`);
      throw error;
    }
  }

  /**
   * Calculate patient cost share
   */
  public async calculateCostShare(
    chargedAmount: number,
    planId: string,
    serviceCode: string
  ): Promise<{
    chargedAmount: number;
    allowedAmount: number;
    deductibleApplied: number;
    patientResponsibility: number;
    insuranceResponsibility: number;
  }> {
    try {
      logger.info(`Calculating cost share for service code: ${serviceCode}`);

      const allowedAmount = chargedAmount * 0.85; // 85% of charged
      const deductible = 1500;
      const deductibleApplied = Math.min(deductible, allowedAmount);
      const afterDeductible = Math.max(0, allowedAmount - deductibleApplied);
      const coinsurance = afterDeductible * 0.2; // 20% coinsurance
      const patientResponsibility = deductibleApplied + coinsurance;
      const insuranceResponsibility = allowedAmount - patientResponsibility;

      return {
        chargedAmount,
        allowedAmount,
        deductibleApplied,
        patientResponsibility,
        insuranceResponsibility
      };
    } catch (error) {
      logger.error(`Failed to calculate cost share: ${error}`);
      throw error;
    }
  }
}

export default new InsuranceAndBillingService();
