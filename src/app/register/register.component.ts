import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Router } from '@angular/router';

import * as secret from '../secret.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordsCheck = (group: FormGroup): {[_: string]: boolean} | null => {
    const pass = group.controls.password.value;
    const confPass = group.controls.conPassword.value;

    if(confPass !== pass) return {'noMatch': true};
    return null;
  }

  registerForm = new FormGroup({
    'username': new FormControl(null, [
      Validators.required
    ]),
    'email': new FormControl(null, [
      Validators.required, Validators.email
    ]),
    'password': new FormControl(null, [
      Validators.required,
      Validators.minLength(8)
    ]),
    'conPassword': new FormControl(null)
  }, [this.passwordsCheck]);

  errorMssg: string = null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth_token')) {
      this.router.navigate(['chat']);
      return;
    }
  }

  formSubmit() {
    const values = this.registerForm.value;
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirm_password: values.conPassword
    };

    this.httpClient.post<any>(secret.backend + "/register", JSON.stringify(data))
    .subscribe(result => {
      localStorage.setItem('auth_token', result.auth_token);
      this.router.navigate(['chat']);
    }, err => {
      this.errorMssg = err.error.message;
    });
  }
}
