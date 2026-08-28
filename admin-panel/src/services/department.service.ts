import api from './api';
import { Department } from '../types';

export const departmentService = {
  getDepartments: async () => {
    const response = await api.get<Department[]>('/departments');
    return response.data;
  },
  createDepartment: async (dept: Partial<Department>) => {
    const response = await api.post<Department>('/departments', dept);
    return response.data;
  },
  updateDepartment: async (id: string, dept: Partial<Department>) => {
    const response = await api.put<Department>(`/departments/${id}`, dept);
    return response.data;
  }
};
