/**
 * MediCare Connect - Remote Patient Monitoring (RPM) Device Ingest Service
 * Ingests continuous telemetry streams from Bluetooth / Cellular IoT medical devices:
 * - Continuous Glucose Monitors (CGM)
 * - Pulse Oximeters
 * - Blood Pressure Cuffs
 * - Weight Scales
 * - Spirometers
 */

export interface DeviceTelemetryReading {
  deviceId: string;
  deviceType: 'CGM' | 'PULSE_OX' | 'BP_CUFF' | 'WEIGHT_SCALE' | 'SPIROMETER';
  patientId: string;
  timestamp: string;
  metrics: {
    glucoseMgDl?: number;
    systolicBpMmHg?: number;
    diastolicBpMmHg?: number;
    pulseBpm?: number;
    spo2Percent?: number;
    weightLbs?: number;
    fev1Liters?: number;
  };
  batteryLevelPercent?: number;
}

export class RemoteMonitoringIngest {
  public static ingestReading(reading: DeviceTelemetryReading): {
    success: boolean;
    isCriticalAnomaly: boolean;
    alertMessage?: string;
  } {
    let critical = false;
    let alertMsg: string | undefined;

    if (reading.metrics.glucoseMgDl !== undefined) {
      if (reading.metrics.glucoseMgDl < 55) {
        critical = true;
        alertMsg = `CRITICAL HYPOGLYCEMIA: Glucose ${reading.metrics.glucoseMgDl} mg/dL reported for patient ${reading.patientId}.`;
      } else if (reading.metrics.glucoseMgDl > 350) {
        critical = true;
        alertMsg = `CRITICAL HYPERGLYCEMIA: Glucose ${reading.metrics.glucoseMgDl} mg/dL reported.`;
      }
    }

    if (reading.metrics.spo2Percent !== undefined && reading.metrics.spo2Percent < 88) {
      critical = true;
      alertMsg = `CRITICAL DESATURATION: SpO2 ${reading.metrics.spo2Percent}% on room air.`;
    }

    return {
      success: true,
      isCriticalAnomaly: critical,
      alertMessage: alertMsg,
    };
  }
}
