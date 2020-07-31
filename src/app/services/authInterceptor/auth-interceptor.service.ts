import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', localStorage.getItem('auth_token') || "");

    let alteredReq = req.clone({headers});
    return next.handle(alteredReq);
  }


}
