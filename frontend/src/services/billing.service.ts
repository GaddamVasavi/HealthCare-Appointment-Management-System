import api from './api';
import { PaginatedResponse } from '../types';

/**
 * Billing Service
 * Handles all API calls related to invoices, payments, and insurance claims.
 */
export const billingService = {
  /**
   * Get all invoices for a patient
   */
  getInvoices: async (patientId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/billing/invoices/${patientId}`, { params });
    return response.data;
  },

  /**
   * Get a specific invoice by ID
   */
  getInvoice: async (invoiceId: string): Promise<any> => {
    const response = await api.get<any>(`/billing/invoice/${invoiceId}`);
    return response.data;
  },

  /**
   * Create a new invoice
   */
  createInvoice: async (invoiceData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>('/billing/invoices', invoiceData);
    return response.data;
  },

  /**
   * Process a payment for an invoice
   */
  makePayment: async (invoiceId: string, paymentData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>(`/billing/payments/${invoiceId}`, paymentData);
    return response.data;
  },

  /**
   * Get a patient's billing statement (summary of accounts)
   */
  getStatement: async (patientId: string): Promise<any> => {
    const response = await api.get<any>(`/billing/statement/${patientId}`);
    return response.data;
  },

  /**
   * Get insurance claims
   */
  getInsuranceClaims: async (patientId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/billing/claims/${patientId}`, { params });
    return response.data;
  },
  
  /**
   * Submit a new insurance claim
   */
  submitClaim: async (claimData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>('/billing/claims', claimData);
    return response.data;
  },

  /**
   * Get payment methods saved by the patient
   */
  getPaymentMethods: async (patientId: string): Promise<any[]> => {
    const response = await api.get<any[]>(`/billing/payment-methods/${patientId}`);
    return response.data;
  },

  /**
   * Download an invoice as a PDF
   */
  downloadInvoicePdf: async (invoiceId: string): Promise<Blob> => {
    const response = await api.get(`/billing/invoice/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
