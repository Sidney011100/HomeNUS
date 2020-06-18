import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HallWelcomeComponent } from './hallwelcome/hallwelcome.component'; 
import { BookingComponent } from './booking/booking.component';
import { AuthGuard } from './auth/auth.guard';

import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  {path: '', component: AuthComponent}, 
  {path: 'welcome', component: HallWelcomeComponent, canActivate: [AuthGuard]},
  {path: 'booking', component: BookingComponent, canActivate: [AuthGuard]}, 
  { path: 'welcome', component: HallWelcomeComponent,canActivate: [MsalGuard]},
  {path: '',component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule], 
  providers: [AuthGuard]
})
export class AppRoutingModule { }
