import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id: number = 0
  rol: any;
  isLogged: boolean = false;
  isEmpresa: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isEmpresa = this.tokenService.isEmpresa();
  }
  logOut(): void {
    this.tokenService.logOut()
    this.router.navigate(['/login-empresa'])
  }
  alertaLoginEmpresa() {
    if(!this.tokenService.isEmpresa()){
    this.router.navigate(['/']);
    Swal.fire({
      title: 'Error',
      text: 'Inicie sesión como empresa',
      icon: 'error',
      showConfirmButton: false,
      timer: 3000
    });
  }
  }
}