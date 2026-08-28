import api from './api';
import { AuthResponse, User, Patient } from '../types';

/**
 * Authentication Service
 * Handles all API calls related to user authentication and account management.
 */
export const authService = {
  /**
   * Authenticate a user with email and password
   */
  login: async (credentials: Record<string, any>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Register a new user (Patient by default in public flow)
   */
  register: async (userData: Record<string, any>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  /**
   * Log out the current user (invalidates token on server)
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async (token: string): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>('/auth/refresh', { refreshToken: token });
    return response.data;
  },

  /**
   * Request a password reset email
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Reset password using a valid reset token
   */
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/reset-password', { token, password });
    return response.data;
  },

  /**
   * Verify email address
   */
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  },

  /**
   * Get the current authenticated user's profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
  
  /**
   * Update the current user's profile
   */
  updateProfile: async (data: Partial<Patient | User>): Promise<User> => {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },
  
  /**
   * Change user password
   */
  changePassword: async (passwords: Record<string, string>): Promise<{ message: string }> => {
    const response = await api.put<{ message: string }>('/auth/change-password', passwords);
    return response.data;
  }
};
