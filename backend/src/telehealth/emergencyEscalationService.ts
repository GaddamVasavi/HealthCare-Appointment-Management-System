/**
 * MediCare Connect - Telehealth Emergency Protocol & 911 Dispatch Payload Generator
 */

export interface EmergencyDispatchPayload {
  incidentId: string;
  patientId: string;
  patientName: string;
  physicalLocationAddress: string;
  emergencyContactPhone: string;
  chiefClinicalComplaint: string;
  vitalsSummary: string;
  reportedTimestamp: string;
  dispatchCadSystem: string;
}

export class EmergencyEscalationService {
  public static generateEmergencyCADPayload(patient: any, clinicalSummary: string): EmergencyDispatchPayload {
    return {
      incidentId: `CAD-911-${Date.now()}`,
      patientId: patient._id?.toString() || patient.id || 'PT-UNKNOWN',
      patientName: `${patient.firstName || ''} ${patient.lastName || ''}`,
      physicalLocationAddress: `${patient.address?.street || '123 Main St'}, ${patient.address?.city || 'Metropolis'}, ${patient.address?.state || 'NY'} ${patient.address?.zipCode || '10001'}`,
      emergencyContactPhone: patient.emergencyContact?.phone || patient.phone || '911',
      chiefClinicalComplaint: clinicalSummary,
      vitalsSummary: 'Unstable physiological status during telehealth consultation.',
      reportedTimestamp: new Date().toISOString(),
      dispatchCadSystem: 'E-911 NG-CAD Gateway v4',
    };
  }
}
