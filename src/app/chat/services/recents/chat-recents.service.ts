import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import * as secret from '../../../secret.json';

interface returnType {
  data: Array<{
          username: string,
          _id: string
        }>
}

@Injectable({
  providedIn: 'root'
})
export class ChatRecentsService implements Resolve<returnType> {

  constructor(private http: HttpClient) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<returnType> | Promise<returnType> | returnType {
      const userId = localStorage.getItem('user_id');
      if(userId)
        return this.http.post<returnType>(secret.backend + "/recents", {_id: userId});
      else
        return {data: []};
  }
}
