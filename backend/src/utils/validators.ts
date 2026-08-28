/**
 * Comprehensive Validators Module
 * 
 * Provides extensive validation functions for all healthcare data types
 * including patients, doctors, appointments, prescriptions, and lab results.
 * Ensures data integrity and business rule compliance.
 */

import { BadRequestError } from './errors';
import { logger } from './logger';

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate password strength
 * Requirements: minimum 8 characters, at least one uppercase, one lowercase, one number, one special character
 */
export function validatePasswordStrength(password: string): { isValid: boolean; feedback: string[] } {
  const feedback: string[] = [];
  
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    feedback.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Password must contain at least one special character');
  }

  return {
    isValid: feedback.length === 0,
    feedback
  };
}

/**
 * Validate date of birth and age
 */
export function validateDateOfBirth(dob: Date, minAge: number = 18, maxAge: number = 150): { isValid: boolean; feedback: string } {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) {
    return { isValid: false, feedback: 'Invalid date format' };
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age < minAge) {
    return { isValid: false, feedback: `Patient must be at least ${minAge} years old` };
  }
  if (age > maxAge) {
    return { isValid: false, feedback: `Invalid age (${age} years)` };
  }

  return { isValid: true, feedback: '' };
}

/**
 * Validate blood group
 */
export function validateBloodGroup(bloodGroup: string): boolean {
  const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validGroups.includes(bloodGroup);
}

/**
 * Validate appointment date and time
 */
export function validateAppointmentDateTime(date: Date, startTime: string, endTime: string): { isValid: boolean; feedback: string } {
  // Check if date is in the future
  if (date < new Date()) {
    return { isValid: false, feedback: 'Appointment cannot be scheduled in the past' };
  }

  // Validate time format (HH:MM)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return { isValid: false, feedback: 'Invalid time format. Use HH:MM format' };
  }

  // Ensure end time is after start time
  if (endTime <= startTime) {
    return { isValid: false, feedback: 'End time must be after start time' };
  }

  return { isValid: true, feedback: '' };
}

/**
 * Validate prescription
 */
