import Notification, { NotificationType, NotificationPriority, INotification } from '../models/Notification.model';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

interface NotificationData {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority?: NotificationPriority;
  actionUrl?: string;
  actionLabel?: string;
  relatedEntity?: {
    entityType: string;
    entityId: string;
  };
  senderId?: string;
  metadata?: Record<string, any>;
}

export const createNotification = async (
  data: NotificationData
): Promise<INotification | null> => {
  try {
    const notification = await Notification.create({
      user: new mongoose.Types.ObjectId(data.userId),
      title: data.title,
      message: data.message,
      type: data.type,
      priority: data.priority || NotificationPriority.MEDIUM,
      actionUrl: data.actionUrl,
      actionLabel: data.actionLabel,
      relatedEntity: data.relatedEntity
        ? {
            entityType: data.relatedEntity.entityType,
            entityId: new mongoose.Types.ObjectId(data.relatedEntity.entityId),
          }
        : undefined,
      sender: data.senderId ? new mongoose.Types.ObjectId(data.senderId) : undefined,
      metadata: data.metadata,
    });

    logger.debug(`Notification created for user ${data.userId}: ${data.title}`);
    return notification;
  } catch (error) {
    logger.error('Failed to create notification:', error);
    return null;
  }
};

export const notifyAppointmentCreated = async (
  patientId: string,
  doctorId: string,
  appointmentId: string,
  doctorName: string,
  patientName: string,
  date: string,
  time: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'Appointment Booked',
    message: `Your appointment with Dr. ${doctorName} has been booked for ${date} at ${time}.`,
    type: NotificationType.APPOINTMENT_CREATED,
    priority: NotificationPriority.HIGH,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'View Appointment',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
    senderId: doctorId,
  });

  await createNotification({
    userId: doctorId,
    title: 'New Appointment',
    message: `${patientName} has booked an appointment for ${date} at ${time}.`,
    type: NotificationType.APPOINTMENT_CREATED,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/doctor/appointments/${appointmentId}`,
    actionLabel: 'View Appointment',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
    senderId: patientId,
  });
};

export const notifyAppointmentConfirmed = async (
  patientId: string,
  appointmentId: string,
  doctorName: string,
  date: string,
  time: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'Appointment Confirmed',
    message: `Your appointment with Dr. ${doctorName} on ${date} at ${time} has been confirmed.`,
    type: NotificationType.APPOINTMENT_CONFIRMED,
    priority: NotificationPriority.HIGH,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'View Appointment',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
  });
};

export const notifyAppointmentCancelled = async (
  recipientId: string,
  appointmentId: string,
  cancelledByName: string,
  date: string,
  time: string,
  reason?: string
): Promise<void> => {
  const reasonText = reason ? ` Reason: ${reason}` : '';
  await createNotification({
    userId: recipientId,
    title: 'Appointment Cancelled',
    message: `The appointment on ${date} at ${time} has been cancelled by ${cancelledByName}.${reasonText}`,
    type: NotificationType.APPOINTMENT_CANCELLED,
    priority: NotificationPriority.HIGH,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'View Details',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
  });
};

export const notifyAppointmentRescheduled = async (
  recipientId: string,
  appointmentId: string,
  rescheduledByName: string,
  oldDate: string,
  oldTime: string,
  newDate: string,
  newTime: string
): Promise<void> => {
  await createNotification({
    userId: recipientId,
    title: 'Appointment Rescheduled',
    message: `Your appointment has been rescheduled by ${rescheduledByName} from ${oldDate} at ${oldTime} to ${newDate} at ${newTime}.`,
    type: NotificationType.APPOINTMENT_RESCHEDULED,
    priority: NotificationPriority.HIGH,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'View Appointment',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
  });
};

export const notifyAppointmentCompleted = async (
  patientId: string,
  appointmentId: string,
  doctorName: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'Appointment Completed',
    message: `Your appointment with Dr. ${doctorName} has been marked as completed.`,
    type: NotificationType.APPOINTMENT_COMPLETED,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'View Summary',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
  });
};

export const notifyPrescriptionCreated = async (
  patientId: string,
  prescriptionId: string,
  doctorName: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'New Prescription',
    message: `Dr. ${doctorName} has created a new prescription for you.`,
    type: NotificationType.PRESCRIPTION_CREATED,
    priority: NotificationPriority.HIGH,
    actionUrl: `/prescriptions/${prescriptionId}`,
    actionLabel: 'View Prescription',
    relatedEntity: { entityType: 'prescription', entityId: prescriptionId },
  });
};

export const notifyConsultationCompleted = async (
  patientId: string,
  consultationId: string,
  doctorName: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'Consultation Notes Available',
    message: `Dr. ${doctorName} has completed your consultation notes.`,
    type: NotificationType.CONSULTATION_COMPLETED,
    priority: NotificationPriority.MEDIUM,
    actionUrl: `/consultations/${consultationId}`,
    actionLabel: 'View Notes',
    relatedEntity: { entityType: 'consultation', entityId: consultationId },
  });
};

export const notifyAccountStatusChange = async (
  userId: string,
  newStatus: string,
  reason?: string
): Promise<void> => {
  const typeMap: Record<string, NotificationType> = {
    suspended: NotificationType.ACCOUNT_SUSPENDED,
    active: NotificationType.ACCOUNT_REACTIVATED,
    verified: NotificationType.ACCOUNT_VERIFIED,
  };

  const messageMap: Record<string, string> = {
    suspended: `Your account has been suspended.${reason ? ` Reason: ${reason}` : ''} Please contact support for assistance.`,
    active: 'Your account has been reactivated. You can now access all features.',
    verified: 'Your account has been verified. Welcome to MediCare Connect!',
  };

  await createNotification({
    userId,
    title: `Account ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
    message: messageMap[newStatus] || `Your account status has been updated to ${newStatus}.`,
    type: typeMap[newStatus] || NotificationType.SYSTEM_NOTIFICATION,
    priority: NotificationPriority.HIGH,
  });
};

