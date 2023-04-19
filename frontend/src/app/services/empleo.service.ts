import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Empleo } from '../models/empleo';
import { Observable } from 'rxjs';
import { env } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {

  empleoURL = env.empleoURL;

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Empleo[]> {
    return this.httpClient.get<Empleo[]>(this.empleoURL);
  }

  public detail(id: number): Observable<Empleo> {
    return this.httpClient.get<Empleo>(this.empleoURL + `/${id}`);
  }

  public save(empleo: Empleo): Observable<any> {
    return this.httpClient.post<any>(this.empleoURL, empleo,{ reportProgress: true });
  }

  public update(id: number, empleo: Empleo): Observable<any> {
    return this.httpClient.put<any>(this.empleoURL + `/${id}`, empleo,{ reportProgress: true });
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.empleoURL + `/${id}`);
  }
}
