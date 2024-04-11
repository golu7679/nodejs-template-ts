import { transports, addColors, format, createLogger } from 'winston';
import { AbstractConfigSetLevels } from 'winston/lib/winston/config';
const levels: AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  notice: 3,
  http: 4,
  debug: 5,
  cheat: 6,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  notice: 'green',
  http: 'magenta',
  debug: 'white',
  cheat: 'redBG',
};

addColors(colors);

const Format = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const Transports = [
  new transports.Console(),
  new transports.File({
    filename: 'logs/error.log',
    level: 'error',

    format: format.uncolorize(),
  }),
  new transports.File({
    filename: 'logs/all.log',
    format: format.uncolorize(),
  }),

];

export const logger = createLogger({
  level: level(),
  levels,
  format: Format,
  transports: Transports,
});
