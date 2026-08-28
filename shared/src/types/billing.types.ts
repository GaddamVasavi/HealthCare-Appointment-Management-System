/**
 * @fileoverview Billing type definitions for the Healthcare Appointment Management System.
 * Defines invoices, payments, insurance claims, and billing codes.
 */

/**
 * Represents the status of an invoice.
 */
export enum InvoiceStatus {
  /** Invoice has been created but not sent to the patient/insurance. */
  DRAFT = 'DRAFT',
  /** Invoice is finalized and awaiting payment. */
  PENDING = 'PENDING',
  /** Invoice has been partially paid. */
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  /** Invoice has been fully paid. */
  PAID = 'PAID',
  /** Invoice is past its due date. */
  OVERDUE = 'OVERDUE',
  /** Invoice has been canceled or voided. */
  VOIDED = 'VOIDED',
  /** Amount has been refunded. */
  REFUNDED = 'REFUNDED',
}

/**
 * Represents payment methods.
 */
export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  INSURANCE = 'INSURANCE',
  ONLINE_GATEWAY = 'ONLINE_GATEWAY',
}

/**
 * Represents the status of a payment transaction.
 */
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DISPUTED = 'DISPUTED',
}

/**
 * Represents an itemized charge on an invoice.
 */
export interface InvoiceItem {
  /** Unique identifier for the line item. */
  id: string;
  /** CPT code or internal service code. */
  serviceCode: string;
  /** Description of the service or item. */
  description: string;
  /** Quantity provided. */
  quantity: number;
  /** Unit price before discounts or taxes. */
  unitPrice: number;
  /** Total amount for this item (quantity * unitPrice). */
  totalAmount: number;
  /** Discount applied to this item. */
  discountAmount?: number;
  /** Tax amount applied to this item. */
  taxAmount?: number;
  /** Final amount after discount and tax. */
  netAmount: number;
}

/**
 * Represents a billing invoice.
 */
export interface Invoice {
  /** Unique identifier for the invoice. */
  id: string;
  /** Human-readable invoice number. */
  invoiceNumber: string;
  /** ID of the patient being billed. */
  patientId: string;
  /** ID of the associated appointment, if applicable. */
  appointmentId?: string;
  /** ID of the clinic or billing entity. */
  clinicId: string;
  /** Current status of the invoice. */
  status: InvoiceStatus;
  /** Date the invoice was issued. */
  issueDate: string;
  /** Date the payment is due. */
  dueDate: string;
  /** List of itemized charges. */
  items: InvoiceItem[];
  /** Subtotal before taxes and discounts. */
  subtotal: number;
  /** Total tax amount. */
  totalTax: number;
  /** Total discount amount. */
  totalDiscount: number;
  /** Total amount payable by the patient (co-pay or self-pay). */
  patientResponsibility: number;
  /** Total amount expected from insurance. */
  insuranceResponsibility: number;
  /** Grand total amount of the invoice. */
  grandTotal: number;
  /** Total amount paid so far. */
  amountPaid: number;
  /** Remaining balance due. */
  balanceDue: number;
  /** General notes on the invoice. */
  notes?: string;
  /** Timestamp when created. */
  createdAt: string;
  /** Timestamp when last updated. */
  updatedAt: string;
}

/**
 * Represents a payment transaction.
 */
export interface Payment {
  /** Unique identifier for the payment. */
  id: string;
  /** ID of the invoice this payment applies to. */
  invoiceId: string;
  /** ID of the patient making the payment. */
  patientId: string;
  /** Amount paid in this transaction. */
  amount: number;
  /** Payment method used. */
  method: PaymentMethod;
  /** Status of the transaction. */
  status: PaymentStatus;
  /** Transaction reference ID (from payment gateway, check number, etc.). */
  transactionReference?: string;
  /** Date and time the payment was processed. */
  paymentDate: string;
  /** ID of the staff member who processed the payment, if manual. */
  processedBy?: string;
  /** Notes regarding the payment. */
  notes?: string;
}

/**
 * Represents a patient's insurance policy details.
 */
export interface InsuranceInfo {
  /** Unique identifier for the insurance record. */
  id: string;
  /** ID of the patient. */
  patientId: string;
  /** Name of the insurance provider. */
  providerName: string;
  /** Insurance policy or subscriber number. */
  policyNumber: string;
  /** Group number. */
  groupNumber?: string;
  /** Type of plan (e.g., 'HMO', 'PPO', 'Medicare'). */
  planType: string;
  /** Relationship to the primary policyholder. */
  relationshipToSubscriber: 'SELF' | 'SPOUSE' | 'CHILD' | 'OTHER';
  /** Details of the primary subscriber if not 'SELF'. */
  subscriberDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
  /** Copay amount for standard visits. */
  copayAmount?: number;
  /** Deductible amount. */
  deductibleAmount?: number;
  /** Effective start date of the policy. */
  effectiveDate: string;
  /** Expiration date of the policy. */
  expirationDate?: string;
  /** Indicates if this is the primary insurance. */
  isPrimary: boolean;
  /** Status of the insurance verification. */
  verificationStatus: 'UNVERIFIED' | 'VERIFIED' | 'EXPIRED' | 'REJECTED';
}

/**
 * Represents an insurance claim submission.
 */
export interface InsuranceClaim {
  /** Unique identifier for the claim. */
  id: string;
  /** ID of the associated invoice. */
  invoiceId: string;
  /** ID of the insurance information record used. */
  insuranceInfoId: string;
  /** Claim reference number provided by the payer. */
  claimReferenceNumber?: string;
  /** Status of the claim. */
  status: 'SUBMITTED' | 'PROCESSING' | 'ACCEPTED' | 'DENIED' | 'PARTIALLY_PAID' | 'APPEALED';
  /** Amount billed to insurance. */
  amountBilled: number;
  /** Amount approved by insurance. */
  amountApproved?: number;
  /** Amount paid by insurance. */
  amountPaid?: number;
  /** Reason for denial, if applicable. */
  denialReason?: string;
  /** Date the claim was submitted. */
  submissionDate: string;
  /** Date the claim status was last updated. */
  lastStatusUpdate: string;
}
