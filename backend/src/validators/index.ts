import { body, query, ValidationChain } from 'express-validator';

export const createAppointmentValidation: ValidationChain[] = [
  body('doctor')
    .notEmpty().withMessage('Doctor is required')
    .isMongoId().withMessage('Invalid doctor ID format'),
  body('date')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Please provide a valid date')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (appointmentDate < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      return true;
    }),
  body('startTime')
    .notEmpty().withMessage('Start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Start time must be in HH:mm format'),
  body('endTime')
    .notEmpty().withMessage('End time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('End time must be in HH:mm format')
    .custom((value, { req }) => {
      if (typeof req.body.startTime === 'string' && value <= req.body.startTime) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  body('reason')
    .notEmpty().withMessage('Reason for appointment is required')
    .trim()
    .isLength({ min: 5, max: 500 }).withMessage('Reason must be between 5 and 500 characters'),
  body('type')
    .optional()
    .isIn(['consultation', 'follow_up', 'routine_checkup', 'emergency', 'specialist_referral'])
    .withMessage('Invalid appointment type'),
  body('symptoms')
    .optional()
    .isArray().withMessage('Symptoms must be an array'),
  body('symptoms.*')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Each symptom cannot exceed 100 characters'),
  body('patientNotes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Patient notes cannot exceed 1000 characters'),
];

export const updateAppointmentStatusValidation: ValidationChain[] = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show', 'in_progress'])
    .withMessage('Invalid appointment status'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
  body('cancellationReason')
    .optional()
    .isIn(['patient_request', 'doctor_unavailable', 'emergency', 'rescheduled', 'no_show', 'other'])
    .withMessage('Invalid cancellation reason'),
];

export const rescheduleAppointmentValidation: ValidationChain[] = [
  body('date')
    .notEmpty().withMessage('New date is required')
    .isISO8601().withMessage('Please provide a valid date')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (appointmentDate < today) {
        throw new Error('New appointment date cannot be in the past');
      }
      return true;
    }),
  body('startTime')
    .notEmpty().withMessage('New start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Start time must be in HH:mm format'),
  body('endTime')
    .notEmpty().withMessage('New end time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('End time must be in HH:mm format'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters'),
];

export const appointmentQueryValidation: ValidationChain[] = [
  query('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled', 'rescheduled', 'no_show', 'in_progress'])
    .withMessage('Invalid status filter'),
  query('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  query('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format'),
  query('doctor')
    .optional()
    .isMongoId().withMessage('Invalid doctor ID'),
  query('patient')
    .optional()
    .isMongoId().withMessage('Invalid patient ID'),
  query('type')
    .optional()
    .isIn(['consultation', 'follow_up', 'routine_checkup', 'emergency', 'specialist_referral'])
    .withMessage('Invalid appointment type'),
];

export const createScheduleValidation: ValidationChain[] = [
  body('scheduleDays')
    .isArray({ min: 1, max: 7 }).withMessage('Schedule must have between 1 and 7 days'),
  body('scheduleDays.*.day')
    .isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    .withMessage('Invalid day of week'),
  body('scheduleDays.*.isAvailable')
    .isBoolean().withMessage('isAvailable must be a boolean'),
  body('scheduleDays.*.startTime')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Start time must be in HH:mm format'),
  body('scheduleDays.*.endTime')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('End time must be in HH:mm format'),
  body('slotDuration')
    .notEmpty().withMessage('Slot duration is required')
    .isInt({ min: 5, max: 120 }).withMessage('Slot duration must be between 5 and 120 minutes'),
  body('bufferTime')
    .optional()
    .isInt({ min: 0, max: 60 }).withMessage('Buffer time must be between 0 and 60 minutes'),
  body('effectiveFrom')
    .notEmpty().withMessage('Effective from date is required')
    .isISO8601().withMessage('Please provide a valid date'),
  body('effectiveTo')
    .optional()
    .isISO8601().withMessage('Please provide a valid date'),
  body('advanceBookingDays')
    .optional()
    .isInt({ min: 1, max: 365 }).withMessage('Advance booking days must be between 1 and 365'),
];

export const createConsultationValidation: ValidationChain[] = [
  body('appointment')
    .notEmpty().withMessage('Appointment reference is required')
    .isMongoId().withMessage('Invalid appointment ID'),
  body('chiefComplaint')
    .notEmpty().withMessage('Chief complaint is required')
    .trim()
    .isLength({ min: 3, max: 500 }).withMessage('Chief complaint must be between 3 and 500 characters'),
  body('diagnosis')
    .notEmpty().withMessage('Diagnosis is required')
    .trim()
    .isLength({ min: 3, max: 1000 }).withMessage('Diagnosis must be between 3 and 1000 characters'),
  body('clinicalNotes')
    .notEmpty().withMessage('Clinical notes are required')
    .trim()
    .isLength({ min: 10, max: 10000 }).withMessage('Clinical notes must be between 10 and 10000 characters'),
  body('vitalSigns.bloodPressureSystolic')
    .optional()
    .isInt({ min: 50, max: 300 }).withMessage('Systolic BP must be between 50 and 300'),
  body('vitalSigns.bloodPressureDiastolic')
    .optional()
    .isInt({ min: 30, max: 200 }).withMessage('Diastolic BP must be between 30 and 200'),
  body('vitalSigns.heartRate')
    .optional()
    .isInt({ min: 20, max: 300 }).withMessage('Heart rate must be between 20 and 300'),
  body('vitalSigns.temperature')
    .optional()
    .isFloat({ min: 30, max: 45 }).withMessage('Temperature must be between 30 and 45°C'),
  body('followUpRequired')
    .optional()
    .isBoolean().withMessage('Follow-up required must be a boolean'),
  body('followUpDate')
    .optional()
    .isISO8601().withMessage('Please provide a valid follow-up date'),
  body('status')
    .optional()
    .isIn(['in_progress', 'completed', 'follow_up_required'])
    .withMessage('Invalid consultation status'),
];

