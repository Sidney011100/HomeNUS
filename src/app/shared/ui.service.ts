import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {
    loadingStateChanged = new Subject<boolean>();
    regsterUserCalled = new Subject<boolean>();
    loginCalled = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) { }

    showSnackBar(message, action, duration) {
        this.snackbar.open(message, action, {duration: duration});
    }

  

}