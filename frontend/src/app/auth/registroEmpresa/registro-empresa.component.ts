import { Component, OnInit } from '@angular/core';
import { CreateEmpresaDto } from '../../models/create-empresa.dto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }
  ngOnInit(): void {
  }
  onRegister():void{
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
