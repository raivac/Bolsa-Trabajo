import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { LoginEmpresaDto } from '../models/login-empresa.dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-empresa',
  templateUrl: './login-empresa.component.html',
  styleUrls: ['./login-empresa.component.css']
})
export class LoginEmpresaComponent implements OnInit {

  loginEmpresa: LoginEmpresaDto = new LoginEmpresaDto('ejemplo@ejemplo.com', 'contraseña');
  email: string = "";
  password!: string;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router

  ) { }
  ngOnInit(): void {

  }

  onLogin() {

    this.loginEmpresa = new LoginEmpresaDto(this.email, this.password);
    this.authService.loginEmpresa(this.loginEmpresa).subscribe(
      data => {
        if (!data.token) {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.tokenService.setToken(data.token);
          Swal.fire({
            icon: 'success',
            title: 'Logeado correctamente',
            showConfirmButton: false,
            timer: 3000
          });
          if(this.tokenService.getRol()!="empresa"){ 
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'warning',
            title: 'Entra como empresa no como candidato',
            showConfirmButton: false,
            timer: 3000
          });}
          this.router.navigate(['/']);
        }
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

}
