export class DocumentService {
    public async uploadFile(file: any): Promise<any> { return { id: 'DOC-1', url: '/url' }; }
    public async downloadFile(id: string): Promise<any> { return Buffer.from(''); }
    public async logAccess(docId: string, userId: string): Promise<void> {}
}
