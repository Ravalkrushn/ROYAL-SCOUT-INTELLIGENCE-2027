import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { config } from '../config/index.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  logger.error(`[${req.method} ${req.url}] Error: ${message}`, {
    statusCode,
    code: errorCode,
    stack: config.env !== 'production' ? err.stack : undefined
  });

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: {
      code: errorCode,
      message,
      ...(config.env !== 'production' && { stack: err.stack, details: err.details })
    },
    meta: {
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  });
};

