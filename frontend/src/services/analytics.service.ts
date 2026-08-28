import api from './api';

/**
 * Analytics Service
 * Handles all API calls related to dashboard statistics and reporting.
 */
export const analyticsService = {
  /**
   * Get general dashboard statistics (for admin/managers)
   */
  getDashboardStats: async (params?: Record<string, any>): Promise<any> => {
    const response = await api.get<any>('/analytics/dashboard', { params });
    return response.data;
  },

  /**
   * Get appointment-related statistics (booking trends, statuses, etc.)
   */
  getAppointmentStats: async (params?: Record<string, any>): Promise<any> => {
    const response = await api.get<any>('/analytics/appointments', { params });
    return response.data;
  },

  /**
   * Get revenue and financial statistics
   */
  getRevenueStats: async (params?: Record<string, any>): Promise<any> => {
    const response = await api.get<any>('/analytics/revenue', { params });
    return response.data;
  },

  /**
   * Get patient demographic statistics
   */
  getPatientDemographics: async (): Promise<any> => {
    const response = await api.get<any>('/analytics/demographics');
    return response.data;
  },

  /**
   * Get department performance metrics
   */
  getDepartmentStats: async (params?: Record<string, any>): Promise<any> => {
    const response = await api.get<any>('/analytics/departments', { params });
    return response.data;
  },

  /**
   * Get doctor performance metrics (for admin or individual doctor)
   */
  getDoctorStats: async (doctorId?: string, params?: Record<string, any>): Promise<any> => {
    const url = doctorId ? `/analytics/doctors/${doctorId}` : '/analytics/doctors';
    const response = await api.get<any>(url, { params });
    return response.data;
  }
};
