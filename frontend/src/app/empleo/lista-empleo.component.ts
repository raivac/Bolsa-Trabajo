import { Component, OnInit } from '@angular/core';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-lista-empleo',
  templateUrl: './lista-empleo.component.html',
  styleUrls: ['./lista-empleo.component.css']
})
export class ListaEmpleoComponent implements OnInit {

  empleos: Empleo[] = [];

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
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: number) {
    this.empleoService.delete(id).subscribe(
      data => {
        this.toastr.success('Empleo Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarEmpleos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
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
