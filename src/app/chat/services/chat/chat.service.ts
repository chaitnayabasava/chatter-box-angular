import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import * as secret from '../../../secret.json';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  listSubject = new Subject<Array<{
    username: string,
    _id: string
  }>>();

  chatSelectedSubject = new Subject<{username: string, _id: string}>();

  constructor(private http: HttpClient) { }

  searchQuery(query: string) {
    this.http.post<Array<{
      username: string,
      _id: string
    }>>(secret.backend + "/search", {query: query})
    .subscribe(data => console.log(data), err => console.log(err.error.message));
  }
}
