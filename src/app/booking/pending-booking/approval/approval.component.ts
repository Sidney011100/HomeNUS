import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../../booking.model';

@Component({
  selector: 'app-approval',
  template: `<h2 mat-dialog-title>Do you want to approve this booking?</h2>
              <mat-dialog-content>
                <p>Facility: {{ passedData.facility }}</p>
                <p>Date: {{ passedData.dateId }}</p>
                <p>Time: {{ passedData.time }}</p>
                <p>Purpose: {{ passedData.purpose }}</p>
                <p>By: {{ passedData.userName }}</p>
                <p>Nus NetId: {{ passedData.nusNetId }}</p>
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button [mat-dialog-close]="true">Yes</button>
                  <button mat-button [mat-dialog-close]="false">No</button>
              </mat-dialog-actions>`
})
export class ApprovalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: Booking ) { }

}
