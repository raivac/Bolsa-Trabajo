import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ){}

    
    @Get()
    getAll() {
        return this.usuarioService.getAll()
    }

    //seguridad porque falla el validator del dto
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    createEmpresa(@Body() dto: CreateEmpresaDto) {
        return this.usuarioService.createEmpresa(dto)
    }
}
