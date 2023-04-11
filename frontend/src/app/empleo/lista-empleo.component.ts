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

ngOnInit(): void{
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
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }
  );
}

}
