import { Request, Response, NextFunction } from 'express';

/**
 * In-Memory Response Caching Middleware
 * Used to optimize read-heavy, low-churn endpoints (like dropdown lists or basic profiles)
 */
const cacheStore = new Map<string, { expiry: number; data: any }>();

export const cacheMiddleware = (ttlSeconds: number = 60) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const cacheKey = `__express__${req.originalUrl || req.url}`;
        const cachedResponse = cacheStore.get(cacheKey);

        if (cachedResponse && cachedResponse.expiry > Date.now()) {
            // Serve from cache
            res.setHeader('X-Cache', 'HIT');
            res.status(200).json(cachedResponse.data);
            return;
        }

        // Cache miss
        res.setHeader('X-Cache', 'MISS');
        
        // Hook into res.json to capture and store the response data
        const originalJson = res.json;
        res.json = function (body: any): Response {
            cacheStore.set(cacheKey, {
                expiry: Date.now() + (ttlSeconds * 1000),
                data: body
            });
            return originalJson.call(this, body);
        };

        next();
    };
};

/**
 * Utility to manually invalidate cache for a specific route
 */
export const clearCache = (routePattern: string): void => {
    for (const key of cacheStore.keys()) {
        if (key.includes(routePattern)) {
            cacheStore.delete(key);
        }
    }
};
