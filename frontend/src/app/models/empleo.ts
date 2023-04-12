export class Empleo {
  id?: number; titulo: string;
  empresa: string;
  createdAt?: Date;
  descripcion: string;
  tipoContrato: string;
  jornada: string;
  salario: number;
  logo?: string;
  idEmpresa: number;
  ubicacion: string;

  constructor(titulo: string, empresa: string, descripcion: string, tipoContrato: string, jornada: string, salario: number, logo: string, idEmpresa: number , ubicacion: string) {
    this.titulo = titulo;
    this.salario = salario;
    this.descripcion = descripcion;
    this.empresa = empresa;
    this.jornada = jornada;
    this.tipoContrato = tipoContrato;
    this.logo = logo;
    this.idEmpresa = idEmpresa;
    this.ubicacion = ubicacion;
  }
}
