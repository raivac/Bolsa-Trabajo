import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateCantidatoDto } from './dto/create-candidato.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}
    @Get()
    getAll() {
        return this.authService.getAll()
    }

    //seguridad porque falla el validator del dto
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('empresa')
    createEmpresa(@Body() dto: CreateEmpresaDto) {
        return this.authService.createEmpresa(dto)
    }

    //seguridad porque falla el validator del dto
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('candidato')
    createCandidato(@Body() dto: CreateCantidatoDto) {
        return this.authService.createCandidato(dto)
    }
}