export const createPrescriptionValidation: ValidationChain[] = [
  body('appointment')
    .notEmpty().withMessage('Appointment reference is required')
    .isMongoId().withMessage('Invalid appointment ID'),
  body('diagnosis')
    .notEmpty().withMessage('Diagnosis is required')
    .trim()
    .isLength({ min: 3, max: 1000 }).withMessage('Diagnosis must be between 3 and 1000 characters'),
  body('medicines')
    .isArray({ min: 1 }).withMessage('At least one medicine is required'),
  body('medicines.*.name')
    .notEmpty().withMessage('Medicine name is required')
    .trim()
    .isLength({ max: 200 }).withMessage('Medicine name cannot exceed 200 characters'),
  body('medicines.*.dosage')
    .notEmpty().withMessage('Dosage is required')
    .trim()
    .isLength({ max: 100 }).withMessage('Dosage cannot exceed 100 characters'),
  body('medicines.*.frequency')
    .notEmpty().withMessage('Frequency is required')
    .trim()
    .isLength({ max: 100 }).withMessage('Frequency cannot exceed 100 characters'),
  body('medicines.*.duration')
    .notEmpty().withMessage('Duration is required')
    .trim()
    .isLength({ max: 100 }).withMessage('Duration cannot exceed 100 characters'),
  body('medicines.*.route')
    .optional()
    .isIn(['oral', 'topical', 'injection', 'inhalation', 'sublingual', 'rectal', 'transdermal', 'intravenous', 'intramuscular', 'ophthalmic', 'otic', 'nasal', 'other'])
    .withMessage('Invalid route of administration'),
  body('generalInstructions')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('General instructions cannot exceed 2000 characters'),
  body('dietaryAdvice')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Dietary advice cannot exceed 1000 characters'),
];

export const createSpecializationValidation: ValidationChain[] = [
  body('name')
    .notEmpty().withMessage('Specialization name is required')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .notEmpty().withMessage('Description is required')
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('icon')
    .optional()
    .trim(),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 }).withMessage('Display order must be a non-negative integer'),
  body('commonConditions')
    .optional()
    .isArray().withMessage('Common conditions must be an array'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
];

export const doctorSearchValidation: ValidationChain[] = [
  query('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name search cannot exceed 100 characters'),
  query('specialization')
    .optional()
    .isMongoId().withMessage('Invalid specialization ID'),
  query('specializationSlug')
    .optional()
    .trim(),
  query('minFee')
    .optional()
    .isFloat({ min: 0 }).withMessage('Minimum fee must be non-negative'),
  query('maxFee')
    .optional()
    .isFloat({ min: 0 }).withMessage('Maximum fee must be non-negative'),
  query('minRating')
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  query('minExperience')
    .optional()
    .isInt({ min: 0 }).withMessage('Minimum experience must be non-negative'),
  query('language')
    .optional()
    .trim(),
  query('acceptingNewPatients')
    .optional()
    .isBoolean().withMessage('acceptingNewPatients must be a boolean'),
  query('isVerified')
    .optional()
    .isBoolean().withMessage('isVerified must be a boolean'),
  query('available')
    .optional()
    .isISO8601().withMessage('Available date must be a valid date'),
];

export const documentUploadValidation: ValidationChain[] = [
  body('title')
    .notEmpty().withMessage('Document title is required')
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('Title must be between 2 and 200 characters'),
  body('documentType')
    .notEmpty().withMessage('Document type is required')
    .isIn(['lab_report', 'prescription', 'medical_record', 'insurance', 'imaging', 'discharge_summary', 'referral_letter', 'vaccination_record', 'allergy_report', 'other'])
    .withMessage('Invalid document type'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
  body('isConfidential')
    .optional()
    .isBoolean().withMessage('isConfidential must be a boolean'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
];

export const notificationQueryValidation: ValidationChain[] = [
  query('type')
    .optional()
    .isString().withMessage('Type must be a string'),
  query('isRead')
    .optional()
    .isBoolean().withMessage('isRead must be a boolean'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent']).withMessage('Invalid priority'),
];

export const adminUserQueryValidation: ValidationChain[] = [
  query('role')
    .optional()
    .isIn(['patient', 'doctor', 'admin']).withMessage('Invalid role filter'),
  query('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended', 'pending']).withMessage('Invalid status filter'),
  query('search')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Search cannot exceed 200 characters'),
];

export const updateUserStatusValidation: ValidationChain[] = [
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['active', 'inactive', 'suspended', 'pending']).withMessage('Invalid user status'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters'),
];

export const reportQueryValidation: ValidationChain[] = [
  query('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date'),
  query('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date'),
  query('groupBy')
    .optional()
    .isIn(['day', 'week', 'month', 'year']).withMessage('Invalid group by value'),
  query('specialization')
    .optional()
    .isMongoId().withMessage('Invalid specialization ID'),
];
