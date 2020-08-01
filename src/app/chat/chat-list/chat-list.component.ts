import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {

  showList: Array<{
    username: string,
    _id: string
  }>;
  @ViewChild('searchInput') searchInput: ElementRef;
  listSub: Subscription;
  selectedId: string = null;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.showList = []
    this.listSub = this.chatService.listSubject.subscribe(data => this.showList = data);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

  chatSelected(idx: number) {
    this.selectedId = this.showList[idx]._id;
    this.chatService.chatSelectedSubject.next(this.showList[idx]);
  }

  searchName() {
    const query = this.searchInput.nativeElement.value;

    if(query == "") return;
    this.chatService.searchQuery(query);
  }

}
