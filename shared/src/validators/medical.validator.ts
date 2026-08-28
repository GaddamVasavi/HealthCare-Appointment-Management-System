/**
 * @fileoverview Medical validators for the Healthcare Appointment Management System.
 */
import { VitalsNormalRanges } from '../constants/medical-constants';

export const validateICD10 = (code: string): boolean => {
  // Basic ICD-10 format: A00.0 to Z99.9
  const re = /^[A-Z][0-9]{2}(\.[0-9A-Z]{1,4})?$/;
  return re.test(code);
};

export const validateVitals = (vitals: {
  temperatureCelsius?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
}): { isValid: boolean; warnings: string[] } => {
  const warnings: string[] = [];

  if (vitals.temperatureCelsius) {
    if (vitals.temperatureCelsius < 30 || vitals.temperatureCelsius > 43) {
      warnings.push('Temperature is completely out of possible human range.');
    } else if (
      vitals.temperatureCelsius < VitalsNormalRanges.temperatureCelsius.min || 
      vitals.temperatureCelsius > VitalsNormalRanges.temperatureCelsius.max
    ) {
      warnings.push(`Temperature ${vitals.temperatureCelsius}°C is outside normal range (${VitalsNormalRanges.temperatureCelsius.min}-${VitalsNormalRanges.temperatureCelsius.max}°C).`);
    }
  }

  if (vitals.bloodPressureSystolic) {
    if (vitals.bloodPressureSystolic < VitalsNormalRanges.bloodPressureSystolic.min || vitals.bloodPressureSystolic > VitalsNormalRanges.bloodPressureSystolic.max) {
      warnings.push(`Systolic BP ${vitals.bloodPressureSystolic} is outside normal range.`);
    }
  }

  if (vitals.bloodPressureDiastolic) {
    if (vitals.bloodPressureDiastolic < VitalsNormalRanges.bloodPressureDiastolic.min || vitals.bloodPressureDiastolic > VitalsNormalRanges.bloodPressureDiastolic.max) {
      warnings.push(`Diastolic BP ${vitals.bloodPressureDiastolic} is outside normal range.`);
    }
  }

  if (vitals.heartRate) {
    if (vitals.heartRate < VitalsNormalRanges.heartRateBpm.min || vitals.heartRate > VitalsNormalRanges.heartRateBpm.max) {
      warnings.push(`Heart rate ${vitals.heartRate} bpm is outside normal range.`);
    }
  }

  if (vitals.oxygenSaturation) {
    if (vitals.oxygenSaturation < VitalsNormalRanges.oxygenSaturationPercent.min) {
      warnings.push(`Oxygen saturation ${vitals.oxygenSaturation}% is below normal range.`);
    }
  }

  return { isValid: warnings.length === 0, warnings };
};
