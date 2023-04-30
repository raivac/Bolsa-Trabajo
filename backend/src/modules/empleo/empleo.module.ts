import { Module } from '@nestjs/common';
import { EmpleoService } from './empleo.service';
import { EmpleoController } from './empleo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpleoEntity } from './empleo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleoEntity])],
  providers: [EmpleoService],
  controllers: [EmpleoController],
})
export class EmpleoModule {}
