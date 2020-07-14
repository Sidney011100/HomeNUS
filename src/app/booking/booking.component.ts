import { Component, OnInit } from '@angular/core';
import { Facility } from './facility.model';
import { BookingService } from './booking.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  selectedFacility: Facility;
  selectedDate: Date;

  constructor(private bookingService: BookingService,
              public auth: AuthService) { }

  ngOnInit() {
    this.bookingService.fetchFacilitiesData();
    this.bookingService.facilitySelected.subscribe(facility =>
      this.selectedFacility = facility);
    this.bookingService.dateSelected.subscribe(chosenDate => {
      this.selectedDate = chosenDate.date;
    });
  }


}
