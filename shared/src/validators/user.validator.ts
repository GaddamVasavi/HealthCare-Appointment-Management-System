/**
 * @fileoverview Validators for User Data
 */
import { AppConfig } from '../constants/config';

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (password.length < AppConfig.PASSWORD.MIN_LENGTH) {
    errors.push(`Password must be at least ${AppConfig.PASSWORD.MIN_LENGTH} characters long.`);
  }
  if (AppConfig.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (AppConfig.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter.');
  }
  if (AppConfig.PASSWORD.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number.');
  }
  if (AppConfig.PASSWORD.REQUIRE_SPECIAL_CHAR && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }
  return { isValid: errors.length === 0, errors };
};

export const validatePhoneNumber = (phone: string): boolean => {
  // Simple validation for 10-15 digits
  const re = /^\+?[1-9]\d{1,14}$/;
  return re.test(phone);
};

export const validateDOB = (dobStr: string): boolean => {
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return false;
  const today = new Date();
  const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  return dob <= today && dob >= minAge;
};
