import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';

@Component({
  selector: 'app-editar-empleo',
  templateUrl: './editar-empleo.component.html',
  styleUrls: ['./editar-empleo.component.css']
})
export class EditarEmpleoComponent  implements OnInit{

  
  titulo: string = '';
  empresa: string = '';
  tipoContrato: string = '';
  jornada: string = '';
  salario: number = 0;
  descripcion: string = '';
  idEmpresa: number = 0;
  ubicacion: string = '';
  logo: string = '';

  empleo:Empleo =  new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion);

  constructor(
    private empleoService: EmpleoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }


  guardarLogo(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.logo = reader.result as string;
    };
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.empleoService.detail(id).subscribe(
      data => {
        this.empleo = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.empleo.logo = this.logo
    this.empleo.createdAt= new Date()
    this.empleoService.update(id, this.empleo).subscribe(
      data => {
        this.toastr.success('Oferta actualizada exitosamente!', 'EXITO!', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'ERROR', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  
}
