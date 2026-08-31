import { AITriageService, TriageEvaluationRequest } from '../src/clinical/aiTriageService';
import { FHIRGatewayService, PatientEHRRecord } from '../src/interoperability/fhirGatewayService';
import { FieldEncryptionService } from '../src/compliance/fieldEncryptionService';
import { SessionRoomService } from '../src/telehealth/sessionRoomService';

describe('Clinical & Interoperability Test Suite', () => {
  describe('AITriageService', () => {
    it('should assign ESI-1 for critical hypoxia', () => {
      const request: TriageEvaluationRequest = {
        patientId: 'pat-001',
        age: 58,
        gender: 'male',
        chiefComplaint: 'Severe shortness of breath and cyanosis',
        symptoms: ['Chest tightness', 'Hypoxia'],
        symptomDurationHours: 1,
        vitals: {
          heartRate: 135,
          systolicBP: 80,
          diastolicBP: 50,
          respiratoryRate: 34,
          temperatureC: 38.5,
          oxygenSaturation: 84, // critical hypoxia
          painScore: 9,
        },
      };

      const result = AITriageService.evaluateTriage(request);
      expect(result.acuityLevel).toBe('ESI-1');
      expect(result.requiresImmediateResuscitation).toBe(true);
      expect(result.vitalRiskFlags.length).toBeGreaterThan(0);
    });

    it('should assign ESI-4/5 for non-urgent mild symptoms', () => {
      const request: TriageEvaluationRequest = {
        patientId: 'pat-002',
        age: 24,
        gender: 'female',
        chiefComplaint: 'Mild sore throat',
        symptoms: ['Cough'],
        symptomDurationHours: 48,
        vitals: {
          heartRate: 72,
          systolicBP: 118,
          diastolicBP: 76,
          respiratoryRate: 16,
          temperatureC: 37.0,
          oxygenSaturation: 99,
          painScore: 2,
        },
      };

      const result = AITriageService.evaluateTriage(request);
      expect(['ESI-4', 'ESI-5']).toContain(result.acuityLevel);
      expect(result.requiresImmediateResuscitation).toBe(false);
    });
  });

  describe('FHIRGatewayService', () => {
    it('should generate valid FHIR R4 Patient resource', () => {
      const patient: PatientEHRRecord = {
        patientId: 'pat-999',
        firstName: 'Jane',
        lastName: 'Doe',
        birthDate: '1990-05-15',
        gender: 'female',
        phone: '+1-555-0199',
        email: 'jane.doe@example.com',
      };

      const resource = FHIRGatewayService.convertPatientToFHIR(patient);
      expect(resource.resourceType).toBe('Patient');
      expect(resource.id).toBe('pat-999');
      expect(resource.name[0].family).toBe('Doe');
    });

    it('should generate multi-resource collection bundle', () => {
      const patient: PatientEHRRecord = {
        patientId: 'pat-888',
        firstName: 'John',
        lastName: 'Smith',
        birthDate: '1985-03-20',
        gender: 'male',
        conditions: [{ code: '38341003', display: 'Hypertension', recordedDate: '2026-01-10' }],
        observations: [{ code: '8867-4', display: 'Heart Rate', value: 78, unit: 'bpm', effectiveDateTime: '2026-08-31' }],
      };

      const bundle = FHIRGatewayService.buildPatientEncounterBundle(patient, 'enc-1234');
      expect(bundle.resourceType).toBe('Bundle');
      expect(bundle.total).toBe(4); // Patient, Encounter, Condition, Observation
    });
  });

  describe('FieldEncryptionService', () => {
    it('should encrypt and decrypt PHI accurately', () => {
      const ssn = '123-45-6789';
      const encrypted = FieldEncryptionService.encryptPHI(ssn);
      expect(encrypted).not.toBe(ssn);
      expect(encrypted).toContain(':');

      const decrypted = FieldEncryptionService.decryptPHI(encrypted);
      expect(decrypted).toBe(ssn);
    });

    it('should correctly mask SSN strings', () => {
      expect(FieldEncryptionService.maskSSN('123-45-6789')).toBe('***-**-6789');
    });
  });

  describe('SessionRoomService', () => {
    it('should manage telehealth consultation lifecycle', () => {
      const room = SessionRoomService.createRoom('appt-100', 'doc-1', 'pat-1');
      expect(room.status).toBe('scheduled');

      const joinedRoom = SessionRoomService.joinRoom(room.roomId, 'doc-1', 'doctor');
      expect(joinedRoom.status).toBe('active');

      SessionRoomService.appendConsultationNote(room.roomId, 'Patient prescribed 500mg Amoxicillin');
      const completedRoom = SessionRoomService.completeRoom(room.roomId, 'https://s3.storage/recordings/rec-1.mp4');
      expect(completedRoom.status).toBe('completed');
      expect(completedRoom.consultationNotes.length).toBe(1);
    });
  });
});
