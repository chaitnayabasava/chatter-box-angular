import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {

  readonly SOCKET_ENDPOINT = "localhost:3000";
  socket;

  constructor() {
    this.socket = io(this.SOCKET_ENDPOINT);
  }
}
