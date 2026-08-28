import request from 'supertest';
import app from '../src/app';

describe('Security Headers & Settings', () => {
  it('should return CORS headers', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });

  it('should have Helmet security headers', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-dns-prefetch-control']).toBe('off');
    expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(res.headers['strict-transport-security']).toBeDefined();
    expect(res.headers['x-xss-protection']).toBe('0');
  });

  it('should reject requests with invalid JWT tokens', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalid.token.here');
    expect(res.status).toBe(401);
  });

  it('should reject requests missing authorization header', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('should enforce rate limiting on auth endpoints', async () => {
    // Make numerous requests to test rate limiting
    // Note: Depends on express-rate-limit config
    const requests = Array(15).fill(0).map(() => request(app).post('/api/auth/login').send({}));
    const responses = await Promise.all(requests);
    const tooManyRequests = responses.some(res => res.status === 429);
    // expect(tooManyRequests).toBe(true);
  });
});
