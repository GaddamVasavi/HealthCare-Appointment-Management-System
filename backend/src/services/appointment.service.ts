import Appointment, { IAppointment, AppointmentStatus, AppointmentType, CancellationReason } from '../models/Appointment.model';
import Schedule from '../models/Schedule.model';
import Doctor from '../models/Doctor.model';
import User, { UserRole } from '../models/User.model';
import { BadRequestError, NotFoundError, ConflictError, ForbiddenError } from '../utils/errors';
import { logger } from '../utils/logger';
import { notifyAppointmentCreated, notifyAppointmentConfirmed, notifyAppointmentCancelled, notifyAppointmentRescheduled, notifyAppointmentCompleted } from '../notifications/notificationEmitter';
import mongoose from 'mongoose';

export interface BookAppointmentInput {
  doctor: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  type?: AppointmentType;
  symptoms?: string[];
  patientNotes?: string;
}

export interface AppointmentFilter {
  patient?: string;
  doctor?: string;
  status?: AppointmentStatus;
  type?: AppointmentType;
  startDate?: string;
  endDate?: string;
  specialization?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class AppointmentService {
  async bookAppointment(patientId: string, input: BookAppointmentInput): Promise<IAppointment> {
    const doctor = await Doctor.findOne({ user: input.doctor }).populate('user', 'firstName lastName email');
    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    const doctorUser = doctor.user as any;
    if (!doctorUser || doctorUser.status !== 'active') {
      throw new BadRequestError('Doctor is not available for appointments');
    }

    if (!doctor.acceptingNewPatients) {
      throw new BadRequestError('Doctor is not accepting new patients at this time');
    }

    const appointmentDate = new Date(input.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      throw new BadRequestError('Cannot book appointments in the past');
    }

    const schedule = await Schedule.findOne({
      doctor: input.doctor,
      isActive: true,
      effectiveFrom: { $lte: appointmentDate },
      $or: [
        { effectiveTo: { $exists: false } },
        { effectiveTo: null },
        { effectiveTo: { $gte: appointmentDate } },
      ],
    });

    if (!schedule) {
      throw new BadRequestError('Doctor does not have an active schedule for the selected date');
    }

    const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const scheduleDay = schedule.scheduleDays.find((d) => d.day === dayOfWeek);
    if (!scheduleDay || !scheduleDay.isAvailable) {
      throw new BadRequestError(`Doctor is not available on ${dayOfWeek}s`);
    }

    if (input.startTime < scheduleDay.startTime || input.endTime > scheduleDay.endTime) {
      throw new BadRequestError(
        `Selected time is outside doctor's working hours (${scheduleDay.startTime} - ${scheduleDay.endTime})`
      );
    }

    const isInBreak = scheduleDay.breaks?.some((brk) => {
      return input.startTime < brk.endTime && input.endTime > brk.startTime;
    });
    if (isInBreak) {
      throw new BadRequestError('Selected time falls within a break period');
    }

    const isUnavailable = schedule.unavailableDates.some((ud) => {
      const udDate = new Date(ud.date);
      udDate.setHours(0, 0, 0, 0);
      const aptDate = new Date(appointmentDate);
      aptDate.setHours(0, 0, 0, 0);
      if (udDate.getTime() !== aptDate.getTime()) return false;
      if (ud.isFullDay) return true;
      if (ud.startTime && ud.endTime) {
        return input.startTime < ud.endTime && input.endTime > ud.startTime;
      }
      return false;
    });
    if (isUnavailable) {
      throw new BadRequestError('Doctor is unavailable on the selected date/time');
    }

    // CRITICAL: Double-booking prevention using atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const normalizedDate = new Date(input.date);
      normalizedDate.setHours(0, 0, 0, 0);

      // Check for existing booking with overlapping time
      const existingAppointment = await Appointment.findOne({
        doctor: input.doctor,
        date: normalizedDate,
        status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED] },
        $or: [
          {
            startTime: { $lt: input.endTime },
            endTime: { $gt: input.startTime },
          },
        ],
      }).session(session);

      if (existingAppointment) {
        await session.abortTransaction();
        session.endSession();
        throw new ConflictError('This time slot is already booked. Please select a different time.');
      }

