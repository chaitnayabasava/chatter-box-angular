import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as secret from '../../secret.json';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService implements CanActivate{

  canActivate(activeRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    // if(localStorage.getItem('auth_token')) {
    //   return true;
    // }

    // this.router.navigate(['login']);
    // return false;
    return this.http.get(secret.backend + "/checkAuth").pipe(
      map(res => {
        return true;
      }),
      catchError((err) => {
        console.log(err.error.message);
        if(err.error.message == "jwt expired") localStorage.removeItem('auth_token');
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }

  constructor(private http: HttpClient, private router: Router) { }
  // constructor(private router: Router) { }
}
