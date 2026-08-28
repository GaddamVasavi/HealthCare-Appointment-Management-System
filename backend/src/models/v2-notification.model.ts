import mongoose, { Document, Schema, Model } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  type: 'appointment_reminder' | 'lab_result' | 'prescription_ready' | 'billing' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'normal' | 'high';
  deliveryChannels: Array<'email' | 'sms' | 'push'>;
  sentAt?: Date;
  templateReference?: string;
}

const notificationSchema = new Schema<INotification>({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['appointment_reminder', 'lab_result', 'prescription_ready', 'billing', 'system'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  actionUrl: String,
  priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  deliveryChannels: [{ type: String, enum: ['email', 'sms', 'push'] }],
  sentAt: Date,
  templateReference: String
}, { timestamps: true });

export const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', notificationSchema);
