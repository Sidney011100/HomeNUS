import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookingService } from '../booking.service';
import { Timing } from './timing.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Booking } from '../booking.model';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

@Component({
  selector: 'app-time-booking',
  templateUrl: './time-booking.component.html',
  styleUrls: ['./time-booking.component.css']
})
export class TimeBookingComponent implements OnInit, OnDestroy {
  timingForm: FormGroup;
  timingCollection: AngularFirestoreCollection<Timing>;
  timingCollectionSubs: Subscription;
  user: User;
  userSubscription: Subscription;
  timingArray = [];
  disableSelect = new FormControl(false);
  dateString: string;
  timingSubscription: Subscription;
  timingIdSubscription: Subscription;
  confirmBookingSubscription: Subscription;
  // construct a Booking
  facility: string;
  selectedDate: Date;
  facilityId: string;
  selected: Timing;
  dateId: string;
  timeId: string;

  constructor(private bookingService: BookingService,
              private database: AngularFirestore,
              public auth: AuthService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.timingForm = new FormGroup({
      timing: new FormControl('', { validators: [Validators.required]
      }),
      purpose: new FormControl('', { validators: [Validators.required]
      }),
      netId: new FormControl('', { validators: [Validators.required]
      })
    });
    this.timingCollectionSubs = this.bookingService.dateSelected.subscribe(chosenDate => {
      this.selectedDate = chosenDate.date;
      this.facilityId = chosenDate.facilityId;
      this.fetchTimings();
    });
    this.userSubscription = this.auth.user$.subscribe(user => this.user = user);
    console.log('here');
  }

  fetchTimings() {
    this.timingSubscription = this.database.collection('facilities').doc(this.facilityId).valueChanges()
                    .subscribe(fac => this.facility = fac['name']);
    const dateCollection = this.database.collection('facilities').doc(this.facilityId).collection('dates');
    dateCollection.snapshotChanges()
      .pipe(map(docArray => {
        const filtered = docArray.filter(doc =>
          doc.payload.doc.data()['date'].isEqual(this.selectedDate));
        this.dateId = filtered[0].payload.doc.id;
        // this.dateString = this.selectedDate.toDateString();
        return this.dateId;
      }))
      .subscribe(dateId => {
        this.timingCollection = dateCollection.doc(dateId).collection<Timing>('timings');
        this.timingCollection.valueChanges()
          .subscribe(timings => {
            if (timings.length !== 0) {
              this.timingArray = timings;
            }
          });
      });
  }

  makeBooking() {
    this.timingIdSubscription = this.timingCollection.snapshotChanges()
    .pipe(map(timingArray => {
      const filtered = timingArray.filter(timing =>
        timing.payload.doc.data()['name'] === this.timingForm.value.timing.name);
      if (filtered.length) {
        return filtered[0].payload.doc.id;
      }
    }))
    .subscribe(timeId => {
      if (timeId) {
        return this.timeId = timeId;
      }
    });
    const dialogRef = this.dialog.open(ConfirmBookingComponent, {
      data: {
        timing: this.timingForm.value.timing.name,
        facility: this.facility,
        date: this.selectedDate,
        purpose: this.timingForm.value.purpose,
        nusNetId: this.timingForm.value.netId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmClicked(this.timingForm.value.purpose, this.timingForm.value.netId);
      }
    });
  }

  confirmClicked(explanation: string, nusId: string) {
    // updates the facility's booking status at the selected slot to be true
    // this.confirmBookingSubscription = this.timingCollection.snapshotChanges()
    // .pipe(map(timingArray => {
    //   const filtered = timingArray.filter(timing =>
    //     timing.payload.doc.data()['name'] === this.timingForm.value.timing.name);
    //   return filtered[0].payload.doc.id;
    // }))
    // .subscribe(timeId => {
    //   this.timeId = timeId;
    //   const docRef = this.timingCollection.doc(timeId);
    //   console.log(this.timingForm.value.timing.name.slice(0, 5));
    //   this.timingCollection.doc(timeId).update({booked: true});
    // });
    const timeId = this.timingForm.value.timing.name.slice(0, 4);
    const timingInFacilitiesDoc: AngularFirestoreDocument<Timing> =
      this.timingCollection.doc(timeId);
    console.log(timingInFacilitiesDoc);
    timingInFacilitiesDoc.get().subscribe(
      doc => {
        timingInFacilitiesDoc.update({ booked: true });
      }
    );
    // create a Booking
    const booking: Booking = {
      userId: this.user.userId,
      facility: this.facility,
      date: this.selectedDate,
      time: this.timingForm.value.timing.name,
      pending: true,
      facilityId: this.facilityId,
      dateId: this.dateId,
      timeId: this.timeId,
      purpose: explanation,
      userName: this.user.name,
      nusNetId: nusId
    };
    // add booking to user's profile
    this.database.collection('users').doc(this.user.userId)
        .collection('bookings')
        .add(booking)
        .then(doc => {
          booking.userBookingId = doc.id;
          return booking;
        })
        .then( result =>
        // add booking to collections of bookings for administrator to approve
          this.database.collection('bookings').add(result)
        );
  }

  ngOnDestroy() {
    if (this.timingCollectionSubs) {
      this.timingCollectionSubs.unsubscribe();
    }
    this.userSubscription.unsubscribe();
    this.timingSubscription.unsubscribe();
    this.timingIdSubscription.unsubscribe();
    this.confirmBookingSubscription.unsubscribe();
  }
}
