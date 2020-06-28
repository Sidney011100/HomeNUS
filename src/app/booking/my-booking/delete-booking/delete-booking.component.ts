import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-delete-booking',
  template: `<h2 mat-dialog-title>Details of booking at {{ passedData.facility }}</h2>
              <mat-dialog-content>
                <p>Date: {{ passedData.dateId }}</p>
                <p>Time: {{ passedData.time }}</p>
                <p>Purpose: {{ passedData.purpose }}</p>
                <p *ngIf="passedData.pending">Pending</p>
                <p *ngIf="!passedData.pending && passedData.approved">Approved</p>
                <p *ngIf="!passedData.pending && !passedData.approved">Rejected</p>
                <p>Nus NetId: {{ passedData.nusNetId }}</p>
              </mat-dialog-content>
              <mat-dialog-actions fxLayout="column" fxLayoutAlign="center center">
                  <button class="cancel-btn" mat-button [mat-dialog-close]="true">Cancel Booking</button>
                  <button mat-button [mat-dialog-close]="false">Close</button>
              </mat-dialog-actions>`,
  styleUrls: ['./delete-booking.component.css']
})
export class DeleteBookingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: Booking ) { }

}


