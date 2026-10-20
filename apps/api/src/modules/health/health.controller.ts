import { Request, Response } from 'express';
import { HealthResponse } from '@wandersphere/contracts';
import { env } from '../../config/env';
import { checkDbHealth } from '../../database/connection';

export async function getHealthStatus(_req: Request, res: Response): Promise<void> {
  const dbHealth = await checkDbHealth();

  let overallStatus: 'ok' | 'degraded' | 'down' = 'ok';
  let httpStatus = 200;

  if (dbHealth.status === 'unhealthy') {
    if (env.MONGODB_REQUIRED) {
      overallStatus = 'down';
      httpStatus = 503;
    } else {
      overallStatus = 'degraded';
      httpStatus = 200;
    }
  } else if (dbHealth.status === 'not_configured' && env.MONGODB_REQUIRED) {
    overallStatus = 'down';
    httpStatus = 503;
  }

  const memoryUsage = process.memoryUsage();
  const memoryUsageMb = Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100;

  const response: HealthResponse = {
    status: overallStatus,
    service: 'wandersphere-api',
    version: '0.1.0',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    checks: {
      database: {
        status: dbHealth.status,
        latencyMs: dbHealth.latencyMs,
        message: dbHealth.message,
      },
      process: {
        status: 'healthy',
        memoryUsageMb,
        uptimeSeconds: Math.floor(process.uptime()),
      },
    },
  };

  res.status(httpStatus).json(response);
}
