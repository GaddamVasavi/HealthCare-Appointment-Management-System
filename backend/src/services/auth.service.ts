import User, { IUser, UserRole, UserStatus } from '../models/User.model';
import Patient from '../models/Patient.model';
import Doctor from '../models/Doctor.model';
import { generateTokenPair, verifyRefreshToken, generateResetToken, verifyResetToken } from '../utils/jwt.util';
import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from '../utils/errors';
import { validatePasswordStrength } from '../utils/password.util';
import { logger } from '../utils/logger';

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
  gender?: string;
  dateOfBirth?: Date;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  // Doctor-specific fields
  specialization?: string;
  licenseNumber?: string;
  qualifications?: any[];
  yearsOfExperience?: number;
  consultationFee?: number;
  bio?: string;
  languages?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existingUser = await User.findOne({ email: input.email.toLowerCase() });
    if (existingUser) {
      throw new ConflictError('An account with this email already exists');
    }

    const passwordValidation = validatePasswordStrength(input.password);
    if (!passwordValidation.isValid) {
      throw new BadRequestError(
        `Password validation failed: ${passwordValidation.errors.join(', ')}`
      );
    }

    const role = input.role || UserRole.PATIENT;
    if (role === UserRole.ADMIN) {
      throw new BadRequestError('Admin accounts cannot be created through registration');
    }

    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email.toLowerCase(),
      password: input.password,
      role,
      phone: input.phone,
      gender: input.gender,
      dateOfBirth: input.dateOfBirth,
      address: input.address,
      status: UserStatus.ACTIVE,
    });

    if (role === UserRole.PATIENT) {
      await Patient.create({ user: user._id });
    } else if (role === UserRole.DOCTOR) {
      if (!input.specialization || !input.licenseNumber) {
        await User.findByIdAndDelete(user._id);
        throw new BadRequestError('Doctor registration requires specialization and license number');
      }

      if (!input.qualifications || input.qualifications.length === 0) {
        await User.findByIdAndDelete(user._id);
        throw new BadRequestError('Doctor registration requires at least one qualification');
      }

      await Doctor.create({
        user: user._id,
        specialization: input.specialization,
        licenseNumber: input.licenseNumber,
        qualifications: input.qualifications,
        yearsOfExperience: input.yearsOfExperience || 0,
        consultationFee: input.consultationFee || 500,
        bio: input.bio,
        languages: input.languages || ['English'],
      });
    }

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    logger.info(`New ${role} registered: ${user.email}`);

    return { user, accessToken, refreshToken };
  }

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await User.findOne({ email: input.email.toLowerCase() })
      .select('+password +loginAttempts +lockUntil');

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (user.isLocked) {
      throw new UnauthorizedError(
        'Account is temporarily locked due to too many failed login attempts. Please try again later.'
      );
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedError('Your account has been suspended. Please contact support.');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedError('Your account is inactive. Please verify your email first.');
    }

    const isPasswordValid = await user.comparePassword(input.password);
    if (!isPasswordValid) {
      await user.incrementLoginAttempts();
      throw new UnauthorizedError('Invalid email or password');
    }

    await user.resetLoginAttempts();

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    return { user, accessToken, refreshToken };
  }

  async logout(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $unset: { refreshToken: 1 },
    });
    logger.info(`User logged out: ${userId}`);
  }

  async refreshToken(refreshTokenStr: string): Promise<{ accessToken: string; refreshToken: string }> {
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshTokenStr);
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.refreshToken !== refreshTokenStr) {
      user.refreshToken = undefined;
      await user.save();
      throw new UnauthorizedError('Token reuse detected. All sessions have been invalidated.');
    }

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }

  async forgotPassword(email: string): Promise<{ message: string; resetToken?: string }> {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }

    const resetToken = generateResetToken(user._id.toString());

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save({ validateBeforeSave: false });

    logger.info(`Password reset requested for: ${email}`);

    return {
      message: 'If an account with that email exists, a password reset link has been sent.',
      resetToken, // In production, this would be sent via email only
    };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    let decoded;
    try {
      decoded = verifyResetToken(token);
    } catch (error) {
      throw new BadRequestError('Invalid or expired reset token');
    }

    const user = await User.findById(decoded.id).select('+passwordResetToken +passwordResetExpires');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.passwordResetToken !== token) {
      throw new BadRequestError('Invalid reset token');
    }

    if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
      throw new BadRequestError('Reset token has expired');
    }

    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new BadRequestError(
        `Password validation failed: ${passwordValidation.errors.join(', ')}`
      );
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshToken = undefined;
    await user.save();

    logger.info(`Password reset completed for: ${user.email}`);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new BadRequestError('Current password is incorrect');
    }

    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new BadRequestError(
        `Password validation failed: ${passwordValidation.errors.join(', ')}`
      );
    }

    user.password = newPassword;
    user.refreshToken = undefined;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    const restrictedFields = ['password', 'email', 'role', 'status', 'refreshToken', 'loginAttempts', 'lockUntil'];
    restrictedFields.forEach((field) => {
      delete (updateData as any)[field];
    });

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    logger.info(`Profile updated for user: ${user.email}`);
    return user;
  }
}

export default new AuthService();
