import api from './api';
import { Doctor, PaginatedResponse } from '../types';

/**
 * Doctor Service
 * Handles all API calls related to doctors and their schedules.
 */
export const doctorService = {
  /**
   * Get all doctors with filtering and pagination
   */
  getAll: async (params?: Record<string, any>): Promise<PaginatedResponse<Doctor>> => {
    const response = await api.get<PaginatedResponse<Doctor>>('/doctors', { params });
    return response.data;
  },

  /**
   * Get a specific doctor by ID
   */
  getById: async (id: string): Promise<Doctor> => {
    const response = await api.get<Doctor>(`/doctors/${id}`);
    return response.data;
  },

  /**
   * Update a doctor's profile
   */
  updateProfile: async (id: string, data: Partial<Doctor>): Promise<Doctor> => {
    const response = await api.put<Doctor>(`/doctors/${id}`, data);
    return response.data;
  },

  /**
   * Search for doctors by keyword, location, or availability
   */
  search: async (params: Record<string, any>): Promise<PaginatedResponse<Doctor>> => {
    const response = await api.get<PaginatedResponse<Doctor>>('/doctors/search', { params });
    return response.data;
  },

  /**
   * Get doctors by a specific specialty
   */
  getBySpecialty: async (specialty: string): Promise<Doctor[]> => {
    const response = await api.get<Doctor[]>(`/doctors/specialty/${specialty}`);
    return response.data;
  },

  /**
   * Get a doctor's availability schedule
   */
  getAvailability: async (id: string, startDate: string, endDate: string): Promise<any> => {
    const response = await api.get<any>(`/doctors/${id}/availability`, {
      params: { startDate, endDate }
    });
    return response.data;
  },

  /**
   * Update a doctor's working schedule
   */
  updateSchedule: async (id: string, scheduleData: any): Promise<any> => {
    const response = await api.put<any>(`/doctors/${id}/schedule`, scheduleData);
    return response.data;
  },

  /**
   * Get reviews/ratings for a doctor
   */
  getReviews: async (id: string, params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
    const response = await api.get<PaginatedResponse<any>>(`/doctors/${id}/reviews`, { params });
    return response.data;
  },

  /**
   * Get top-rated doctors for the homepage
   */
  getTopRated: async (limit: number = 5): Promise<Doctor[]> => {
    const response = await api.get<Doctor[]>('/doctors/top-rated', { params: { limit } });
    return response.data;
  },
  
  /**
   * Add a review for a doctor
   */
  addReview: async (id: string, reviewData: Record<string, any>): Promise<any> => {
    const response = await api.post<any>(`/doctors/${id}/reviews`, reviewData);
    return response.data;
  }
};
