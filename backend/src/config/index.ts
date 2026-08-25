import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface IConfig {
  nodeEnv: string;
  port: number;
  apiVersion: string;
  mongodbUri: string;
  mongodbTestUri: string;
  jwtSecret: string;
  jwtRefreshSecret: string;
  jwtExpire: string;
  jwtRefreshExpire: string;
  jwtCookieExpire: number;
  clientUrl: string;
  adminUrl: string;
  maxFileSize: number;
  uploadPath: string;
  allowedFileTypes: string[];
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  logLevel: string;
  logFile: string;
  corsOrigin: string[];
  sessionSecret: string;
}

const config: IConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/medicare_connect',
  mongodbTestUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/medicare_connect_test',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret_change_in_production',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '15m',
  jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
  jwtCookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE || '7', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,application/pdf').split(','),
  smtpHost: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  smtpPort: parseInt(process.env.SMTP_PORT || '2525', 10),
  smtpUser: process.env.SMTP_USER || '',
  smtpPassword: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.FROM_EMAIL || 'noreply@medicareconnect.com',
  fromName: process.env.FROM_NAME || 'MediCare Connect',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  logLevel: process.env.LOG_LEVEL || 'debug',
  logFile: process.env.LOG_FILE || './logs/app.log',
  corsOrigin: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174').split(','),
  sessionSecret: process.env.SESSION_SECRET || 'default_session_secret',
};

export const validateConfig = (): void => {
  const requiredInProduction = [
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'MONGODB_URI',
  ];

  if (config.nodeEnv === 'production') {
    const missing = requiredInProduction.filter((key) => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables in production: ${missing.join(', ')}`
      );
    }

    if (config.jwtSecret === 'default_jwt_secret_change_in_production') {
      throw new Error('JWT_SECRET must be changed from default in production');
    }

    if (config.jwtRefreshSecret === 'default_jwt_refresh_secret_change_in_production') {
      throw new Error('JWT_REFRESH_SECRET must be changed from default in production');
    }
  }
};

export default config;
