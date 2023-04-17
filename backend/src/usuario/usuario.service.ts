import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
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

}



