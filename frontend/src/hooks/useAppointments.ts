import { useState, useEffect } from 'react';
import { Appointment, PaginatedResponse } from '../types';
import { appointmentService } from '../services/appointment.service';

interface UseAppointmentsProps {
  initialFilters?: Record<string, any>;
  autoFetch?: boolean;
}

export const useAppointments = ({ initialFilters = {}, autoFetch = true }: UseAppointmentsProps = {}) => {
  const [data, setData] = useState<PaginatedResponse<Appointment> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const fetchAppointments = async (currentFilters = filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await appointmentService.getAll(currentFilters);
      setData(response);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchAppointments();
    }
  }, [filters, autoFetch]); // Refetch when filters change

  const updateFilters = (newFilters: Record<string, any>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    data,
    appointments: data?.data || [],
    isLoading,
    error,
    filters,
    updateFilters,
    refetch: fetchAppointments
  };
};
