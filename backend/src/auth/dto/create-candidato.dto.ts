import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCantidatoDto{

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

    @IsNumber()
    @IsNotEmpty()
    telefono: number;

    @IsString()
    @IsNotEmpty()
    cif: string;
}
