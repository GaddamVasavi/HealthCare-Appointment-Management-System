import api from './api';
import { Patient } from '../types';

export const patientService = {
  getPatients: async () => {
    const response = await api.get<Patient[]>('/patients');
    return response.data;
  },
  getPatient: async (id: string) => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  }
};
