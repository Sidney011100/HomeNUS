import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      //formControl has a default value, set to an empty string (first argument below)
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }), 
      password: new FormControl('', { validators: [Validators.required]
      })
    })
  }

  onLogIn() {
    this.authService.login({
      email: this.loginForm.value.email, 
      password: this.loginForm.value.password 
    })
  }

}
