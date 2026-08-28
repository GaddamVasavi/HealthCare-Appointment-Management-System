/**
 * @fileoverview Comprehensive error code constants for the Healthcare Appointment Management System.
 * Organizes error codes by category, including the code string, default message, and appropriate HTTP status.
 */

export interface ErrorDefinition {
  code: string;
  message: string;
  httpStatus: number;
}

export const ErrorCodes = {
  // ---------------------------------------------------------------------------
  // AUTHENTICATION & AUTHORIZATION ERRORS (1000 - 1999)
  // ---------------------------------------------------------------------------
  AUTH: {
    UNAUTHORIZED: {
      code: 'AUTH_1000',
      message: 'Authentication is required to access this resource.',
      httpStatus: 401,
    },
    INVALID_CREDENTIALS: {
      code: 'AUTH_1001',
      message: 'Invalid email or password.',
      httpStatus: 401,
    },
    TOKEN_EXPIRED: {
      code: 'AUTH_1002',
      message: 'Authentication token has expired. Please log in again.',
      httpStatus: 401,
    },
    TOKEN_INVALID: {
      code: 'AUTH_1003',
      message: 'Invalid authentication token.',
      httpStatus: 401,
    },
    FORBIDDEN: {
      code: 'AUTH_1004',
      message: 'You do not have permission to perform this action.',
      httpStatus: 403,
    },
    ACCOUNT_LOCKED: {
      code: 'AUTH_1005',
      message: 'Account is temporarily locked due to multiple failed login attempts.',
      httpStatus: 403,
    },
    ACCOUNT_SUSPENDED: {
      code: 'AUTH_1006',
      message: 'Account has been suspended. Please contact support.',
      httpStatus: 403,
    },
    EMAIL_NOT_VERIFIED: {
      code: 'AUTH_1007',
      message: 'Email address has not been verified.',
      httpStatus: 403,
    },
    MFA_REQUIRED: {
      code: 'AUTH_1008',
      message: 'Multi-factor authentication is required.',
      httpStatus: 401,
    },
    MFA_INVALID_CODE: {
      code: 'AUTH_1009',
      message: 'Invalid multi-factor authentication code.',
      httpStatus: 401,
    }
  },

  // ---------------------------------------------------------------------------
  // VALIDATION & REQUEST ERRORS (2000 - 2999)
  // ---------------------------------------------------------------------------
  VALIDATION: {
    BAD_REQUEST: {
      code: 'VAL_2000',
      message: 'Invalid request parameters.',
      httpStatus: 400,
    },
    MISSING_REQUIRED_FIELD: {
      code: 'VAL_2001',
      message: 'A required field is missing from the request.',
      httpStatus: 400,
    },
    INVALID_FORMAT: {
      code: 'VAL_2002',
      message: 'The provided data format is invalid.',
      httpStatus: 400,
    },
    RESOURCE_NOT_FOUND: {
      code: 'VAL_2003',
      message: 'The requested resource could not be found.',
      httpStatus: 404,
    },
    RESOURCE_ALREADY_EXISTS: {
      code: 'VAL_2004',
      message: 'A resource with this identifier already exists.',
      httpStatus: 409,
    },
    INVALID_EMAIL: {
      code: 'VAL_2005',
      message: 'The provided email address is invalid.',
      httpStatus: 400,
    },
    PASSWORD_TOO_WEAK: {
      code: 'VAL_2006',
      message: 'The password does not meet complexity requirements.',
      httpStatus: 400,
    },
    INVALID_DATE: {
      code: 'VAL_2007',
      message: 'The provided date is invalid or in the wrong format.',
      httpStatus: 400,
    }
  },

  // ---------------------------------------------------------------------------
  // APPOINTMENT ERRORS (3000 - 3999)
  // ---------------------------------------------------------------------------
  APPOINTMENT: {
    SLOT_UNAVAILABLE: {
      code: 'APT_3000',
      message: 'The selected time slot is no longer available.',
      httpStatus: 409,
    },
    DOCTOR_UNAVAILABLE: {
      code: 'APT_3001',
      message: 'The requested doctor is not available on this date.',
      httpStatus: 400,
    },
    PAST_DATE: {
      code: 'APT_3002',
      message: 'Cannot schedule an appointment in the past.',
      httpStatus: 400,
    },
    OVERLAPPING_APPOINTMENT: {
      code: 'APT_3003',
      message: 'Patient already has an appointment during this time.',
      httpStatus: 409,
    },
    LEAD_TIME_TOO_SHORT: {
      code: 'APT_3004',
      message: 'Appointments must be booked with sufficient lead time.',
      httpStatus: 400,
    },
    MAX_BOOKING_WINDOW_EXCEEDED: {
      code: 'APT_3005',
      message: 'Cannot book an appointment this far in advance.',
      httpStatus: 400,
    },
    CANCELLATION_WINDOW_PASSED: {
      code: 'APT_3006',
      message: 'Too late to cancel this appointment without a penalty.',
      httpStatus: 400,
    },
    INVALID_STATUS_TRANSITION: {
      code: 'APT_3007',
      message: 'Cannot transition appointment to the requested status.',
      httpStatus: 400,
    }
  },

  // ---------------------------------------------------------------------------
  // BILLING & INSURANCE ERRORS (4000 - 4999)
  // ---------------------------------------------------------------------------
  BILLING: {
    PAYMENT_FAILED: {
      code: 'BIL_4000',
      message: 'The payment transaction failed.',
      httpStatus: 402,
    },
    INSUFFICIENT_FUNDS: {
      code: 'BIL_4001',
      message: 'Payment declined due to insufficient funds.',
      httpStatus: 402,
    },
    CARD_EXPIRED: {
      code: 'BIL_4002',
      message: 'The provided credit card has expired.',
      httpStatus: 402,
    },
    INVALID_INVOICE: {
      code: 'BIL_4003',
      message: 'The specified invoice does not exist or is invalid.',
      httpStatus: 404,
    },
    INVOICE_ALREADY_PAID: {
      code: 'BIL_4004',
      message: 'This invoice has already been fully paid.',
      httpStatus: 400,
    },
    INSURANCE_VERIFICATION_FAILED: {
      code: 'BIL_4005',
      message: 'Failed to verify insurance information.',
      httpStatus: 400,
    },
    CLAIM_REJECTED: {
      code: 'BIL_4006',
      message: 'The insurance claim was rejected by the provider.',
      httpStatus: 400,
    }
  },

  // ---------------------------------------------------------------------------
  // ELECTRONIC HEALTH RECORD (EHR) & MEDICAL ERRORS (5000 - 5999)
  // ---------------------------------------------------------------------------
  EHR: {
    RECORD_NOT_FOUND: {
      code: 'EHR_5000',
      message: 'Medical record could not be found.',
      httpStatus: 404,
    },
    RECORD_SEALED: {
      code: 'EHR_5001',
      message: 'This medical record is sealed and cannot be modified.',
      httpStatus: 403,
    },
    INVALID_ICD10_CODE: {
      code: 'EHR_5002',
      message: 'The provided ICD-10 code is invalid.',
      httpStatus: 400,
    },
    PRESCRIPTION_EXPIRED: {
      code: 'EHR_5003',
      message: 'The prescription has expired and cannot be fulfilled.',
      httpStatus: 400,
    },
    MEDICATION_INTERACTION: {
      code: 'EHR_5004',
      message: 'Warning: Potential severe drug interaction detected.',
      httpStatus: 409,
    },
    ALLERGY_CONFLICT: {
      code: 'EHR_5005',
      message: 'Patient has a documented allergy to this medication.',
      httpStatus: 409,
    }
  },

  // ---------------------------------------------------------------------------
  // LABORATORY ERRORS (6000 - 6999)
  // ---------------------------------------------------------------------------
  LAB: {
    ORDER_NOT_FOUND: {
      code: 'LAB_6000',
      message: 'Lab order could not be found.',
      httpStatus: 404,
    },
    SAMPLE_REJECTED: {
      code: 'LAB_6001',
      message: 'The provided sample was rejected (e.g., insufficient volume, hemolyzed).',
      httpStatus: 400,
    },
    RESULT_UNAVAILABLE: {
      code: 'LAB_6002',
      message: 'Lab results are not yet available for this order.',
      httpStatus: 404,
    }
  },

  // ---------------------------------------------------------------------------
  // NOTIFICATION & COMMUNICATION ERRORS (7000 - 7999)
  // ---------------------------------------------------------------------------
  NOTIFICATION: {
    EMAIL_DELIVERY_FAILED: {
      code: 'NOT_7000',
      message: 'Failed to deliver email notification.',
      httpStatus: 500,
    },
    SMS_DELIVERY_FAILED: {
      code: 'NOT_7001',
      message: 'Failed to deliver SMS notification.',
      httpStatus: 500,
    },
    INVALID_CONTACT_INFO: {
      code: 'NOT_7002',
      message: 'The provided contact information is invalid.',
      httpStatus: 400,
    }
  },

  // ---------------------------------------------------------------------------
  // SYSTEM & INFRASTRUCTURE ERRORS (9000 - 9999)
  // ---------------------------------------------------------------------------
  SYSTEM: {
    INTERNAL_SERVER_ERROR: {
      code: 'SYS_9000',
      message: 'An unexpected internal server error occurred.',
      httpStatus: 500,
    },
    SERVICE_UNAVAILABLE: {
      code: 'SYS_9001',
      message: 'The service is temporarily unavailable. Please try again later.',
      httpStatus: 503,
    },
    DATABASE_ERROR: {
      code: 'SYS_9002',
      message: 'A database error occurred.',
      httpStatus: 500,
    },
    THIRD_PARTY_API_ERROR: {
      code: 'SYS_9003',
      message: 'An error occurred while communicating with an external service.',
      httpStatus: 502,
    },
    RATE_LIMIT_EXCEEDED: {
      code: 'SYS_9004',
      message: 'Too many requests. Please slow down.',
      httpStatus: 429,
    },
    FILE_UPLOAD_TOO_LARGE: {
      code: 'SYS_9005',
      message: 'The uploaded file exceeds the maximum allowed size.',
      httpStatus: 413,
    },
    UNSUPPORTED_FILE_TYPE: {
      code: 'SYS_9006',
      message: 'The uploaded file type is not supported.',
      httpStatus: 415,
    }
  }
};
