type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  level: LogLevel;
  timestamp: string;
  message: string;
  details?: unknown;
}

class Logger {
  private format(level: LogLevel, message: string, details?: unknown): string {
    const payload: LogPayload = {
      level,
      timestamp: new Date().toISOString(),
      message,
      ...(details !== undefined ? { details } : {})
    };
    return `[${payload.timestamp}] [${level.toUpperCase()}] ${message}${
      details ? ` | ${typeof details === 'object' ? JSON.stringify(details) : details}` : ''
    }`;
  }

  info(message: string, details?: unknown): void {
    console.log(this.format('info', message, details));
  }

  warn(message: string, details?: unknown): void {
    console.warn(this.format('warn', message, details));
  }

  error(message: string, details?: unknown): void {
    console.error(this.format('error', message, details));
  }

  debug(message: string, details?: unknown): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.format('debug', message, details));
    }
  }
}

export const logger = new Logger();

