import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../chat/services/chat/chat.service';

import { debounceFunc } from '../debounce.function';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.css']
})
export class NavSearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void { }

  private searchName() {
    const query = this.searchInput.nativeElement.value;
    if(query == "") return;
    this.chatService.searchQuery(query);
  }

  debounceSearch = debounceFunc(this.searchName, 1000, this);
}
