import { Component, OnInit } from '@angular/core';
import { Facility } from './facility.model';
import { BookingService } from './booking.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { FacilityBookingComponent } from './facility-booking/facility-booking.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { PendingBookingComponent } from './pending-booking/pending-booking.component';
import { User } from 'src/app/auth/user.model';

import { AdminGuard } from '../auth/admin.guard';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  userSubscription: Subscription;
  selectedFacility: Facility;
  selectedDate: Date;
  user: User;
  rlaActive: boolean;

  navLinks = [
    { path: 'my-booking', label: 'My Bookings', component: MyBookingComponent },
    { path: 'pending-booking', label: 'Pending Bookings', component: PendingBookingComponent, canActivate: [AdminGuard] }
  ];

  constructor(private bookingService: BookingService,
              public auth: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user => {
      this.user = user;
      if (!this.auth.canEdit(this.user)) {
        this.navLinks = [
          { path: 'my-booking', label: 'My Bookings', component: MyBookingComponent }
        ];
      }
    });
    this.bookingService.fetchFacilitiesData();
    this.bookingService.facilitySelected.subscribe(facility =>
      this.selectedFacility = facility);
    this.bookingService.dateSelected.subscribe(chosenDate => {
      this.selectedDate = chosenDate.date;
    });

  }


}
