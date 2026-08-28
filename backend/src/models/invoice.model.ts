import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IInvoice extends Document {
  patient: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  lineItems: Array<{ description: string; cptCode?: string; quantity: number; unitPrice: number; discount: number }>;
  insuranceAdjustment: number;
  copay: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue';
  paymentMethod?: 'credit_card' | 'cash' | 'insurance' | 'bank_transfer';
  paymentHistory: Array<{ date: Date; amount: number; method: string; transactionId: string }>;
  dueDate: Date;
  lateFee: number;
  subtotal: number;
  tax: number;
  total: number;
  generatePdf(): Promise<string>;
}

const invoiceSchema = new Schema<IInvoice>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  lineItems: [{
    description: { type: String, required: true },
    cptCode: String,
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 }
  }],
  insuranceAdjustment: { type: Number, default: 0 },
  copay: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid', 'overdue'], default: 'unpaid' },
  paymentMethod: { type: String, enum: ['credit_card', 'cash', 'insurance', 'bank_transfer'] },
  paymentHistory: [{
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    transactionId: String
  }],
  dueDate: { type: Date, required: true },
  lateFee: { type: Number, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

invoiceSchema.virtual('subtotal').get(function() {
  return this.lineItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice) - item.discount, 0);
});

invoiceSchema.virtual('tax').get(function() {
  return (this.subtotal as number) * 0.05; // Dummy 5% tax
});

invoiceSchema.virtual('total').get(function() {
  return (this.subtotal as number) + (this.tax as number) - this.insuranceAdjustment - this.copay + this.lateFee;
});

invoiceSchema.methods.generatePdf = async function() {
  // Mock implementation
  return `http://example.com/invoices/${this._id}.pdf`;
};

export const Invoice: Model<IInvoice> = mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', invoiceSchema);
