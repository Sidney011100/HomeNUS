import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy {
  loggedIn = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
    this.authSubscription = this.authService.authChange.subscribe(status => {
      this.loggedIn = status;
    })
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
