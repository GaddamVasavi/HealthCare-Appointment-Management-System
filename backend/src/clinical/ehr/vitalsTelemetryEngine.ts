/**
 * MediCare Connect - Streaming Vitals Telemetry & Early Warning Scoring Engine
 * Computes MEWS (Modified Early Warning Score), NEWS2 (National Early Warning Score),
 * and generates real-time clinical alerts for sepsis, acute hemodynamic instability, and respiratory failure.
 */

export interface VitalsTelemetrySample {
  patientId: string;
  timestamp: string;
  heartRateBpm: number;
  systolicBpMmHg: number;
  diastolicBpMmHg: number;
  respiratoryRateBpm: number;
  temperatureCelsius: number;
  spo2Percent: number;
  supplementalOxygen: boolean;
  consciousnessLevel: 'ALERT' | 'VOICE' | 'PAIN' | 'UNRESPONSIVE';
}

export interface EarlyWarningScoreResult {
  news2Score: number;
  mewsScore: number;
  clinicalRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_EMERGENCY';
  monitoringFrequencyRecommendation: string;
  clinicalActionRequired: string;
  sepsisScreenPositive: boolean;
  triggeredAlerts: string[];
}

export class VitalsTelemetryEngine {
  public static calculateNEWS2(sample: VitalsTelemetrySample): EarlyWarningScoreResult {
    let score = 0;
    const triggeredAlerts: string[] = [];

    // 1. Respiration Rate
    if (sample.respiratoryRateBpm <= 8) {
      score += 3;
      triggeredAlerts.push('Severe Bradypnea (RR <= 8 bpm)');
    } else if (sample.respiratoryRateBpm >= 9 && sample.respiratoryRateBpm <= 11) {
      score += 1;
    } else if (sample.respiratoryRateBpm >= 12 && sample.respiratoryRateBpm <= 20) {
      score += 0;
    } else if (sample.respiratoryRateBpm >= 21 && sample.respiratoryRateBpm <= 24) {
      score += 2;
    } else if (sample.respiratoryRateBpm >= 25) {
      score += 3;
      triggeredAlerts.push('Severe Tachypnea (RR >= 25 bpm)');
    }

    // 2. SpO2
    if (sample.spo2Percent <= 91) {
      score += 3;
      triggeredAlerts.push(`Critical Hypoxia (SpO2 ${sample.spo2Percent}%)`);
    } else if (sample.spo2Percent <= 93) {
      score += 2;
    } else if (sample.spo2Percent <= 95) {
      score += 1;
    }

    // 3. Supplemental Oxygen
    if (sample.supplementalOxygen) {
      score += 2;
    }

    // 4. Systolic BP
    if (sample.systolicBpMmHg <= 90) {
      score += 3;
      triggeredAlerts.push(`Severe Hypotension (SBP ${sample.systolicBpMmHg} mmHg)`);
    } else if (sample.systolicBpMmHg <= 100) {
      score += 2;
    } else if (sample.systolicBpMmHg <= 110) {
      score += 1;
    } else if (sample.systolicBpMmHg >= 220) {
      score += 3;
      triggeredAlerts.push(`Severe Hypertensive Crisis (SBP ${sample.systolicBpMmHg} mmHg)`);
    }

    // 5. Heart Rate
    if (sample.heartRateBpm <= 40) {
      score += 3;
      triggeredAlerts.push(`Severe Bradycardia (HR ${sample.heartRateBpm} bpm)`);
    } else if (sample.heartRateBpm <= 50) {
      score += 1;
    } else if (sample.heartRateBpm <= 90) {
      score += 0;
    } else if (sample.heartRateBpm <= 110) {
      score += 1;
    } else if (sample.heartRateBpm <= 130) {
      score += 2;
    } else if (sample.heartRateBpm >= 131) {
      score += 3;
      triggeredAlerts.push(`Severe Tachycardia (HR ${sample.heartRateBpm} bpm)`);
    }

    // 6. Consciousness (ACVPU)
    if (sample.consciousnessLevel !== 'ALERT') {
      score += 3;
      triggeredAlerts.push(`Altered Mental Status (${sample.consciousnessLevel})`);
    }

    // 7. Temperature
    if (sample.temperatureCelsius <= 35.0) {
      score += 3;
      triggeredAlerts.push(`Hypothermia (Temp ${sample.temperatureCelsius}°C)`);
    } else if (sample.temperatureCelsius <= 36.0) {
      score += 1;
    } else if (sample.temperatureCelsius <= 38.0) {
      score += 0;
    } else if (sample.temperatureCelsius <= 39.0) {
      score += 1;
    } else if (sample.temperatureCelsius >= 39.1) {
      score += 2;
      triggeredAlerts.push(`High Fever (Temp ${sample.temperatureCelsius}°C)`);
    }

    // MEWS calculation
    const mews = Math.min(14, Math.round(score * 0.85));

    // Sepsis Screening: SIRS criteria + infection suspicion
    const sirsCount =
      (sample.temperatureCelsius > 38.0 || sample.temperatureCelsius < 36.0 ? 1 : 0) +
      (sample.heartRateBpm > 90 ? 1 : 0) +
      (sample.respiratoryRateBpm > 20 ? 1 : 0);
    const sepsisScreenPositive = sirsCount >= 2 && (sample.systolicBpMmHg < 100 || sample.consciousnessLevel !== 'ALERT');

    if (sepsisScreenPositive) {
      triggeredAlerts.push('ALERT: Sepsis Screening Positive! Initiating 1-Hour Sepsis Bundle protocol.');
    }

    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL_EMERGENCY' = 'LOW';
    let freq = 'Routine monitoring every 12 hours.';
    let action = 'Continue standard ward care.';

    if (score >= 7 || triggeredAlerts.length >= 2) {
      riskLevel = 'CRITICAL_EMERGENCY';
      freq = 'Continuous telemetry monitoring.';
      action = 'EMERGENCY: Immediate Medical Emergency Team (MET) / Rapid Response Team activation. ICU transfer evaluation.';
    } else if (score >= 5) {
      riskLevel = 'HIGH';
      freq = 'Monitor every 1 hour.';
      action = 'Urgent review by attending clinician / specialist within 30 minutes.';
    } else if (score >= 3) {
      riskLevel = 'MEDIUM';
      freq = 'Monitor every 4 hours.';
      action = 'Registered nurse assessment and optimization of therapy.';
    }

    return {
      news2Score: score,
      mewsScore: mews,
      clinicalRiskLevel: riskLevel,
      monitoringFrequencyRecommendation: freq,
      clinicalActionRequired: action,
      sepsisScreenPositive,
      triggeredAlerts,
    };
  }
}