      // Check patient doesn't already have appointment at same time
      const patientConflict = await Appointment.findOne({
        patient: patientId,
        date: normalizedDate,
        status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED] },
        $or: [
          {
            startTime: { $lt: input.endTime },
            endTime: { $gt: input.startTime },
          },
        ],
      }).session(session);

      if (patientConflict) {
        await session.abortTransaction();
        session.endSession();
        throw new ConflictError('You already have an appointment at this time');
      }

      const previousAppointment = await Appointment.findOne({
        patient: patientId,
        doctor: input.doctor,
        status: AppointmentStatus.COMPLETED,
      });

      const appointment = new Appointment({
        patient: patientId,
        doctor: input.doctor,
        specialization: doctor.specialization,
        date: normalizedDate,
        startTime: input.startTime,
        endTime: input.endTime,
        duration: this.calculateDuration(input.startTime, input.endTime),
        reason: input.reason,
        type: input.type || AppointmentType.CONSULTATION,
        symptoms: input.symptoms,
        patientNotes: input.patientNotes,
        consultationFee: doctor.consultationFee,
        isFirstVisit: !previousAppointment,
        status: schedule.autoConfirm ? AppointmentStatus.CONFIRMED : AppointmentStatus.PENDING,
      });

      if (schedule.autoConfirm) {
        appointment.confirmedAt = new Date();
      }

      await appointment.save({ session });
      await session.commitTransaction();
      session.endSession();

      // Send notifications after successful booking
      const patient = await User.findById(patientId);
      const dateStr = normalizedDate.toLocaleDateString('en-US', { dateStyle: 'long' });

      if (patient) {
        await notifyAppointmentCreated(
          patientId,
          input.doctor,
          appointment._id.toString(),
          `${doctorUser.firstName} ${doctorUser.lastName}`,
          `${patient.firstName} ${patient.lastName}`,
          dateStr,
          input.startTime
        );
      }

      logger.info(`Appointment booked: ${appointment.appointmentNumber} for patient ${patientId} with doctor ${input.doctor}`);

      return appointment;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();
      throw error;
    }
  }

  async getAppointment(appointmentId: string, userId: string, userRole: string): Promise<IAppointment> {
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'firstName lastName email phone profileImage')
      .populate('doctor', 'firstName lastName email phone profileImage')
      .populate('specialization', 'name slug');

    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }

    if (
      userRole !== UserRole.ADMIN &&
      appointment.patient._id.toString() !== userId &&
      appointment.doctor._id.toString() !== userId
    ) {
      throw new ForbiddenError('You are not authorized to view this appointment');
    }

    return appointment;
  }

  async getAppointments(filters: AppointmentFilter): Promise<{
    appointments: IAppointment[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const query: any = {};

    if (filters.patient) query.patient = filters.patient;
    if (filters.doctor) query.doctor = filters.doctor;
    if (filters.status) query.status = filters.status;
    if (filters.type) query.type = filters.type;
    if (filters.specialization) query.specialization = filters.specialization;

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = new Date(filters.startDate);
      if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    const page = filters.page || 1;
    const limit = Math.min(filters.limit || 10, 100);
    const skip = (page - 1) * limit;

    const sortField = filters.sortBy || 'date';
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;

    const [appointments, total] = await Promise.all([
      Appointment.find(query)
        .populate('patient', 'firstName lastName email phone profileImage')
        .populate('doctor', 'firstName lastName email phone profileImage')
        .populate('specialization', 'name slug')
        .sort({ [sortField]: sortOrder, startTime: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Appointment.countDocuments(query),
    ]);

    return {
      appointments: appointments as unknown as IAppointment[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateAppointmentStatus(
    appointmentId: string,
    status: AppointmentStatus,
    userId: string,
    userRole: string,
    notes?: string,
    cancellationReason?: CancellationReason
  ): Promise<IAppointment> {
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'firstName lastName email')
      .populate('doctor', 'firstName lastName email');

    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }

    if (
      userRole !== UserRole.ADMIN &&
      appointment.patient._id.toString() !== userId &&
      appointment.doctor._id.toString() !== userId
    ) {
      throw new ForbiddenError('You are not authorized to update this appointment');
    }

    const validTransitions: Record<string, string[]> = {
      [AppointmentStatus.PENDING]: [AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELLED],
      [AppointmentStatus.CONFIRMED]: [AppointmentStatus.IN_PROGRESS, AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED, AppointmentStatus.NO_SHOW],
      [AppointmentStatus.IN_PROGRESS]: [AppointmentStatus.COMPLETED],
      [AppointmentStatus.COMPLETED]: [],
      [AppointmentStatus.CANCELLED]: [],
      [AppointmentStatus.RESCHEDULED]: [],
      [AppointmentStatus.NO_SHOW]: [],
    };

    const allowed = validTransitions[appointment.status] || [];
    if (!allowed.includes(status)) {
      throw new BadRequestError(
        `Cannot change status from '${appointment.status}' to '${status}'`
      );
    }

    appointment.status = status;
    appointment.statusHistory.push({
      status,
      changedAt: new Date(),
      changedBy: new mongoose.Types.ObjectId(userId),
      reason: notes,
    });

    if (status === AppointmentStatus.CONFIRMED) {
      appointment.confirmedAt = new Date();
      appointment.confirmedBy = new mongoose.Types.ObjectId(userId);
    } else if (status === AppointmentStatus.COMPLETED) {
      appointment.completedAt = new Date();
    } else if (status === AppointmentStatus.CANCELLED) {
      appointment.cancelledAt = new Date();
      appointment.cancelledBy = new mongoose.Types.ObjectId(userId);
      appointment.cancellationReason = cancellationReason || CancellationReason.OTHER;
      appointment.cancellationNotes = notes;
    }

    if (notes) {
      appointment.notes = notes;
    }

    await appointment.save();

    // Send notifications
    const patientUser = appointment.patient as any;
    const doctorUser = appointment.doctor as any;
    const dateStr = appointment.date.toLocaleDateString('en-US', { dateStyle: 'long' });

    if (status === AppointmentStatus.CONFIRMED) {
      await notifyAppointmentConfirmed(
        patientUser._id.toString(),
        appointmentId,
        `${doctorUser.firstName} ${doctorUser.lastName}`,
        dateStr,
        appointment.startTime
      );
    } else if (status === AppointmentStatus.CANCELLED) {
      const cancellerName = userId === patientUser._id.toString()
        ? `${patientUser.firstName} ${patientUser.lastName}`
        : `Dr. ${doctorUser.firstName} ${doctorUser.lastName}`;

      const recipientId = userId === patientUser._id.toString()
        ? doctorUser._id.toString()
        : patientUser._id.toString();

      await notifyAppointmentCancelled(recipientId, appointmentId, cancellerName, dateStr, appointment.startTime, notes);
    } else if (status === AppointmentStatus.COMPLETED) {
      await notifyAppointmentCompleted(patientUser._id.toString(), appointmentId, `${doctorUser.firstName} ${doctorUser.lastName}`);
    }

    logger.info(`Appointment ${appointmentId} status updated to ${status} by ${userId}`);
    return appointment;
  }

  async rescheduleAppointment(
    appointmentId: string,
    userId: string,
    userRole: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string,
    reason?: string
  ): Promise<IAppointment> {
    const oldAppointment = await Appointment.findById(appointmentId)
      .populate('patient', 'firstName lastName email')
      .populate('doctor', 'firstName lastName email');

    if (!oldAppointment) {
      throw new NotFoundError('Appointment not found');
    }

    if (
      userRole !== UserRole.ADMIN &&
      oldAppointment.patient._id.toString() !== userId &&
      oldAppointment.doctor._id.toString() !== userId
    ) {
      throw new ForbiddenError('You are not authorized to reschedule this appointment');
    }

    if ([AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED].includes(oldAppointment.status)) {
      throw new BadRequestError(`Cannot reschedule an appointment with status '${oldAppointment.status}'`);
    }

    // Book new appointment
    const newAppointment = await this.bookAppointment(
      oldAppointment.patient._id.toString(),
      {
        doctor: oldAppointment.doctor._id.toString(),
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
        reason: oldAppointment.reason,
        type: oldAppointment.type,
        symptoms: oldAppointment.symptoms,
        patientNotes: reason || oldAppointment.patientNotes,
      }
    );

    // Update old appointment
    oldAppointment.status = AppointmentStatus.RESCHEDULED;
    oldAppointment.rescheduledTo = newAppointment._id;
    oldAppointment.statusHistory.push({
      status: AppointmentStatus.RESCHEDULED,
      changedAt: new Date(),
      changedBy: new mongoose.Types.ObjectId(userId),
      reason: reason || 'Appointment rescheduled',
    });
    await oldAppointment.save();

    newAppointment.rescheduledFrom = oldAppointment._id;
    await newAppointment.save();

    // Notifications
    const patientUser = oldAppointment.patient as any;
    const doctorUser = oldAppointment.doctor as any;
    const reschedulerName = userId === patientUser._id.toString()
      ? `${patientUser.firstName} ${patientUser.lastName}`
      : `Dr. ${doctorUser.firstName} ${doctorUser.lastName}`;

    const recipientId = userId === patientUser._id.toString()
      ? doctorUser._id.toString()
      : patientUser._id.toString();

    const oldDateStr = oldAppointment.date.toLocaleDateString('en-US', { dateStyle: 'long' });
    const newDateStr = new Date(newDate).toLocaleDateString('en-US', { dateStyle: 'long' });

    await notifyAppointmentRescheduled(
      recipientId,
      newAppointment._id.toString(),
      reschedulerName,
      oldDateStr,
      oldAppointment.startTime,
      newDateStr,
      newStartTime
    );

    logger.info(`Appointment ${appointmentId} rescheduled to ${newAppointment.appointmentNumber}`);
    return newAppointment;
  }

  async getAvailableSlots(
    doctorId: string,
    date: string
  ): Promise<{ slots: { startTime: string; endTime: string; available: boolean }[] }> {
    const schedule = await Schedule.findOne({
      doctor: doctorId,
      isActive: true,
    });

    if (!schedule) {
      return { slots: [] };
    }

    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const scheduleDay = schedule.scheduleDays.find((d) => d.day === dayOfWeek);

    if (!scheduleDay || !scheduleDay.isAvailable) {
      return { slots: [] };
    }

    // Check if date is in unavailable dates
    const isUnavailable = schedule.unavailableDates.some((ud) => {
      const udDate = new Date(ud.date);
      udDate.setHours(0, 0, 0, 0);
      const aptDate = new Date(appointmentDate);
      aptDate.setHours(0, 0, 0, 0);
      return udDate.getTime() === aptDate.getTime() && ud.isFullDay;
    });

    if (isUnavailable) {
      return { slots: [] };
    }

    // Generate time slots
    const slots = this.generateTimeSlots(
      scheduleDay.startTime,
      scheduleDay.endTime,
      schedule.slotDuration,
      schedule.bufferTime,
      scheduleDay.breaks
    );

    // Get existing appointments for the date
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const existingAppointments = await Appointment.find({
      doctor: doctorId,
      date: normalizedDate,
      status: { $nin: [AppointmentStatus.CANCELLED, AppointmentStatus.RESCHEDULED] },
    }).select('startTime endTime');

    // Mark booked slots
    const slotsWithAvailability = slots.map((slot) => {
      const isBooked = existingAppointments.some(
        (apt) => apt.startTime === slot.startTime && apt.endTime === slot.endTime
      );

      const isInPast = this.isSlotInPast(date, slot.startTime);

      return {
        ...slot,
        available: !isBooked && !isInPast,
      };
    });

    return { slots: slotsWithAvailability };
  }

  async getPatientAppointments(
    patientId: string,
    filters: Partial<AppointmentFilter>
  ) {
    return this.getAppointments({ ...filters, patient: patientId });
  }

  async getDoctorAppointments(
    doctorId: string,
    filters: Partial<AppointmentFilter>
  ) {
    return this.getAppointments({ ...filters, doctor: doctorId });
  }

  async getUpcomingAppointments(userId: string, role: string, limit: number = 5) {
    const query: any = {
      date: { $gte: new Date() },
      status: { $in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED] },
    };

    if (role === UserRole.PATIENT) {
      query.patient = userId;
    } else if (role === UserRole.DOCTOR) {
      query.doctor = userId;
    }

    return Appointment.find(query)
      .populate('patient', 'firstName lastName email phone profileImage')
      .populate('doctor', 'firstName lastName email phone profileImage')
      .populate('specialization', 'name')
      .sort({ date: 1, startTime: 1 })
      .limit(limit)
      .lean();
  }

  async getAppointmentStats(userId?: string, role?: string) {
    const matchStage: any = {};
    if (userId && role === UserRole.DOCTOR) matchStage.doctor = new mongoose.Types.ObjectId(userId);
    if (userId && role === UserRole.PATIENT) matchStage.patient = new mongoose.Types.ObjectId(userId);

    const stats = await Appointment.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const result: Record<string, number> = {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      rescheduled: 0,
      no_show: 0,
      in_progress: 0,
    };

    stats.forEach((s) => {
      result[s._id] = s.count;
      result.total += s.count;
    });

    return result;
  }

  private generateTimeSlots(
    startTime: string,
    endTime: string,
    duration: number,
    buffer: number,
    breaks: { startTime: string; endTime: string }[] = []
  ): { startTime: string; endTime: string }[] {
    const slots: { startTime: string; endTime: string }[] = [];
    let currentTime = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    while (currentTime + duration <= end) {
      const slotStart = this.minutesToTime(currentTime);
      const slotEnd = this.minutesToTime(currentTime + duration);

      const isInBreak = breaks.some((brk) => {
        const breakStart = this.timeToMinutes(brk.startTime);
        const breakEnd = this.timeToMinutes(brk.endTime);
        return currentTime < breakEnd && currentTime + duration > breakStart;
      });

      if (!isInBreak) {
        slots.push({ startTime: slotStart, endTime: slotEnd });
      }

      currentTime += duration + buffer;
    }

    return slots;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  private calculateDuration(startTime: string, endTime: string): number {
    return this.timeToMinutes(endTime) - this.timeToMinutes(startTime);
  }

  private isSlotInPast(date: string, time: string): boolean {
    const now = new Date();
    const slotDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    slotDate.setHours(hours, minutes, 0, 0);
    return slotDate < now;
  }
}

export default new AppointmentService();
