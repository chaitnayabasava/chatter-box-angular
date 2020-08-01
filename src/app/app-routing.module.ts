import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatInboxComponent } from './chat/chat-inbox/chat-inbox.component';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CheckAuthService } from './services/check_auth/check-auth.service';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: "full"
  },
  {
    path: 'chat',
    component: ChatComponent,
    pathMatch: "full",
    canActivate: [CheckAuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
