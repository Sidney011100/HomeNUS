import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { switchMap } from 'rxjs/operators';

import firebase from '@firebase/app';
import '@firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
import { User } from './user.model';
import { AnnouncementService } from '../hallwelcome/home/announcement.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class AuthService {
    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    user$: Observable<User>;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private snackBar: MatSnackBar,
                private uiService: UIService,
                private database: AngularFirestore,
                private announcementService: AnnouncementService,
                private bookingService: BookingService
    ) {
        this.user$ = this.afAuth.authState.pipe( // Get auth data, then get firestore user document || null
            switchMap(user => {
                if (user) {
                    // console.log(user);
                    return this.database.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null); //change
                }
            })
        );
    }

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/welcome']);
            } else {
                // need to cancel Subscriptions from other places here
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/']);
            }
        });
    }

    // registerUser(authData: AuthData) {
    //     this.uiService.loadingStateChanged.next(true);
    //     this.uiService.regsterUserCalled.next(true);
    //     this.afAuth.auth
    //         .createUserWithEmailAndPassword(authData.email, authData.password)
    //         .then(result => {
    //             this.uiService.loadingStateChanged.next(false);
    //             this.uiService.regsterUserCalled.next(false);
    //             console.log(result)
    //         })
    //         .catch(error => {
    //             this.uiService.loadingStateChanged.next(false);
    //             this.uiService.regsterUserCalled.next(false);
    //             this.uiService.showSnackBar(error.message, null, 3000)
    //         });
    // }

    // login(authData: AuthData) {
    //     this.uiService.loadingStateChanged.next(true);
    //     this.uiService.loginCalled.next(true);
    //     this.afAuth.auth
    //         .signInWithEmailAndPassword(authData.email, authData.password)
    //         .then(result => {
    //             this.uiService.loadingStateChanged.next(false);
    //             this.uiService.loginCalled.next(false);
    //             console.log(result);
    //             console.log('signed in!');
    //         })
    //         .catch(error => {
    //             this.uiService.loadingStateChanged.next(false);
    //             this.uiService.loginCalled.next(false);
    //             this.uiService.showSnackBar(error.message, null, 3000)
    //         })
    // }

    // googleAuth() {
    //     return this.authLogin(new auth.GoogleAuthProvider());
    // }

    // microsoftAuth() {
    //     return this.authLogin(new auth.OAuthProvider('microsoft.com'));
    // }

    authLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then(cred => {
                this.updateUserData(cred.user);
                console.log('You have been successfully logged in!');
            })
            .catch(error => {
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    signInWithPopup(provider: { providerId: string }) {
        return this.afAuth.auth.signInWithPopup(provider);
    }

    async googleLogin(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async microsoftLogin(): Promise<any> {
        const provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            login_hint: 'user@firstadd.onmicrosoft.com',
        });
        const credential = await this.signInWithPopup(provider);
        console.log(credential.user);
        return this.updateUserData(credential.user);
    }

    isAuth() { // good
        return this.isAuthenticated;
    }

    // Sets user data to firestore on login
    private updateUserData(user) { // good
        const userRef: AngularFirestoreDocument<any> = this.database.doc(`users/${user.uid}`);
        const data: User = {
            userId: user.uid,
            email: user.email,
            roles: {
                member: true
            },
            name: user.displayName
        };
        return userRef.set(data, { merge: true });
    }

    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) {return false; }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

    ///// Role-based Authorization //////

    canRead(user: User): boolean {
        const allowed = ['admin', 'member'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }
    ///// End of Role-based Authorization //////

    logout() { // good
        // cancel all subscriptions here
        this.bookingService.cancelSubscriptions();
        this.announcementService.cancelSubscription();
        this.afAuth.auth.signOut()
            .catch(error => {
                console.log(error);
            });
    }


}