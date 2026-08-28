/**
 * @file insurance-plans.ts
 * @description Typed array of insurance plans for the Healthcare Appointment Management System.
 */

export interface IInsurancePlan {
  id: string;
  providerName: string;
  planName: string;
  planType: 'HMO' | 'PPO' | 'EPO' | 'POS' | 'HDHP';
  monthlyPremium: number;
  annualDeductible: number;
  outOfPocketMax: number;
  copay: { primaryCare: number; specialist: number; urgentCare: number; emergency: number };
  coinsurance: number; // Percentage the patient pays
  coverageDetails: { preventiveCare: boolean; mentalHealth: boolean; prescription: boolean; dental: boolean; vision: boolean; telehealth: boolean };
  network: string;
  stateAvailability: string[];
}

export const INSURANCE_PLANS: IInsurancePlan[] = [
  {
    id: 'INS001',
    providerName: 'Blue Cross Blue Shield',
    planName: 'BCBS Bronze HMO',
    planType: 'HMO',
    monthlyPremium: 350.00,
    annualDeductible: 6500.00,
    outOfPocketMax: 8500.00,
    copay: { primaryCare: 40, specialist: 80, urgentCare: 75, emergency: 500 },
    coinsurance: 40,
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: false, vision: false, telehealth: true },
    network: 'BlueCare Network',
    stateAvailability: ['NY', 'CA', 'TX', 'IL']
  },
  {
    id: 'INS002',
    providerName: 'UnitedHealthcare',
    planName: 'UHC Choice Plus PPO',
    planType: 'PPO',
    monthlyPremium: 550.00,
    annualDeductible: 2000.00,
    outOfPocketMax: 6000.00,
    copay: { primaryCare: 25, specialist: 50, urgentCare: 50, emergency: 300 },
    coinsurance: 20,
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: true, vision: true, telehealth: true },
    network: 'UHC Choice Plus',
    stateAvailability: ['National']
  },
  {
    id: 'INS003',
    providerName: 'Aetna',
    planName: 'Aetna Silver POS',
    planType: 'POS',
    monthlyPremium: 420.00,
    annualDeductible: 4000.00,
    outOfPocketMax: 7000.00,
    copay: { primaryCare: 30, specialist: 60, urgentCare: 60, emergency: 400 },
    coinsurance: 30,
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: false, vision: true, telehealth: true },
    network: 'Aetna Open Access',
    stateAvailability: ['FL', 'GA', 'TX', 'NC', 'SC']
  },
  {
    id: 'INS004',
    providerName: 'Cigna',
    planName: 'Cigna Connect EPO',
    planType: 'EPO',
    monthlyPremium: 380.00,
    annualDeductible: 5500.00,
    outOfPocketMax: 8000.00,
    copay: { primaryCare: 35, specialist: 75, urgentCare: 70, emergency: 450 },
    coinsurance: 30,
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: false, vision: false, telehealth: true },
    network: 'Cigna Connect',
    stateAvailability: ['AZ', 'CO', 'FL', 'IL', 'KS', 'MO', 'TN', 'TX', 'VA']
  },
  {
    id: 'INS005',
    providerName: 'Kaiser Permanente',
    planName: 'Kaiser Gold HMO',
    planType: 'HMO',
    monthlyPremium: 490.00,
    annualDeductible: 1000.00,
    outOfPocketMax: 4500.00,
    copay: { primaryCare: 20, specialist: 40, urgentCare: 40, emergency: 250 },
    coinsurance: 15,
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: true, vision: true, telehealth: true },
    network: 'Kaiser Network',
    stateAvailability: ['CA', 'OR', 'WA', 'HI', 'CO', 'MD', 'VA', 'GA']
  },
  {
    id: 'INS006',
    providerName: 'Humana',
    planName: 'Humana HDHP Bronze',
    planType: 'HDHP',
    monthlyPremium: 280.00,
    annualDeductible: 7000.00,
    outOfPocketMax: 7000.00,
    copay: { primaryCare: 0, specialist: 0, urgentCare: 0, emergency: 0 },
    coinsurance: 0, // After deductible is met, coverage is 100%
    coverageDetails: { preventiveCare: true, mentalHealth: true, prescription: true, dental: false, vision: false, telehealth: true },
    network: 'Humana National',
    stateAvailability: ['National']
  }
];
