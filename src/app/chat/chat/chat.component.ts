import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket/socket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [SocketService]
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
