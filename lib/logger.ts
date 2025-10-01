type LogLevel = 'info' | 'warn' | 'error';

function formatMessage(level: LogLevel, message: string, context?: unknown) {
  const timestamp = new Date().toISOString();
  const base = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  return context
    ? `${base}\nContext: ${JSON.stringify(context, null, 2)}`
    : base;
}

export const logger = {
  info: (message: string, context?: unknown) => {
    console.info(formatMessage('info', message, context));
  },
  warn: (message: string, context?: unknown) => {
    console.warn(formatMessage('warn', message, context));
  },
  error: (message: string, context?: unknown) => {
    console.error(formatMessage('error', message, context));
  },
};
