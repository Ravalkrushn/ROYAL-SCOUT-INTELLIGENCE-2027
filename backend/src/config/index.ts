import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env if present
dotenv.config();

export interface IAppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  host: string;
  clientUrl: string;
  mongodbUri: string;
  logLevel: string;
  apiPrefix: string;
}

export const config: IAppConfig = {
  env: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  host: process.env.HOST || '0.0.0.0',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/royal_scout_intelligence_2027',
  logLevel: process.env.LOG_LEVEL || 'info',
  apiPrefix: process.env.API_PREFIX || '/api/v1'
};

