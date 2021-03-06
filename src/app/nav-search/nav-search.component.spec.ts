import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSearchComponent } from './nav-search.component';

describe('ChatSearchComponent', () => {
  let component: ChatSearchComponent;
  let fixture: ComponentFixture<ChatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
