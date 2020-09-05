import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceFunc } from '../../debounce.function';
import { ChatService } from '../services/chat/chat.service';
import { SocketService } from '../services/socket/socket.service';

import { User } from '../User.model';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit, OnDestroy {

  toUser: User = null;
  user: User = null;
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

  constructor(private socketService: SocketService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatSub = this.chatService.chatSelectedSubject.subscribe(data => {
      this.toUser = data;
      this.firstMssg = true;
    });
    this.user = {
      _id: localStorage.getItem('user_id'),
      username: localStorage.getItem('username')
    };

    this.socketService.newConnect(this.user._id);

    this.socketService.socket.on('typing', (data) => {
      if(data.from === null) {
        this.typingMssg = '';
        return;
      }
      this.typingMssg = data.from.username + ' is typing...'
    })

    this.socketService.socket.on('message', (data) => {
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
    this.socketService.destroyConnection(this.user._id);
  }

  SendMessage() {
    const date = new Date();
    const message = this.chatText.value;

    if(message === '') return;
    if(this.firstMssg) {
      this.socketService.mssgTyping({from: this.user, to: this.toUser, tag: this.firstMssg});
      this.firstMssg = false;
    }

    this.chatContent.push({
      from: 'you',
      float: 'right',
      mssg: message,
      date: date
    });

    this.socketService.sendMssg(this.user, this.toUser, message, date);
    this.socketService.mssgTyping({from: null, to: this.toUser});
    this.chatText.setValue('');
  }

  private typing() {
    const from = (this.chatText.value !== '') ? this.user : null;
    this.socketService.mssgTyping({from: from, to: this.toUser});
  }

  debounceTyping = debounceFunc(this.typing, 1000, this);

}
