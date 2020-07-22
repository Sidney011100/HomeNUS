import { MyBookingComponent } from './my-booking/my-booking.component';
import { PendingBookingComponent } from './pending-booking/pending-booking.component';
import { DateBookingComponent } from './date-booking/date-booking.component';
import { FacilityBookingComponent } from './facility-booking/facility-booking.component';
import { TimeBookingComponent } from './time-booking/time-booking.component';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BookingComponent } from './booking.component';

const routes: Routes = [
    {
        path: 'booking',
        component: BookingComponent,
        children: [
            { path: '', loadChildren: './facility-booking/facility-booking.component' },
            { path: 'my-booking', loadChildren: './my-booking/my-booking.component'},
            { path: 'pending-booking', loadChildren: './pending-booking/pending-booking.compoenent'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BookingRoutingModule {}
