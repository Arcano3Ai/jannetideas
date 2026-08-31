export type LogSeverity = 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';

interface LogPayload {
  message: string;
  severity?: LogSeverity;
  context?: Record<string, unknown>;
  error?: Error | unknown;
  timestamp?: string;
}

export function logEvent({ message, severity = 'INFO', context = {}, error }: LogPayload) {
  const logEntry = {
    message,
    severity,
    timestamp: new Date().toISOString(),
    ...context,
    ...(error instanceof Error
      ? {
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : error
      ? { error }
      : {}),
  };

  const output = JSON.stringify(logEntry);

  switch (severity) {
    case 'ERROR':
      console.error(output);
      break;
    case 'WARNING':
      console.warn(output);
      break;
    case 'DEBUG':
      console.debug(output);
      break;
    default:
      console.log(output);
      break;
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => logEvent({ message, severity: 'INFO', context }),
  warn: (message: string, context?: Record<string, unknown>) => logEvent({ message, severity: 'WARNING', context }),
  error: (message: string, error?: Error | unknown, context?: Record<string, unknown>) =>
    logEvent({ message, severity: 'ERROR', error, context }),
  debug: (message: string, context?: Record<string, unknown>) => logEvent({ message, severity: 'DEBUG', context }),
};
