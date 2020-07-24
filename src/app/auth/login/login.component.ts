import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, sequence, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateX(-550px)',
          'box-shadow': 'none',
        }),
        sequence([
          animate(
            '2s ease',
            style({
              opacity: '0.3',
              transform: 'translateX(0)',
              'box-shadow': 'none',
            })
          ),
          animate(
            '0.5s ease',
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          )
        ]),
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadSubs: Subscription;

  constructor(public authService: AuthService, 
              private uiService: UIService) { }

  ngOnInit() {
    this.loadSubs = this.uiService.loadingStateChanged.subscribe(state => 
      this.isLoading = state);
    // this.loginForm = new FormGroup({
    //   //formControl has a default value, set to an empty string (first argument below)
    //   email: new FormControl('', {
    //     validators: [Validators.required, Validators.email]
    //   }), 
    //   password: new FormControl('', { validators: [Validators.required]
    //   })
    // })
  }

  // onLogIn() {
  //   this.authService.login({
  //     email: this.loginForm.value.email, 
  //     password: this.loginForm.value.password 
  //   })
  // }

  ngOnDestroy() {
    this.loadSubs.unsubscribe();
  }

  googleLogin() {
    this.authService.googleLogin();
  }

  microsoftLogin() {
    this.authService.microsoftLogin();
  }


}
