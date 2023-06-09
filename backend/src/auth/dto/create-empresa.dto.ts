import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEmpresaDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    nombre: string; 

    @IsString()
    @IsNotEmpty()
    apellidos: string;

    @IsString()
    @IsNotEmpty()
    empresa: string;

    @IsNumber()
    @IsNotEmpty()
    telefono: number;

    @IsString()
    @IsNotEmpty()
    cif: string;

    @IsString()
    descripcion: string;
}
