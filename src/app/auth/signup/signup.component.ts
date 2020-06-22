import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadSubs: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loadSubs = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
  }

  // onSignUp(form: NgForm) {
  //   this.authService.registerUser({
  //     email: form.value.email,
  //     password: form.value.password
  //   });
  // }

  ngOnDestroy() {
    this.loadSubs.unsubscribe();
  }

}
