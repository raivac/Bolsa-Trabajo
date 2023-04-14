import { Component, OnInit } from '@angular/core';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-lista-empleo',
  templateUrl: './lista-empleo.component.html',
  styleUrls: ['./lista-empleo.component.css']
})
export class ListaEmpleoComponent implements OnInit {

  empleos: Empleo[] = [];

  listaVacia = undefined;
  empleosFiltrados: Empleo[] | undefined;

  constructor(
    private empleoService: EmpleoService,
  ) { }

  ngOnInit(): void {
    this.cargarEmpleos();


    const input = document.getElementById('idd') as HTMLInputElement;
    input.addEventListener('input', () => {
      this.textoBusqueda = input.value;
    });
  }

  cargarEmpleos(): void {
    this.empleoService.lista().subscribe(
      data => {
        this.empleos = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

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

  getTime(createdAt: Date | undefined): string {
    if (!createdAt) {
      return '';
    }
    const created = new Date(createdAt);
    const now = new Date();
    const diffMilliseconds = now.getTime() - (created.getTime() + 7200000);
    const diffMinutes = Math.round(diffMilliseconds / 60000);
    if (diffMinutes === 0) {
      return 'justo ahora';
    } else if (diffMinutes < 60) {
      return `hace ${diffMinutes} minutos`;
    } else if (diffMinutes < 1440) {
      const diffHours = Math.floor(diffMinutes / 60);
      return `hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    } else {
      const diffDays = Math.floor(diffMinutes / 1440);
      return `hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
    }
  }

  //variables para la busqueda
  mostrarTabla = true;
  textoBusqueda: string = '';
  buscando = false;
  //funcion para buscar empleos.
  buscar(): void {
    const palabrasBusqueda = this.textoBusqueda?.trim().toLowerCase().split(/\s+/);
    if (palabrasBusqueda && palabrasBusqueda.length > 0) {
      this.empleosFiltrados = this.empleos.filter(empleado => {
        for (const palabra of palabrasBusqueda) {
          if (empleado.titulo.toLowerCase().includes(palabra) || empleado.descripcion.toLowerCase().includes(palabra) || empleado.jornada.toLowerCase().includes(palabra) || empleado.ubicacion.toLowerCase().includes(palabra)) {
            this.mostrarTabla = false;
            return true;
          }
        }
        return false;
      });
    } else {
      this.empleosFiltrados = this.empleos;
    }
  }
  //limpiara la busqueda 
  limpiarBusqueda(): void {
    this.textoBusqueda = ''; 
    this.empleosFiltrados = undefined; 
    this.mostrarTabla = true;
  }
  
  
  


}
