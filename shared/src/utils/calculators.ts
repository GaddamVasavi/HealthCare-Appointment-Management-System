/**
 * @fileoverview Medical calculators.
 */

/**
 * Calculates Body Mass Index (BMI).
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BMI value
 */
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
};

/**
 * Calculates Body Surface Area (BSA) using Mosteller formula.
 * @param weightKg Weight in kilograms
 * @param heightCm Height in centimeters
 * @returns BSA in square meters
 */
export const calculateBSA = (weightKg: number, heightCm: number): number => {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  return Number(Math.sqrt((weightKg * heightCm) / 3600).toFixed(2));
};

/**
 * Calculates Estimated Glomerular Filtration Rate (eGFR) using CKD-EPI equation.
 * Simplified version.
 */
export const calculateEGFR = (creatinineMgDl: number, age: number, isFemale: boolean, isBlack: boolean = false): number => {
  if (creatinineMgDl <= 0 || age <= 0) return 0;
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.329 : -0.411;
  const scrKappa = creatinineMgDl / kappa;
  
  let egfr = 141 * Math.pow(Math.min(scrKappa, 1), alpha) * 
             Math.pow(Math.max(scrKappa, 1), -1.209) * 
             Math.pow(0.993, age);
             
  if (isFemale) egfr *= 1.018;
  if (isBlack) egfr *= 1.159; // Note: Race multiplier is controversial and often removed in modern clinical practice
  
  return Number(egfr.toFixed(1));
};
