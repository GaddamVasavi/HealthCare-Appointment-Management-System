/**
 * Database Utilities Module
 * 
 * Provides comprehensive database operation helpers including connection pooling,
 * transaction management, query building, data migration utilities, and
 * performance optimization functions.
 */

import mongoose, { Connection, Session } from 'mongoose';
import { logger } from './logger';
import { BadRequestError } from './errors';

export interface DatabaseConfig {
  uri: string;
  maxPoolSize: number;
  minPoolSize: number;
  maxIdleTimeMS: number;
  serverSelectionTimeoutMS: number;
  socketTimeoutMS: number;
  retryWrites: boolean;
  readPreference: string;
}

export interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: Record<string, 1 | -1>;
  select?: string[];
  populate?: string | string[];
  lean?: boolean;
  timeout?: number;
}

export class DatabaseUtility {
  private static instance: DatabaseUtility;
  private connection: Connection | null = null;
  private sessions: Map<string, Session> = new Map();
  private queryCache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): DatabaseUtility {
    if (!DatabaseUtility.instance) {
      DatabaseUtility.instance = new DatabaseUtility();
    }
    return DatabaseUtility.instance;
  }

  /**
   * Initialize database connection with connection pooling
   */
  async initializeConnection(config: DatabaseConfig): Promise<Connection> {
    try {
      logger.info('Initializing database connection pool');

      const options = {
        maxPoolSize: config.maxPoolSize || 10,
        minPoolSize: config.minPoolSize || 5,
        maxIdleTimeMS: config.maxIdleTimeMS || 60000,
        serverSelectionTimeoutMS: config.serverSelectionTimeoutMS || 5000,
        socketTimeoutMS: config.socketTimeoutMS || 45000,
        retryWrites: config.retryWrites !== false,
        readPreference: config.readPreference || 'primary',
        useNewUrlParser: true,
        useUnifiedTopology: true
      };

      this.connection = await mongoose.createConnection(config.uri, options);

      this.connection.on('connected', () => {
        logger.info('Database connection established');
      });

      this.connection.on('error', (error) => {
        logger.error(`Database connection error: ${error}`);
      });

      this.connection.on('disconnected', () => {
        logger.warn('Database connection disconnected');
      });

      return this.connection;
    } catch (error) {
      logger.error(`Failed to initialize database connection: ${error}`);
      throw error;
    }
  }

  /**
   * Start a database session for transactions
   */
  async startSession(): Promise<Session> {
    try {
      if (!this.connection) {
        throw new Error('Database connection not initialized');
      }

      const session = await this.connection.startSession();
      const sessionId = this.generateSessionId();
      this.sessions.set(sessionId, session);

      logger.info(`Database session started: ${sessionId}`);
      return session;
    } catch (error) {
      logger.error(`Failed to start database session: ${error}`);
      throw error;
    }
  }

  /**
   * End a database session
   */
  async endSession(sessionId: string): Promise<void> {
    try {
      const session = this.sessions.get(sessionId);
      if (session) {
        await session.endSession();
        this.sessions.delete(sessionId);
        logger.info(`Database session ended: ${sessionId}`);
      }
    } catch (error) {
      logger.error(`Failed to end database session: ${error}`);
      throw error;
    }
  }

  /**
   * Build a MongoDB query with filters, sorting, and pagination
   */
  buildQuery(
    model: any,
    filters: Record<string, any>,
    options: QueryOptions = {}
  ): any {
    let query = model.find(filters);

    if (options.select) {
      query = query.select(options.select.join(' '));
    }

    if (options.populate) {
      const populateFields = Array.isArray(options.populate) ? options.populate : [options.populate];
      populateFields.forEach(field => {
        query = query.populate(field);
      });
    }

    if (options.sort) {
      query = query.sort(options.sort);
    }

    if (options.skip) {
      query = query.skip(options.skip);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.lean) {
      query = query.lean();
    }

    return query;
  }

  /**
   * Execute query with caching
   */
  async executeQueryWithCache(
    cacheKey: string,
    query: any,
    ttl: number = this.CACHE_TTL
  ): Promise<any> {
    try {
      // Check cache first
      const cached = this.queryCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < ttl) {
        logger.info(`Cache hit for query: ${cacheKey}`);
        return cached.data;
      }

      // Execute query
      const data = await query.exec();

      // Cache result
      this.queryCache.set(cacheKey, { data, timestamp: Date.now() });

      logger.info(`Query executed and cached: ${cacheKey}`);
      return data;
    } catch (error) {
      logger.error(`Failed to execute query with cache: ${error}`);
      throw error;
    }
  }

  /**
   * Invalidate cache for a key pattern
   */
  invalidateCache(pattern?: string): void {
    try {
      if (pattern) {
        const regex = new RegExp(pattern);
        let count = 0;
        for (const key of this.queryCache.keys()) {
          if (regex.test(key)) {
            this.queryCache.delete(key);
            count++;
          }
        }
        logger.info(`Invalidated ${count} cache entries matching pattern: ${pattern}`);
      } else {
        this.queryCache.clear();
        logger.info('Cache cleared');
      }
    } catch (error) {
      logger.error(`Failed to invalidate cache: ${error}`);
    }
  }

  /**
   * Execute bulk operations
   */
  async executeBulkOperations(
    model: any,
    operations: Array<{
      updateOne?: { filter: any; update: any; upsert?: boolean };
      deleteOne?: { filter: any };
      insertOne?: { document: any };
    }>
  ): Promise<any> {
    try {
      if (operations.length === 0) {
        throw new BadRequestError('No operations provided');
      }

      const bulk = model.collection.initializeUnorderedBulkOp();

      for (const op of operations) {
        if (op.updateOne) {
          bulk.find(op.updateOne.filter).updateOne(op.updateOne.update);
        } else if (op.deleteOne) {
          bulk.find(op.deleteOne.filter).deleteOne();
        } else if (op.insertOne) {
          bulk.insert(op.insertOne.document);
        }
      }

      const result = await bulk.execute();
      logger.info(`Bulk operations executed: ${result.nModified} modified, ${result.nInserted} inserted, ${result.nRemoved} removed`);
      return result;
    } catch (error) {
      logger.error(`Failed to execute bulk operations: ${error}`);
      throw error;
    }
  }

  /**
   * Create indexes for performance
   */
  async createIndexes(model: any, indexes: Array<{ fields: Record<string, 1 | -1>; options?: any }>): Promise<void> {
    try {
      for (const index of indexes) {
        await model.collection.createIndex(index.fields, index.options || {});
        logger.info(`Index created: ${JSON.stringify(index.fields)}`);
      }
    } catch (error) {
      logger.error(`Failed to create indexes: ${error}`);
      throw error;
    }
  }

  /**
   * Aggregate data using MongoDB aggregation pipeline
   */
  async aggregate(model: any, pipeline: any[]): Promise<any[]> {
    try {
      const result = await model.aggregate(pipeline).exec();
      logger.info(`Aggregation executed: ${result.length} results`);
      return result;
    } catch (error) {
      logger.error(`Failed to execute aggregation: ${error}`);
      throw error;
    }
  }

  /**
   * Get collection statistics
   */
  async getCollectionStats(model: any): Promise<any> {
    try {
      const stats = {
        count: await model.countDocuments(),
        estimatedSize: await model.collection.stats(),
        indexes: await model.collection.getIndexes(),
        name: model.collection.name
      };

      logger.info(`Collection stats retrieved for ${stats.name}`);
      return stats;
    } catch (error) {
      logger.error(`Failed to get collection stats: ${error}`);
      throw error;
    }
  }

  /**
   * Backup collection data
   */
  async backupCollection(model: any, format: 'json' = 'json'): Promise<string> {
    try {
      const data = await model.find({}).lean().exec();
      const backup = {
        collection: model.collection.name,
        timestamp: new Date(),
        count: data.length,
        data: data
      };

      logger.info(`Collection backup created: ${model.collection.name} with ${data.length} documents`);
      return JSON.stringify(backup, null, 2);
    } catch (error) {
      logger.error(`Failed to backup collection: ${error}`);
      throw error;
    }
  }

  /**
   * Restore collection from backup
   */
  async restoreCollection(model: any, backupData: string): Promise<number> {
    try {
      const backup = JSON.parse(backupData);
      
      if (!Array.isArray(backup.data)) {
        throw new BadRequestError('Invalid backup format');
      }

      // Delete existing data
      await model.deleteMany({});

      // Insert backup data
      const result = await model.insertMany(backup.data);

      logger.info(`Collection restored: ${model.collection.name} with ${result.length} documents`);
      return result.length;
    } catch (error) {
      logger.error(`Failed to restore collection: ${error}`);
      throw error;
    }
  }

  /**
   * Monitor query performance
   */
  async monitorQueryPerformance(model: any, query: any): Promise<{ query: any; executionTime: number; resultCount: number }> {
    try {
      const startTime = Date.now();
      const results = await query.exec();
      const executionTime = Date.now() - startTime;

      logger.info(`Query executed in ${executionTime}ms, returned ${results.length} results`);

      return {
        query: query.getOptions(),
        executionTime,
        resultCount: results.length
      };
    } catch (error) {
      logger.error(`Failed to monitor query performance: ${error}`);
      throw error;
    }
  }

  /**
   * Connection health check
   */
  async checkConnectionHealth(): Promise<boolean> {
    try {
      if (!this.connection) {
        logger.warn('No database connection established');
        return false;
      }

      const healthCheck = await this.connection.db.admin().ping();
      logger.info('Database connection health check passed');
      return true;
    } catch (error) {
      logger.error(`Database connection health check failed: ${error}`);
      return false;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect(): Promise<void> {
    try {
      if (this.connection) {
        await this.connection.close();
        this.connection = null;
        logger.info('Database connection closed');
      }

      // Clean up all sessions
      for (const [sessionId, session] of this.sessions) {
        await session.endSession();
      }
      this.sessions.clear();

      // Clear cache
      this.queryCache.clear();
    } catch (error) {
      logger.error(`Failed to disconnect from database: ${error}`);
      throw error;
    }
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Paginate results
   */
  static paginate(results: any[], page: number = 1, limit: number = 20): {
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  } {
    const total = results.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = results.slice(start, end);
    const pages = Math.ceil(total / limit);

    return {
      data,
      pagination: { page, limit, total, pages }
    };
  }

  /**
   * Sort results by multiple fields
   */
  static sortBy(results: any[], sortFields: Record<string, 1 | -1>): any[] {
    return results.sort((a, b) => {
      for (const [field, order] of Object.entries(sortFields)) {
        if (a[field] < b[field]) return order === 1 ? -1 : 1;
        if (a[field] > b[field]) return order === 1 ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * Group results by field
   */
  static groupBy(results: any[], field: string): Map<any, any[]> {
    const groups = new Map<any, any[]>();

    results.forEach(item => {
      const key = item[field];
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(item);
    });

    return groups;
  }
}

export const databaseUtility = DatabaseUtility.getInstance();
