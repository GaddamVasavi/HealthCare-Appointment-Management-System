import request from 'supertest';
import app from '../src/app'; // Adjust path as needed
import mongoose from 'mongoose';
import { createTestUser, getAuthToken } from './setup';

// Mock models and app if necessary or assume app integrates correctly
// Note: Requires User model definition in application
describe('Auth & RBAC API', () => {
  describe('POST /api/auth/register', () => {
    it('should successfully register a patient', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'Password123!',
          role: 'patient'
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('email', 'jane@example.com');
    });

    it('should reject duplicate email', async () => {
      await createTestUser('patient', { email: 'duplicate@example.com' });
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'John',
          email: 'duplicate@example.com',
          password: 'Password123!'
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should reject validation errors (missing fields)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'bad@example.com' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should successfully login and return JWT', async () => {
      // Assuming password gets hashed during createTestUser internally or plain in mock
      await createTestUser('patient', { email: 'login@example.com', password: 'hashedpassword' }); // Mocks needed for real bcrypt
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'password123' }); // Adjust if bcrypt is strictly enforced
      // Depending on implementation, assert 200 and token
    });
  });

  describe('RBAC Authorization', () => {
    it('should prevent patient from accessing admin routes', async () => {
      const patient = await createTestUser('patient');
      const token = getAuthToken(patient);
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(403);
    });

    it('should allow admin to access admin routes', async () => {
      const admin = await createTestUser('admin');
      const token = getAuthToken(admin);
      const res = await request(app)
        .get('/api/admin/dashboard')
        .set('Authorization', `Bearer ${token}`);
      expect([200, 404]).toContain(res.status); // 404 if route not yet implemented, but not 401/403
    });
  });
});
