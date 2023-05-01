import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { EmpleoService } from './empleo.service';
import { EmpleoDTO } from './dto/empleo.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { RolNombre } from '../rol/rol.enum';
@Controller('empleo')
export class EmpleoController {

    constructor(private readonly empleoService: EmpleoService) { }

    
    @Get()
    async getAll() {
        return await this.empleoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.empleoService.findById(id);
    }

    @RolDecorator(RolNombre.EMPRESA)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: EmpleoDTO) {
        return await this.empleoService.create(dto);
    }

    @RolDecorator(RolNombre.EMPRESA)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.empleoService.delete(id);
    }

    @RolDecorator(RolNombre.EMPRESA,RolNombre.CANDIDATO)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: EmpleoDTO) {
        return await this.empleoService.update(id, dto);
    }

}

