import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from './material.module';
import { HallWelcomeComponent } from './hallwelcome/hallwelcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent} from './auth/about/about.component';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { BookingComponent } from './booking/booking.component';
import { AuthService } from './auth/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './hallwelcome/home/home.component';
import { CalendarComponent } from './hallwelcome/calendar/calendar.component';


import { MsalModule, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
   declarations: [
      AppComponent,
      AuthComponent,
      HallWelcomeComponent,
      SignupComponent,
      LoginComponent,
      AboutComponent,
      HeaderComponent,
      SidenavComponent,
      BookingComponent,
      HomeComponent,
      CalendarComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MaterialModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule, 
      AngularFireModule.initializeApp(environment.firebase), 
      AngularFirestoreModule, 
      AngularFireAuthModule, 
   MsalModule.forRoot({
      auth: {
        clientId: 'api://231b15e8-1f83-4869-a953-2092ef852bec', // This is your client ID
        authority: 'https://login.microsoftonline.com', // This is your tenant ID
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
        'welcome',
        'booking'
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    })
  ],
   providers: [AuthService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: MsalInterceptor,
         multi: true
     }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
