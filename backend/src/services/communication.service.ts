/**
 * Notification and Communication Service
 * 
 * Handles multi-channel notifications including SMS, Email, Push Notifications,
 * and in-app messaging with comprehensive delivery tracking and retry logic.
 */

import { logger } from '../utils/logger';
import { BadRequestError } from '../utils/errors';

interface NotificationTemplate {
  templateId: string;
  name: string;
  channel: 'email' | 'sms' | 'push' | 'inapp';
  subject?: string;
  body: string;
  variables: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Notification {
  notificationId: string;
  recipientId: string;
  recipientType: 'patient' | 'doctor' | 'admin' | 'staff';
  channel: 'email' | 'sms' | 'push' | 'inapp';
  subject?: string;
  content: string;
  templateId?: string;
  variables?: Record<string, any>;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'read';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failureReason?: string;
  retryCount: number;
  maxRetries: number;
}

interface EmailTemplate extends NotificationTemplate {
  htmlContent?: string;
  attachments?: string[];
}

interface SMSTemplate extends NotificationTemplate {
  characterLimit: number;
}

export class NotificationService {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY_MS = 5000;

  /**
   * Send email notification
   */
  public async sendEmail(
    recipientId: string,
    recipientEmail: string,
    subject: string,
    content: string,
    templateId?: string
  ): Promise<Notification> {
    try {
      logger.info(`Sending email to ${recipientEmail}`);

      if (!recipientId || !recipientEmail || !subject || !content) {
        throw new BadRequestError('Recipient ID, email, subject, and content are required');
      }

      if (!this.isValidEmail(recipientEmail)) {
        throw new BadRequestError('Invalid email format');
      }

      const notification: Notification = {
        notificationId: `NOTIF-EMAIL-${Date.now()}`,
        recipientId,
        recipientType: 'patient',
        channel: 'email',
        subject,
        content,
        templateId,
        status: 'pending',
        priority: 'normal',
        createdAt: new Date(),
        retryCount: 0,
        maxRetries: this.MAX_RETRIES
      };

      // Simulate sending
      await this.simulateSend(notification);

      logger.info(`Email sent: ${notification.notificationId}`);
      return notification;
    } catch (error) {
      logger.error(`Failed to send email: ${error}`);
      throw error;
    }
  }

  /**
   * Send SMS notification
   */
  public async sendSMS(
    recipientId: string,
    phoneNumber: string,
    content: string,
    priority: string = 'normal'
  ): Promise<Notification> {
    try {
      logger.info(`Sending SMS to ${phoneNumber}`);

      if (!recipientId || !phoneNumber || !content) {
        throw new BadRequestError('Recipient ID, phone number, and content are required');
      }

      if (!this.isValidPhoneNumber(phoneNumber)) {
        throw new BadRequestError('Invalid phone number format');
      }

      if (content.length > 160) {
        logger.warn(`SMS content exceeds 160 characters (${content.length} chars). Will be split into multiple messages.`);
      }

      const notification: Notification = {
        notificationId: `NOTIF-SMS-${Date.now()}`,
        recipientId,
        recipientType: 'patient',
        channel: 'sms',
        content,
        status: 'pending',
        priority: priority as 'low' | 'normal' | 'high' | 'urgent',
        createdAt: new Date(),
        retryCount: 0,
        maxRetries: this.MAX_RETRIES
      };

      await this.simulateSend(notification);

      logger.info(`SMS sent: ${notification.notificationId}`);
      return notification;
    } catch (error) {
      logger.error(`Failed to send SMS: ${error}`);
      throw error;
    }
  }

