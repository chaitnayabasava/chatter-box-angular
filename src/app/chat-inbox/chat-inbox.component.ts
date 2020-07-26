import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit, OnDestroy {

  chatText = new FormControl(null, [Validators.required]);
  typingMssg = '';
  chatContent: Array<{
    from: string,
    float: string,
    mssg: string,
    date: Date
  }> = [];

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('typing', (data) => {
      if(data.from === null) {
        this.typingMssg = '';
        return;
      }
      this.typingMssg = data.from + ' is typing...'
    })

    this.socket.on('message', (data) => {
      this.chatContent.push({
        from: data.from,
        float: 'left',
        mssg: data.mssg,
        date: data.date
      });
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  SendMessage() {
    const date = new Date();
    const message = this.chatText.value;

    if(message === '') return;

    this.chatContent.push({
      from: 'you',
      float: 'right',
      mssg: message,
      date: date
    });
    this.socket.emit('message', {
      from: 'chaitanya',
      to: '',
      mssg: message,
      date: date
    });
    this.socket.emit('typing', {from: null});
    this.chatText.setValue('');
  }

  typing() {
    const name = (this.chatText.value !== '') ? 'chaitanya' : null;
    this.socket.emit('typing', {from: name});
  }

}
