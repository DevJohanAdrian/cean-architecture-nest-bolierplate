import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as compression from 'compression';
import helmet from 'helmet';
import { setupSwagger } from './setup-swagger';
import { Environment } from './common/enum';

export function middlewaresConfiguration(app: INestApplication): INestApplication {
  const configureService = app.get(ConfigService);
  const environment = configureService.get<string>('NODE_ENV');

  //CORS
  app.enableCors({
    origin: configureService.get<string>('CORS_ORIGIN')
  });

  app.use(helmet());
  app.use(compression());
  // Aplica el guard de rate limit globalmente
  // app.useGlobalGuards(new ThrottlerGuard(app.get(Reflector)));

  // Swagger docs only in deveploment envs
  if (environment !== Environment.Production) {
    setupSwagger(app);
  }

  return app;
}