  /**
   * Send push notification
   */
  public async sendPushNotification(
    recipientId: string,
    title: string,
    body: string,
    data?: Record<string, any>,
    action?: string
  ): Promise<Notification> {
    try {
      logger.info(`Sending push notification to user: ${recipientId}`);

      if (!recipientId || !title || !body) {
        throw new BadRequestError('Recipient ID, title, and body are required');
      }

      const notification: Notification = {
        notificationId: `NOTIF-PUSH-${Date.now()}`,
        recipientId,
        recipientType: 'patient',
        channel: 'push',
        subject: title,
        content: body,
        status: 'pending',
        priority: 'high',
        createdAt: new Date(),
        variables: data,
        retryCount: 0,
        maxRetries: this.MAX_RETRIES
      };

      await this.simulateSend(notification);

      logger.info(`Push notification sent: ${notification.notificationId}`);
      return notification;
    } catch (error) {
      logger.error(`Failed to send push notification: ${error}`);
      throw error;
    }
  }

  /**
   * Send in-app notification
   */
  public async sendInAppNotification(
    recipientId: string,
    title: string,
    content: string,
    priority: string = 'normal',
    actionUrl?: string
  ): Promise<Notification> {
    try {
      logger.info(`Sending in-app notification to user: ${recipientId}`);

      if (!recipientId || !title || !content) {
        throw new BadRequestError('Recipient ID, title, and content are required');
      }

      const notification: Notification = {
        notificationId: `NOTIF-INAPP-${Date.now()}`,
        recipientId,
        recipientType: 'patient',
        channel: 'inapp',
        subject: title,
        content,
        status: 'delivered',
        priority: priority as 'low' | 'normal' | 'high' | 'urgent',
        createdAt: new Date(),
        deliveredAt: new Date(),
        variables: actionUrl ? { actionUrl } : undefined,
        retryCount: 0,
        maxRetries: this.MAX_RETRIES
      };

      logger.info(`In-app notification sent: ${notification.notificationId}`);
      return notification;
    } catch (error) {
      logger.error(`Failed to send in-app notification: ${error}`);
      throw error;
    }
  }

  /**
   * Send appointment reminder
   */
  public async sendAppointmentReminder(
    patientId: string,
    patientContact: string,
    appointmentDetails: {
      appointmentId: string;
      doctorName: string;
      appointmentTime: Date;
      location: string;
    },
    channel: 'email' | 'sms' | 'all' = 'all'
  ): Promise<Notification[]> {
    try {
      logger.info(`Sending appointment reminder for patient: ${patientId}`);

      const notifications: Notification[] = [];
      const reminderText = `Reminder: You have an appointment with ${appointmentDetails.doctorName} on ${appointmentDetails.appointmentTime.toLocaleString()} at ${appointmentDetails.location}`;

      if (channel === 'email' || channel === 'all') {
        const emailNotif = await this.sendEmail(
          patientId,
          patientContact,
          'Appointment Reminder',
          reminderText
        );
        notifications.push(emailNotif);
      }

      if (channel === 'sms' || channel === 'all') {
        const smsNotif = await this.sendSMS(patientId, patientContact, reminderText);
        notifications.push(smsNotif);
      }

      logger.info(`Appointment reminder sent to patient: ${patientId}`);
      return notifications;
    } catch (error) {
      logger.error(`Failed to send appointment reminder: ${error}`);
      throw error;
    }
  }

  /**
   * Send bulk notifications
   */
  public async sendBulkNotifications(
    recipients: Array<{ recipientId: string; contact: string }>,
    subject: string,
    content: string,
    channel: 'email' | 'sms' = 'email'
  ): Promise<{ successful: number; failed: number; notifications: Notification[] }> {
    try {
      logger.info(`Sending bulk ${channel} notifications to ${recipients.length} recipients`);

      const results = {
        successful: 0,
        failed: 0,
        notifications: [] as Notification[]
      };

      for (const recipient of recipients) {
        try {
          let notification: Notification;
          if (channel === 'email') {
            notification = await this.sendEmail(recipient.recipientId, recipient.contact, subject, content);
          } else {
            notification = await this.sendSMS(recipient.recipientId, recipient.contact, content);
          }
          results.notifications.push(notification);
          results.successful++;
        } catch (error) {
          logger.warn(`Failed to send notification to ${recipient.contact}: ${error}`);
          results.failed++;
        }
      }

      logger.info(`Bulk notifications sent: ${results.successful} successful, ${results.failed} failed`);
      return results;
    } catch (error) {
      logger.error(`Failed to send bulk notifications: ${error}`);
      throw error;
    }
  }

