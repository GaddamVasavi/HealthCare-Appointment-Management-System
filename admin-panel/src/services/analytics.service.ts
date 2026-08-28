import api from './api';

export const analyticsService = {
  getDashboardStats: async () => {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },
  getRevenueData: async (startDate: string, endDate: string) => {
    const response = await api.get('/analytics/revenue', { params: { startDate, endDate } });
    return response.data;
  },
  getAppointmentTrends: async () => {
    const response = await api.get('/analytics/appointments/trends');
    return response.data;
  }
};
