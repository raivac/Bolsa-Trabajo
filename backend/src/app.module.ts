import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_PORT,DB_PASSWORD,DB_DATABASE,DB_HOST,DB_USER} from './config/constants';
import { EmpleoModule } from './modules/empleo/empleo.module';
import { RolModule } from './modules/rol/rol.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        timezone: 'Europe/Madrid',
        synchronize: true,
        logging: false
      }),
      inject: [ConfigService],
    }),
    EmpleoModule,
    RolModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
