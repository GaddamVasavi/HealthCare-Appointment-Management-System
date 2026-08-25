import jwt from 'jsonwebtoken';
import config from '../config';

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
  iat?: number;
  exp?: number;
}

export const generateAccessToken = (payload: Omit<TokenPayload, 'type'>): string => {
  return jwt.sign(
    { ...payload, type: 'access' },
    config.jwtSecret,
    { expiresIn: config.jwtExpire as jwt.SignOptions['expiresIn'] }
  );
};

export const generateRefreshToken = (payload: Omit<TokenPayload, 'type'>): string => {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    config.jwtRefreshSecret,
    { expiresIn: config.jwtRefreshExpire as jwt.SignOptions['expiresIn'] }
  );
};

export const generateTokenPair = (
  payload: Omit<TokenPayload, 'type'>
): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as TokenPayload;
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtRefreshSecret) as TokenPayload;
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

export const generateResetToken = (userId: string): string => {
  return jwt.sign(
    { id: userId, type: 'reset' },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
};

export const verifyResetToken = (token: string): { id: string } => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; type: string };
    if (decoded.type !== 'reset') {
      throw new Error('Invalid token type');
    }
    return { id: decoded.id };
  } catch (error) {
    throw new Error('Invalid or expired reset token');
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
};
