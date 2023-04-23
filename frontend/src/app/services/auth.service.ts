import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { HttpClient } from "@angular/common/http";
import { LoginEmpresaDto } from '../models/login-empresa.dto';
import { Observable } from 'rxjs';
import { CreateEmpresaDto } from '../models/create-empresa.dto';
import { LoginCandidatoDto } from '../models/login-candiato.dto';
import { CreateCandidatoDto } from '../models/create-candidato.dto';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = env.authURL;

  constructor(private httpClient: HttpClient) { }

  loginEmpresa(dto: LoginEmpresaDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'login/empresa',dto)
  }
  loginCandidato(dto: LoginCandidatoDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'login/candidato',dto)
  }
  registroEmpresa(dto: CreateEmpresaDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'empresa',dto)
  }
  registroCandidato(dto: CreateCandidatoDto):Observable<any>{
    return this.httpClient.post<any>(this.authURL+'candidato',dto)
  }

}
