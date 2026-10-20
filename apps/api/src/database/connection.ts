import mongoose from 'mongoose';
import { DatabaseStatus } from '@wandersphere/contracts';
import { env } from '../config/env';

let isConnecting = false;

/**
 * Strips credentials from a MongoDB connection string for safe logging.
 */
export function sanitizeMongoUri(uri: string): string {
  if (!uri) return '[not configured]';
  return uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
}

export async function connectDb(): Promise<boolean> {
  if (!env.MONGODB_URI) {
    if (env.MONGODB_REQUIRED) {
      console.error(
        'MongoDB is marked as required (MONGODB_REQUIRED=true), but MONGODB_URI is empty.',
      );
      return false;
    }
    console.info('MongoDB URI not configured. Running in database-independent mode.');
    return false;
  }

  if (mongoose.connection.readyState === 1 || isConnecting) {
    return true;
  }

  isConnecting = true;
  const safeTarget = sanitizeMongoUri(env.MONGODB_URI);

  try {
    console.info(`Attempting to connect to MongoDB at ${safeTarget}...`);

    mongoose.connection.on('connected', () => {
      console.info('MongoDB connection established successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error occurred:', err.message || 'Unknown error');
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: env.MONGODB_TIMEOUT_MS,
      connectTimeoutMS: env.MONGODB_TIMEOUT_MS,
    });

    isConnecting = false;
    return true;
  } catch (error) {
    isConnecting = false;
    const msg = error instanceof Error ? error.message : 'Unknown connection error';
    console.error(`Failed to connect to MongoDB (${safeTarget}): ${msg}`);

    if (env.MONGODB_REQUIRED) {
      console.error(
        'CRITICAL: MONGODB_REQUIRED is true. Exiting process due to connection failure.',
      );
      process.exit(1);
    }

    return false;
  }
}

export async function disconnectDb(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    try {
      console.info('Closing MongoDB connection gracefully...');
      await mongoose.disconnect();
      console.info('MongoDB disconnected.');
    } catch (error) {
      console.error(
        'Error during MongoDB disconnection:',
        error instanceof Error ? error.message : error,
      );
    }
  }
}

export interface DbHealthResult {
  status: DatabaseStatus;
  latencyMs?: number;
  message?: string;
}

export async function checkDbHealth(): Promise<DbHealthResult> {
  if (!env.MONGODB_URI) {
    return {
      status: 'not_configured',
      message: 'MongoDB URI is not configured in environment',
    };
  }

  if (mongoose.connection.readyState !== 1) {
    return {
      status: 'unhealthy',
      message: `Database is not connected (readyState: ${mongoose.connection.readyState})`,
    };
  }

  try {
    const start = performance.now();
    const db = mongoose.connection.db;
    if (!db) {
      return {
        status: 'unhealthy',
        message: 'Database reference is null despite readyState 1',
      };
    }

    await db.admin().ping();
    const latencyMs = Math.round(performance.now() - start);

    return {
      status: 'healthy',
      latencyMs,
      message: 'MongoDB ping verified',
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Database ping check failed',
    };
  }
}
