import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { CreateCantidatoDto } from './dto/create-candidato.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { LoginCantidatoDto } from './dto/login-candidato.dto';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginEmpresaDto } from './dto/login-empresa.dto';

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private authRepository: AuthRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository,
        private jwtService: JwtService

    ) { }

    async getAll(): Promise<UsuarioEntity[]> {
        const usuarios = await this.authRepository.find()
        if (!usuarios.length) throw new NotFoundException({ message: 'no hay usuarios' })
        return usuarios;
    }

    async createCandidato(dto: CreateCantidatoDto): Promise<any> {
        const { email, password } = dto;
        const exists = await this.authRepository.findOne({ where: { email } });
        if (exists) {
            throw new BadRequestException({ message: 'Usuario existente' });
        }

        const rolCandidato = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.CANDIDATO } });
        if (!rolCandidato) {
            throw new InternalServerErrorException({ message: 'Roles no creados' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const candidato = this.authRepository.create({ ...dto, password: passwordHash });
        candidato.roles = [rolCandidato];
        await this.authRepository.save(candidato);

        return candidato;
    }

    async createEmpresa(dto: CreateEmpresaDto): Promise<any> {
        const {email, password } = dto;
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (usuario) {
            throw new BadRequestException({ message: 'Usuario existente' });
        }

        const rolEmpresa = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.EMPRESA } });
        if (!rolEmpresa) {
            throw new InternalServerErrorException({ message: 'Roles no creados' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const empresa = this.usuarioRepository.create({ ...dto, password: passwordHash });
        empresa.roles = [rolEmpresa];
        await this.usuarioRepository.save(empresa);

        return empresa;
    }

    async loginCandidato(dto: LoginCantidatoDto): Promise<any> {
        
        const candidato = await this.authRepository.findOne({ where: { email: dto.email } })
        if (!candidato) return new UnauthorizedException('No existe el email candidato');

        const passwordOk = await bcrypt.compare(dto.password, candidato.password);

        if (!passwordOk) return new UnauthorizedException('contraseña incorresta');


        const payload: PayloadInterface = {
            id: candidato.id,
            email: candidato.email,
            roles: candidato.roles.map(rol => rol.rolNombre as RolNombre)
        }

        const token = await this.jwtService.sign(payload);

        return { token };
    }

    async loginEmpresa(dto: LoginEmpresaDto): Promise<any> {
        const empresa = await this.authRepository.findOne({ where: { email: dto.email } })
        if (!empresa) return new UnauthorizedException('No existe el email candidato');

        const passwordOk = await bcrypt.compare(dto.password, empresa.password);

        if (!passwordOk) return new UnauthorizedException('contraseña incorresta');


        const payload: PayloadInterface = {
            id: empresa.id,
            email: empresa.email,
            roles: empresa.roles.map(rol => rol.rolNombre as RolNombre)
        }

        const token = await this.jwtService.sign(payload);

        return { token };
    }



}
