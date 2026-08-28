import api from './api';
import { Appointment, PaginatedResponse, AppointmentStatus } from '../types';

/**
 * Appointment Service
 * Handles all API calls related to appointments and scheduling.
 */
export const appointmentService = {
  /**
   * Create a new appointment
   */
  create: async (appointmentData: Record<string, any>): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments', appointmentData);
    return response.data;
  },

  /**
   * Get all appointments with filtering and pagination
   */
  getAll: async (params?: Record<string, any>): Promise<PaginatedResponse<Appointment>> => {
    const response = await api.get<PaginatedResponse<Appointment>>('/appointments', { params });
    return response.data;
  },

  /**
   * Get a specific appointment by ID
   */
  getById: async (id: string): Promise<Appointment> => {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  /**
   * Update an existing appointment
   */
  update: async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
    const response = await api.put<Appointment>(`/appointments/${id}`, data);
    return response.data;
  },

  /**
   * Cancel an appointment
   */
  cancel: async (id: string, reason?: string): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${id}/cancel`, { reason });
    return response.data;
  },

  /**
   * Reschedule an appointment
   */
  reschedule: async (id: string, date: string, time: string): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${id}/reschedule`, { date, time });
    return response.data;
  },

  /**
   * Mark an appointment as checked in
   */
  checkIn: async (id: string): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${id}/status`, { 
      status: AppointmentStatus.CONFIRMED // Assuming CONFIRMED represents checked in for now
    });
    return response.data;
  },

  /**
   * Get available time slots for a doctor on a specific date
   */
  getAvailableSlots: async (doctorId: string, date: string): Promise<string[]> => {
    const response = await api.get<string[]>(`/appointments/availability`, {
      params: { doctorId, date }
    });
    return response.data;
  },

  /**
   * Add clinical notes to an appointment
   */
  addNotes: async (id: string, notes: string): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${id}/notes`, { notes });
    return response.data;
  },

  /**
   * Get upcoming appointments for the current user
   */
  getUpcoming: async (params?: Record<string, any>): Promise<PaginatedResponse<Appointment>> => {
    const response = await api.get<PaginatedResponse<Appointment>>('/appointments/upcoming', { params });
    return response.data;
  },

  /**
   * Get past appointments for the current user
   */
  getPast: async (params?: Record<string, any>): Promise<PaginatedResponse<Appointment>> => {
    const response = await api.get<PaginatedResponse<Appointment>>('/appointments/past', { params });
    return response.data;
  },

  /**
   * Get appointments within a specific date range
   */
  getByDateRange: async (startDate: string, endDate: string): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments/range', {
      params: { startDate, endDate }
    });
    return response.data;
  }
};
