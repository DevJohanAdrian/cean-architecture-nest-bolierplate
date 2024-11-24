import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/common/enum';
import * as winston from 'winston';

export class AppLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor(private configureService: ConfigService) {
    const environment = configureService.get<string>('NODE_ENV') || Environment.Development;

    // configuracion por entorno
    const transports = [];

    if (environment === Environment.Development) {
      transports.push(new winston.transports.Console({ level: 'debug' }));
    } else if (environment === Environment.Testing) {
      transports.push(new winston.transports.Console({ level: 'warn' }));
    } else if (environment === Environment.Production) {
      transports.push(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        }),
        new winston.transports.File({ filename: 'logs/combined.log' })
      );
    }

    // Crear logger de winston con configuracion
    this.logger = winston.createLogger({
      level: environment === Environment.Development ? 'debug' : 'info',
      // Formato de mensaje
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.label({ label: environment }),

        winston.format.printf(({ level, message, label, timestamp }) => {
          return `[${timestamp}] ${label} ${level.toUpperCase()}: ${message}`;
        })
      ),
      transports
    });
  }
  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - TRACE: ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
