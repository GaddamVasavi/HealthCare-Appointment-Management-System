import { useAuth as useAuthContext } from '../context/AuthContext';
import { UserRole } from '../types';

/**
 * Custom hook to access authentication context and provide utility functions.
 * Must be used within an AuthProvider.
 */
export const useAuth = () => {
  const context = useAuthContext();

  const isPatient = context.user?.role === UserRole.PATIENT;
  const isDoctor = context.user?.role === UserRole.DOCTOR;
  const isAdmin = context.user?.role === UserRole.ADMIN;

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!context.user) return false;
    if (Array.isArray(role)) {
      return role.includes(context.user.role);
    }
    return context.user.role === role;
  };

  return {
    ...context,
    isPatient,
    isDoctor,
    isAdmin,
    hasRole
  };
};
