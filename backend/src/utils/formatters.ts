/**
 * Data Formatting and Transformation Utilities
 * 
 * Provides comprehensive functions for data formatting, validation,
 * transformation, serialization, and presentation formatting.
 */

import { logger } from './logger';

/**
 * Format date to various display formats
 */
export function formatDate(date: Date | string, format: string = 'MM/DD/YYYY'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      logger.warn('Invalid date provided for formatting');
      return '';
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    const formatMap: Record<string, string> = {
      'MM/DD/YYYY': `${month}/${day}/${year}`,
      'DD/MM/YYYY': `${day}/${month}/${year}`,
      'YYYY-MM-DD': `${year}-${month}-${day}`,
      'MM/DD/YYYY HH:MM': `${month}/${day}/${year} ${hours}:${minutes}`,
      'DD/MM/YYYY HH:MM:SS': `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`,
      'ISO': dateObj.toISOString(),
      'LOCALE': dateObj.toLocaleDateString(),
      'LOCALE_FULL': dateObj.toLocaleString(),
    };

    return formatMap[format] || formatMap['MM/DD/YYYY'];
  } catch (error) {
    logger.error(`Failed to format date: ${error}`);
    return '';
  }
}

/**
 * Format time to HH:MM or HH:MM:SS
 */
export function formatTime(date: Date | string, includeSeconds: boolean = false): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return includeSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
  } catch (error) {
    logger.error(`Failed to format time: ${error}`);
    return '';
  }
}

/**
 * Format currency values
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  try {
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'INR': '₹',
      'JPY': '¥',
      'CAD': 'C$',
      'AUD': 'A$'
    };

    const symbol = currencySymbols[currency] || '$';
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `${symbol}${formatter.format(amount)}`;
  } catch (error) {
    logger.error(`Failed to format currency: ${error}`);
    return amount.toString();
  }
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimalPlaces: number = 2): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string, format: string = 'US'): string {
  try {
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (format === 'US') {
      // Format: (XXX) XXX-XXXX
      if (digitsOnly.length === 10) {
        return `(${digitsOnly.substring(0, 3)}) ${digitsOnly.substring(3, 6)}-${digitsOnly.substring(6)}`;
      } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
        return `+1 (${digitsOnly.substring(1, 4)}) ${digitsOnly.substring(4, 7)}-${digitsOnly.substring(7)}`;
      }
    } else if (format === 'INTERNATIONAL') {
      // Format: +XX XXXX XXXX XXXX
      return '+' + digitsOnly;
    }

    return phone;
  } catch (error) {
    logger.error(`Failed to format phone number: ${error}`);
    return phone;
  }
}

/**
 * Format address
 */
export function formatAddress(address: any, format: string = 'FULL'): string {
  try {
    const parts = [];

    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    if (address.country) parts.push(address.country);

    if (format === 'FULL') {
      return parts.join(', ');
    } else if (format === 'CITY_STATE_ZIP') {
      return [address.city, address.state, address.zipCode].filter(Boolean).join(', ');
    } else if (format === 'MULTILINE') {
      const lines = [];
      if (address.street) lines.push(address.street);
      if (address.city) lines.push(`${address.city}, ${address.state} ${address.zipCode}`.trim());
      if (address.country) lines.push(address.country);
      return lines.join('\n');
    }

    return parts.join(', ');
  } catch (error) {
    logger.error(`Failed to format address: ${error}`);
    return '';
  }
}

/**
 * Format medical record code
 */
export function formatMedicalCode(code: string, type: 'ICD10' | 'CPT' | 'HCPCS' = 'ICD10'): string {
  try {
    if (type === 'ICD10') {
      // Format: A12.34 (Letter-2digits-optional dot-up to 2 more digits)
      return code.replace(/^([A-Z])(\d{2})(\d*)$/, '$1$2.$3').replace(/\.$/, '');
    } else if (type === 'CPT') {
      // Format: 99213 (5 digits)
      return code.padStart(5, '0');
    }
    return code;
  } catch (error) {
    logger.error(`Failed to format medical code: ${error}`);
    return code;
  }
}

/**
 * Format health metrics
 */
