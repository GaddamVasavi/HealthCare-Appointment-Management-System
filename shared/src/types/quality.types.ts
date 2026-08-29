/**
 * MediCare Connect - Shared Quality Measures & Regulatory Compliance Types
 */

export interface MIPSQualityReport {
  reportingYear: number;
  tin: string; // Tax ID Number
  npi: string;
  qualityScore: number;
  promotingInteroperabilityScore: number;
  improvementActivitiesScore: number;
  costScore: number;
  finalCompositeScore: number;
  paymentAdjustmentPercent: number;
}

export interface AuditTrailSummary {
  totalEventsLogged: number;
  cryptographicVerificationStatus: 'VALID' | 'TAMPERED';
  anomalousAccessCount: number;
  lastVerifiedTimestamp: string;
}
