import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Body } from '@nestjs/common';
import { EmpleoService } from './empleo.service';
import { EmpleoDTO } from './dto/empleo.dto';

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

    @Post()
    async create(@Body() dto: EmpleoDTO) {
        return await this.empleoService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.empleoService.delete(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: EmpleoDTO) {
        return await this.empleoService.update(id, dto);
    }

}

