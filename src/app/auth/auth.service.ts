import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { auth } from 'firebase';

import firebase from '@firebase/app';
import '@firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';


@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();


    constructor(private router: Router,
                private afAuth: AngularFireAuth, 
                private snackBar: MatSnackBar, 
                private uiService: UIService
        ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/welcome']);
            } else {
                //need to cancel Subscriptions from other places here
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/']);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.uiService.regsterUserCalled.next(true);
        this.afAuth.auth
                    .createUserWithEmailAndPassword(authData.email, authData.password)
                    .then(result => {
                        this.uiService.loadingStateChanged.next(false);
                        this.uiService.regsterUserCalled.next(false);
                        console.log(result)
                    })
                    .catch(error => {
                        this.uiService.loadingStateChanged.next(false);
                        this.uiService.regsterUserCalled.next(false);
                        this.uiService.showSnackBar(error.message, null, 3000)
                    });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.uiService.loginCalled.next(true);
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.loginCalled.next(false);
                console.log(result);
                console.log('signed in!');
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.loginCalled.next(false);
                this.uiService.showSnackBar(error.message, null, 3000)
            })
    }

    googleAuth() {
        return this.authLogin(new auth.GoogleAuthProvider());
    }

    microsoftAuth() {
        return this.authLogin(new auth.OAuthProvider('microsoft.com'));
    }

    authLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then(result => {
                console.log('You have been successfully logged in!')
            })
            .catch(error => {
                this.uiService.showSnackBar(error.message, null, 3000)
            })
    } 



    logout() {
        this.afAuth.auth.signOut()
            .catch(error => {
                console.log(error);
            });
    }

    isAuth() {
        return this.isAuthenticated;
    }
}