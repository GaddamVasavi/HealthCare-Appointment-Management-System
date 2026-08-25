import winston from 'winston';
import path from 'path';
import config from '../config';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(logColors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
];

if (config.nodeEnv !== 'test') {
  transports.push(
    new winston.transports.File({
      filename: path.resolve(config.logFile),
      format: fileFormat,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.resolve(path.dirname(config.logFile), 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 5242880,
      maxFiles: 5,
    })
  );
}

export const logger = winston.createLogger({
  level: config.nodeEnv === 'test' ? 'error' : config.logLevel,
  levels: logLevels,
  transports,
  exitOnError: false,
});

export const stream = {
  write: (message: string): void => {
    logger.http(message.trim());
  },
};

export default logger;
