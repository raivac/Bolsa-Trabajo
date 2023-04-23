import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);

  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  getId(): string {
    if (!this.isLogged()) {
      return "Logeate";
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const id = valuesJson.id;
    return id
  }
  getRol(): string {
    if (!this.isLogged()) {
      return "Logeate";
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rol = valuesJson.roles[0]
    return rol
  }
  isEmpresa(): boolean{
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if(roles.indexOf('empresa')<0){
      return false;
    }
    return true
  }
  isCandidato(): boolean{
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if(roles.indexOf('candidato')<0){
      return false;
    }
    return true
  }
  logOut(): void {
    localStorage.removeItem('token');
    Swal.fire({
      icon: 'warning',
      title: 'Sesión cerrada',
      showConfirmButton: false,
      timer: 3000
    });
  }
  
}