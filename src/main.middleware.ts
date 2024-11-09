import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from './setup-swagger';

export function middlewaresConfiguration(
  app: INestApplication,
): INestApplication {
  const configureService = app.get(ConfigService);
  const isProduction = configureService.get<string>('NODE_ENV');

  //CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
  });

  app.use(helmet());
  app.use(compression());
  // Aplica el guard de rate limit globalmente
  // app.useGlobalGuards(new ThrottlerGuard(app.get(Reflector)));

  //   if () {
  //     setupSwagger(app);
  //   }

  return app;
}
