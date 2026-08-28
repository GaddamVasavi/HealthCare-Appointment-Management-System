/**
 * Email Utility
 * Wrapper around Nodemailer or SendGrid to format and dispatch 
 * transactional emails reliably.
 */

export class EmailUtil {
    
    /**
     * Initialize SMTP transport
     */
    private static getTransporter() {
        // return nodemailer.createTransport({ ... })
        return {};
    }

    /**
     * Send Appointment Confirmation
     */
    public static async sendAppointmentConfirmation(email: string, details: any): Promise<boolean> {
        // Compile HTML template, inject details
        console.log(`Sending confirmation to ${email} for appointment on ${details.date}`);
        return true;
    }

    /**
     * Send Appointment Reminder
     */
    public static async sendAppointmentReminder(email: string, details: any): Promise<boolean> {
        console.log(`Sending reminder to ${email}`);
        return true;
    }

    /**
     * Send new invoice/statement notification
     */
    public static async sendBillingStatement(email: string, invoiceId: string, pdfBuffer: Buffer): Promise<boolean> {
        console.log(`Sending billing statement ${invoiceId} to ${email} with attachment`);
        return true;
    }

    /**
     * Send password reset link
     */
    public static async sendPasswordReset(email: string, token: string): Promise<boolean> {
        console.log(`Sending password reset to ${email}`);
        return true;
    }
    
    /**
     * Send lab results availability notification (secure link, NOT the results themselves)
     */
    public static async sendLabResultNotification(email: string, patientName: string): Promise<boolean> {
        // HIPAA compliance: Never send PHI over standard email
        console.log(`Notifying ${email} that new secure lab results are available`);
        return true;
    }
}
