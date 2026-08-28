/**
 * Date Utilities
 * Helper functions for date manipulation, timezone conversion, etc.
 */

export class DateUtil {
    /**
     * Check if a given date is a business day (Monday-Friday)
     */
    public static isBusinessDay(date: Date): boolean {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    }

    /**
     * Add days to a given date
     */
    public static addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Calculate age from birthdate
     */
    public static calculateAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    /**
     * Generate 30-minute time slots for a given start and end time
     */
    public static generateTimeSlots(startTime: string, endTime: string, intervalMinutes: number = 30): string[] {
        const slots: string[] = [];
        const start = new Date(`2000-01-01T${startTime}:00`);
        const end = new Date(`2000-01-01T${endTime}:00`);

        let current = start;
        while (current < end) {
            const timeString = current.toTimeString().substring(0, 5);
            slots.push(timeString);
            current = new Date(current.getTime() + intervalMinutes * 60000);
        }

        return slots;
    }

    /**
     * Format date to YYYY-MM-DD
     */
    public static formatDate(date: Date): string {
        return date.toISOString().split('T')[0];
    }
}
