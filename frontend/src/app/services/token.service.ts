import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean{
    if(this.getToken()){
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

  getId():string{
    if(!this.isLogged()){
      return "Logeate";
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson= JSON.parse(values);
    const id = valuesJson.id;
    console.log(valuesJson)
    return id
  }
  getRol():string{
    if(!this.isLogged()){
      return "Logeate";
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson= JSON.parse(values);
    const rol = valuesJson.roles[0]
    console.log(rol)
    return rol
  }
  logOut():void{
    localStorage.removeItem('token');
  }
}
