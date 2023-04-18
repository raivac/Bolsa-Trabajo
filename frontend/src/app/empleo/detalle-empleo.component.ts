import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleoService } from '../services/empleo.service';
import { Empleo } from '../models/empleo';

@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent implements OnInit {

  empleo: Empleo = new Empleo("","","","","",0,"",0,"",0,"") ;

  constructor(
    private empleoService: EmpleoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit():void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.empleoService.detail(id).subscribe(
      data => {
        this.empleo = data;
      },
      err => {
        this.toastr.error('No se encontro la oferta', 'Error', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }
  
  //funcion que devolvera cuanto hace que se creo la oferta y no la fecha de creacion
  getTime(createdAt: Date | undefined): string {
    if (!createdAt) {
      return '';
    }
    
    const created = new Date(createdAt);
    const now = new Date();
    const milisegundos = now.getTime() - (created.getTime() + 7200000);
    const minutos = Math.round(milisegundos / 60000);
    if (minutos === 0) {
      return 'justo ahora';
    } else if (minutos < 60) {
      return `hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    } else if (minutos < 1440) {
      const horas = Math.floor(minutos / 60);
      return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else {
      const dias = Math.floor(minutos / 1440);
      return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
