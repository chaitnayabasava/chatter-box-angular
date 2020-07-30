import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from  '@angular/common/http';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  formSubmit() {
    const values = this.registerForm.value;
    const data = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirm_password: values.conPassword
    };

    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.httpClient.post("http://localhost:3000/register", JSON.stringify(data), {headers: headers})
    .subscribe(data => console.log(data), err => console.log(err.error.message));
  }
}
