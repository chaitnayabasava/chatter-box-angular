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
  user = null;
  firstMssg: boolean;
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
    this.chatSub = this.chatService.chatSelectedSubject.subscribe(data => {
      this.toUser = data;
      this.firstMssg = true;
    });
    this.user = {
      _id: localStorage.getItem('user_id'),
      username: localStorage.getItem('username')
    };

    this.socket.connect();
    this.socket.emit('established', this.user._id);

    this.socket.on('typing', (data) => {
      if(data.from === null) {
        this.typingMssg = '';
        return;
      }
      this.typingMssg = data.from.username + ' is typing...'
    })

    this.socket.on('message', (data) => {
      this.chatContent.push({
        from: data.from.username,
        float: 'left',
        mssg: data.mssg,
        date: data.date
      });
    });
  }

  ngOnDestroy() {
    this.chatSub.unsubscribe();
    this.socket.emit('closed', this.user._id);
    this.socket.disconnect();
  }

  SendMessage() {
    console.log(this.firstMssg);
    const date = new Date();
    const message = this.chatText.value;

    if(message === '') return;
    if(this.firstMssg) {
      this.socket.emit('new-connect', {from: this.user, to: this.toUser});
      this.firstMssg = false;
    }

    this.chatContent.push({
      from: 'you',
      float: 'right',
      mssg: message,
      date: date
    });

    this.socket.emit('message', {
      from: this.user,
      to: this.toUser,
      mssg: message,
      date: date
    });
    this.socket.emit('typing', {from: null, to: this.toUser});
    this.chatText.setValue('');
  }

  typing() {
    const from = (this.chatText.value !== '') ? this.user : null;
    this.socket.emit('typing', {from: from, to: this.toUser});
  }

}
