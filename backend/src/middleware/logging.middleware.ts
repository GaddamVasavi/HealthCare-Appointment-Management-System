/**
 * Middleware - Request/Response Logging
 * 
 * Comprehensive logging middleware for tracking all HTTP requests and responses
 * with performance metrics, error tracking, and audit trails.
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

interface RequestLog {
  requestId: string;
  timestamp: Date;
  method: string;
  path: string;
  queryParams: Record<string, any>;
  headers: Record<string, string>;
  ip: string;
  userAgent: string;
  userId?: string;
  userRole?: string;
  requestBody?: any;
  responseStatus: number;
  responseTime: number;
  responseSize: number;
  error?: string;
  errorStack?: string;
}

/**
 * Request/Response logging middleware
 */
export function requestResponseLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = uuidv4();
  const startTime = Date.now();

  // Store request metadata
  const requestLog: Partial<RequestLog> = {
    requestId,
    timestamp: new Date(),
    method: req.method,
    path: req.path,
    queryParams: req.query,
    headers: sanitizeHeaders(req.headers as Record<string, any>),
    ip: req.ip || 'unknown',
    userAgent: req.get('user-agent') || 'unknown',
    userId: (req as any).user?.id,
    userRole: (req as any).user?.role
  };

  // Log request body for non-GET requests
  if (req.method !== 'GET' && req.body) {
    requestLog.requestBody = sanitizeBody(req.body);
  }

  // Attach request ID to response headers
  res.setHeader('X-Request-ID', requestId);

  // Override send method to capture response
  const originalSend = res.send;
  res.send = function(data: any) {
    const responseTime = Date.now() - startTime;
    requestLog.responseStatus = res.statusCode;
    requestLog.responseTime = responseTime;
    requestLog.responseSize = Buffer.byteLength(JSON.stringify(data));

    // Log request/response
    if (res.statusCode >= 400) {
      logger.error(`Request failed: ${requestLog.method} ${requestLog.path}`, {
        ...requestLog,
        responseData: sanitizeBody(data)
      });
    } else if (responseTime > 1000) {
      logger.warn(`Slow request detected: ${requestLog.method} ${requestLog.path} took ${responseTime}ms`, {
        ...requestLog
      });
    } else {
      logger.info(`Request completed: ${requestLog.method} ${requestLog.path}`, {
        ...requestLog
      });
    }

    return originalSend.call(this, data);
  };

  next();
}

/**
 * Error logging middleware
 */
export function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = res.getHeader('X-Request-ID') as string || uuidv4();

  const errorLog = {
    requestId,
    timestamp: new Date(),
    method: req.method,
    path: req.path,
    error: err.message,
    errorStack: err.stack,
    statusCode: (err as any).statusCode || 500,
    userId: (req as any).user?.id,
    ip: req.ip
  };

  logger.error(`Request error: ${err.message}`, errorLog);
  next(err);
}

/**
 * Performance monitoring middleware
 */
export function performanceMonitor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const duration = Number((endTime - startTime) / BigInt(1000000)); // Convert to ms

    const performanceMetrics = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: duration,
      memoryUsage: process.memoryUsage(),
      timestamp: new Date()
    };

    if (duration > 1000) {
      logger.warn(`Slow endpoint detected: ${req.method} ${req.path} - ${duration}ms`, performanceMetrics);
    }
  });

  next();
}

/**
 * Audit trail middleware
 */
export function auditTrail(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Track sensitive operations
  const sensitiveOperations = [
    { method: 'POST', pathPattern: /\/users\/.*\/role/ },
    { method: 'DELETE', pathPattern: /\/patients\/.*/ },
    { method: 'POST', pathPattern: /\/appointments\/.*\/cancel/ },
    { method: 'PUT', pathPattern: /\/prescriptions\/.*/ },
    { method: 'POST', pathPattern: /\/billing\/.*\/override/ }
  ];

  const isSensitive = sensitiveOperations.some(
    op => op.method === req.method && op.pathPattern.test(req.path)
  );

  if (isSensitive) {
    const auditEntry = {
      timestamp: new Date(),
      userId: (req as any).user?.id,
      action: `${req.method} ${req.path}`,
      resource: req.path,
      changes: req.body,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    };

    logger.info(`Audit trail: ${auditEntry.action}`, auditEntry);
  }

  next();
}

/**
 * Security header middleware
 */
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
}

/**
 * Rate limiting middleware
 */
export function rateLimiter(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
  const requestCounts = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    const identifier = req.ip || 'unknown';
    const now = Date.now();

    let record = requestCounts.get(identifier);

    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      requestCounts.set(identifier, record);
    }

    record.count++;

    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count).toString());
    res.setHeader('X-RateLimit-Reset', new Date(record.resetTime).toISOString());

    if (record.count > maxRequests) {
      logger.warn(`Rate limit exceeded for IP: ${identifier}`);
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      });
      return;
    }

    next();
  };
}

/**
 * Sanitize headers for logging
 */
function sanitizeHeaders(headers: Record<string, any>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  const sensitiveHeaders = ['authorization', 'x-api-key', 'cookie', 'x-token'];

  for (const [key, value] of Object.entries(headers)) {
    if (sensitiveHeaders.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = String(value);
    }
  }

  return sanitized;
}

/**
 * Sanitize body for logging
 */
function sanitizeBody(body: any): any {
  if (!body) return body;

  const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard', 'ssn'];
  const sanitized = JSON.parse(JSON.stringify(body));

  const sanitizeObject = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj !== null && typeof obj === 'object') {
      for (const key in obj) {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object') {
          obj[key] = sanitizeObject(obj[key]);
        }
      }
    }
    return obj;
  };

  return sanitizeObject(sanitized);
}

export default {
  requestResponseLogger,
  errorLogger,
  performanceMonitor,
  auditTrail,
  securityHeaders,
  rateLimiter
};
