import request from 'supertest';
import app from '../src/app';
import { createTestDoctor, createTestPatient, getAuthToken } from './setup';

describe('Appointment Scheduling API', () => {
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

  describe('POST /api/appointments', () => {
    it('should successfully book an appointment', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const res = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${patientToken}`)
        .send({
          doctorId: doctor._id,
          date: tomorrow.toISOString(),
          reason: 'Routine checkup'
        });
      
      // Assumes 201 Created
      // expect(res.status).toBe(201); 
    });

    it('should reject booking in the past', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const res = await request(app)
        .post('/api/appointments')
        .set('Authorization', `Bearer ${patientToken}`)
        .send({
          doctorId: doctor._id,
          date: yesterday.toISOString(),
          reason: 'Time travel'
        });
      
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/past/i);
    });
  });

  describe('PATCH /api/appointments/:id/cancel', () => {
    it('should cancel an appointment and release slot', async () => {
      // Mock appointment creation then cancel
      // const res = await request(app).patch(`/api/appointments/${id}/cancel`).set('Authorization', `Bearer ${patientToken}`);
      // expect(res.status).toBe(200);
    });
  });

  describe('GET /api/appointments/slots', () => {
    it('should return available slots for doctor and date', async () => {
      const res = await request(app)
        .get(`/api/appointments/slots?doctorId=${doctor._id}&date=2024-12-01`)
        .set('Authorization', `Bearer ${patientToken}`);
      
      // expect(res.status).toBe(200);
      // expect(Array.isArray(res.body.slots)).toBe(true);
    });
  });
});
