import { IsEnum, IsString } from "class-validator";
import { RolNombre } from "../rol.enum";

export class CreateRolDto{

    @IsString()
    @IsEnum(RolNombre,{message: 'Rol solo cliente o empresa'})
    rolNombre: RolNombre;
}