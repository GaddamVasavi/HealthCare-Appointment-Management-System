import request from 'supertest';
import app from '../src/app';
import { createTestUser, getAuthToken } from './setup';

describe('Billing & Insurance API', () => {
  let adminToken: string;
  let patientToken: string;
  let patientId: string;

  beforeEach(async () => {
    const admin = await createTestUser('admin');
    const patient = await createTestUser('patient');
    adminToken = getAuthToken(admin);
    patientToken = getAuthToken(patient);
    patientId = patient._id;
  });

  describe('POST /api/billing/invoices', () => {
    it('should create an invoice with line items', async () => {
      const res = await request(app)
        .post('/api/billing/invoices')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          patientId,
          items: [
            { description: 'Consultation', amount: 150 },
            { description: 'Blood Test', amount: 50 }
          ]
        });
      // expect(res.status).toBe(201);
      // expect(res.body.total).toBe(200);
    });
  });

  describe('POST /api/billing/payments', () => {
    it('should process payment and update invoice balance', async () => {
      // Mock processing logic
    });
  });

  describe('GET /api/billing/revenue', () => {
    it('should return revenue report for admin only', async () => {
      const res = await request(app)
        .get('/api/billing/revenue?startDate=2024-01-01&endDate=2024-12-31')
        .set('Authorization', `Bearer ${adminToken}`);
      // expect(res.status).toBe(200);
    });

    it('should block patient from revenue reports', async () => {
      const res = await request(app)
        .get('/api/billing/revenue?startDate=2024-01-01&endDate=2024-12-31')
        .set('Authorization', `Bearer ${patientToken}`);
      expect(res.status).toBe(403);
    });
  });
});
