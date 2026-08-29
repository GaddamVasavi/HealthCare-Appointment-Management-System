/**
 * MediCare Connect - Immutable HIPAA Audit Trail & Cryptographic Verification Engine
 * Implements HIPAA Security Rule § 164.312(b) Audit Controls with SHA-256 hash chaining.
 */

import * as crypto from 'crypto';

export interface HIPAAuditRecord {
  auditId: string;
  timestamp: string;
  userId: string;
  userRole: string;
  action: 'PHI_ACCESS' | 'PHI_EXPORT' | 'PHI_MODIFY' | 'PHI_DELETE' | 'LOGIN_ATTEMPT' | 'EMERGENCY_OVERRIDE';
  patientId: string;
  resourceAccessed: string;
  ipAddress: string;
  userAgent: string;
  previousRecordHash: string;
  currentHash: string;
}

export class HIPAAuditEngine {
  private static readonly auditChain: HIPAAuditRecord[] = [];
  private static lastHash: string = '0000000000000000000000000000000000000000000000000000000000000000';

  public static logAuditEvent(params: {
    userId: string;
    userRole: string;
    action: HIPAAuditRecord['action'];
    patientId: string;
    resourceAccessed: string;
    ipAddress: string;
    userAgent: string;
  }): HIPAAuditRecord {
    const timestamp = new Date().toISOString();
    const auditId = `AUDIT-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const hashInput = `${auditId}|${timestamp}|${params.userId}|${params.action}|${params.patientId}|${this.lastHash}`;
    const currentHash = crypto.createHash('sha256').update(hashInput).digest('hex');

    const record: HIPAAuditRecord = {
      auditId,
      timestamp,
      userId: params.userId,
      userRole: params.userRole,
      action: params.action,
      patientId: params.patientId,
      resourceAccessed: params.resourceAccessed,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      previousRecordHash: this.lastHash,
      currentHash,
    };

    this.lastHash = currentHash;
    this.auditChain.push(record);
    return record;
  }

  public static verifyAuditChainIntegrity(): { isTamperFree: boolean; verifiedRecordsCount: number; corruptedIndex?: number } {
    let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';

    for (let i = 0; i < this.auditChain.length; i++) {
      const rec = this.auditChain[i];
      if (rec.previousRecordHash !== prevHash) {
        return { isTamperFree: false, verifiedRecordsCount: i, corruptedIndex: i };
      }

      const checkHash = crypto
        .createHash('sha256')
        .update(`${rec.auditId}|${rec.timestamp}|${rec.userId}|${rec.action}|${rec.patientId}|${prevHash}`)
        .digest('hex');

      if (checkHash !== rec.currentHash) {
        return { isTamperFree: false, verifiedRecordsCount: i, corruptedIndex: i };
      }

      prevHash = rec.currentHash;
    }

    return { isTamperFree: true, verifiedRecordsCount: this.auditChain.length };
  }
}
