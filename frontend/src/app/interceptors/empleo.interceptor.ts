import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class EmpleoInterceptor implements HttpInterceptor {

  constructor(
    private tokenSerevice: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let intReq = request;
    const token = this.tokenSerevice.getToken()
    if(token !== null){
      intReq = request.clone({headers: request.headers.set('Authorization','Bearer '+token)})
    }
    return next.handle(intReq);
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: EmpleoInterceptor, multi: true}]
