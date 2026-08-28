export class AnalyticsUtil {
    /**
     * Calculate 7-day moving average
     */
    public static calculateMovingAverage(data: number[], window: number = 7): number[] {
        const result: number[] = [];
        for (let i = 0; i < data.length; i++) {
            if (i < window - 1) {
                result.push(0);
                continue;
            }
            let sum = 0;
            for (let j = 0; j < window; j++) sum += data[i - j];
            result.push(sum / window);
        }
        return result;
    }

    /**
     * Calculate growth rate percentage
     */
    public static calculateGrowthRate(current: number, previous: number): number {
        if (previous === 0) return 100;
        return ((current - previous) / previous) * 100;
    }
}
