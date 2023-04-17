import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { CreateCantidatoDto } from './dto/create-candidato.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UsuarioRepository } from 'src/usuario/usuario.repository';

@Injectable()
export class AuthService {

    
    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private authRepository: AuthRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository
    ){}

    async getAll(): Promise<UsuarioEntity[]>{
        const usuarios = await this.authRepository.find()
        if(!usuarios.length) throw new NotFoundException({ message: 'no hay usuarios' }) 
        return usuarios;
    }
    async createCandidato(dto: CreateCantidatoDto): Promise<any>{
        const {nombre,email} = dto;
        const exists = await this.authRepository.findOne({where :{email: dto.email}})
        if(exists) throw new BadRequestException({ message: 'usuario existente' }) 
        const rolCandidato = await this.rolRepository.findOne({where: {rolNombre: RolNombre.CANDIDATO}})
        if(!rolCandidato)  throw new InternalServerErrorException({ message: 'roles no creados' }) 
        const candidato = this.authRepository.create(dto);
        candidato.roles = [rolCandidato];
        await this.authRepository.save(candidato);
        return candidato
    }

    async createEmpresa(dto: CreateEmpresaDto): Promise<any>{
        const {nombre,email} = dto;
        const usuario = await this.usuarioRepository.findOne({where :{email: dto.email}})
        if(usuario) throw new BadRequestException({ message: 'usuario existente' }) 
        const rolEmpresa = await this.rolRepository.findOne({where: {rolNombre: RolNombre.EMPRESA}})
        if(!rolEmpresa)  throw new InternalServerErrorException({ message: 'roles no creados' }) 
        const empresa = this.usuarioRepository.create(dto);
        empresa.roles = [rolEmpresa];
        await this.usuarioRepository.save(empresa);
        return empresa
    }
}
