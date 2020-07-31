import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth/auth.service';
import * as secret from '../secret.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  errorMssg: string = null;

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth_token')) {
      this.auth.navigateChat();
    }
  }

  formSubmit() {
    const values = this.loginForm.value;
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirm_password: values.conPassword
    };

    this.httpClient.post<any>(secret.backend + "/login", JSON.stringify(data))
    .subscribe(result => {
      this.auth.authConfirmed(result);
    }, err => {
      this.errorMssg = err.error.message;
    });
  }

}
