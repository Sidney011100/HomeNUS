import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  registerUserCalled = false;
  private registerCalledSubs: Subscription;
  loginCalled = false;
  private loginCalledSubs: Subscription;

  constructor(private uiService: UIService) { }

  ngOnInit() {
    this.registerCalledSubs = this.uiService.registerUserCalled.subscribe(state => 
      this.registerUserCalled = state);
    this.loginCalledSubs = this.uiService.loginCalled.subscribe(state => this.loginCalled = state);
  }

  ngOnDestroy() {
    this.loginCalledSubs.unsubscribe();
    this.registerCalledSubs.unsubscribe();
  }
}
