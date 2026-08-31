import * as crypto from 'crypto';

export class FieldEncryptionService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly IV_LENGTH = 12; // 96 bits for GCM
  private static readonly AUTH_TAG_LENGTH = 16; // 128 bits
  private static readonly DEFAULT_SECRET = 'healthcare-hipaa-secure-key-32b-length!!';

  private static getKey(): Buffer {
    const rawKey = process.env.HIPAA_ENCRYPTION_KEY || this.DEFAULT_SECRET;
    return crypto.scryptSync(rawKey, 'healthcare_salt_seed_2026', 32);
  }

  /**
   * Encrypts sensitive Protected Health Information (PHI) like SSN, Medical Record Numbers, etc.
   */
  public static encryptPHI(plainText: string): string {
    if (!plainText) return plainText;
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const key = this.getKey();
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');

    // Return format: iv:authTag:encryptedPayload
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts encrypted PHI with integrity verification
   */
  public static decryptPHI(cipherPayload: string): string {
    if (!cipherPayload || !cipherPayload.includes(':')) return cipherPayload;

    const parts = cipherPayload.split(':');
    if (parts.length !== 3) return cipherPayload;

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const key = this.getKey();

    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Masks sensitive identifier for safe display in non-privileged UI views
   */
  public static maskSSN(ssn: string): string {
    if (!ssn) return '';
    const clean = ssn.replace(/\D/g, '');
    if (clean.length < 4) return '***-**-****';
    return `***-**-${clean.slice(-4)}`;
  }
}