export function validatePrescription(prescription: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!prescription.medicationName) {
    errors.push('Medication name is required');
  }
  if (!prescription.dosage) {
    errors.push('Dosage is required');
  }
  if (!prescription.frequency) {
    errors.push('Frequency is required');
  }
  if (!prescription.duration) {
    errors.push('Duration is required');
  }

  // Validate dosage format
  if (prescription.dosage && !/^\d+\s*(mg|g|ml|mcg|units)$/.test(prescription.dosage)) {
    errors.push('Invalid dosage format (e.g., 500mg, 2g, 10ml)');
  }

  // Validate frequency format
  const validFrequencies = ['once daily', 'twice daily', 'three times daily', 'four times daily', 'every 6 hours', 'every 8 hours', 'every 12 hours', 'as needed'];
  if (prescription.frequency && !validFrequencies.some(f => prescription.frequency.toLowerCase().includes(f))) {
    errors.push(`Frequency must be one of: ${validFrequencies.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate lab result values
 */
export function validateLabResult(result: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!result.testName) {
    errors.push('Test name is required');
  }
  if (!result.results || typeof result.results !== 'object') {
    errors.push('Results must be a valid object');
  }
  if (!result.orderedBy) {
    errors.push('Ordering physician is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate patient data
 */
export function validatePatientData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.trim() === '') {
    errors.push('First name is required');
  }
  if (!data.lastName || data.lastName.trim() === '') {
    errors.push('Last name is required');
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  if (!data.phoneNumber || !validatePhoneNumber(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }
  if (!data.dateOfBirth) {
    errors.push('Date of birth is required');
  } else {
    const ageValidation = validateDateOfBirth(new Date(data.dateOfBirth));
    if (!ageValidation.isValid) {
      errors.push(ageValidation.feedback);
    }
  }
  if (data.bloodGroup && !validateBloodGroup(data.bloodGroup)) {
    errors.push('Invalid blood group');
  }
  if (!data.gender || !['male', 'female', 'other'].includes(data.gender.toLowerCase())) {
    errors.push('Gender must be male, female, or other');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate doctor data
 */
export function validateDoctorData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.trim() === '') {
    errors.push('First name is required');
  }
  if (!data.lastName || data.lastName.trim() === '') {
    errors.push('Last name is required');
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Valid email is required');
  }
  if (!data.phoneNumber || !validatePhoneNumber(data.phoneNumber)) {
    errors.push('Valid phone number is required');
  }
  if (!data.licenseNumber || data.licenseNumber.trim() === '') {
    errors.push('Medical license number is required');
  }
  if (!data.specialization || data.specialization.trim() === '') {
    errors.push('Specialization is required');
  }
  if (data.yearsOfExperience && (data.yearsOfExperience < 0 || data.yearsOfExperience > 70)) {
    errors.push('Years of experience must be between 0 and 70');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate user credentials
 */
export function validateCredentials(email: string, password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }
  if (!password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate pagination parameters
 */
export function validatePagination(page?: number, limit?: number): { page: number; limit: number } {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 20;
  const MAX_LIMIT = 1000;

  let validPage = page || DEFAULT_PAGE;
  let validLimit = limit || DEFAULT_LIMIT;

  if (validPage < 1) validPage = DEFAULT_PAGE;
  if (validLimit < 1) validLimit = DEFAULT_LIMIT;
  if (validLimit > MAX_LIMIT) validLimit = MAX_LIMIT;

  return { page: validPage, limit: validLimit };
}

/**
 * Validate appointment status transition
 */
export function validateAppointmentStatusTransition(
  currentStatus: string,
  newStatus: string
): { isValid: boolean; feedback: string } {
  const validTransitions: Record<string, string[]> = {
    'scheduled': ['confirmed', 'cancelled', 'rescheduled'],
    'confirmed': ['completed', 'cancelled', 'rescheduled', 'no-show'],
    'completed': ['archived'],
    'cancelled': [],
    'rescheduled': ['confirmed', 'cancelled'],
    'no-show': ['rescheduled', 'cancelled']
  };

  if (!validTransitions[currentStatus]) {
    return { isValid: false, feedback: `Invalid current status: ${currentStatus}` };
  }

  if (!validTransitions[currentStatus].includes(newStatus)) {
    return {
      isValid: false,
      feedback: `Cannot transition from ${currentStatus} to ${newStatus}. Valid transitions: ${validTransitions[currentStatus].join(', ')}`
    };
  }

  return { isValid: true, feedback: '' };
}

/**
 * Validate insurance data
 */
export function validateInsuranceData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.provider || data.provider.trim() === '') {
    errors.push('Insurance provider is required');
  }
  if (!data.policyNumber || data.policyNumber.trim() === '') {
    errors.push('Policy number is required');
  }
  if (data.expiryDate && new Date(data.expiryDate) < new Date()) {
    errors.push('Insurance policy is expired');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate allergy information
 */
export function validateAllergyData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const validSeverities = ['mild', 'moderate', 'severe'];

  if (!data.allergen || data.allergen.trim() === '') {
    errors.push('Allergen name is required');
  }
  if (!data.severity || !validSeverities.includes(data.severity.toLowerCase())) {
    errors.push(`Severity must be one of: ${validSeverities.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Batch validate multiple records
 */
export function validateBatch(records: any[], validatorFn: (record: any) => { isValid: boolean; errors: string[] }): {
  validCount: number;
  invalidCount: number;
  results: Array<{ index: number; isValid: boolean; errors: string[] }>;
} {
  const results: Array<{ index: number; isValid: boolean; errors: string[] }> = [];
  let validCount = 0;
  let invalidCount = 0;

  records.forEach((record, index) => {
    const validation = validatorFn(record);
    results.push({ index, ...validation });
    
    if (validation.isValid) {
      validCount++;
    } else {
      invalidCount++;
    }
  });

  logger.info(`Batch validation: ${validCount} valid, ${invalidCount} invalid out of ${records.length}`);

  return { validCount, invalidCount, results };
}

/**
 * Sanitize string input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}

/**
 * Validate geographic coordinates
 */
export function validateCoordinates(latitude: number, longitude: number): boolean {
  return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

/**
 * Validate time range
 */
export function validateTimeRange(
  startTime: string,
  endTime: string,
  workingHoursStart?: string,
  workingHoursEnd?: string
): { isValid: boolean; feedback: string } {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
    return { isValid: false, feedback: 'Invalid time format' };
  }

  if (endTime <= startTime) {
    return { isValid: false, feedback: 'End time must be after start time' };
  }

  if (workingHoursStart && workingHoursEnd) {
    if (startTime < workingHoursStart || endTime > workingHoursEnd) {
      return { isValid: false, feedback: `Time must be within working hours (${workingHoursStart} - ${workingHoursEnd})` };
    }
  }

  return { isValid: true, feedback: '' };
}

/**
 * Validate medical record ICD-10 code
 */
export function validateICD10Code(code: string): boolean {
  // Basic ICD-10 format validation: Letter followed by 2 digits, then optionally dot and up to 2 more characters
  const icd10Regex = /^[A-Z]\d{2}\.?\d?\.?\d?$/;
  return icd10Regex.test(code);
}

/**
 * Validate CPT code (medical procedure code)
 */
export function validateCPTCode(code: string): boolean {
  // CPT codes are typically 5 digits
  return /^\d{5}$/.test(code);
}
