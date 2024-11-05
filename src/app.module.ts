import { UsersModule } from './modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, dbConfig } from './config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true, //Cache environment variables
    }),
    // Basic
    // TypeOrmModule.forRoot({
    //   type: 'postgres', //tipo de base de datos
    //   host: 'localhost', //va estar en servidor local
    //   port: 5432, //puerto de postgres
    //   username: 'root', //credenciales de la BD de postgres
    //   password: 'root', //credenciales de la BD de postgres
    //   database: 'postgres', // BD principal de prostgres al crearse
    //   autoLoadEntities: true, // carga estidades sin necesidad de especificar
    //   // entities: [], // Solo si no se usa autoLoadEntities
    //   synchronize: true, // Solo para para ambientes de desarrollo, para sincronizar modelos en la BD automaticamente, quitar en produccion
    // }),
    //Advanced
    TypeOrmModule.forRootAsync(dbConfig.asProvider()),
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
