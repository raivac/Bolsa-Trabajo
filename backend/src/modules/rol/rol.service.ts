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

    async create(dto: CreateRolDto): Promise<void> {
      const existingRol = await this.rolRepository.findOne({ where: { rolNombre: dto.rolNombre } });
      if (existingRol) {
        throw new BadRequestException('El rol ya existe');
      }
    
      const newRol = new RolEntity();
      newRol.rolNombre = dto.rolNombre;
    
      await this.rolRepository.save(newRol);
    }
    async crearRolesIniciales(): Promise<void> {
      for (const rol of Object.values(RolNombre)) {
        const existRol = await this.rolRepository.findOne({ where: { rolNombre: rol } });
        if (!existRol) {
          const createRolDto: CreateRolDto = {
            rolNombre: rol
          };
          await this.create(createRolDto);
        }
      }
    }
    
      
      
}
