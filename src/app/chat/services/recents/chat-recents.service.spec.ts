import { TestBed } from '@angular/core/testing';

import { ChatRecentsService } from './chat-recents.service';

describe('ChatRecentsService', () => {
  let service: ChatRecentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRecentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
