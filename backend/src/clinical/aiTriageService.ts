export interface TriagePatientVitals {
  heartRate: number; // bpm
  systolicBP: number; // mmHg
  diastolicBP: number; // mmHg
  respiratoryRate: number; // breaths/min
  temperatureC: number; // Celsius
  oxygenSaturation: number; // % SpO2
  painScore: number; // 0-10
  glasgowComaScale?: number; // 3-15
}

export interface TriageEvaluationRequest {
  patientId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  chiefComplaint: string;
  symptoms: string[];
  symptomDurationHours: number;
  vitals: TriagePatientVitals;
  preExistingConditions?: string[];
  currentMedications?: string[];
  pregnancyStatus?: boolean;
}

export type AcuityLevel = 'ESI-1' | 'ESI-2' | 'ESI-3' | 'ESI-4' | 'ESI-5';

export interface TriageRecommendation {
  acuityLevel: AcuityLevel;
  severityScore: number; // 0 - 100
  urgency: 'immediate' | 'emergent' | 'urgent' | 'semi-urgent' | 'non-urgent';
  recommendedDepartment: string;
  suggestedClinicalPathway: string[];
  vitalRiskFlags: string[];
  differentialDiagnoses: { condition: string; confidence: number }[];
  requiresImmediateResuscitation: boolean;
  recommendedDiagnosticTests: string[];
  timestamp: string;
}

export class AITriageService {
  /**
   * Evaluates patient triage acuity using Emergency Severity Index (ESI) algorithms
   * and clinical risk heuristics.
   */
  public static evaluateTriage(request: TriageEvaluationRequest): TriageRecommendation {
    const riskFlags: string[] = [];
    let severityScore = 20; // baseline

    // 1. Vital Sign Assessment (ESI Level 1 & 2 Triggers)
    const { vitals } = request;
    let isESI1 = false;
    let isESI2 = false;

    // Resuscitation indicators
    if (vitals.oxygenSaturation < 88) {
      riskFlags.push('Critical Hypoxia: SpO2 < 88%');
      isESI1 = true;
      severityScore += 45;
    } else if (vitals.oxygenSaturation < 92) {
      riskFlags.push('Moderate Hypoxemia: SpO2 < 92%');
      severityScore += 25;
    }

    if (vitals.systolicBP < 85 || vitals.systolicBP > 200) {
      riskFlags.push(`Extreme Blood Pressure: ${vitals.systolicBP}/${vitals.diastolicBP} mmHg`);
      isESI2 = true;
      severityScore += 30;
    }

    if (vitals.heartRate > 130 || vitals.heartRate < 45) {
      riskFlags.push(`Severe Heart Rate Deviation: ${vitals.heartRate} bpm`);
      isESI2 = true;
      severityScore += 25;
    }

    if (vitals.respiratoryRate > 30 || vitals.respiratoryRate < 9) {
      riskFlags.push(`Abnormal Respiratory Rate: ${vitals.respiratoryRate} bpm`);
      isESI2 = true;
      severityScore += 20;
    }

    if (vitals.glasgowComaScale && vitals.glasgowComaScale < 12) {
      riskFlags.push(`Altered Mental State: GCS ${vitals.glasgowComaScale}`);
      isESI1 = true;
      severityScore += 40;
    }

    // High pain score consideration
    if (vitals.painScore >= 8) {
      riskFlags.push(`Severe Acute Pain: Score ${vitals.painScore}/10`);
      severityScore += 15;
    }

    // 2. High-Risk Chief Complaint Matching
    const complaintLower = request.chiefComplaint.toLowerCase();
    const symptomsLower = request.symptoms.map(s => s.toLowerCase());

    const highRiskKeywords = ['chest pain', 'shortness of breath', 'anaphylaxis', 'stroke', 'unconscious', 'severe trauma'];
    const hasHighRiskKeyword = highRiskKeywords.some(k => complaintLower.includes(k) || symptomsLower.some(s => s.includes(k)));

    if (hasHighRiskKeyword) {
      isESI2 = true;
      severityScore += 25;
      riskFlags.push('High-risk presentation triggered by chief complaint keywords');
    }

    // 3. Determine Acuity Level
    let acuityLevel: AcuityLevel;
    let urgency: TriageRecommendation['urgency'];

    if (isESI1) {
      acuityLevel = 'ESI-1';
      urgency = 'immediate';
      severityScore = Math.max(90, Math.min(100, severityScore));
    } else if (isESI2 || severityScore >= 65) {
      acuityLevel = 'ESI-2';
      urgency = 'emergent';
      severityScore = Math.max(70, Math.min(89, severityScore));
    } else if (severityScore >= 45 || request.symptoms.length >= 3) {
      acuityLevel = 'ESI-3';
      urgency = 'urgent';
      severityScore = Math.max(45, Math.min(69, severityScore));
    } else if (severityScore >= 30) {
      acuityLevel = 'ESI-4';
      urgency = 'semi-urgent';
      severityScore = Math.max(25, Math.min(44, severityScore));
    } else {
      acuityLevel = 'ESI-5';
      urgency = 'non-urgent';
      severityScore = Math.max(5, Math.min(24, severityScore));
    }

    // 4. Clinical Pathways & Recommendations
    const suggestedClinicalPathway: string[] = [];
    const recommendedDiagnosticTests: string[] = [];
    const differentialDiagnoses: { condition: string; confidence: number }[] = [];

    if (complaintLower.includes('chest') || complaintLower.includes('cardiac')) {
      suggestedClinicalPathway.push('Acute Coronary Syndrome (ACS) Protocol');
      recommendedDiagnosticTests.push('12-Lead ECG within 10 mins', 'Troponin-I serial markers', 'Chest X-Ray (portable)');
      differentialDiagnoses.push({ condition: 'Acute Myocardial Infarction', confidence: 0.78 });
      differentialDiagnoses.push({ condition: 'Costochondritis', confidence: 0.15 });
    } else if (complaintLower.includes('breath') || complaintLower.includes('respiratory') || vitals.oxygenSaturation < 92) {
      suggestedClinicalPathway.push('Acute Respiratory Distress Pathway');
      recommendedDiagnosticTests.push('Arterial Blood Gas (ABG)', 'Continuous Pulse Oximetry', 'Chest Computed Tomography (CT)');
      differentialDiagnoses.push({ condition: 'Exacerbation of COPD/Asthma', confidence: 0.65 });
      differentialDiagnoses.push({ condition: 'Pulmonary Embolism', confidence: 0.35 });
    } else {
      suggestedClinicalPathway.push('Standard Ambulatory Care Pathway');
      recommendedDiagnosticTests.push('Complete Blood Count (CBC)', 'Basic Metabolic Panel (BMP)');
      differentialDiagnoses.push({ condition: 'General Viral/Bacterial Syndrome', confidence: 0.85 });
    }

    let recommendedDepartment = 'Emergency Medicine';
    if (acuityLevel === 'ESI-4' || acuityLevel === 'ESI-5') {
      recommendedDepartment = 'Fast Track / Urgent Care Clinic';
    }

    return {
      acuityLevel,
      severityScore,
      urgency,
      recommendedDepartment,
      suggestedClinicalPathway,
      vitalRiskFlags: riskFlags,
      differentialDiagnoses,
      requiresImmediateResuscitation: isESI1,
      recommendedDiagnosticTests,
      timestamp: new Date().toISOString(),
    };
  }
}
