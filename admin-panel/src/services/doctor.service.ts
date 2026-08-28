import api from './api';
import { Doctor } from '../types';

export const doctorService = {
  getDoctors: async () => {
    const response = await api.get<Doctor[]>('/doctors');
    return response.data;
  },
  approveDoctor: async (id: string) => {
    const response = await api.post(`/doctors/${id}/approve`);
    return response.data;
  },
  verifyCredentials: async (id: string) => {
    const response = await api.post(`/doctors/${id}/verify`);
    return response.data;
  }
};
