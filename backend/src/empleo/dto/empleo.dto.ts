import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmpleoDTO{

    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    empresa: string;

    @IsString()
    @IsNotEmpty()
    ubicacion: string;
    
    createdAt?: Date;
  
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
    @IsString()
    @IsNotEmpty()
    tipoContrato: string;
  
    @IsString()
    @IsNotEmpty()
    jornada: string;
  
    @IsNumber()
    @IsNotEmpty()
    salario: number;
    
    @IsString()
    logo: string;

    @IsNumber()
    @IsNotEmpty()
    idEmpresa: number;
}