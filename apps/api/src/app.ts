import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { structuredLogger } from './middleware/logger';
import { notFoundHandler } from './middleware/not-found';
import { requestIdMiddleware } from './middleware/request-id';
import { healthRouter } from './modules/health/health.router';

export function createApp(): Express {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS configuration
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin '${origin}' not allowed by CORS`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    }),
  );

  // Request identification and structured logging
  app.use(requestIdMiddleware);
  app.use(structuredLogger);

  // Request size limit enforcement
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // API v1 routes
  app.use('/api/v1', healthRouter);

  // Root redirect/fallback
  app.get('/', (_req, res) => {
    res.json({
      service: 'WanderSphere API',
      version: '0.1.0',
      docs: '/api/v1/health',
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Centralized error handler
  app.use(errorHandler);

  return app;
}
