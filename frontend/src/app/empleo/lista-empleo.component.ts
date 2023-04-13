import { Component, OnInit } from '@angular/core';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-lista-empleo',
  templateUrl: './lista-empleo.component.html',
  styleUrls: ['./lista-empleo.component.css']
})
export class ListaEmpleoComponent implements OnInit {

  empleos: Empleo[] = [];

  listaVacia = undefined;

  constructor(
    private empleoService: EmpleoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarEmpleos();
  }

  cargarEmpleos(): void {
    this.empleoService.lista().subscribe(
      data => {
        this.empleos = data;
        this.listaVacia= undefined;
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
          err =>{
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
    const diffMilliseconds = now.getTime() - (created.getTime()+7200000);
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
}
