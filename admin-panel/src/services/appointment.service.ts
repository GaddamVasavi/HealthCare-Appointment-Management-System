import api from './api';
import { Appointment } from '../types';

export const appointmentService = {
  getAppointments: async () => {
    const response = await api.get<Appointment[]>('/appointments');
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/appointments/${id}/status`, { status });
    return response.data;
  }
};
