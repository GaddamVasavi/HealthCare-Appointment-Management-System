export class NotificationService {
    public async getAll(userId: string): Promise<any[]> {
        return [];
    }

    public async markRead(id: string): Promise<any> {
        return { id, read: true };
    }

    public async markAllRead(userId: string): Promise<any> {
        return { success: true };
    }

    public async getUnreadCount(userId: string): Promise<number> {
        return 0;
    }

    public async create(data: any): Promise<any> {
        return { id: `NOT-${Date.now()}`, ...data };
    }

    public async delete(id: string): Promise<void> {}

    public async getByType(userId: string, type: string): Promise<any[]> {
        return [];
    }
}
