import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAuditLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout';
  resourceType: string;
  resourceId?: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  timestamp: Date;
  hipaaComplianceEvent: boolean;
}

const auditLogSchema = new Schema<IAuditLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, enum: ['create', 'read', 'update', 'delete', 'login', 'logout'], required: true },
  resourceType: { type: String, required: true },
  resourceId: String,
  oldValue: { type: Schema.Types.Mixed },
  newValue: { type: Schema.Types.Mixed },
  ipAddress: String,
  userAgent: String,
  sessionId: String,
  timestamp: { type: Date, default: Date.now },
  hipaaComplianceEvent: { type: Boolean, default: false }
});

export const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
