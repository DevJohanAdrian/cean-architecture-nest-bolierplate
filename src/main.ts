import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => {
    console.log(
      `Server (${process.env.NODE_ENV}) running on port http://${process.env.HOST}:${process.env.PORT}`,
    );
    console.log(`Server running on port ${process.env.PORT}`);
  });
}
bootstrap();
