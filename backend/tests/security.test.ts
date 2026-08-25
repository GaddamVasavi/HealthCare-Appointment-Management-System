/// <reference types="jest" />

import {
  comparePassword,
  hashPassword,
  validatePasswordStrength,
} from '../src/utils/password.util';
import {
  generateTokenPair,
  verifyAccessToken,
  verifyRefreshToken,
} from '../src/utils/jwt.util';

describe('security utilities', () => {
  it('accepts a strong password', () => {
    expect(validatePasswordStrength('Secure!Pass123').isValid).toBe(true);
  });

  it('rejects a weak password with actionable errors', () => {
    const result = validatePasswordStrength('password');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password must contain at least one uppercase letter');
  });

  it('hashes passwords without retaining the original value', async () => {
    const hash = await hashPassword('Secure!Pass123');
    expect(hash).not.toBe('Secure!Pass123');
    await expect(comparePassword('Secure!Pass123', hash)).resolves.toBe(true);
    await expect(comparePassword('Wrong!Pass123', hash)).resolves.toBe(false);
  });

  it('creates and verifies access and refresh tokens', () => {
    const tokens = generateTokenPair({ id: 'user-1', email: 'patient@example.com', role: 'patient' });
    expect(verifyAccessToken(tokens.accessToken)).toMatchObject({ id: 'user-1', type: 'access' });
    expect(verifyRefreshToken(tokens.refreshToken)).toMatchObject({ id: 'user-1', type: 'refresh' });
  });

  it('rejects a refresh token as an access token', () => {
    const tokens = generateTokenPair({ id: 'user-1', email: 'patient@example.com', role: 'patient' });
    expect(() => verifyAccessToken(tokens.refreshToken)).toThrow('Invalid or expired access token');
  });
});
