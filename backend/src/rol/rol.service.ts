import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RolRepository } from './rol.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolNombre } from './rol.enum';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private rolRepository: RolRepository
    ) {
        this.crearRolesIniciales();
    }

    async getAll(): Promise<RolEntity[]> {
        const roles = await this.rolRepository.find();
        if (!roles.length) throw new NotFoundException({ message: 'no hay roles' })
        return roles;
    }

    async create(dto: CreateRolDto): Promise<any> {
        const rol = await this.rolRepository.findOne({ where: { rolNombre: dto.rolNombre } });
        console.log(rol)
        if (rol) throw new BadRequestException({ message: 'rol existentes' })
        await this.rolRepository.save(dto as RolEntity);
        console.log(dto as RolEntity)
        return console.log('rol creado');
    }
    async crearRolesIniciales(): Promise<any> {
        for (const rol of Object.values(RolNombre)) {
          const existingRol = await this.rolRepository.findOne({ where: { rolNombre: rol } });
          if (!existingRol) {
            const createRolDto: CreateRolDto = {
              rolNombre: rol
            };
            await this.rolRepository.create(createRolDto);
          }
        }
      }
      
      
}