export function formatHealthMetric(value: number, metric: string): string {
  try {
    const formatters: Record<string, (v: number) => string> = {
      'blood_pressure': (v) => {
        const str = v.toString();
        if (str.includes('/')) return str;
        return `${Math.floor(v / 100)}/${v % 100}`;
      },
      'bmi': (v) => `${v.toFixed(1)} kg/m²`,
      'temperature': (v) => `${v.toFixed(1)}°F`,
      'pulse': (v) => `${Math.round(v)} bpm`,
      'respiratory_rate': (v) => `${Math.round(v)} breaths/min`,
      'oxygen_saturation': (v) => `${Math.round(v)}%`,
      'height': (v) => `${(v / 2.54).toFixed(1)} inches`,
      'weight': (v) => `${v.toFixed(1)} lbs`,
      'glucose': (v) => `${Math.round(v)} mg/dL`,
      'cholesterol': (v) => `${Math.round(v)} mg/dL`
    };

    return formatters[metric]?.(value) || value.toString();
  } catch (error) {
    logger.error(`Failed to format health metric: ${error}`);
    return value.toString();
  }
}

/**
 * Format name (capitalize first and last names)
 */
export function formatName(firstName: string, lastName: string, format: string = 'FULL'): string {
  try {
    const capitalize = (str: string) => {
      return str
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('-');
    };

    const first = capitalize(firstName);
    const last = capitalize(lastName);

    if (format === 'FULL') {
      return `${first} ${last}`;
    } else if (format === 'LAST_FIRST') {
      return `${last}, ${first}`;
    } else if (format === 'INITIALS') {
      return `${first.charAt(0)}.${last.charAt(0)}.`;
    }

    return `${first} ${last}`;
  } catch (error) {
    logger.error(`Failed to format name: ${error}`);
    return `${firstName} ${lastName}`;
  }
}

/**
 * Format duration in milliseconds to human readable format
 */
export function formatDuration(ms: number, format: string = 'SHORT'): string {
  try {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (format === 'SHORT') {
      if (days > 0) return `${days}d`;
      if (hours > 0) return `${hours}h`;
      if (minutes > 0) return `${minutes}m`;
      return `${seconds}s`;
    } else if (format === 'FULL') {
      const parts = [];
      if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
      if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
      if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
      if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
      return parts.join(', ');
    }

    return ms.toString();
  } catch (error) {
    logger.error(`Failed to format duration: ${error}`);
    return ms.toString();
  }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  try {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  } catch (error) {
    logger.error(`Failed to format file size: ${error}`);
    return bytes.toString();
  }
}

/**
 * Format status with styling hint
 */
export function formatStatus(status: string): { label: string; className: string } {
  const statusMap: Record<string, { label: string; className: string }> = {
    'active': { label: 'Active', className: 'badge-success' },
    'inactive': { label: 'Inactive', className: 'badge-danger' },
    'pending': { label: 'Pending', className: 'badge-warning' },
    'completed': { label: 'Completed', className: 'badge-success' },
    'cancelled': { label: 'Cancelled', className: 'badge-danger' },
    'approved': { label: 'Approved', className: 'badge-success' },
    'rejected': { label: 'Rejected', className: 'badge-danger' },
    'draft': { label: 'Draft', className: 'badge-secondary' },
    'scheduled': { label: 'Scheduled', className: 'badge-info' },
    'confirmed': { label: 'Confirmed', className: 'badge-success' }
  };

  return statusMap[status.toLowerCase()] || { label: status, className: 'badge-secondary' };
}

/**
 * Convert data to CSV format
 */
export function convertToCSV(data: any[], columns?: string[]): string {
  try {
    if (data.length === 0) return '';

    const cols = columns || Object.keys(data[0]);
    const header = cols.join(',');
    const rows = data.map(item =>
      cols.map(col => {
        const value = item[col];
        // Escape quotes and wrap in quotes if contains comma, newline, or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    );

    return [header, ...rows].join('\n');
  } catch (error) {
    logger.error(`Failed to convert to CSV: ${error}`);
    return '';
  }
}

/**
 * Format JSON for display
 */
export function formatJSON(data: any, indent: number = 2): string {
  try {
    return JSON.stringify(data, null, indent);
  } catch (error) {
    logger.error(`Failed to format JSON: ${error}`);
    return '';
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Highlight search text in content
 */
export function highlightText(text: string, searchTerm: string, tag: string = 'mark'): string {
  try {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, `<${tag}>$1</${tag}>`);
  } catch (error) {
    logger.error(`Failed to highlight text: ${error}`);
    return text;
  }
}
