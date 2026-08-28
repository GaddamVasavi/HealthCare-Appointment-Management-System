/**
 * API Request/Response Validation Schema
 * 
 * Comprehensive validation middleware for API requests, responses, and schemas
 * with OpenAPI/Swagger support, rate limiting, and request sanitization.
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { BadRequestError, ConflictError } from '../utils/errors';

interface ValidationSchema {
  schemaId: string;
  endpoint: string;
  method: string;
  requestBody?: Record<string, any>;
  queryParams?: Record<string, any>;
  headers?: Record<string, any>;
  response?: Record<string, any>;
  example?: Record<string, any>;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
  data?: Record<string, any>;
}

interface ValidationError {
  field: string;
  message: string;
  value: any;
  expectedType?: string;
}

/**
 * Request body validation middleware factory
 */
export function validateRequestBody(schema: Record<string, any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      logger.info(`Validating request body for ${req.method} ${req.path}`);

      if (!req.body) {
        throw new BadRequestError('Request body is required');
      }

      const validation = validateAgainstSchema(req.body, schema);
      if (!validation.isValid) {
        throw new BadRequestError(
          `Request validation failed: ${validation.errors.map(e => e.message).join(', ')}`
        );
      }

      // Sanitize request body
      req.body = sanitizeInput(req.body);

      logger.info(`Request body validation passed`);
      next();
    } catch (error) {
      logger.error(`Request body validation failed: ${error}`);
      next(error);
    }
  };
}

/**
 * Query parameters validation middleware factory
 */
export function validateQueryParams(schema: Record<string, any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      logger.info(`Validating query parameters for ${req.method} ${req.path}`);

      if (Object.keys(schema).length > 0) {
        const validation = validateAgainstSchema(req.query, schema);
        if (!validation.isValid) {
          throw new BadRequestError(
            `Query parameter validation failed: ${validation.errors.map(e => e.message).join(', ')}`
          );
        }
      }

      logger.info(`Query parameters validation passed`);
      next();
    } catch (error) {
      logger.error(`Query parameter validation failed: ${error}`);
      next(error);
    }
  };
}

/**
 * Response validation middleware
 */
export function validateResponse(schema: Record<string, any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const originalSend = res.send;

    res.send = function(data: any) {
      try {
        const validation = validateAgainstSchema(data, schema);
        if (!validation.isValid) {
          logger.warn(`Response validation failed: ${validation.errors.map(e => e.message).join(', ')}`);
        }
      } catch (error) {
        logger.error(`Response validation error: ${error}`);
      }

      return originalSend.call(this, data);
    };

    next();
  };
}

/**
 * Content type validation middleware
 */
export function validateContentType(allowedTypes: string[] = ['application/json']) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      const contentType = req.get('content-type')?.split(';')[0].toLowerCase();

      if (!contentType || !allowedTypes.includes(contentType)) {
        logger.error(`Invalid content type: ${contentType}`);
        res.status(415).json({
          error: 'Unsupported Media Type',
          message: `Content-Type must be one of: ${allowedTypes.join(', ')}`
        });
        return;
      }
    }

    next();
  };
}

/**
 * API key validation middleware
 */
export function validateApiKey(apiKey: string | string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const providedKey = req.get('x-api-key');

    if (!providedKey) {
      logger.warn(`API key missing in request to ${req.path}`);
      res.status(401).json({ error: 'API key is required' });
      return;
    }

    const validKeys = Array.isArray(apiKey) ? apiKey : [apiKey];
    if (!validKeys.includes(providedKey)) {
      logger.warn(`Invalid API key attempt for ${req.path}`);
      res.status(403).json({ error: 'Invalid API key' });
      return;
    }

    next();
  };
}

/**
 * Input sanitization middleware
 */
