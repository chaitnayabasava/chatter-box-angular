import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { User } from '../../User.model';

@Injectable()
export class SocketService {

  constructor(public socket: Socket) {
    this.socket.connect();
  }

  newConnect(id: string) {
    this.socket.emit('established', id);
  }

  destroyConnection(id: string) {
    this.socket.emit('closed', id);
    this.socket.disconnect();
  }

  mssgTyping(data: {from, to, tag?}) {
    this.socket.emit('typing', data);
  }

  sendMssg(fromUser: User, toUser: User, mssg: string, date: Date) {
    this.socket.emit('message', {
      from: fromUser,
      to: toUser,
      mssg: mssg,
      date: date
    });
  }
}
