
export class CreateEmpresaDto {

    email: string;
    password: string;
    nombre: string; 
    apellidos: string; 
    empresa: string; 
    telefono: number; 
    cif: string; 
    descripcion: string;
    constructor(email: string, password: string, nombre: string, apellidos: string ,  empresa: string,telefono: number, cif: string, descripcion: string ) {

        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.empresa = empresa;
        this.telefono = telefono;
        this.cif = cif;
        this.descripcion= descripcion;
    }
}