export const notifyAdminAnnouncement = async (
  userIds: string[],
  title: string,
  message: string,
  senderId?: string
): Promise<void> => {
  const notifications = userIds.map((userId) => ({
    user: new mongoose.Types.ObjectId(userId),
    title,
    message,
    type: NotificationType.ADMIN_ANNOUNCEMENT,
    priority: NotificationPriority.MEDIUM,
    sender: senderId ? new mongoose.Types.ObjectId(senderId) : undefined,
  }));

  try {
    await Notification.insertMany(notifications);
    logger.info(`Admin announcement sent to ${userIds.length} users`);
  } catch (error) {
    logger.error('Failed to send admin announcement:', error);
  }
};

export const notifyFollowUpReminder = async (
  patientId: string,
  appointmentId: string,
  doctorName: string,
  followUpDate: string
): Promise<void> => {
  await createNotification({
    userId: patientId,
    title: 'Follow-up Reminder',
    message: `You have a follow-up appointment with Dr. ${doctorName} scheduled for ${followUpDate}.`,
    type: NotificationType.FOLLOW_UP_REMINDER,
    priority: NotificationPriority.HIGH,
    actionUrl: `/appointments/${appointmentId}`,
    actionLabel: 'Book Follow-up',
    relatedEntity: { entityType: 'appointment', entityId: appointmentId },
  });
};

export default {
  createNotification,
  notifyAppointmentCreated,
  notifyAppointmentConfirmed,
  notifyAppointmentCancelled,
  notifyAppointmentRescheduled,
  notifyAppointmentCompleted,
  notifyPrescriptionCreated,
  notifyConsultationCompleted,
  notifyAccountStatusChange,
  notifyAdminAnnouncement,
  notifyFollowUpReminder,
};
