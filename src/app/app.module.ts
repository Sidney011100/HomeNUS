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

//why is this not working why got red lines the code got period
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
      AngularFireAuthModule
   ],
   providers: [AuthService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
