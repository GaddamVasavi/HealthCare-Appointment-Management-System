/**
 * @fileoverview Appointment validators for the Healthcare Appointment Management System.
 */
import { AppConfig } from '../constants/config';
import { CreateAppointmentRequest } from '../types/appointment.types';
import { isBusinessDay } from '../utils/date-helpers';

export const validateAppointmentBookingWindow = (startTimeStr: string): { isValid: boolean; error?: string } => {
  const startTime = new Date(startTimeStr);
  const now = new Date();
  
  if (startTime < now) {
    return { isValid: false, error: 'Appointment cannot be in the past.' };
  }

  const hoursDiff = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursDiff < AppConfig.APPOINTMENT.MIN_LEAD_TIME_HOURS) {
    return { 
      isValid: false, 
      error: `Appointment must be booked at least ${AppConfig.APPOINTMENT.MIN_LEAD_TIME_HOURS} hours in advance.` 
    };
  }

  const daysDiff = hoursDiff / 24;
  if (daysDiff > AppConfig.APPOINTMENT.MAX_BOOKING_WINDOW_DAYS) {
    return {
      isValid: false,
      error: `Appointment cannot be booked more than ${AppConfig.APPOINTMENT.MAX_BOOKING_WINDOW_DAYS} days in advance.`
    };
  }

  return { isValid: true };
};

export const validateAppointmentDuration = (startTimeStr: string, endTimeStr: string): { isValid: boolean; error?: string } => {
  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);
  
  if (endTime <= startTime) {
    return { isValid: false, error: 'End time must be after start time.' };
  }

  const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
  if (durationMinutes < 15) {
    return { isValid: false, error: 'Appointment duration must be at least 15 minutes.' };
  }
  if (durationMinutes > 120) {
    return { isValid: false, error: 'Appointment duration cannot exceed 120 minutes.' };
  }

  return { isValid: true };
};

export const validateBusinessHours = (startTimeStr: string, clinicOpenTime = '08:00', clinicCloseTime = '18:00'): { isValid: boolean; error?: string } => {
  const startTime = new Date(startTimeStr);
  
  if (!isBusinessDay(startTime)) {
    return { isValid: false, error: 'Appointments can only be scheduled on business days.' };
  }

  const timeString = startTime.toTimeString().substring(0, 5);
  if (timeString < clinicOpenTime || timeString >= clinicCloseTime) {
    return { isValid: false, error: `Appointment time must be within clinic hours (${clinicOpenTime} - ${clinicCloseTime}).` };
  }

  return { isValid: true };
};

export const validateCreateAppointmentRequest = (req: CreateAppointmentRequest): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const windowValidation = validateAppointmentBookingWindow(req.startTime);
  if (!windowValidation.isValid) errors.push(windowValidation.error!);

  const durationValidation = validateAppointmentDuration(req.startTime, req.endTime);
  if (!durationValidation.isValid) errors.push(durationValidation.error!);

  const businessHoursValidation = validateBusinessHours(req.startTime);
  if (!businessHoursValidation.isValid) errors.push(businessHoursValidation.error!);

  if (!req.patientId || req.patientId.trim() === '') errors.push('Patient ID is required.');
  if (!req.doctorId || req.doctorId.trim() === '') errors.push('Doctor ID is required.');
  if (!req.clinicId || req.clinicId.trim() === '') errors.push('Clinic ID is required.');
  if (!req.reasonForVisit || req.reasonForVisit.trim() === '') errors.push('Reason for visit is required.');

  return { isValid: errors.length === 0, errors };
};
