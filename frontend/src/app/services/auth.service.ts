import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { HttpClient } from "@angular/common/http";
import { LoginEmpresaDto } from '../models/login-empresa.dto';
import { Observable } from 'rxjs';
import { CreateEmpresaDto } from '../models/create-empresa.dto';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = env.authURL;

  constructor(private httpClient: HttpClient) { }

  loginEmpresa(dto: LoginEmpresaDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'login/empresa',dto)
  }
  // loginCandidato(dto: LoginEmpresaDto):Observable<any>{
  //   return this.httpClient.post<any>(this.authURL+'login/candidato',dto)
  // }
  registroEmpresa(dto: CreateEmpresaDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'empresa',dto)
  }
  // registroCandidato(dto: LoginEmpresaDto):Observable<any>{
  //   return this.httpClient.post<any>(this.authURL+'candidato',dto)
  // }

}
