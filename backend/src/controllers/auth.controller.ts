import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { sendSuccess, sendCreated } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { AuditAction } from '../models/AuditLog.model';
import { logUserAction, logSecurityEvent } from '../audit/auditLogger';

export const register = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { user, accessToken, refreshToken } = await authService.register(req.body);

    await logUserAction(
      AuditAction.USER_CREATED,
      user._id.toString(),
      `New ${user.role} account created: ${user.email}`,
      req
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendCreated(res, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
      },
      accessToken,
      refreshToken,
    }, 'Registration successful');
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { user, accessToken, refreshToken } = await authService.login(req.body);

    await logUserAction(
      AuditAction.USER_LOGIN,
      user._id.toString(),
      `User logged in: ${user.email}`,
      req
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        lastLogin: user.lastLogin,
      },
      accessToken,
      refreshToken,
    }, 'Login successful');
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    if (req.userId) {
      await authService.logout(req.userId);
      await logUserAction(
        AuditAction.USER_LOGOUT,
        req.userId,
        'User logged out',
        req
      );
    }

    res.clearCookie('refreshToken');
    sendSuccess(res, null, 'Logged out successfully');
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const token = req.body.refreshToken || req.cookies?.refreshToken;

    if (!token) {
      res.status(401).json({ success: false, message: 'Refresh token required' });
      return;
    }

    const tokens = await authService.refreshToken(token);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, tokens, 'Token refreshed successfully');
  }
);

export const getMe = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const user = await authService.getProfile(req.userId!);
    sendSuccess(res, { user }, 'Profile retrieved successfully');
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const user = await authService.updateProfile(req.userId!, req.body);

    await logUserAction(
      AuditAction.USER_UPDATED,
      req.userId!,
      `Profile updated for: ${user.email}`,
      req
    );

    sendSuccess(res, { user }, 'Profile updated successfully');
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.userId!, currentPassword, newPassword);

    await logUserAction(
      AuditAction.USER_PASSWORD_CHANGED,
      req.userId!,
      'Password changed',
      req
    );

    res.clearCookie('refreshToken');
    sendSuccess(res, null, 'Password changed successfully. Please log in again.');
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const result = await authService.forgotPassword(req.body.email);

    await logSecurityEvent(
      AuditAction.USER_PASSWORD_RESET,
      req.body.email,
      `Password reset requested for: ${req.body.email}`,
      req,
      true
    );

    sendSuccess(res, { resetToken: result.resetToken }, result.message);
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    sendSuccess(res, null, 'Password has been reset successfully. Please log in with your new password.');
  }
);

export default {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
