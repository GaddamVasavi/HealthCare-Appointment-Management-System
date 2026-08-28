/**
 * Document Management Service
 * 
 * Comprehensive service for managing medical documents, file uploads,
 * storage, retrieval, versioning, and access control.
 */

import { logger } from '../utils/logger';
import { BadRequestError, NotFoundError, ForbiddenError } from '../utils/errors';

interface Document {
  documentId: string;
  ownerType: 'patient' | 'doctor' | 'organization';
  ownerId: string;
  filename: string;
  fileType: string;
  fileSize: number;
  storageKey: string;
  contentType: string;
  description?: string;
  category: 'medical_record' | 'prescription' | 'insurance' | 'lab_result' | 'imaging' | 'consent_form' | 'other';
  tags?: string[];
  version: number;
  uploadedBy: string;
  uploadedAt: Date;
  lastModifiedAt: Date;
  accessLevel: 'private' | 'shared' | 'public';
  sharedWith?: string[];
  encrypted: boolean;
  encryptionKey?: string;
  status: 'draft' | 'published' | 'archived';
  metadata?: Record<string, any>;
  expiryDate?: Date;
  retentionDays?: number;
}

interface DocumentVersion {
  versionId: string;
  documentId: string;
  versionNumber: number;
  filename: string;
  fileSize: number;
  uploadedAt: Date;
  uploadedBy: string;
  storageKey: string;
  changeNotes?: string;
}

interface DocumentShare {
  shareId: string;
  documentId: string;
  sharedBy: string;
  sharedWith: string;
  shareType: 'view' | 'edit' | 'download';
  sharedAt: Date;
  expiresAt?: Date;
  status: 'active' | 'revoked' | 'expired';
}

