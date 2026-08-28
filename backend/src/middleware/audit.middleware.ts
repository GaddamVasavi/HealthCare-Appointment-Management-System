import { Request, Response, NextFunction } from 'express';

/**
 * Audit Middleware
 * Logs all data modifications (POST, PUT, PATCH, DELETE) to an audit trail
 */
export const auditMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Only audit modifying requests
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        const originalSend = res.send;
        const userId = req.user?.id || 'anonymous';
        const action = `${req.method} ${req.originalUrl}`;
        const ipAddress = req.ip || req.connection.remoteAddress;

        // Hook into response to log status
        res.send = function (body: any): Response {
            // Log audit record asynchronously
            console.log(`[AUDIT] User: ${userId} | Action: ${action} | IP: ${ipAddress} | Status: ${res.statusCode}`);
            
            // In a real application, save to AuditLog model:
            // AuditLog.create({ userId, action, resource: req.baseUrl, ipAddress, statusCode: res.statusCode, timestamp: new Date() })

            return originalSend.call(this, body);
        };
    }
    
    next();
};