export function sanitizeInput(data: any): any {
  if (typeof data === 'string') {
    // Remove potential XSS vectors
    return data
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[<>\"']/g, '')
      .trim();
  }

  if (Array.isArray(data)) {
    return data.map(item => sanitizeInput(item));
  }

  if (typeof data === 'object' && data !== null) {
    const sanitized: Record<string, any> = {};
    for (const key in data) {
      sanitized[key] = sanitizeInput(data[key]);
    }
    return sanitized;
  }

  return data;
}

/**
 * Validate data against schema
 */
function validateAgainstSchema(data: any, schema: Record<string, any>): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  for (const field in schema) {
    const fieldSchema = schema[field];
    const value = data[field];

    // Check required fields
    if (fieldSchema.required && (value === undefined || value === null)) {
      errors.push({
        field,
        message: `${field} is required`,
        value,
        expectedType: fieldSchema.type
      });
      continue;
    }

    if (value === undefined || value === null) {
      continue;
    }

    // Type validation
    if (fieldSchema.type) {
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== fieldSchema.type) {
        errors.push({
          field,
          message: `${field} must be of type ${fieldSchema.type}`,
          value,
          expectedType: fieldSchema.type
        });
        continue;
      }
    }

    // String validation
    if (fieldSchema.type === 'string') {
      if (fieldSchema.minLength && value.length < fieldSchema.minLength) {
        errors.push({
          field,
          message: `${field} must be at least ${fieldSchema.minLength} characters`,
          value
        });
      }
      if (fieldSchema.maxLength && value.length > fieldSchema.maxLength) {
        errors.push({
          field,
          message: `${field} must not exceed ${fieldSchema.maxLength} characters`,
          value
        });
      }
      if (fieldSchema.pattern) {
        const regex = new RegExp(fieldSchema.pattern);
        if (!regex.test(value)) {
          errors.push({
            field,
            message: `${field} format is invalid`,
            value
          });
        }
      }
    }

    // Number validation
    if (fieldSchema.type === 'number' || fieldSchema.type === 'integer') {
      if (fieldSchema.minimum !== undefined && value < fieldSchema.minimum) {
        errors.push({
          field,
          message: `${field} must be at least ${fieldSchema.minimum}`,
          value
        });
      }
      if (fieldSchema.maximum !== undefined && value > fieldSchema.maximum) {
        errors.push({
          field,
          message: `${field} must not exceed ${fieldSchema.maximum}`,
          value
        });
      }
    }

    // Enum validation
    if (fieldSchema.enum && !fieldSchema.enum.includes(value)) {
      errors.push({
        field,
        message: `${field} must be one of: ${fieldSchema.enum.join(', ')}`,
        value
      });
    }

    // Email validation
    if (fieldSchema.format === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push({
          field,
          message: `${field} must be a valid email`,
          value
        });
      }
    }

    // Date validation
    if (fieldSchema.format === 'date') {
      if (isNaN(Date.parse(value))) {
        errors.push({
          field,
          message: `${field} must be a valid date`,
          value
        });
      }
    }

    // Custom validation
    if (fieldSchema.validate && typeof fieldSchema.validate === 'function') {
      const customResult = fieldSchema.validate(value);
      if (!customResult.isValid) {
        errors.push({
          field,
          message: customResult.message,
          value
        });
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * OpenAPI/Swagger schema export
 */
export function generateOpenAPISchema(endpoints: any[]): Record<string, any> {
  const paths: Record<string, any> = {};

  for (const endpoint of endpoints) {
    const pathKey = endpoint.path.replace(/:(\w+)/g, '{$1}');
    const method = endpoint.method.toLowerCase();

    if (!paths[pathKey]) {
      paths[pathKey] = {};
    }

    paths[pathKey][method] = {
      summary: endpoint.summary,
      description: endpoint.description,
      tags: endpoint.tags || [],
      parameters: endpoint.parameters || [],
      requestBody: endpoint.requestBody,
      responses: endpoint.responses,
      security: endpoint.security || []
    };
  }

  return {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare Appointment Management API',
      version: '1.0.0',
      description: 'Comprehensive healthcare appointment and patient management API'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server'
      },
      {
        url: 'https://api.healthcare.com',
        description: 'Production server'
      }
    ],
    paths
  };
}

/**
 * Request size limit middleware
 */
export function validateRequestSize(maxSizeInBytes: number = 10 * 1024 * 1024) {
  return (req: Request, res: Response, next: NextFunction): void => {
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxSizeInBytes) {
        logger.error(`Request exceeds maximum size of ${maxSizeInBytes} bytes`);
        res.status(413).json({
          error: 'Payload Too Large',
          message: `Request size exceeds maximum allowed size of ${maxSizeInBytes} bytes`
        });
        req.destroy();
      }
    });

    next();
  };
}

/**
 * Duplicate request detection middleware
 */
export function detectDuplicateRequests() {
  const requestCache = new Map<string, { timestamp: number; count: number }>();

  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
      const fingerprint = `${req.ip}:${req.method}:${req.path}:${JSON.stringify(req.body)}`;
      const now = Date.now();
      const cached = requestCache.get(fingerprint);

      if (cached && now - cached.timestamp < 1000) {
        // Same request within 1 second
        if (cached.count > 2) {
          logger.warn(`Duplicate request detected from ${req.ip}`);
          res.status(409).json({
            error: 'Conflict',
            message: 'Duplicate request detected'
          });
          return;
        }
        cached.count++;
      } else {
        requestCache.set(fingerprint, { timestamp: now, count: 1 });
      }

      // Cleanup old entries
      if (requestCache.size > 10000) {
        for (const [key, value] of requestCache.entries()) {
          if (now - value.timestamp > 60000) {
            requestCache.delete(key);
          }
        }
      }
    }

    next();
  };
}

export default {
  validateRequestBody,
  validateQueryParams,
  validateResponse,
  validateContentType,
  validateApiKey,
  sanitizeInput,
  validateAgainstSchema: validateAgainstSchema,
  generateOpenAPISchema,
  validateRequestSize,
  detectDuplicateRequests
};
