import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository
    ){}
    async getAll(): Promise<RolEntity[]>{
        const roles = await this.rolRepository.find();
        if(!roles.length) throw new NotFoundException({ message: 'no hay roles' }) 
        return;
    }
    async create(dto: CreateRolDto): Promise<any>{
        const rol = await this.rolRepository.findOne({where : {rolNombre: dto.rolNombre}});
        if(rol) throw new BadRequestException({ message: 'rol existentes' }) 
        await this.rolRepository.save(dto as RolEntity);
        return console.log('rol creado');
    }
}
