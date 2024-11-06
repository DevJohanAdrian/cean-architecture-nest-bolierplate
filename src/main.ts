import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard } from '@nestjs/throttler';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // middlewares
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
  });
  // Aplica el guard de rate limit globalmente
  app.useGlobalGuards(new ThrottlerGuard(app.get(Reflector)));
  app.use(helmet());
  app.use(compression());

  await app.listen(AppModule.port, () => {
    console.log(
      `Server (${configService.get<string>('NODE_ENV')}) running on port http://${configService.get<string>('HOST')}:${AppModule.port}`,
    );
  });
}
bootstrap();
