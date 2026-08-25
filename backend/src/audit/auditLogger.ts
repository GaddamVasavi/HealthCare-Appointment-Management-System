import { Request } from 'express';
import AuditLog, { AuditAction, AuditSeverity, IAuditLog } from '../models/AuditLog.model';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

interface AuditLogEntry {
  action: AuditAction;
  performedBy: string;
  targetUser?: string;
  targetEntity?: {
    entityType: string;
    entityId: string;
  };
  description: string;
  severity?: AuditSeverity;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  metadata?: Record<string, any>;
  isSuccess?: boolean;
  errorMessage?: string;
}

export const createAuditLog = async (
  entry: AuditLogEntry,
  req?: Request
): Promise<IAuditLog | null> => {
  try {
    const auditData: Partial<IAuditLog> = {
      action: entry.action,
      performedBy: new mongoose.Types.ObjectId(entry.performedBy),
      description: entry.description,
      severity: entry.severity || AuditSeverity.LOW,
      isSuccess: entry.isSuccess !== undefined ? entry.isSuccess : true,
      previousValues: entry.previousValues,
      newValues: entry.newValues,
      metadata: entry.metadata,
      errorMessage: entry.errorMessage,
    };

    if (entry.targetUser) {
      auditData.targetUser = new mongoose.Types.ObjectId(entry.targetUser);
    }

    if (entry.targetEntity) {
      auditData.targetEntity = {
        entityType: entry.targetEntity.entityType,
        entityId: new mongoose.Types.ObjectId(entry.targetEntity.entityId),
      };
    }

    if (req) {
      auditData.ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
      auditData.userAgent = req.get('user-agent')?.substring(0, 500);
      auditData.requestMethod = req.method as any;
      auditData.requestUrl = req.originalUrl?.substring(0, 500);

      if (req.body && Object.keys(req.body).length > 0) {
        const sanitizedBody = { ...req.body };
        const sensitiveFields = ['password', 'confirmPassword', 'currentPassword', 'newPassword', 'token', 'refreshToken'];
        sensitiveFields.forEach((field) => {
          if (sanitizedBody[field]) {
            sanitizedBody[field] = '[REDACTED]';
          }
        });
        auditData.requestBody = sanitizedBody;
      }
    }

    const auditLog = await AuditLog.create(auditData);
    return auditLog;
  } catch (error) {
    logger.error('Failed to create audit log:', error);
    return null;
  }
};

export const logUserAction = async (
  action: AuditAction,
  userId: string,
  description: string,
  req?: Request,
  additionalData?: Partial<AuditLogEntry>
): Promise<void> => {
  await createAuditLog(
    {
      action,
      performedBy: userId,
      description,
      ...additionalData,
    },
    req
  );
};

export const logAdminAction = async (
  action: AuditAction,
  adminId: string,
  targetUserId: string,
  description: string,
  req?: Request,
  additionalData?: Partial<AuditLogEntry>
): Promise<void> => {
  await createAuditLog(
    {
      action,
      performedBy: adminId,
      targetUser: targetUserId,
      description,
      severity: AuditSeverity.HIGH,
      ...additionalData,
    },
    req
  );
};

export const logSecurityEvent = async (
  action: AuditAction,
  userId: string,
  description: string,
  req?: Request,
  isSuccess: boolean = false
): Promise<void> => {
  await createAuditLog(
    {
      action,
      performedBy: userId,
      description,
      severity: AuditSeverity.CRITICAL,
      isSuccess,
    },
    req
  );
};

export const getAuditLogs = async (filters: {
  performedBy?: string;
  action?: AuditAction;
  targetUser?: string;
  severity?: AuditSeverity;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}) => {
  const query: any = {};

  if (filters.performedBy) query.performedBy = filters.performedBy;
  if (filters.action) query.action = filters.action;
  if (filters.targetUser) query.targetUser = filters.targetUser;
  if (filters.severity) query.severity = filters.severity;

  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) query.createdAt.$gte = filters.startDate;
    if (filters.endDate) query.createdAt.$lte = filters.endDate;
  }

  const page = filters.page || 1;
  const limit = filters.limit || 50;
  const skip = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    AuditLog.find(query)
      .populate('performedBy', 'firstName lastName email role')
      .populate('targetUser', 'firstName lastName email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    AuditLog.countDocuments(query),
  ]);

  return {
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export default {
  createAuditLog,
  logUserAction,
  logAdminAction,
  logSecurityEvent,
  getAuditLogs,
};
