// import { config, dbConfig } from './config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    // Envs
    ConfigModule.forRoot({
      // load: [config],
      isGlobal: true,
      cache: true, //Cache environment variables
    }),
    //DB TypeORM
    DatabaseModule,
    // Rate limit
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<string>('PORT');
  }
}
