import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth_token')) {
      this.router.navigate(['chat']);
      return;
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
      localStorage.setItem('auth_token', result.auth_token);
      this.router.navigate(['chat']);
    }, err => {
      this.errorMssg = err.error.message;
    });
  }

}
