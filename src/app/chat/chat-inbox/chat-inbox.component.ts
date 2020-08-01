import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit, OnDestroy {

  toUser = null;
  chatSub: Subscription;
  chatText = new FormControl(null, [Validators.required]);
  typingMssg = '';
  chatContent: Array<{
    from: string,
    float: string,
    mssg: string,
    date: Date
  }> = [];

  constructor(private socket: Socket, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatSub = this.chatService.chatSelectedSubject.subscribe(data => this.toUser = data);

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
    console.log(this.toUser)
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
      from: localStorage.getItem('user_id'),
      to: '',
      mssg: message,
      date: date
    });
    this.socket.emit('typing', {from: null, to: null});
    this.chatText.setValue('');
  }

  typing() {
    const name = (this.chatText.value !== '') ? localStorage.getItem('username') : null;
    this.socket.emit('typing', {from: name, to: ''});
  }

}
