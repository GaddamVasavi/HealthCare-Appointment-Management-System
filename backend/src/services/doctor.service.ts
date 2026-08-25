import Doctor, { IDoctor } from '../models/Doctor.model';
import User, { UserRole, UserStatus } from '../models/User.model';
import Specialization from '../models/Specialization.model';
import Schedule from '../models/Schedule.model';
import { NotFoundError, BadRequestError } from '../utils/errors';
import { logger } from '../utils/logger';
import mongoose from 'mongoose';

export interface DoctorSearchFilters {
  name?: string;
  specialization?: string;
  specializationSlug?: string;
  minFee?: number;
  maxFee?: number;
  minRating?: number;
  minExperience?: number;
  language?: string;
  acceptingNewPatients?: boolean;
  isVerified?: boolean;
  available?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class DoctorService {
  async searchDoctors(filters: DoctorSearchFilters): Promise<{
    doctors: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const query: any = {};
    const userQuery: any = { role: UserRole.DOCTOR, status: UserStatus.ACTIVE };

    const activeDoctors = await User.find(userQuery).select('_id');
    query.user = { $in: activeDoctors.map((user) => user._id) };

    if (filters.name) {
      const nameRegex = new RegExp(filters.name, 'i');
      const matchedUsers = await User.find({
        $or: [
          { firstName: nameRegex },
          { lastName: nameRegex },
        ],
        ...userQuery,
      }).select('_id');
      query.user = { $in: matchedUsers.map((u) => u._id) };
    }

    if (filters.specialization) {
      query.specialization = filters.specialization;
    }

    if (filters.specializationSlug) {
      const spec = await Specialization.findOne({ slug: filters.specializationSlug });
      if (spec) {
        query.specialization = spec._id;
      } else {
        return { doctors: [], total: 0, page: 1, totalPages: 0 };
      }
    }

    if (filters.minFee !== undefined || filters.maxFee !== undefined) {
      query.consultationFee = {};
      if (filters.minFee !== undefined) query.consultationFee.$gte = filters.minFee;
      if (filters.maxFee !== undefined) query.consultationFee.$lte = filters.maxFee;
    }

    if (filters.minRating !== undefined) {
      query.averageRating = { $gte: filters.minRating };
    }

    if (filters.minExperience !== undefined) {
      query.yearsOfExperience = { $gte: filters.minExperience };
    }

    if (filters.language) {
      query.languages = { $in: [new RegExp(filters.language, 'i')] };
    }

    if (filters.acceptingNewPatients !== undefined) {
      query.acceptingNewPatients = filters.acceptingNewPatients;
    }

    if (filters.isVerified !== undefined) {
      query.isVerified = filters.isVerified;
    }

    const page = filters.page || 1;
    const limit = Math.min(filters.limit || 10, 50);
    const skip = (page - 1) * limit;

    const sortField = filters.sortBy || 'averageRating';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    const [doctors, total] = await Promise.all([
      Doctor.find(query)
        .populate('user', 'firstName lastName email phone profileImage gender')
        .populate('specialization', 'name slug icon')
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Doctor.countDocuments(query),
    ]);

    return {
      doctors,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDoctorProfile(doctorId: string): Promise<any> {
    const doctor = await Doctor.findOne({ user: doctorId })
      .populate('user', 'firstName lastName email phone profileImage gender address dateOfBirth')
      .populate('specialization', 'name slug description icon');

    if (!doctor) {
      throw new NotFoundError('Doctor profile not found');
    }

    return doctor;
  }

  async getDoctorById(id: string): Promise<IDoctor> {
    const doctor = await Doctor.findById(id)
      .populate('user', 'firstName lastName email phone profileImage gender')
      .populate('specialization', 'name slug');

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    return doctor;
  }

  async updateDoctorProfile(userId: string, updateData: Partial<IDoctor>): Promise<IDoctor> {
    const restrictedFields = ['user', 'isVerified', 'verifiedAt', 'verifiedBy', 'averageRating', 'totalRatings', 'totalConsultations'];
    restrictedFields.forEach((field) => {
      delete (updateData as any)[field];
    });

    const doctor = await Doctor.findOneAndUpdate(
      { user: userId },
      updateData,
      { new: true, runValidators: true }
    )
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('specialization', 'name slug');

    if (!doctor) {
      throw new NotFoundError('Doctor profile not found');
    }

    logger.info(`Doctor profile updated: ${userId}`);
    return doctor;
  }

  async getDoctorsBySpecialization(specializationId: string): Promise<IDoctor[]> {
    return Doctor.find({
      specialization: specializationId,
      acceptingNewPatients: true,
      isVerified: true,
    })
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('specialization', 'name slug')
      .sort({ averageRating: -1 })
      .lean() as unknown as Promise<IDoctor[]>;
  }

  async getTopDoctors(limit: number = 10): Promise<IDoctor[]> {
    return Doctor.find({
      acceptingNewPatients: true,
    })
      .populate('user', 'firstName lastName email phone profileImage')
      .populate('specialization', 'name slug')
      .sort({ averageRating: -1, totalConsultations: -1 })
      .limit(limit)
      .lean() as unknown as Promise<IDoctor[]>;
  }

  async verifyDoctor(doctorUserId: string, adminId: string): Promise<IDoctor> {
    const doctor = await Doctor.findOneAndUpdate(
      { user: doctorUserId },
      {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedBy: new mongoose.Types.ObjectId(adminId),
      },
      { new: true }
    );

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    logger.info(`Doctor verified: ${doctorUserId} by admin ${adminId}`);
    return doctor;
  }

  async getDoctorStats(doctorUserId: string): Promise<any> {
    const doctor = await Doctor.findOne({ user: doctorUserId });
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    return {
      totalConsultations: doctor.totalConsultations,
      averageRating: doctor.averageRating,
      totalRatings: doctor.totalRatings,
      yearsOfExperience: doctor.yearsOfExperience,
      consultationFee: doctor.consultationFee,
      isVerified: doctor.isVerified,
      acceptingNewPatients: doctor.acceptingNewPatients,
    };
  }
}

export default new DoctorService();
