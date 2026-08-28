import request from 'supertest';
import app from '../src/app';
import { createTestUser, getAuthToken } from './setup';

describe('Health & Status API', () => {
  it('GET /api/health should return 200 OK with status UP', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  it('GET /api/health should include timestamp and version', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('version');
  });

  it('GET /api/health response time should be under threshold', async () => {
    const start = Date.now();
    await request(app).get('/api/health');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(200); // 200ms threshold
  });
});
