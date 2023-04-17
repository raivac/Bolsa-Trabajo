import { IsEnum } from "class-validator";
import { RolNombre } from "../rol.enum";

export class CreateRolDto{

    @IsEnum(RolNombre,{message: 'Rol solo cliente o empresa'})
    rolNombre: RolNombre;
}