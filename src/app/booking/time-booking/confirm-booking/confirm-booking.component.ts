import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-booking',
  template: `<h2 mat-dialog-title>Confirm this booking?</h2>
              <mat-dialog-content>
                <p>Facility: {{ passedData.facility }}</p>
                <p>Date: {{ passedData.date.seconds * 1000 | date: 'EEEE dd/MM' }}</p>
                <p>Time: {{ passedData.timing }}</p>
                <p>Your NusNetID: {{ passedData.nusNetId }}</p>
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button [mat-dialog-close]="true">Yes</button>
                  <button mat-button [mat-dialog-close]="false">No</button>
              </mat-dialog-actions>`
})
export class ConfirmBookingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any ) { }

}
