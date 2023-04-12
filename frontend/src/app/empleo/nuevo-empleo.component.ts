import { Component, OnInit } from '@angular/core';
import { EmpleoService } from '../services/empleo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Empleo } from '../models/empleo';
import { ImgMaxSizeService } from 'ng2-img-max';


@Component({
  selector: 'app-nuevo-empleo',
  templateUrl: './nuevo-empleo.component.html',
  styleUrls: ['./nuevo-empleo.component.css']
})
export class NuevoEmpleoComponent implements OnInit {

  titulo: string = '';
  empresa: string = '';
  tipoContrato: string = '';
  jornada: string = '';
  salario: number = 0;
  descripcion: string = '';
  idEmpresa: number = 0;
  ubicacion: string = '';
  logo: string = '';

  constructor(
    private empleoService: EmpleoService,
    private toastr: ToastrService,
    private router: Router,
    private imgMaxSizeService: ImgMaxSizeService
  ) { }

  ngOnInit() {
  }

  handleLogoChange(event: any) {
    console.log("Entro al conversor")
    const file = event.target.files[0];
    this.imgMaxSizeService
      .compressImage(file, 0.1) 
      .subscribe(result => {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = () => {
          
          this.logo = reader.result as string
        };
      }, error => {
        console.log(error);
      });
  }


  onCreate(): void {
    const empleo = new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion);
    this.empleoService.save(empleo).subscribe(
      data => {
        this.toastr.success('Empleo Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
}
