import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleo } from '../models/empleo';
import { EmpleoService } from '../services/empleo.service';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-editar-empleo',
  templateUrl: './editar-empleo.component.html',
  styleUrls: ['./editar-empleo.component.css']
})
export class EditarEmpleoComponent implements OnInit {


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
  candidatos :string= 'No hay candidatos'
  valid: boolean = true;

  empleo: Empleo = new Empleo(this.titulo, this.empresa, this.descripcion, this.tipoContrato, this.jornada, this.salario, this.logo, this.idEmpresa, this.ubicacion, this.telefono,this.email,this.candidatos);

  constructor(
    private tokenService: TokenService,
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
        this.toastr.error('Error', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
    this.idEmpresa = this.tokenService.getId()

  }

  actualizar(): void {
    this.valid = true;
    //validacion formulario editar
    if (!this.empleo.titulo) {
      this.toastr.error('El título es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.empleo.empresa) {
      this.toastr.error('La empresa es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.empleo.tipoContrato) {
      this.toastr.error('El tipo de contrato es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.empleo.jornada) {
      this.toastr.error('La jornada es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.empleo.salario) {
      this.toastr.error('El salario es obligatorio', 'Error');
      this.valid = false;
    }

    if (!this.empleo.descripcion) {
      this.toastr.error('La descripción es obligatoria', 'Error');
      this.valid = false;
    }

    if (!this.empleo.ubicacion) {
      this.toastr.error('La ubicación es obligatoria', 'Error');
      this.valid = false;
    }
    
    if (!this.empleo.telefono || !/^[679][0-9]{8}$/.test(this.empleo.telefono.toString())) {
      this.toastr.error('El teléfono es obligatorio y debe ser válido', 'Error');
      this.valid = false;
    }    
    
    if (!this.empleo.email || !/\S+@\S+\.\S+/.test(this.empleo.email)) {
      this.toastr.error('El email es obligatorio y debe ser válido', 'Error');
      this.valid = false;
    }
 
    if (this.valid)  {
    const id = this.activatedRoute.snapshot.params['id'];
    this.empleo.logo = this.logo
    this.empleo.createdAt = new Date()
    this.empleoService.update(id, this.empleo).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: 'Oferta actualizada exitosamente!',
          showConfirmButton: false,
          timer: 3000
        })
        this.router.navigate(['/']);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la oferta',
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
