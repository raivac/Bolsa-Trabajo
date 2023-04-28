import { Component, OnInit } from '@angular/core';
import { CreateEmpresaDto } from '../../models/create-empresa.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent  implements OnInit{
  nuevaEmpresa: CreateEmpresaDto = new CreateEmpresaDto('', '','','','',0,'','');
  email: string = "";
  password!: string;
  nombre: string= ""; 
  apellidos: string= ""; 
  empresa: string= ""; 
  telefono: number= 0; 
  cif: string= ""; 
  descripcion: string= ""
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

    if (!this.empresa) {
      this.toastr.error('La empresa es obligatoria', 'Error');
      this.valid = false;
    }
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
    if (!this.descripcion) {
      this.toastr.error('La descripción es obligatoria', 'Error');
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
    this.nuevaEmpresa = new CreateEmpresaDto(this.email,this.password,this.nombre,this.apellidos,this.empresa,this.telefono,this.cif,this.descripcion);
    this.authService.registroEmpresa(this.nuevaEmpresa).subscribe(
      data=>{
        Swal.fire({
          icon: 'success',
          title: 'Empresa registrada correctamente ',
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/login-empresa'])
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
