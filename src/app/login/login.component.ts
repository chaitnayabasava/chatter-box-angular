import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  formSubmit() {
    const values = this.loginForm.value;
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirm_password: values.conPassword
    };

    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.httpClient.post("http://localhost:3000/login", JSON.stringify(data), {headers: headers})
    .subscribe(data => console.log(data), err => console.log(err.error.message));
  }

}
