import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.registerForm);
  }
}
