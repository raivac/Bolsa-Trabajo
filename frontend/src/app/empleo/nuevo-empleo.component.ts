import { Component, OnInit } from '@angular/core';
import { EmpleoService } from '../services/empleo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Empleo } from '../models/empleo';
import Swal from 'sweetalert2';


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
  ) { }

  ngOnInit() {

    // const contentElement = this.renderer.selectRootElement('#content');
    // const elements = contentElement.querySelectorAll('*:contains("*")');
    // elements.forEach((element: { innerHTML: string; }) => {
    //   element.innerHTML = element.innerHTML.replace('*', '<span style="color:red">*</span>');
    // });
    console.log("Entro a ngOnInit")

  }

  guardarLogo(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.logo = reader.result as string;
    };
  }


  onCreate(): void {
    const empleo = new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion);
    this.empleoService.save(empleo).subscribe(
      data => {
        console.log(empleo)
        Swal.fire({
          icon: 'success',
          title: 'Oferta creada exitosamente!',
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigate(['/']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la oferta',
          showConfirmButton: false,
          timer: 3000
        })
        console.log(err)
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
