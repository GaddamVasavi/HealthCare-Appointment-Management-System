import crypto from 'crypto';

/**
 * Encryption Utility
 * Provides AES-256-GCM encryption for storing highly sensitive medical data at rest (HIPAA requirement)
 */
export class EncryptionUtil {
    // In production, this should be a 32-byte key stored securely in ENV or AWS KMS
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly SECRET_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
    private static readonly IV_LENGTH = 16;
    private static readonly AUTH_TAG_LENGTH = 16;

    /**
     * Encrypt a string value
     * Returns format: iv:authTag:encryptedText
     */
    public static encrypt(text: string): string {
        if (!text) return text;
        
        const iv = crypto.randomBytes(this.IV_LENGTH);
        const key = Buffer.from(this.SECRET_KEY, 'hex');
        
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag().toString('hex');
        
        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    }

    /**
     * Decrypt a previously encrypted string
     */
    public static decrypt(encryptedText: string): string {
        if (!encryptedText || !encryptedText.includes(':')) return encryptedText;

        try {
            const parts = encryptedText.split(':');
            const iv = Buffer.from(parts[0], 'hex');
            const authTag = Buffer.from(parts[1], 'hex');
            const encrypted = parts[2];
            
            const key = Buffer.from(this.SECRET_KEY, 'hex');
            
            const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
            decipher.setAuthTag(authTag);
            
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Failed to decrypt secure data');
        }
    }
}
