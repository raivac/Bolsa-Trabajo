import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';
import { TokenService } from '../services/token.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-ofertas',
  templateUrl: './mis-ofertas.component.html',
  styleUrls: ['./mis-ofertas.component.css']
})
export class MisOfertasComponent implements OnInit{

  empleos: Empleo[] = [];
  isEmpresa: boolean = false;
  idEmpresa: number = 0;
  constructor(
    private empleoService: EmpleoService,
    private tokenService: TokenService,
    public domSanitizer: DomSanitizer,
  ) { }
  
  ngOnInit(): void {
    this.idEmpresa = this.tokenService.getId()
    this.cargarEmpleos();
    const input = document.getElementById('busca') as HTMLInputElement;
    input.addEventListener('input', () => {
      this.textoBusqueda = input.value;
    });
    this.isEmpresa = this.tokenService.isEmpresa()
  }

  listaVacia = undefined;

  //funcion para cargar los empleos
  cargarEmpleos(): void {
    this.empleoService.lista().subscribe(
      data => {
        this.empleos = data.filter(empleo => empleo.idEmpresa == this.idEmpresa);
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }
  // función para obtener un array con los candidatos del empleo
  getCandidatosArray(candidatosString: string): string[] {
    return candidatosString.split('\n').slice(1);
  }
  getBase64(base64String: string): SafeResourceUrl {
    const binary = atob(base64String.split(',')[1]);
    const byteArray = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      byteArray[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
}

  

  //funcion para eliminar una oferta por su id
  borrar(id: number) {
    Swal.fire({
      title: '¿Estas seguro que quieres eliminar la oferta?',
      text: "¡No se podrán revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleoService.delete(id).subscribe(
          res => {
            this.cargarEmpleos();
          },
          err => {
            console.log(err)
          }
        )
        Swal.fire(
          'Eliminada!',
          'Tu oferta de empleo ha sido eliminada',
          'success'
        )
      }
    })
  }

  //funcion que devolvera cuanto hace que se creo la oferta y no la fecha de creacion
  publicado(createdAt: Date | undefined): string {
    if (!createdAt) {
      return '';
    }
    const created = new Date(createdAt);
    const now = new Date();
    const milisegundos = now.getTime() - (created.getTime() - 7200000);
    const minutos = Math.round(milisegundos / 60000);
    if (minutos === 0) {
      return 'justo ahora';
    } else 
    if (minutos < 60) {
      return `hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    } else 
    if (minutos < 1440) {
      const horas = Math.floor(minutos / 60);
      return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else {
      const dias = Math.floor(minutos / 1440);
      return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    }
  }

  //variables para la busqueda
  mostrarTabla = true;
  textoBusqueda: string = '';
  empleosFiltrados: Empleo[] | undefined;
  //funcion que buscara si hay algun dato de la oferta que coincida con los datos introducidos en la busqueda
  buscar(): void {
    const palabrasBusqueda = this.textoBusqueda?.trim().toLowerCase().split(/\s+/);
    let resultadosEncontrados = false;
    
    if (palabrasBusqueda.length > 0) {
      this.empleosFiltrados = this.empleos.filter(empleado => {
        for (const palabra of palabrasBusqueda) {
          if (empleado.titulo.toLowerCase().includes(palabra) || empleado.descripcion.toLowerCase().includes(palabra) || empleado.empresa.toLowerCase().includes(palabra) || empleado.jornada.toLowerCase().includes(palabra) || empleado.ubicacion.toLowerCase().includes(palabra)|| empleado.tipoContrato.toLowerCase().includes(palabra)) {
            this.mostrarTabla = false;
            resultadosEncontrados = true; 
            return true;
          }
        }
        return false;
      });
    } else {
      this.empleosFiltrados = this.empleos;
    }
  
    //mostrara la alerta si no se encuentra una oferta
    if (!resultadosEncontrados) {
      Swal.fire(
        'No hay ofertas',
        'No se han encontrado ofertas',
        'error'
      )
    this.textoBusqueda = ''; 
    this.empleosFiltrados = undefined; 
    this.mostrarTabla = true;
    }
  }

  //limpiara la busqueda 
  limpiarBusqueda(): void {
    this.textoBusqueda = ''; 
    this.empleosFiltrados = undefined; 
    this.mostrarTabla = true;
  }
 
  //cuando pulse enter buscara
  enter(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.buscar();
    }
  }

  alertaLogin() {
    if(!this.tokenService.isLogged()){
    Swal.fire({
      title: 'Error',
      text: 'Inicie sesión para ver los detalles',
      icon: 'error',
      showConfirmButton: false,
      timer: 3000
    });
  }
  }
}
