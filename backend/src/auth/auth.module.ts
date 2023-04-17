import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { RolEntity } from 'src/rol/rol.entity';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwTStrategy } from './strategies/jwt.strategy';
import { JWT_SECRET } from 'src/config/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, RolEntity, AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, ConfigService, JwTStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwTStrategy]
})
export class AuthModule {


}
