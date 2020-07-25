import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocketConnectionService } from '../services/sockets/socket-connection.service';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {

  chatText = new FormControl(null, [Validators.required]);
  typingMssg = '';
  chatContent: Array<{
    from: string,
    float: string,
    mssg: string
  }> = [];

  constructor(private socketConnect: SocketConnectionService) { }

  ngOnInit(): void {
    this.socketConnect.socket.on('typing', (data) => {
      if(data.from === null) {
        this.typingMssg = '';
        return;
      }
      this.typingMssg = data.from + ' is typing...'
    })

    this.socketConnect.socket.on('message', (data) => {
      this.chatContent.push({
        from: data.from,
        float: 'left',
        mssg: data.mssg
      });
    });
  }

  SendMessage() {
    const message = this.chatText.value;
    this.chatContent.push({
      from: 'you',
      float: 'right',
      mssg: message
    });
    this.socketConnect.socket.emit('message', {
      from: 'chaitanya',
      to: '',
      msg: message
    });
    this.socketConnect.socket.emit('typing', {from: null});
    this.chatText.setValue('');
  }

  typing() {
    const name = (this.chatText.value !== '') ? 'chaitanya' : null;
    this.socketConnect.socket.emit('typing', {from: name});
  }

}
