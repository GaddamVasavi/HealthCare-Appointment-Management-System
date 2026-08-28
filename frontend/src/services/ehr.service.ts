import api from './api';
import { PaginatedResponse } from '../types';

/**
 * Electronic Health Records (EHR) Service
 * Handles all API calls related to medical records, prescriptions, and labs.
 */
export const ehrService = {
  /**
   * Get all medical records for a patient
   */
  getMedicalRecords: async (patientId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/ehr/records/${patientId}`, { params });
    return response.data;
  },

  /**
   * Get a specific medical record by ID
   */
  getRecordById: async (recordId: string): Promise<any> => {
    const response = await api.get<any>(`/ehr/records/detail/${recordId}`);
    return response.data;
  },

  /**
   * Create a new medical record
   */
  createRecord: async (recordData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>('/ehr/records', recordData);
    return response.data;
  },

  /**
   * Get prescriptions for a patient
   */
  getPrescriptions: async (patientId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/ehr/prescriptions/${patientId}`, { params });
    return response.data;
  },

  /**
   * Create a new prescription
   */
  createPrescription: async (prescriptionData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>('/ehr/prescriptions', prescriptionData);
    return response.data;
  },

  /**
   * Get lab results for a patient
   */
  getLabResults: async (patientId: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/ehr/labs/${patientId}`, { params });
    return response.data;
  },
  
  /**
   * Order a new lab test
   */
  orderLabTest: async (labData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>('/ehr/labs', labData);
    return response.data;
  },

  /**
   * Get patient allergies
   */
  getAllergies: async (patientId: string): Promise<any[]> => {
    const response = await api.get<any[]>(`/ehr/allergies/${patientId}`);
    return response.data;
  },

  /**
   * Add a new allergy to a patient's record
   */
  addAllergy: async (patientId: string, allergyData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>(`/ehr/allergies/${patientId}`, allergyData);
    return response.data;
  },

  /**
   * Get vital signs history
   */
  getVitalsHistory: async (patientId: string, params?: Record<string, any>): Promise<any[]> => {
    const response = await api.get<any[]>(`/ehr/vitals/${patientId}`, { params });
    return response.data;
  },

  /**
   * Download a medical document (PDF)
   */
  downloadDocument: async (documentId: string): Promise<Blob> => {
    const response = await api.get(`/ehr/documents/${documentId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
