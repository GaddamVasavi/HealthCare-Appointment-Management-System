/**
 * Security and Encryption Utilities Module
 * 
 * Provides comprehensive security functions including encryption, decryption,
 * hashing, token generation, secure password management, and data protection.
 */

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from './logger';
import { BadRequestError, UnauthorizedError } from './errors';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface EncryptionConfig {
  algorithm: string;
  secretKey: string;
  iv?: string;
}

export class SecurityUtility {
  private static instance: SecurityUtility;
  private readonly BCRYPT_ROUNDS = 12;
  private readonly HASH_ALGORITHM = 'sha256';
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-cbc';
  private readonly DEFAULT_JWT_EXPIRY = '24h';

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): SecurityUtility {
    if (!SecurityUtility.instance) {
      SecurityUtility.instance = new SecurityUtility();
    }
    return SecurityUtility.instance;
  }

  /**
   * Hash password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    try {
      if (!password || password.length < 6) {
        throw new BadRequestError('Password must be at least 6 characters');
      }

      const salt = await bcrypt.genSalt(this.BCRYPT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);

      logger.info('Password hashed successfully');
      return hashedPassword;
    } catch (error) {
      logger.error(`Failed to hash password: ${error}`);
      throw error;
    }
  }

  /**
   * Compare password with hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      logger.error(`Failed to compare password: ${error}`);
      throw error;
    }
  }

  /**
   * Generate JWT token
   */
  generateToken(payload: TokenPayload, secret: string, expiresIn: string = this.DEFAULT_JWT_EXPIRY): string {
    try {
      if (!secret) {
        throw new BadRequestError('JWT secret is required');
      }

      const token = jwt.sign(payload, secret, { expiresIn: expiresIn as any });
      logger.info(`JWT token generated for user: ${payload.userId}`);
      return token;
    } catch (error) {
      logger.error(`Failed to generate JWT token: ${error}`);
      throw error;
    }
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string, secret: string): TokenPayload {
    try {
      if (!token) {
        throw new UnauthorizedError('Token is required');
      }

      const decoded = jwt.verify(token, secret) as TokenPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }
      logger.error(`Failed to verify JWT token: ${error}`);
      throw error;
    }
  }

  /**
   * Decrypt token (extract payload without verification)
   */
  decodeToken(token: string): TokenPayload {
    try {
      const decoded = jwt.decode(token) as TokenPayload;
      if (!decoded) {
        throw new UnauthorizedError('Invalid token format');
      }
      return decoded;
    } catch (error) {
      logger.error(`Failed to decode token: ${error}`);
      throw error;
    }
  }

  /**
   * Generate secure random token
   */
  generateSecureToken(length: number = 32): string {
    try {
      const token = crypto.randomBytes(length).toString('hex');
      return token;
    } catch (error) {
      logger.error(`Failed to generate secure token: ${error}`);
      throw error;
    }
  }

  /**
   * Generate API key
   */
  generateAPIKey(prefix: string = 'sk'): string {
    try {
      const randomPart = crypto.randomBytes(32).toString('hex');
      const timestamp = Date.now().toString(36);
      const apiKey = `${prefix}_${timestamp}_${randomPart}`;
      return apiKey;
    } catch (error) {
      logger.error(`Failed to generate API key: ${error}`);
      throw error;
    }
  }

  /**
   * Hash data using SHA256
   */
  hashData(data: string): string {
    try {
      return crypto.createHash(this.HASH_ALGORITHM).update(data).digest('hex');
    } catch (error) {
      logger.error(`Failed to hash data: ${error}`);
      throw error;
    }
  }

  /**
   * Encrypt sensitive data
   */
  encrypt(data: string, secretKey: string, iv?: string): string {
    try {
      if (!secretKey || secretKey.length < 32) {
        throw new BadRequestError('Secret key must be at least 32 characters');
      }

      const encryptionIV = iv || crypto.randomBytes(16).toString('hex').substring(0, 16);
      const cipher = crypto.createCipheriv(
        this.ENCRYPTION_ALGORITHM,
        Buffer.from(secretKey.substring(0, 32)),
        Buffer.from(encryptionIV)
      );

      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const result = `${encryptionIV}:${encrypted}`;
      logger.info('Data encrypted successfully');
      return result;
    } catch (error) {
      logger.error(`Failed to encrypt data: ${error}`);
      throw error;
    }
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encryptedData: string, secretKey: string): string {
    try {
      if (!secretKey || secretKey.length < 32) {
        throw new BadRequestError('Secret key must be at least 32 characters');
      }

      const [iv, encrypted] = encryptedData.split(':');
      
      if (!iv || !encrypted) {
        throw new BadRequestError('Invalid encrypted data format');
      }

      const decipher = crypto.createDecipheriv(
        this.ENCRYPTION_ALGORITHM,
        Buffer.from(secretKey.substring(0, 32)),
        Buffer.from(iv)
      );

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      logger.info('Data decrypted successfully');
      return decrypted;
    } catch (error) {
      logger.error(`Failed to decrypt data: ${error}`);
      throw error;
    }
  }

  /**
   * Generate OTP (One-Time Password)
   */
  generateOTP(length: number = 6): { otp: string; expiresAt: Date } {
    try {
      const otp = Math.floor(Math.random() * Math.pow(10, length))
        .toString()
        .padStart(length, '0');
      
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      logger.info('OTP generated successfully');
      return { otp, expiresAt };
    } catch (error) {
      logger.error(`Failed to generate OTP: ${error}`);
      throw error;
    }
  }

  /**
   * Verify OTP
   */
  verifyOTP(otp: string, storedOTP: string, expiresAt: Date): boolean {
    try {
      if (Date.now() > expiresAt.getTime()) {
        logger.warn('OTP has expired');
        return false;
      }

      return otp === storedOTP;
    } catch (error) {
      logger.error(`Failed to verify OTP: ${error}`);
      throw error;
    }
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(userId: string, secret: string, expiresIn: string = '7d'): string {
    try {
      const refreshToken = jwt.sign(
        { userId, type: 'refresh' },
        secret,
        { expiresIn: expiresIn as any }
      );

      logger.info(`Refresh token generated for user: ${userId}`);
      return refreshToken;
    } catch (error) {
      logger.error(`Failed to generate refresh token: ${error}`);
      throw error;
    }
  }

  /**
   * Create HMAC signature
   */
  createHMACSignature(data: string, secret: string): string {
    try {
      const signature = crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('hex');

      return signature;
    } catch (error) {
      logger.error(`Failed to create HMAC signature: ${error}`);
      throw error;
    }
  }

  /**
   * Verify HMAC signature
   */
  verifyHMACSignature(data: string, signature: string, secret: string): boolean {
    try {
      const expectedSignature = this.createHMACSignature(data, secret);
      return signature === expectedSignature;
    } catch (error) {
      logger.error(`Failed to verify HMAC signature: ${error}`);
      return false;
    }
  }

  /**
   * Generate certificate
   */
  generateCertificate(subject: string, validity: number = 365): { cert: string; key: string } {
    try {
      // This is a simplified version. In production, use openssl or a proper certificate library
      const key = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      });

      logger.info(`Certificate generated for subject: ${subject}`);
      return {
        cert: key.publicKey,
        key: key.privateKey
      };
    } catch (error) {
      logger.error(`Failed to generate certificate: ${error}`);
      throw error;
    }
  }

  /**
   * Rate limit token generation
   */
  private tokenGenerationAttempts: Map<string, { count: number; resetAt: number }> = new Map();

  isRateLimited(identifier: string, maxAttempts: number = 5, windowMS: number = 60000): boolean {
    try {
      const now = Date.now();
      const attempt = this.tokenGenerationAttempts.get(identifier);

      if (!attempt || now > attempt.resetAt) {
        this.tokenGenerationAttempts.set(identifier, { count: 1, resetAt: now + windowMS });
        return false;
      }

      if (attempt.count >= maxAttempts) {
        logger.warn(`Rate limit exceeded for identifier: ${identifier}`);
        return true;
      }

      attempt.count++;
      return false;
    } catch (error) {
      logger.error(`Failed to check rate limit: ${error}`);
      return false;
    }
  }

  /**
   * Sanitize sensitive data for logging
   */
  sanitizeForLogging(data: any, fieldsToMask: string[] = ['password', 'token', 'secret', 'apiKey']): any {
    try {
      const sanitized = JSON.parse(JSON.stringify(data));

      const maskField = (obj: any) => {
        for (const key in obj) {
          if (fieldsToMask.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
            obj[key] = '***MASKED***';
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            maskField(obj[key]);
          }
        }
      };

      maskField(sanitized);
      return sanitized;
    } catch (error) {
      logger.error(`Failed to sanitize data for logging: ${error}`);
      return data;
    }
  }

  /**
   * Generate password reset token
   */
  generatePasswordResetToken(userId: string, secret: string, expiresIn: string = '1h'): string {
    try {
      const token = jwt.sign(
        { userId, type: 'password_reset' },
        secret,
        { expiresIn: expiresIn as any }
      );

      logger.info(`Password reset token generated for user: ${userId}`);
      return token;
    } catch (error) {
      logger.error(`Failed to generate password reset token: ${error}`);
      throw error;
    }
  }

  /**
   * Generate email verification token
   */
  generateEmailVerificationToken(email: string, secret: string, expiresIn: string = '24h'): string {
    try {
      const token = jwt.sign(
        { email, type: 'email_verification' },
        secret,
        { expiresIn: expiresIn as any }
      );

      logger.info(`Email verification token generated for email: ${email}`);
      return token;
    } catch (error) {
      logger.error(`Failed to generate email verification token: ${error}`);
      throw error;
    }
  }
}

export const securityUtility = SecurityUtility.getInstance();
