import { NextFunction, Request, Response } from 'express';
import { ApiErrorCode, ApiErrorResponse } from '@wandersphere/contracts';
import { env } from '../config/env';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ApiErrorCode;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    code: ApiErrorCode,
    message: string,
    details?: unknown,
    isOperational = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const code: ApiErrorCode = isAppError ? err.code : 'INTERNAL_SERVER_ERROR';
  const message =
    !isAppError && env.NODE_ENV === 'production'
      ? 'An unexpected internal server error occurred.'
      : err.message || 'Unknown error occurred';

  const responseBody: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details: isAppError ? err.details : undefined,
      requestId: req.id,
      timestamp: new Date().toISOString(),
    },
  };

  if (statusCode >= 500) {
    console.error('Unhandled Server Error:', {
      requestId: req.id,
      path: req.originalUrl,
      error: err.stack || err.message,
    });
  }

  res.status(statusCode).json(responseBody);
}
