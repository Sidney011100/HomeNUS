import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Facility } from '../facility.model';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  min = 5;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

  onAdd(form: NgForm) {
    const announcement = {
      name: form.value.name,
      block: form.value.block.toUpperCase(),
      capacity: form.value.capacity
    };
    this.addDataToFirestore(announcement);
  }

  addDataToFirestore(facility: Facility) {
    this.bookingService.addDataToDatabase(facility);
  }

}