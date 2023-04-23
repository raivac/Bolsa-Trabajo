
export class CreateCandidatoDto {

    email: string;
    password: string;
    nombre: string; 
    apellidos: string; 
    telefono: number; 
    cif: string; 
    constructor(email: string, password: string, nombre: string, apellidos: string ,telefono: number, cif: string) {

        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.cif = cif;
    }
}
