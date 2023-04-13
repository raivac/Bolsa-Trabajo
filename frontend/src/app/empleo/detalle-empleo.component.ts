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

  empleo: Empleo = new Empleo("","","","","",0,"",0,"") ;

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
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
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

  volver(): void {
    this.router.navigate(['/']);
  }
}
