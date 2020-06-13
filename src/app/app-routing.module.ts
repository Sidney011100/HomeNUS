import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HallWelcomeComponent } from './hallwelcome/hallwelcome.component'; 
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  {path: '', component: AuthComponent}, 
  {path: 'welcome', component: HallWelcomeComponent},
  {path: 'booking', component: BookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
