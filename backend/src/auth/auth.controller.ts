import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateCantidatoDto } from './dto/create-candidato.dto';
import { LoginCantidatoDto } from './dto/login-candidato.dto';
import { LoginEmpresaDto } from './dto/login-empresa.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }
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

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login/candidato')
    loginCandidato(@Body() dto: LoginCantidatoDto) {
        return this.authService.loginCandidato(dto)
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login/empresa')
    loginEmpresa(@Body() dto: LoginEmpresaDto) {
        return this.authService.loginEmpresa(dto)
    }
    
}
