import { createApp } from './app.js';
import { config } from './config/index.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { DataImportService } from './services/dataImportService.js';
import { logger } from './utils/logger.js';

const startServer = async (): Promise<void> => {
  const app = createApp();

  const server = app.listen(config.port, config.host, async () => {
    logger.info(`=======================================================`);
    logger.info(` ROYAL SCOUT INTELLIGENCE 2027 - BACKEND SERVER (PHASE 2)`);
    logger.info(` Environment : ${config.env}`);
    logger.info(` Server URL  : http://${config.host}:${config.port}`);
    logger.info(` Health API  : http://${config.host}:${config.port}/health`);
    logger.info(` API Prefix  : ${config.apiPrefix}`);
    logger.info(`=======================================================`);

    // Hydrate data store on startup
    try {
      await DataImportService.runImport();
    } catch (err) {
      logger.error('Data import pipeline error during startup:', err);
    }
  });

  // Attempt database connection without blocking server startup
  connectDatabase()
    .then(async (connected) => {
      if (connected) {
        // Re-run import to sync MongoDB models
        await DataImportService.runImport();
      }
    })
    .catch((err) => {
      logger.warn('Initial MongoDB connection attempt error:', err);
    });

  // Graceful shutdown handling
  const gracefulShutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDatabase();
      logger.info('Process termination complete.');
      process.exit(0);
    });

    // Force exit after 10s timeout
    setTimeout(() => {
      logger.error('Forced shutdown due to timeout');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
