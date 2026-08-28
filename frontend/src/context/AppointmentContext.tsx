import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { appointmentService } from '../services/appointment.service';
import { useAuth } from './AuthContext';

interface BookingState {
  specialtyId: string | null;
  doctorId: string | null;
  date: string | null;
  timeSlot: string | null;
  reason: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  bookingState: BookingState;
  
  // Actions
  fetchAppointments: () => Promise<void>;
  updateBookingState: (updates: Partial<BookingState>) => void;
  resetBookingState: () => void;
  bookAppointment: () => Promise<Appointment | null>;
  cancelAppointment: (id: string, reason: string) => Promise<boolean>;
  rescheduleAppointment: (id: string, date: string, time: string) => Promise<boolean>;
}

const initialBookingState: BookingState = {
  specialtyId: null,
  doctorId: null,
  date: null,
  timeSlot: null,
  reason: ''
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>(initialBookingState);

  const fetchAppointments = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Mocking fetch or using actual service
      const res = await appointmentService.getAll();
      setAppointments(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const upcomingAppointments = appointments.filter(
    (app) => app.status === AppointmentStatus.CONFIRMED || app.status === AppointmentStatus.PENDING
  );
  
  const pastAppointments = appointments.filter(
    (app) => app.status === AppointmentStatus.COMPLETED || app.status === AppointmentStatus.CANCELLED
  );

  const updateBookingState = (updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  };

  const resetBookingState = () => {
    setBookingState(initialBookingState);
  };

  const bookAppointment = async (): Promise<Appointment | null> => {
    if (!bookingState.doctorId || !bookingState.date || !bookingState.timeSlot) {
      setError('Please complete all booking steps');
      return null;
    }

    setIsLoading(true);
    try {
      const newAppt = await appointmentService.create({
        doctorId: bookingState.doctorId,
        date: bookingState.date,
        startTime: bookingState.timeSlot,
        reason: bookingState.reason,
        patientId: user?.id
      });
      setAppointments(prev => [...prev, newAppt]);
      resetBookingState();
      return newAppt;
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelAppointment = async (id: string, reason: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await appointmentService.cancel(id, reason);
      setAppointments(prev => 
        prev.map(app => app.id === id ? { ...app, status: AppointmentStatus.CANCELLED } : app)
      );
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const rescheduleAppointment = async (id: string, date: string, time: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updatedAppt = await appointmentService.reschedule(id, date, time);
      setAppointments(prev => 
        prev.map(app => app.id === id ? updatedAppt : app)
      );
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to reschedule appointment');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      upcomingAppointments,
      pastAppointments,
      isLoading,
      error,
      bookingState,
      fetchAppointments,
      updateBookingState,
      resetBookingState,
      bookAppointment,
      cancelAppointment,
      rescheduleAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointmentContext must be used within an AppointmentProvider');
  }
  return context;
};
