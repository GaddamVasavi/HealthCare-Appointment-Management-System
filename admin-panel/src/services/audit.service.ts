import api from './api';

export const auditService = {
  getLogs: async (params?: any) => {
    const response = await api.get('/audit', { params });
    return response.data;
  },
  exportLogs: async (format: 'csv' | 'pdf') => {
    const response = await api.get(`/audit/export?format=${format}`, { responseType: 'blob' });
    return response.data;
  }
};
