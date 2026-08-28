export class SearchUtil {
    /**
     * Fuzzy matching for patient/doctor names
     */
    public static fuzzyMatch(query: string, items: string[]): string[] {
        const lowerQuery = query.toLowerCase();
        return items.filter(item => item.toLowerCase().includes(lowerQuery));
    }

    /**
     * Build standard MongoDB filter object from request query
     */
    public static buildFilter(query: any): any {
        const filter: any = {};
        if (query.status) filter.status = query.status;
        if (query.startDate && query.endDate) {
            filter.date = { $gte: new Date(query.startDate), $lte: new Date(query.endDate) };
        }
        return filter;
    }
}
