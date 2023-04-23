import { Component } from '@angular/core';
import { CreateCandidatoDto } from '../models/create-candidato.dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreateEmpresaDto } from '../models/create-empresa.dto';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }
  ngOnInit(): void {
  }
  onRegister():void{
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
          title: 'Esta cuenta ya existe',
          showConfirmButton: false,
          timer: 3000
        });
      }
    )
  }
}
