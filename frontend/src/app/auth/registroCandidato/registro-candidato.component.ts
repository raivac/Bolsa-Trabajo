import { Component } from '@angular/core';
import { CreateCandidatoDto } from '../../models/create-candidato.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-candidato',
  templateUrl: './registro-candidato.component.html',
  styleUrls: ['./registro-candidato.component.css']
})
export class RegistroCandidatoComponent {
  nuevoCandidato: CreateCandidatoDto = new CreateCandidatoDto('', '','','',0,'');
  email: string = "";
  password!: string;
  nombre: string= ""; 
  apellidos: string= ""; 
  telefono: number= 0; 
  cif: string= ""; 
  valid: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,

  ) { }
  ngOnInit(): void {
  }
  onRegister():void{
    this.valid = true;

    if (!this.nombre) {
      this.toastr.error('El nombre es obligatorio', 'Error');
      this.valid = false;
    }
    if (!this.apellidos) {
      this.toastr.error('Los apellidos son', 'Error');
      this.valid = false;
    }
    if (!this.password) {
      this.toastr.error('La contraseña es obligatoria', 'Error');
      this.valid = false;
    }
    if (!this.cif || !/^\d{8}[A-HJ-NP-TV-Z]$/i.test(this.cif)) {
      this.toastr.error('El DNI es obligatorio y debe ser válido', 'Error');
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

    if (this.valid) {
    this.nuevoCandidato = new CreateCandidatoDto(this.email,this.password,this.nombre,this.apellidos,this.telefono,this.cif);
    this.authService.registroCandidato(this.nuevoCandidato).subscribe(
      data=>{
        Swal.fire({
          icon: 'success',
          title: 'Candidato registrado correctamente ',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/login-candidato'])
      },
      err =>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar la cuenta',
          showConfirmButton: false,
          timer: 3000
        });
      }
    )
  }
}
}
