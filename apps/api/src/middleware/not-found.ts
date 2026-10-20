import { Request, Response } from 'express';
import { ApiErrorResponse } from '@wandersphere/contracts';

export function notFoundHandler(req: Request, res: Response): void {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested resource '${req.method} ${req.originalUrl}' does not exist.`,
      requestId: req.id,
      timestamp: new Date().toISOString(),
    },
  };

  res.status(404).json(response);
}
