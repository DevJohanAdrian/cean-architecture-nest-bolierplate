import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  /// -------- middlewares -----------
  // Prefix
  app.setGlobalPrefix('/api');

  // Habilita el versionamiento
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1', // Define la versión predeterminada globalmente
  });

  await app.listen(AppModule.port, () => {
    console.log(
      `Server (${configService.get<string>('NODE_ENV')}) running on port http://${configService.get<string>('HOST')}:${AppModule.port}`,
    );
  });
}
bootstrap();
