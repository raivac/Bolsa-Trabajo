import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from '../rol/rol.entity';
import { RolRepository } from '../rol/rol.repository';

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