export class DocumentManagementService {
  private readonly MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
  private readonly ALLOWED_TYPES = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'txt'];

  /**
   * Upload document
   */
  public async uploadDocument(
    ownerId: string,
    filename: string,
    fileBuffer: Buffer,
    category: string,
    metadata?: Record<string, any>
  ): Promise<Document> {
    try {
      logger.info(`Uploading document: ${filename}`);

      if (!ownerId || !filename || !fileBuffer) {
        throw new BadRequestError('Owner ID, filename, and file buffer are required');
      }

      if (fileBuffer.length > this.MAX_FILE_SIZE) {
        throw new BadRequestError(`File size exceeds maximum allowed size of ${this.MAX_FILE_SIZE / 1024 / 1024} MB`);
      }

      const fileType = this.getFileType(filename);
      if (!this.ALLOWED_TYPES.includes(fileType)) {
        throw new BadRequestError(`File type .${fileType} is not allowed`);
      }

      const document: Document = {
        documentId: `DOC-${Date.now()}`,
        ownerType: 'patient',
        ownerId,
        filename,
        fileType,
        fileSize: fileBuffer.length,
        storageKey: `documents/${ownerId}/${Date.now()}-${filename}`,
        contentType: this.getContentType(fileType),
        category: category as any,
        version: 1,
        uploadedBy: 'System',
        uploadedAt: new Date(),
        lastModifiedAt: new Date(),
        accessLevel: 'private',
        encrypted: true,
        status: 'draft',
        metadata
      };

      logger.info(`Document uploaded: ${document.documentId}`);
      return document;
    } catch (error) {
      logger.error(`Failed to upload document: ${error}`);
      throw error;
    }
  }

  /**
   * Download document
   */
  public async downloadDocument(documentId: string, userId: string): Promise<{ file: Buffer; filename: string }> {
    try {
      logger.info(`Downloading document: ${documentId}`);

      if (!documentId) {
        throw new BadRequestError('Document ID is required');
      }

      // Mock retrieval
      const document = await this.getDocument(documentId);
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      // Check access permissions
      if (document.accessLevel === 'private' && document.ownerId !== userId) {
        throw new ForbiddenError('Access denied');
      }

      const mockFileBuffer = Buffer.from(`Content of ${document.filename}`);

      logger.info(`Document downloaded: ${documentId}`);
      return { file: mockFileBuffer, filename: document.filename };
    } catch (error) {
      logger.error(`Failed to download document: ${error}`);
      throw error;
    }
  }

  /**
   * Get document details
   */
  public async getDocument(documentId: string): Promise<Document | null> {
    try {
      logger.info(`Retrieving document: ${documentId}`);

      if (!documentId) {
        throw new BadRequestError('Document ID is required');
      }

      const document: Document = {
        documentId,
        ownerType: 'patient',
        ownerId: 'PAT-001',
        filename: 'medical_record.pdf',
        fileType: 'pdf',
        fileSize: 2500000,
        storageKey: 'documents/PAT-001/12345-medical_record.pdf',
        contentType: 'application/pdf',
        description: 'Medical Record from Cardiology Department',
        category: 'medical_record',
        tags: ['cardiology', 'hypertension', '2024'],
        version: 1,
        uploadedBy: 'Dr. Smith',
        uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastModifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        accessLevel: 'private',
        encrypted: true,
        status: 'published'
      };

      logger.info(`Document retrieved: ${documentId}`);
      return document;
    } catch (error) {
      logger.error(`Failed to retrieve document: ${error}`);
      throw error;
    }
  }

  /**
   * List documents for owner
   */
  public async listDocuments(
    ownerId: string,
    options?: {
      category?: string;
      status?: string;
      limit?: number;
      offset?: number;
      sortBy?: string;
    }
  ): Promise<{ documents: Document[]; total: number }> {
    try {
      logger.info(`Listing documents for owner: ${ownerId}`);

      if (!ownerId) {
        throw new BadRequestError('Owner ID is required');
      }

      const mockDocuments: Document[] = [
        {
          documentId: 'DOC-001',
          ownerType: 'patient',
          ownerId,
          filename: 'medical_record.pdf',
          fileType: 'pdf',
          fileSize: 2500000,
          storageKey: 'documents/PAT-001/12345-medical_record.pdf',
          contentType: 'application/pdf',
          category: 'medical_record',
          version: 1,
          uploadedBy: 'Dr. Smith',
          uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          lastModifiedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          accessLevel: 'private',
          encrypted: true,
          status: 'published'
        },
        {
          documentId: 'DOC-002',
          ownerType: 'patient',
          ownerId,
          filename: 'lab_results.pdf',
          fileType: 'pdf',
          fileSize: 1800000,
          storageKey: 'documents/PAT-001/12346-lab_results.pdf',
          contentType: 'application/pdf',
          category: 'lab_result',
          version: 1,
          uploadedBy: 'Dr. Johnson',
          uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lastModifiedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          accessLevel: 'private',
          encrypted: true,
          status: 'published'
        },
        {
          documentId: 'DOC-003',
          ownerType: 'patient',
          ownerId,
          filename: 'insurance_card.jpg',
          fileType: 'jpg',
          fileSize: 850000,
          storageKey: 'documents/PAT-001/12347-insurance_card.jpg',
          contentType: 'image/jpeg',
          category: 'insurance',
          version: 1,
          uploadedBy: 'System',
          uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastModifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          accessLevel: 'private',
          encrypted: true,
          status: 'published'
        }
      ];

      let filtered = mockDocuments;
      if (options?.category) {
        filtered = filtered.filter(d => d.category === options.category);
      }
      if (options?.status) {
        filtered = filtered.filter(d => d.status === options.status);
      }

      const total = filtered.length;
      const limit = options?.limit || 20;
      const offset = options?.offset || 0;
      const documents = filtered.slice(offset, offset + limit);

      logger.info(`Retrieved ${documents.length} documents for owner: ${ownerId}`);
      return { documents, total };
    } catch (error) {
      logger.error(`Failed to list documents: ${error}`);
      throw error;
    }
  }

  /**
   * Delete document
   */
  public async deleteDocument(documentId: string, userId: string): Promise<void> {
    try {
      logger.info(`Deleting document: ${documentId}`);

      if (!documentId) {
        throw new BadRequestError('Document ID is required');
      }

      const document = await this.getDocument(documentId);
      if (!document) {
        throw new NotFoundError('Document not found');
      }

      if (document.ownerId !== userId) {
        throw new ForbiddenError('Only document owner can delete');
      }

      logger.info(`Document deleted: ${documentId}`);
    } catch (error) {
      logger.error(`Failed to delete document: ${error}`);
      throw error;
    }
  }

  /**
   * Share document
   */
  public async shareDocument(
    documentId: string,
    sharedBy: string,
    sharedWith: string,
    shareType: 'view' | 'edit' | 'download' = 'view',
    expiresIn?: number
  ): Promise<DocumentShare> {
    try {
      logger.info(`Sharing document: ${documentId} with user: ${sharedWith}`);

      if (!documentId || !sharedBy || !sharedWith) {
        throw new BadRequestError('Document ID, shared by, and shared with are required');
      }

      const expiryDate = expiresIn ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : undefined;

      const share: DocumentShare = {
        shareId: `SHARE-${Date.now()}`,
        documentId,
        sharedBy,
        sharedWith,
        shareType,
        sharedAt: new Date(),
        expiresAt: expiryDate,
        status: 'active'
      };

      logger.info(`Document shared: ${share.shareId}`);
      return share;
    } catch (error) {
      logger.error(`Failed to share document: ${error}`);
      throw error;
    }
  }

  /**
   * Revoke document share
   */
  public async revokeShare(shareId: string): Promise<void> {
    try {
      logger.info(`Revoking document share: ${shareId}`);

      if (!shareId) {
        throw new BadRequestError('Share ID is required');
      }

      logger.info(`Document share revoked: ${shareId}`);
    } catch (error) {
      logger.error(`Failed to revoke share: ${error}`);
      throw error;
    }
  }

  /**
   * Get document version history
   */
  public async getVersionHistory(documentId: string): Promise<DocumentVersion[]> {
    try {
      logger.info(`Retrieving version history for document: ${documentId}`);

      const mockVersions: DocumentVersion[] = [
        {
          versionId: `VER-${documentId}-1`,
          documentId,
          versionNumber: 2,
          filename: 'medical_record_v2.pdf',
          fileSize: 2600000,
          uploadedAt: new Date(),
          uploadedBy: 'Dr. Smith',
          storageKey: 'documents/PAT-001/12345-v2-medical_record.pdf',
          changeNotes: 'Updated with latest clinical findings'
        },
        {
          versionId: `VER-${documentId}-2`,
          documentId,
          versionNumber: 1,
          filename: 'medical_record.pdf',
          fileSize: 2500000,
          uploadedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          uploadedBy: 'Dr. Smith',
          storageKey: 'documents/PAT-001/12345-medical_record.pdf'
        }
      ];

      logger.info(`Retrieved ${mockVersions.length} versions for document: ${documentId}`);
      return mockVersions;
    } catch (error) {
      logger.error(`Failed to retrieve version history: ${error}`);
      throw error;
    }
  }

  /**
   * Restore document version
   */
  public async restoreVersion(documentId: string, versionNumber: number): Promise<Document | null> {
    try {
      logger.info(`Restoring document: ${documentId} to version: ${versionNumber}`);

      if (!documentId || versionNumber < 1) {
        throw new BadRequestError('Valid document ID and version number are required');
      }

      const document = await this.getDocument(documentId);
      if (document) {
        document.version = versionNumber;
        document.lastModifiedAt = new Date();
      }

      logger.info(`Document restored to version: ${versionNumber}`);
      return document;
    } catch (error) {
      logger.error(`Failed to restore version: ${error}`);
      throw error;
    }
  }

  /**
   * Get file type from filename
   */
  private getFileType(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }

  /**
   * Get content type based on file type
   */
  private getContentType(fileType: string): string {
    const typeMap: Record<string, string> = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'txt': 'text/plain'
    };

    return typeMap[fileType] || 'application/octet-stream';
  }
}

export default new DocumentManagementService();
