import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import apiRoutes from './routes/index.js';
import healthRoutes from './routes/healthRoutes.js';

export const createApp = (): Application => {
  const app: Application = express();

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: [config.clientUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  );

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger
  app.use(requestLogger);

  // Top-level direct health check
  app.use('/', healthRoutes);

  // API Version 1 routes
  app.use(config.apiPrefix, apiRoutes);

  // Welcome route
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      service: 'Royal Scout Intelligence 2027 API',
      status: 'ONLINE',
      docs: '/backend/docs/API_CONTRACT.md',
      health: '/health',
      apiPrefix: config.apiPrefix
    });
  });

  // 404 Route Handler
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};

