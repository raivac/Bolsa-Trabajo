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
      return "Error al cargar el id";
    }
    const token = this.getToken()
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson= JSON.parse(values);
    const id = valuesJson.id;
    return id
  }
  logOut():void{
    localStorage.removeItem('token');
  }
}
