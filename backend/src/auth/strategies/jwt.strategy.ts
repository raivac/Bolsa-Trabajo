import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthRepository } from "../auth.repository";
import { ConfigService } from "@nestjs/config";
import { JWT_SECRET } from "src/config/constants";
import { PayloadInterface } from "../payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Injectable()
export class JwTStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UsuarioEntity)
        private authRepository: AuthRepository,
        private configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:  configService.get(JWT_SECRET)
        }); 
    }

    async validate(payload: PayloadInterface){
        const usuario = await this.authRepository.findOne({where: {email: payload.email}})
        if(!usuario) return new UnauthorizedException('no hay usuario');
        return payload;
    }


}