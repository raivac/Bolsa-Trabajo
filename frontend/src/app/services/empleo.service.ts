import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Empleo } from '../models/empleo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {

  empleoURL = 'http://localhost:3000/empleo';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Empleo[]> {
    return this.httpClient.get<Empleo[]>(this.empleoURL);
  }

  public detail(id: number): Observable<Empleo> {
    return this.httpClient.get<Empleo>(this.empleoURL + `detail/${id}`);
  }

  public save(empleo: Empleo): Observable<any> {
    console.log(empleo)
    return this.httpClient.post<any>(this.empleoURL, empleo);
  }

  public update(id: number, empleo: Empleo): Observable<any> {
    return this.httpClient.put<any>(this.empleoURL + `update/${id}`, empleo);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.empleoURL + `/${id}`);
  }
}
