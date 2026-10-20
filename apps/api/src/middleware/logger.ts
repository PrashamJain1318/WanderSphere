import { NextFunction, Request, Response } from 'express';

export function structuredLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = performance.now();

  res.on('finish', () => {
    const durationMs = Math.round(performance.now() - startTime);
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: req.id,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs,
      userAgent: req.headers['user-agent'] || 'unknown',
      ip: req.ip || req.socket.remoteAddress,
    };

    if (res.statusCode >= 500) {
      console.error(JSON.stringify(logEntry));
    } else if (res.statusCode >= 400) {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.info(JSON.stringify(logEntry));
    }
  });

  next();
}
