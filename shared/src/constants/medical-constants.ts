/**
 * @fileoverview Medical constants for the Healthcare Appointment Management System.
 */

export const BloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type BloodType = typeof BloodTypes[number];

export const VitalsNormalRanges = {
  temperatureCelsius: { min: 36.1, max: 37.2 },
  bloodPressureSystolic: { min: 90, max: 120 },
  bloodPressureDiastolic: { min: 60, max: 80 },
  heartRateBpm: { min: 60, max: 100 },
  respiratoryRateBpm: { min: 12, max: 20 },
  oxygenSaturationPercent: { min: 95, max: 100 },
};

export const PainScale = {
  MIN: 0, // No pain
  MAX: 10, // Worst pain imaginable
  MILD: [1, 2, 3],
  MODERATE: [4, 5, 6],
  SEVERE: [7, 8, 9, 10],
};

export const BMICategories = {
  UNDERWEIGHT: { min: 0, max: 18.4 },
  NORMAL: { min: 18.5, max: 24.9 },
  OVERWEIGHT: { min: 25, max: 29.9 },
  OBESE_CLASS_1: { min: 30, max: 34.9 },
  OBESE_CLASS_2: { min: 35, max: 39.9 },
  OBESE_CLASS_3: { min: 40, max: Infinity },
};

export const DrugSchedules = {
  SCHEDULE_I: 'High potential for abuse, no currently accepted medical use.',
  SCHEDULE_II: 'High potential for abuse, severe psychological or physical dependence.',
  SCHEDULE_III: 'Moderate to low potential for physical and psychological dependence.',
  SCHEDULE_IV: 'Low potential for abuse and low risk of dependence.',
  SCHEDULE_V: 'Lower potential for abuse, consist of preparations containing limited quantities of certain narcotics.',
};

export const AllergySeverities = ['MILD', 'MODERATE', 'SEVERE', 'LIFE_THREATENING'] as const;
export type AllergySeverity = typeof AllergySeverities[number];

export const CommonVaccinations = [
  'Influenza (Flu)',
  'COVID-19',
  'Tetanus, Diphtheria, Pertussis (Tdap)',
  'Measles, Mumps, Rubella (MMR)',
  'Hepatitis A',
  'Hepatitis B',
  'Varicella (Chickenpox)',
  'Pneumococcal',
  'Human Papillomavirus (HPV)',
  'Shingles',
];
