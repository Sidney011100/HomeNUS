import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-delete-booking',
  templateUrl: './delete-booking.component.html',
  styleUrls: ['./delete-booking.component.css']
})
export class DeleteBookingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: Booking ) { }

}


