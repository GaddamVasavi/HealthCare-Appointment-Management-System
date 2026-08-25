/// <reference types="jest" />

import request from 'supertest';
import app from '../src/app';

describe('health endpoint', () => {
  it('reports that the API is available', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      service: 'medicare-connect-api',
      status: 'ok',
    });
  });

  it('protects appointment resources from anonymous requests', async () => {
    const response = await request(app).get('/api/appointments');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ success: false });
  });

  it('protects administrator reports from anonymous requests', async () => {
    const response = await request(app).get('/api/admin/reports/overview');
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ success: false });
  });

  it('rejects appointment intervals that end before they start', async () => {
    const response = await request(app).post('/api/appointments').send({
      doctor: '507f1f77bcf86cd799439011',
      date: '2030-08-25',
      startTime: '14:00',
      endTime: '13:00',
      reason: 'Routine consultation',
    });
    expect(response.status).toBe(401);
  });
});
