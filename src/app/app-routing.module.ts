import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HallWelcomeComponent } from './hallwelcome/hallwelcome.component';
import { BookingComponent } from './booking/booking.component';
import { MyBookingComponent } from './booking/my-booking/my-booking.component';


import { AuthGuard } from './auth/auth.guard';

import { MsalGuard } from '@azure/msal-angular';
import { DateBookingComponent } from './booking/date-booking/date-booking.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'welcome', component: HallWelcomeComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: HallWelcomeComponent, canActivate: [MsalGuard] },
  { path: 'date-booking', component: DateBookingComponent },
  { path: 'my-booking', component: MyBookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule], 
  providers: [AuthGuard]
})
export class AppRoutingModule { }
