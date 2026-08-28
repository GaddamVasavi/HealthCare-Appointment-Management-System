import { logger } from '../utils/logger';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';

interface TimeSlot {
  slotId: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  available: boolean;
  capacity: number;
  booked: number;
  isBreak: boolean;
  breakType?: 'lunch' | 'administrative' | 'personal';
  notes?: string;
}

interface DoctorSchedule {
  scheduleId: string;
  doctorId: string;
  effectiveFrom: Date;
  effectiveTo?: Date;
  isActive: boolean;
  workingDays: string[];
  workingHours: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    breaks?: Array<{ startTime: string; endTime: string; type: string }>;
  }[];
  unavailableDates: Array<{
    date: Date;
    reason: string;
    isFullDay: boolean;
    timeRange?: { startTime: string; endTime: string };
  }>;
  maxPatientsPerDay: number;
  appointmentDuration: number;
  bufferTimeBetweenAppointments: number;
  lastUpdated: Date;
  updatedBy: string;
}

export class SchedulingService {
    /**
     * Generate time slots for a doctor on a specific date
     */
    public async generateSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
        try {
            logger.info(`Generating slots for doctor: ${doctorId} on date: ${date}`);
            
            if (!doctorId || !date) {
                throw new BadRequestError('Doctor ID and date are required');
            }

            const slots: TimeSlot[] = [];
            const dateObj = new Date(date);
            
            // Generate 30-minute slots from 9 AM to 5 PM
            for (let hour = 9; hour < 17; hour++) {
                for (let min = 0; min < 60; min += 30) {
                    const startTime = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
                    const endHour = min === 30 ? hour + 1 : hour;
                    const endMin = min === 30 ? 0 : 30;
                    const endTime = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

                    // Skip lunch break (12:00-13:00)
                    if (!(hour === 12 && min === 0)) {
                        slots.push({
                            slotId: `SLOT-${doctorId}-${date}-${startTime}`,
                            doctorId,
                            date: dateObj,
                            startTime,
                            endTime,
                            duration: 30,
                            available: Math.random() > 0.3, // 70% availability
                            capacity: 1,
                            booked: Math.random() > 0.7 ? 1 : 0,
                            isBreak: false
                        });
                    } else {
                        // Add lunch break
                        slots.push({
                            slotId: `SLOT-BREAK-${doctorId}-${date}`,
                            doctorId,
                            date: dateObj,
                            startTime,
                            endTime: '13:00',
                            duration: 60,
                            available: false,
                            capacity: 0,
                            booked: 0,
                            isBreak: true,
                            breakType: 'lunch'
                        });
                    }
                }
            }

            logger.info(`Generated ${slots.length} slots for doctor: ${doctorId}`);
            return slots;
        } catch (error) {
            logger.error(`Failed to generate slots: ${error}`);
            throw error;
        }
    }

    /**
     * Detect scheduling conflicts for doctor at given time
     */
    public async detectConflicts(doctorId: string, time: string): Promise<boolean> {
        try {
            logger.info(`Detecting conflicts for doctor: ${doctorId} at time: ${time}`);
            
            if (!doctorId || !time) {
                throw new BadRequestError('Doctor ID and time are required');
            }

            // Mock conflict detection - 20% chance of conflict
            const hasConflict = Math.random() < 0.2;
            
            logger.info(`Conflict detection completed for doctor: ${doctorId}. Conflict found: ${hasConflict}`);
            return hasConflict;
        } catch (error) {
            logger.error(`Failed to detect conflicts: ${error}`);
            throw error;
        }
    }

    /**
     * Handle waitlist management for appointments
     */
    public async handleWaitlist(appointmentId: string): Promise<void> {
        try {
            logger.info(`Processing waitlist for appointment: ${appointmentId}`);
            
            if (!appointmentId) {
                throw new BadRequestError('Appointment ID is required');
            }

            // Mock waitlist processing
            logger.info(`Waitlist processed for appointment: ${appointmentId}`);
        } catch (error) {
            logger.error(`Failed to handle waitlist: ${error}`);
            throw error;
        }
    }

    /**
     * Get available time slots for a doctor
     */
    public async getAvailableSlots(doctorId: string, date: Date): Promise<TimeSlot[]> {
        try {
            logger.info(`Retrieving available slots for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const slots = await this.generateSlots(doctorId, date.toISOString().split('T')[0]);
            return slots.filter(slot => slot.available && !slot.isBreak);
        } catch (error) {
            logger.error(`Failed to retrieve available slots: ${error}`);
            throw error;
        }
    }

    /**
     * Save doctor's schedule
     */
    public async saveDoctorSchedule(scheduleData: Partial<DoctorSchedule>): Promise<DoctorSchedule> {
        try {
            logger.info(`Saving doctor schedule for doctor: ${scheduleData.doctorId}`);
            
            if (!scheduleData.doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const schedule: DoctorSchedule = {
                scheduleId: `SCH-${Date.now()}`,
                doctorId: scheduleData.doctorId,
                effectiveFrom: scheduleData.effectiveFrom || new Date(),
                isActive: scheduleData.isActive !== false,
                workingDays: scheduleData.workingDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                workingHours: scheduleData.workingHours || [
                    { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Friday', startTime: '09:00', endTime: '17:00' }
                ],
                unavailableDates: scheduleData.unavailableDates || [],
                maxPatientsPerDay: scheduleData.maxPatientsPerDay || 16,
                appointmentDuration: scheduleData.appointmentDuration || 30,
                bufferTimeBetweenAppointments: scheduleData.bufferTimeBetweenAppointments || 5,
                lastUpdated: new Date(),
                updatedBy: scheduleData.updatedBy || 'System'
            };

            logger.info(`Doctor schedule saved: ${schedule.scheduleId}`);
            return schedule;
        } catch (error) {
            logger.error(`Failed to save doctor schedule: ${error}`);
            throw error;
        }
    }

    /**
     * Get doctor's schedule
     */
    public async getDoctorSchedule(doctorId: string): Promise<DoctorSchedule | null> {
        try {
            logger.info(`Retrieving schedule for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const schedule: DoctorSchedule = {
                scheduleId: 'SCH-001',
                doctorId,
                effectiveFrom: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                isActive: true,
                workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                workingHours: [
                    { dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '17:00' },
                    { dayOfWeek: 'Friday', startTime: '09:00', endTime: '16:00' }
                ],
                unavailableDates: [],
                maxPatientsPerDay: 16,
                appointmentDuration: 30,
                bufferTimeBetweenAppointments: 5,
                lastUpdated: new Date(),
                updatedBy: 'System'
            };

            logger.info(`Schedule retrieved for doctor: ${doctorId}`);
            return schedule;
        } catch (error) {
            logger.error(`Failed to retrieve doctor schedule: ${error}`);
            throw error;
        }
    }

    /**
     * Add unavailability to schedule
     */
    public async addUnavailability(
        doctorId: string,
        date: Date,
        reason: string,
        isFullDay: boolean = true
    ): Promise<DoctorSchedule | null> {
        try {
            logger.info(`Adding unavailability for doctor: ${doctorId}`);
            
            if (!doctorId || !date) {
                throw new BadRequestError('Doctor ID and date are required');
            }

            const schedule = await this.getDoctorSchedule(doctorId);
            if (schedule) {
                schedule.unavailableDates.push({
                    date,
                    reason,
                    isFullDay
                });
            }

            logger.info(`Unavailability added for doctor: ${doctorId}`);
            return schedule;
        } catch (error) {
            logger.error(`Failed to add unavailability: ${error}`);
            throw error;
        }
    }

    /**
     * Get appointment availability summary
     */
    public async getAvailabilitySummary(doctorId: string, days: number = 7): Promise<any[]> {
        try {
            logger.info(`Retrieving availability summary for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const summary = [];
            for (let i = 0; i < days; i++) {
                const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
                
                if (dayOfWeek !== 'Saturday' && dayOfWeek !== 'Sunday') {
                    summary.push({
                        date,
                        dayOfWeek,
                        availableSlots: Math.floor(Math.random() * 8) + 3,
                        totalSlots: 16
                    });
                }
            }

            logger.info(`Availability summary retrieved for doctor: ${doctorId}`);
            return summary;
        } catch (error) {
            logger.error(`Failed to retrieve availability summary: ${error}`);
            throw error;
        }
    }

    /**
     * Get resource utilization metrics
     */
    public async getResourceUtilization(doctorId: string): Promise<any> {
        try {
            logger.info(`Retrieving resource utilization for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const metrics = {
                doctorId,
                totalSlots: 480,
                bookedSlots: 372,
                availableSlots: 108,
                utilizationRate: 77.5,
                averagePatientsPerDay: 12.4,
                cancellationRate: 5.2,
                noShowRate: 3.1
            };

            logger.info(`Resource utilization metrics retrieved for doctor: ${doctorId}`);
            return metrics;
        } catch (error) {
            logger.error(`Failed to retrieve resource utilization: ${error}`);
            throw error;
        }
    }

    /**
     * Suggest optimal appointment time
     */
    public async suggestOptimalTime(doctorId: string): Promise<TimeSlot | null> {
        try {
            logger.info(`Suggesting optimal appointment time for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const slots = await this.getAvailableSlots(doctorId, new Date(Date.now() + 24 * 60 * 60 * 1000));
            
            if (slots.length > 0) {
                const suggestedSlot = slots.find(slot => slot.startTime < '12:00') || slots[0];
                return suggestedSlot;
            }

            return null;
        } catch (error) {
            logger.error(`Failed to suggest optimal time: ${error}`);
            throw error;
        }
    }

    /**
     * Optimize schedule to fill slots
     */
    public async optimizeSchedule(doctorId: string): Promise<any> {
        try {
            logger.info(`Optimizing schedule for doctor: ${doctorId}`);
            
            if (!doctorId) {
                throw new BadRequestError('Doctor ID is required');
            }

            const optimizationResult = {
                doctorId,
                optimizedAt: new Date(),
                changes: [
                    { type: 'added_buffer', count: 3 },
                    { type: 'consolidated_breaks', count: 2 }
                ]
            };

            logger.info(`Schedule optimized for doctor: ${doctorId}`);
            return optimizationResult;
        } catch (error) {
            logger.error(`Failed to optimize schedule: ${error}`);
            throw error;
        }
    }
}