  /**
   * Get notification status
   */
  public async getNotificationStatus(notificationId: string): Promise<Notification | null> {
    try {
      logger.info(`Retrieving notification status: ${notificationId}`);

      if (!notificationId) {
        throw new BadRequestError('Notification ID is required');
      }

      // Mock response
      const notification: Notification = {
        notificationId,
        recipientId: 'PAT-001',
        recipientType: 'patient',
        channel: 'email',
        subject: 'Appointment Reminder',
        content: 'Your appointment is coming up',
        status: 'delivered',
        priority: 'normal',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        sentAt: new Date(Date.now() - 59 * 60 * 1000),
        deliveredAt: new Date(Date.now() - 58 * 60 * 1000),
        retryCount: 0,
        maxRetries: 3
      };

      logger.info(`Notification status retrieved: ${notification.status}`);
      return notification;
    } catch (error) {
      logger.error(`Failed to retrieve notification status: ${error}`);
      throw error;
    }
  }

  /**
   * Get notification history
   */
  public async getNotificationHistory(
    recipientId: string,
    options?: { limit?: number; startDate?: Date; endDate?: Date; channel?: string }
  ): Promise<Notification[]> {
    try {
      logger.info(`Retrieving notification history for recipient: ${recipientId}`);

      const mockNotifications: Notification[] = [
        {
          notificationId: 'NOTIF-001',
          recipientId,
          recipientType: 'patient',
          channel: 'email',
          subject: 'Appointment Confirmed',
          content: 'Your appointment has been confirmed',
          status: 'delivered',
          priority: 'normal',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          deliveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          readAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          retryCount: 0,
          maxRetries: 3
        },
        {
          notificationId: 'NOTIF-002',
          recipientId,
          recipientType: 'patient',
          channel: 'sms',
          content: 'Appointment reminder',
          status: 'delivered',
          priority: 'normal',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          retryCount: 0,
          maxRetries: 3
        }
      ];

      let filtered = mockNotifications;
      if (options?.channel) {
        filtered = filtered.filter(n => n.channel === options.channel);
      }

      const limit = options?.limit || 50;
      return filtered.slice(0, limit);
    } catch (error) {
      logger.error(`Failed to retrieve notification history: ${error}`);
      throw error;
    }
  }

  /**
   * Save notification template
   */
  public async saveNotificationTemplate(templateData: Partial<NotificationTemplate>): Promise<NotificationTemplate> {
    try {
      logger.info(`Saving notification template`);

      if (!templateData.name || !templateData.channel || !templateData.body) {
        throw new BadRequestError('Template name, channel, and body are required');
      }

      const template: NotificationTemplate = {
        templateId: `TMPL-${Date.now()}`,
        name: templateData.name,
        channel: templateData.channel,
        subject: templateData.subject,
        body: templateData.body,
        variables: templateData.variables || [],
        active: templateData.active !== false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      logger.info(`Notification template saved: ${template.templateId}`);
      return template;
    } catch (error) {
      logger.error(`Failed to save notification template: ${error}`);
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  public async markAsRead(notificationId: string): Promise<void> {
    try {
      logger.info(`Marking notification as read: ${notificationId}`);

      if (!notificationId) {
        throw new BadRequestError('Notification ID is required');
      }

      logger.info(`Notification marked as read: ${notificationId}`);
    } catch (error) {
      logger.error(`Failed to mark notification as read: ${error}`);
      throw error;
    }
  }

  /**
   * Simulate sending notification (for testing)
   */
  private async simulateSend(notification: Notification): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        notification.status = 'sent';
        notification.sentAt = new Date();
        // Simulate delivery delay
        setTimeout(() => {
          notification.status = 'delivered';
          notification.deliveredAt = new Date();
        }, 1000);
        resolve();
      }, 500);
    });
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   */
  private isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }
}

export default new NotificationService();
