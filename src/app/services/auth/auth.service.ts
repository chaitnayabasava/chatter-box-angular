import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  authConfirmed(result) {
    localStorage.setItem('auth_token', result.auth_token);
    localStorage.setItem('user_id', result._id);
    localStorage.setItem('username', result.username);
    this.navigateChat();
  }

  clearAuth() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
  }

  navigateChat() {
    this.router.navigate(['chat']);
  }
}
