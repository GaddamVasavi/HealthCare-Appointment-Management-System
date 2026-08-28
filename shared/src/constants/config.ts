/**
 * @fileoverview Application configuration constants for the Healthcare Appointment Management System.
 */

export const AppConfig = {
  // API settings
  API_VERSION: 'v1',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Timeouts and TTLs
  SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  CACHE_TTL_SHORT_MS: 60 * 1000, // 1 minute
  CACHE_TTL_LONG_MS: 60 * 60 * 1000, // 1 hour
  OTP_EXPIRY_MINUTES: 10,
  TOKEN_EXPIRY_HOURS: 24,

  // File Upload Limits
  UPLOAD: {
    MAX_PROFILE_PIC_SIZE_MB: 5,
    MAX_DOCUMENT_SIZE_MB: 15,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },

  // Appointment Configuration
  APPOINTMENT: {
    MIN_LEAD_TIME_HOURS: 24, // Minimum time in advance an appointment can be booked
    MAX_BOOKING_WINDOW_DAYS: 90, // Maximum days in advance
    DEFAULT_DURATION_MINUTES: 30,
    CANCELLATION_DEADLINE_HOURS: 24, // Free cancellation deadline
    START_TIME_INTERVAL_MINUTES: 15, // Timeslots start every 15 mins
  },
  
  // Password Policies
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
  },
  
  // Regional Defaults
  DEFAULTS: {
    CURRENCY: 'USD',
    LOCALE: 'en-US',
    TIMEZONE: 'America/New_York',
  }
};
