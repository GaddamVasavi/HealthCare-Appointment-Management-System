export class ReportService {
    public async generateClinicalReport(params: any): Promise<any> { return { content: 'Clinical Report' }; }
    public async generateFinancialReport(params: any): Promise<any> { return { content: 'Financial Report' }; }
    public async exportAsCSV(data: any[]): Promise<string> { return 'csv,data'; }
}
