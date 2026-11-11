import mongoose from 'mongoose';
import { config } from './index.js';
import { logger } from '../utils/logger.js';

export interface IDatabaseConnectionState {
  isConnected: boolean;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  host?: string;
  name?: string;
  error?: string;
}

let connectionState: IDatabaseConnectionState = {
  isConnected: false,
  status: 'disconnected'
};

export const connectDatabase = async (): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) {
    connectionState = {
      isConnected: true,
      status: 'connected',
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };
    return true;
  }

  try {
    connectionState.status = 'connecting';
    logger.info(`Attempting MongoDB connection to: ${config.mongodbUri}`);
    
    // Connect with a 5 second timeout so startup does not hang if MongoDB is unavailable
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    });

    connectionState = {
      isConnected: true,
      status: 'connected',
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };

    logger.info(`MongoDB connected successfully to [${mongoose.connection.name}] on host [${mongoose.connection.host}]`);
    return true;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    connectionState = {
      isConnected: false,
      status: 'error',
      error: errMessage
    };
    logger.warn(`MongoDB connection failed: ${errMessage}. Operating in standby database mode.`);
    return false;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    connectionState = {
      isConnected: false,
      status: 'disconnected'
    };
    logger.info('MongoDB disconnected cleanly');
  } catch (error) {
    logger.error('Error during MongoDB disconnect', error);
  }
};

export const getDatabaseState = (): IDatabaseConnectionState => {
  const readyStates: Record<number, 'disconnected' | 'connected' | 'connecting' | 'disconnected'> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnected'
  };
  
  const currentStatus = readyStates[mongoose.connection.readyState] || connectionState.status;
  return {
    ...connectionState,
    status: currentStatus,
    isConnected: mongoose.connection.readyState === 1
  };
};

