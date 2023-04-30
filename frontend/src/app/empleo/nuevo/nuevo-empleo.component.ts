import { Component, OnInit } from '@angular/core';
import { EmpleoService } from '../../services/empleo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Empleo } from '../../models/empleo';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';


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
  telefono: number = 0;
  email: string = '';
  logo: string = '';
  candidatos: string="No hay candidatos";
  valid: boolean = true;
  constructor(
    private empleoService: EmpleoService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.idEmpresa = this.tokenService.getId()
  }
  //funcion para poder subir el logo y almacenarlo en base64
  guardarLogo(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.logo = reader.result as string;
    };
  }

  

   crear(): void {
    this.valid = true;
  //validacion formulario crear
    if (!this.titulo) {
      this.toastr.error('El título es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.empresa) {
      this.toastr.error('La empresa es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.tipoContrato) {
      this.toastr.error('El tipo de contrato es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.jornada) {
      this.toastr.error('La jornada es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.salario) {
      this.toastr.error('El salario es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.descripcion) {
      this.toastr.error('La descripción es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.ubicacion) {
      this.toastr.error('La ubicación es obligatoria', 'Error');
      this.valid = false;
    }
    
    if (!this.telefono || !/^[679][0-9]{8}$/.test(this.telefono.toString())) {
      this.toastr.error('El teléfono es obligatorio y debe ser válido', 'Error');
      this.valid = false;
    }    
    
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      this.toastr.error('El email es obligatorio y debe ser válido', 'Error');
      this.valid = false;
    }
    //si estan todos los campos correctos se creara la nueva oferta
    if (this.valid)  {
      const empleo =  new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion, this.telefono, this.email,this.candidatos);
       this.empleoService.save(empleo).subscribe(
        data => {
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
  }
  volver(): void {
    this.router.navigate(['/']);
  }
}
