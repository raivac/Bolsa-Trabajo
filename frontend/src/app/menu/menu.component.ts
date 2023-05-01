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
  //cuando inicie
  ngOnInit(): void {
    this.mostrarMenu()
    this.isLogged = this.tokenService.isLogged();
    this.isEmpresa = this.tokenService.isEmpresa();
  }

  //funcion para mostrar el menu en version mobil
  mostrarMenu(): void {
    const boton = document.getElementById("boton");
    const minimenu = document.getElementById("minimenu");
    if (boton && minimenu) {
      boton.addEventListener("click", function () {
        minimenu.style.display = minimenu.style.display === "block" ? "none" : "block";
      });
    }
  }

  //funcion para volver al inicio cuando se cierre sesón 
  logOut(): void {
    this.tokenService.logOut()
    this.router.navigate(['/'])
    Swal.fire({
      icon: 'warning',
      title: 'Sesión cerrada',
      showConfirmButton: false,
      timer: 3000
    });
    setTimeout(() => {
      location.reload();
    }, 3000);

  }
  //funcion para avisar que inicien sesón como empresa
  alertaLoginEmpresa() {
    if (!this.tokenService.isEmpresa()) {
      this.router.navigate(['/']);
      Swal.fire({
        title: 'Error',
        text: 'Inicie sesión como empresa',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000
      });
    }
    else{
      setTimeout(() => {
        location.reload()
      }, 10);
    }
  }

  espera(){
    setTimeout(() => {
      location.reload()
    }, 10);
  }
}