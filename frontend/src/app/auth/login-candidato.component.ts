import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginCandidatoDto } from '../models/login-candiato.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login-candidato',
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css']
})
export class LoginCandidatoComponent implements OnInit{

  loginCandidato: LoginCandidatoDto = new LoginCandidatoDto('ejemplo@ejemplo.com', 'contraseña');
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
    this.loginCandidato = new LoginCandidatoDto(this.email, this.password);
    this.authService.loginCandidato(this.loginCandidato).subscribe(
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
          if(this.tokenService.getRol()!="candidato"){ 
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'warning',
            title: 'Entra como candidato no como empresa ',
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
