import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingService } from '../booking.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Timing } from '../time-booking/timing.model';
import { NgForm, FormControl } from '@angular/forms';


@Component({
  selector: 'app-time-booking',
  templateUrl: './time-booking.component.html',
  styleUrls: ['./time-booking.component.css']
})
export class TimeBookingComponent implements OnInit, OnDestroy {
  timingCollectionSubs: Subscription;
  selectedDate: Date;
  facilityId: string;
  timingArray = [];
  selected: Timing;
  timingCollection: AngularFirestoreCollection<Timing>;
  disableSelect = new FormControl(false);


  constructor(private bookingService: BookingService,
              private database: AngularFirestore) { }

  ngOnInit() {
    this.timingCollectionSubs = this.bookingService.dateSelected.subscribe(chosenDate => {
      this.selectedDate = chosenDate.date;
      this.facilityId = chosenDate.facilityId;
      this.fetchTimings();
      console.log(this.timingArray);
    });
  }

  fetchTimings() {
    const dateCollection = this.database.collection('facilities').doc(this.facilityId).collection('dates');
    dateCollection.snapshotChanges()
      .pipe(map(docArray => {
        const filtered = docArray.filter(doc =>
          doc.payload.doc.data()['date'].isEqual(this.selectedDate));
        return filtered[0].payload.doc.id;
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


  confirmClicked() {
    // console.log(this.selected);
    this.timingCollection.snapshotChanges()
    .pipe(map(timingArray => {
      const filtered = timingArray.filter(timing =>
        timing.payload.doc.data()['name'] === this.selected.name);
        return filtered[0].payload.doc.id;
    }))
    .subscribe(timeId => {
      this.timingCollection.doc(timeId).update({booked: true});
      this.timingCollection.doc(timeId).valueChanges().subscribe(result => console.log(result));
    });
  }

  ngOnDestroy() {
    if (this.timingCollectionSubs) {
      this.timingCollectionSubs.unsubscribe();
    }
  }

}
