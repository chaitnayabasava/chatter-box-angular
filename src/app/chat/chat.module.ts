import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from "./chat/chat.component";
import  { ChatInboxComponent } from "./chat-inbox/chat-inbox.component";
import  { ChatListComponent } from "./chat-list/chat-list.component";
import { CheckAuthService } from "../services/check_auth/check-auth.service";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import * as secret from "../secret.json";

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    pathMatch: "full",
    canActivate: [CheckAuthService]
  }
];

const config: SocketIoConfig = {url: secret.backend, options: {}};

@NgModule({
  declarations: [
    ChatComponent,
    ChatInboxComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config)
  ],
  exports: [
    ChatComponent,
    ChatInboxComponent,
    ChatListComponent,
    RouterModule
  ]
})
export class ChatModule { }
