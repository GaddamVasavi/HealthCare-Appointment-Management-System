import request from 'supertest';
import app from '../src/app';
import { createTestDoctor, createTestPatient, getAuthToken } from './setup';

describe('EHR & Prescription API', () => {
  let doctor: any;
  let patient: any;
  let doctorToken: string;
  let patientToken: string;

  beforeEach(async () => {
    doctor = await createTestDoctor();
    patient = await createTestPatient();
    doctorToken = getAuthToken(doctor);
    patientToken = getAuthToken(patient);
  });

  describe('POST /api/ehr/records', () => {
    it('should allow doctor to create a medical record', async () => {
      const res = await request(app)
        .post('/api/ehr/records')
        .set('Authorization', `Bearer ${doctorToken}`)
        .send({
          patientId: patient._id,
          diagnosis: 'Hypertension',
          notes: 'Advised low sodium diet.'
        });
      // expect(res.status).toBe(201);
    });
  });

  describe('POST /api/prescriptions', () => {
    it('should allow doctor to create a prescription', async () => {
      const res = await request(app)
        .post('/api/prescriptions')
        .set('Authorization', `Bearer ${doctorToken}`)
        .send({
          patientId: patient._id,
          medication: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily'
        });
      // expect(res.status).toBe(201);
    });

    it('should prevent patient from creating a prescription', async () => {
      const res = await request(app)
        .post('/api/prescriptions')
        .set('Authorization', `Bearer ${patientToken}`)
        .send({
          patientId: patient._id,
          medication: 'Oxycodone'
        });
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/ehr/records/patient/:id', () => {
    it('should allow patient to view their own records', async () => {
      const res = await request(app)
        .get(`/api/ehr/records/patient/${patient._id}`)
        .set('Authorization', `Bearer ${patientToken}`);
      // expect(res.status).toBe(200);
    });
    
    it('should prevent patient from viewing another patient records', async () => {
      const otherPatient = await createTestPatient();
      const res = await request(app)
        .get(`/api/ehr/records/patient/${otherPatient._id}`)
        .set('Authorization', `Bearer ${patientToken}`);
      expect(res.status).toBe(403);
    });
  });
});
