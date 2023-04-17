import { Controller, Post, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('rol')
export class RolController {

    constructor(
        private rolService: RolService
    ) { }

    @Get()
    getAll() {
        return this.rolService.getAll()
    }
    //seguridad porque falla el validator del dto
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    create(@Body() dto: CreateRolDto) {
        return this.rolService.create(dto)
    }

}
