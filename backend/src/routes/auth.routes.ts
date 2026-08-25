import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import {
  authLimiter,
  loginLimiter,
  passwordResetLimiter,
  registrationLimiter,
} from '../middleware/rateLimiter.middleware';
import {
  changePasswordValidation,
  forgotPasswordValidation,
  handleValidationErrors,
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  updateProfileValidation,
} from '../validators/auth.validator';

const router = Router();

router.post('/register', registrationLimiter, registerValidation, handleValidationErrors, authController.register);
router.post('/login', loginLimiter, loginValidation, handleValidationErrors, authController.login);
router.post('/refresh-token', authLimiter, authController.refreshToken);
router.post('/forgot-password', passwordResetLimiter, forgotPasswordValidation, handleValidationErrors, authController.forgotPassword);
router.post('/reset-password', passwordResetLimiter, resetPasswordValidation, handleValidationErrors, authController.resetPassword);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getMe);
router.patch('/me', authenticate, updateProfileValidation, handleValidationErrors, authController.updateProfile);
router.patch('/change-password', authenticate, changePasswordValidation, handleValidationErrors, authController.changePassword);

export default router;