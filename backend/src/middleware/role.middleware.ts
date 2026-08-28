import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { UserRole } from '../models/User.model';

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required to access this resource.'));
    }

    if (!roles.includes(req.user.role as UserRole)) {
      return next(
        new ForbiddenError(
          `User role '${req.user.role}' is not authorized to access this resource. Required roles: ${roles.join(', ')}`
        )
      );
    }

    next();
  };
};

export const authorizeOwnerOrRoles = (
  ownerIdExtractor: (req: Request) => string | undefined,
  ...roles: UserRole[]
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required.'));
    }

    const ownerId = ownerIdExtractor(req);
    const isOwner = ownerId && req.userId === ownerId;
    const hasRole = roles.includes(req.user.role as UserRole);

    if (!isOwner && !hasRole) {
      return next(
        new ForbiddenError('You are not authorized to access this resource.')
      );
    }

    next();
  };
};

export const isAdmin = authorize(UserRole.ADMIN);
export const isDoctor = authorize(UserRole.DOCTOR);
export const isPatient = authorize(UserRole.PATIENT);
export const isDoctorOrAdmin = authorize(UserRole.DOCTOR, UserRole.ADMIN);
export const isPatientOrAdmin = authorize(UserRole.PATIENT, UserRole.ADMIN);
export const isDoctorOrPatient = authorize(UserRole.DOCTOR, UserRole.PATIENT);
export const isAnyRole = authorize(UserRole.PATIENT, UserRole.DOCTOR, UserRole.ADMIN);

export const roleMiddleware = (roles: string[]) => authorize(...(roles as UserRole[]));

export default authorize;
