import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { RolRepository } from 'src/rol/rol.repository';
import { RolNombre } from 'src/rol/rol.enum';

@Injectable()
export class UsuarioService {


    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: UsuarioRepository
    ){}

    async getAll(): Promise<UsuarioEntity[]>{
        const usuarios = await this.usuarioRepository.find()
        if(!usuarios.length) throw new NotFoundException({ message: 'no hay usuarios' }) 
        return usuarios;
    }
    async createEmpresa(dto: CreateEmpresaDto): Promise<any>{
        const {nombre,email} = dto;
        const usuario = await this.usuarioRepository.findOne({where :{email: dto.email}})
        if(usuario) throw new BadRequestException({ message: 'usuario existente' }) 
        const rolEmpresa = await this.rolRepository.findOne({where: {rolNombre: RolNombre.EMPRESA}})
        const rolCandidato = await this.rolRepository.findOne({where: {rolNombre: RolNombre.CANDIDATO}})
        if(!rolEmpresa  || !rolCandidato )  throw new InternalServerErrorException({ message: 'roles no creados' }) 
        const empresa = this.usuarioRepository.create(dto);
        empresa.roles = [rolEmpresa];
        await this.usuarioRepository.save(empresa);
        return empresa
    }
}



