import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { auth } from 'firebase';

import firebase from '@firebase/app';
import '@firebase/auth';

// var provider = new firebase.auth.OAuthProvider('microsoft.com');

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();

    // provider = new firebase.auth.OAuthProvider('microsoft.com');

    constructor(private router: Router,
                private afAuth: AngularFireAuth 
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
        this.afAuth.auth
                    .createUserWithEmailAndPassword(authData.email, authData.password)
                    .then(result => {
                        console.log(result)
                    })
                    .catch(error => console.log(error))
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
                console.log(error)
            })
    } 

    login(authData: AuthData) {
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    logout() {
        this.isAuthenticated = false;
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}