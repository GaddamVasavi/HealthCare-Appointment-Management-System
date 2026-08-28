/**
 * @fileoverview Common shared types for the Healthcare Appointment Management System.
 * Defines standard API responses, pagination, error formats, and utility types.
 */

/**
 * Standard API Response structure for successful requests.
 * @template T The type of the data payload.
 */
export interface ApiResponse<T = any> {
  /** Indicates the request was successful (true). */
  success: boolean;
  /** Optional message describing the result. */
  message?: string;
  /** The payload data. */
  data?: T;
  /** Additional metadata, typically used for pagination. */
  meta?: ResponseMeta;
}

/**
 * Metadata often included in API responses, especially for list endpoints.
 */
export interface ResponseMeta {
  /** The current page number (1-indexed). */
  page?: number;
  /** The number of items per page. */
  limit?: number;
  /** The total number of items available. */
  totalItems?: number;
  /** The total number of pages available. */
  totalPages?: number;
  /** Indicates if there is a next page. */
  hasNextPage?: boolean;
  /** Indicates if there is a previous page. */
  hasPrevPage?: boolean;
}

/**
 * Standard API Error Response structure.
 */
export interface ApiErrorResponse {
  /** Indicates the request failed (false). */
  success: boolean;
  /** Specific error code identifying the type of error. */
  errorCode: string;
  /** Human-readable error message. */
  message: string;
  /** Detailed validation errors or specific field issues, if applicable. */
  details?: ErrorDetail[];
  /** Stack trace (should only be included in development environments). */
  stack?: string;
}

/**
 * Represents a specific detail about an error, useful for form validation.
 */
export interface ErrorDetail {
  /** The name of the field that caused the error. */
  field?: string;
  /** The specific validation error message for that field. */
  message: string;
  /** The provided value that failed validation. */
  value?: any;
}

/**
 * Standard pagination query parameters for list requests.
 */
export interface PaginationQuery {
  /** The page number to retrieve (default is usually 1). */
  page?: number;
  /** The number of items per page (default is usually 10 or 20). */
  limit?: number;
  /** Field to sort by. */
  sortBy?: string;
  /** Sort order, either ascending or descending. */
  sortOrder?: 'asc' | 'desc';
  /** Optional search term to filter results. */
  search?: string;
}

/**
 * Represents a geographic coordinate.
 */
export interface Coordinates {
  /** Latitude in decimal degrees. */
  latitude: number;
  /** Longitude in decimal degrees. */
  longitude: number;
}

/**
 * Represents a standard file attachment structure.
 */
export interface FileAttachment {
  /** Unique identifier for the file. */
  id: string;
  /** Original file name. */
  fileName: string;
  /** MIME type of the file. */
  mimeType: string;
  /** File size in bytes. */
  sizeBytes: number;
  /** URL or path to access the file. */
  url: string;
  /** Timestamp when uploaded. */
  uploadedAt: string;
  /** ID of the user who uploaded the file. */
  uploadedBy: string;
}

/**
 * Utility type to make certain properties of an interface optional.
 * @template T The original type.
 * @template K The keys to make optional.
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type to make certain properties of an interface required.
 * @template T The original type.
 * @template K The keys to make required.
 */
export type RequiredProps<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Represents a time range with start and end times.
 */
export interface TimeRange {
  /** Start time, usually in 'HH:mm' format or ISO date string. */
  startTime: string;
  /** End time, usually in 'HH:mm' format or ISO date string. */
  endTime: string;
}

/**
 * Represents a date range.
 */
export interface DateRange {
  /** Start date in ISO format or YYYY-MM-DD. */
  startDate: string;
  /** End date in ISO format or YYYY-MM-DD. */
  endDate: string;
}

/**
 * Represents audit information for a database record.
 */
export interface AuditFields {
  /** User ID who created the record. */
  createdBy?: string;
  /** Timestamp of creation. */
  createdAt: string;
  /** User ID who last updated the record. */
  updatedBy?: string;
  /** Timestamp of last update. */
  updatedAt: string;
  /** User ID who deleted the record (for soft deletes). */
  deletedBy?: string;
  /** Timestamp of deletion (for soft deletes). */
  deletedAt?: string;
}
