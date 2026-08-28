import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt.util';
import { UnauthorizedError } from '../utils/errors';
import User, { IUser, UserStatus } from '../models/User.model';
import { logger } from '../utils/logger';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: string;
      userRole?: string;
    }
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Access denied. No token provided.');
    }

    let decoded: TokenPayload;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token. Please log in again.');
    }

    const user = await User.findById(decoded.id).select('+password');

    if (!user) {
      throw new UnauthorizedError('User associated with this token no longer exists.');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedError('Your account has been suspended. Please contact support.');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedError('Your account is inactive. Please verify your email.');
    }

    if (user.changedPasswordAfter(decoded.iat || 0)) {
      throw new UnauthorizedError('Password was recently changed. Please log in again.');
    }

    req.user = user;
    req.userId = user._id.toString();
    req.userRole = user.role;
    next();
  } catch (error) {
    next(error);
  }
};

export const authMiddleware = authenticate;

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.id);
      if (user && user.status === UserStatus.ACTIVE) {
        req.user = user;
        req.userId = user._id.toString();
        req.userRole = user.role;
      }
    } catch (error) {
      logger.debug('Optional auth: Invalid token, continuing without auth');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
