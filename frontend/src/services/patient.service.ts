import api from './api';
import { Patient, PaginatedResponse, Doctor } from '../types';

/**
 * Patient Service
 * Handles all API calls related to patient profiles and medical histories.
 */
export const patientService = {
  /**
   * Get all patients (Admin/Doctor only)
   */
  getAll: async (params?: Record<string, any>): Promise<PaginatedResponse<Patient>> => {
    const response = await api.get<PaginatedResponse<Patient>>('/patients', { params });
    return response.data;
  },

  /**
   * Get a specific patient by ID
   */
  getById: async (id: string): Promise<Patient> => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  /**
   * Update a patient's profile
   */
  updateProfile: async (id: string, data: Partial<Patient>): Promise<Patient> => {
    const response = await api.put<Patient>(`/patients/${id}`, data);
    return response.data;
  },

  /**
   * Get a patient's medical history summary
   */
  getMedicalHistory: async (id: string): Promise<any[]> => {
    const response = await api.get<any[]>(`/patients/${id}/history`);
    return response.data;
  },

  /**
   * Get recent vital signs for a patient
   */
  getVitals: async (id: string, limit: number = 10): Promise<any[]> => {
    const response = await api.get<any[]>(`/patients/${id}/vitals`, { params: { limit } });
    return response.data;
  },

  /**
   * Get recent lab results for a patient
   */
  getLabResults: async (id: string): Promise<any[]> => {
    const response = await api.get<any[]>(`/patients/${id}/labs`);
    return response.data;
  },

  /**
   * Search for doctors (Patient functionality)
   */
  searchDoctors: async (query: string, specialty?: string): Promise<PaginatedResponse<Doctor>> => {
    const response = await api.get<PaginatedResponse<Doctor>>('/doctors/search', {
      params: { q: query, specialty }
    });
    return response.data;
  },

  /**
   * Update a patient's insurance information
   */
  updateInsurance: async (id: string, insuranceData: Record<string, any>): Promise<Patient> => {
    const response = await api.patch<Patient>(`/patients/${id}/insurance`, insuranceData);
    return response.data;
  },
  
  /**
   * Record new vital signs for a patient
   */
  addVitals: async (id: string, vitalsData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>(`/patients/${id}/vitals`, vitalsData);
    return response.data;
  }
};
