import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HallWelcomeComponent } from './hallwelcome/hallwelcome.component';
import { BookingComponent } from './booking/booking.component';
import { MyBookingComponent } from './booking/my-booking/my-booking.component';
import { PendingBookingComponent } from './booking/pending-booking/pending-booking.component';
import { FacilityBookingComponent } from './booking/facility-booking/facility-booking.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

import { MsalGuard } from '@azure/msal-angular';



const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'welcome', component: HallWelcomeComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: HallWelcomeComponent, canActivate: [MsalGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: FacilityBookingComponent, canActivate: [AuthGuard] },
      { path: 'facility-booking', component: FacilityBookingComponent, canActivate: [AuthGuard] },
      { path: 'date-booking', loadChildren: './booking/date-booking/date-booking.component', canActivate: [AuthGuard] },
      { path: 'my-booking', component: MyBookingComponent, canActivate: [AuthGuard] },
      { path: 'pending-booking', component: PendingBookingComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'time-booking', loadChildren: './booking/time-booking/time-booking.component', canActivate: [AuthGuard] }
    ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: false, anchorScrolling: 'enabled' })],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
