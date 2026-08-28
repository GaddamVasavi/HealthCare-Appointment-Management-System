/**
 * @fileoverview Billing validators for the Healthcare Appointment Management System.
 */
import { InvoiceItem } from '../types/billing.types';

export const validateInvoiceItems = (items: InvoiceItem[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!items || items.length === 0) {
    errors.push('Invoice must contain at least one item.');
    return { isValid: false, errors };
  }

  items.forEach((item, index) => {
    if (!item.serviceCode) errors.push(`Item at index ${index} is missing a service code.`);
    if (!item.description) errors.push(`Item at index ${index} is missing a description.`);
    if (item.quantity <= 0) errors.push(`Item at index ${index} must have a quantity greater than 0.`);
    if (item.unitPrice < 0) errors.push(`Item at index ${index} cannot have a negative unit price.`);
    
    const calculatedTotal = item.quantity * item.unitPrice;
    if (Math.abs(item.totalAmount - calculatedTotal) > 0.01) {
      errors.push(`Item at index ${index} has incorrect total amount calculation.`);
    }
  });

  return { isValid: errors.length === 0, errors };
};

export const validateCreditCard = (cardNumber: string): boolean => {
  // Luhn algorithm basic check
  const arr = (cardNumber + '')
    .split('')
    .reverse()
    .map(x => parseInt(x, 10));
    
  if (arr.some(isNaN)) return false;

  const sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + (val * 2 > 9 ? val * 2 - 9 : val * 2) : acc + val),
    0
  );
  return sum % 10 === 0 && cardNumber.length >= 13 && cardNumber.length <= 19;
};
