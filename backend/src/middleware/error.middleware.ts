import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';
import config from '../config';

interface ErrorResponse {
  success: boolean;
  message: string;
  code?: string;
  errors?: any[];
  stack?: string;
}

const handleCastErrorDB = (err: any): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400, 'CAST_ERROR');
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const field = Object.keys(err.keyValue || {})[0];
  const value = err.keyValue?.[field];
  const message = field
    ? `Duplicate value '${value}' for field '${field}'. Please use another value.`
    : 'Duplicate field value. Please use another value.';
  return new AppError(message, 409, 'DUPLICATE_ERROR');
};

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => ({
    field: el.path,
    message: el.message,
  }));
  const message = `Validation failed: ${errors.map((e: any) => e.message).join('. ')}`;
  return new AppError(message, 422, 'VALIDATION_ERROR', errors);
};

const handleJWTError = (): AppError => {
  return new AppError('Invalid token. Please log in again.', 401, 'JWT_ERROR');
};

const handleJWTExpiredError = (): AppError => {
  return new AppError('Token has expired. Please log in again.', 401, 'JWT_EXPIRED');
};

const handleMulterError = (err: any): AppError => {
  let message = 'File upload error';
  if (err.code === 'LIMIT_FILE_SIZE') {
    message = `File too large. Maximum size is ${config.maxFileSize / (1024 * 1024)}MB`;
  } else if (err.code === 'LIMIT_FILE_COUNT') {
    message = 'Too many files uploaded at once';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    message = 'Unexpected file field';
  }
  return new AppError(message, 400, 'MULTER_ERROR');
};

const sendErrorDev = (err: AppError, res: Response): void => {
  const response: ErrorResponse = {
    success: false,
    message: err.message,
    code: err.code,
    errors: err.errors,
    stack: err.stack,
  };
  res.status(err.statusCode).json(response);
};

const sendErrorProd = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    const response: ErrorResponse = {
      success: false,
      message: err.message,
      code: err.code,
      errors: err.errors,
    };
    res.status(err.statusCode).json(response);
  } else {
    logger.error('UNEXPECTED ERROR:', err);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      code: 'INTERNAL_ERROR',
    });
  }
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error(`${err.statusCode} - ${err.message} - ${err.stack}`);

  if (config.nodeEnv === 'development' || config.nodeEnv === 'test') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message, stack: err.stack };

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (err.name === 'MulterError') error = handleMulterError(err);

    sendErrorProd(error, res);
  }
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const err = new AppError(
    `Cannot find ${req.method} ${req.originalUrl} on this server`,
    404,
    'NOT_FOUND'
  );
  next(err);
};

export default errorHandler;
