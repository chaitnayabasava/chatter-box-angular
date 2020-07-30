import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService implements CanActivate{

  canActivate(activeRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', "");

    return this.http.get("http://localhost:3000/checkAuth", {
      headers: headers
    }).pipe(
      map(res => {
        return true;
      }),
      catchError((err) => {
        console.log(err.error.message);
        return of(false);
      })
    );
  }

  constructor(private http: HttpClient) { }
}
