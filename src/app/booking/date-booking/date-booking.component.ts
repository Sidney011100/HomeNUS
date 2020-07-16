import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Subscription } from 'rxjs';
import { Facility } from '../facility.model';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-date-booking',
  templateUrl: './date-booking.component.html',
  styleUrls: ['./date-booking.component.css']
})
export class DateBookingComponent implements OnInit {
  fbSubscription: Subscription[] = [];
  dateCollection: AngularFirestoreCollection<Date>;
  selectedFacility: Facility;
  displayDates = [];
  facilityId: string;
  dateSelected: Date;

  constructor(private bookingService: BookingService,
              private database: AngularFirestore) { }

  ngOnInit() {
    this.bookingService.firebaseSubscriptions.push(this.bookingService.facilitySelected.subscribe(facility => {
      this.selectedFacility = facility;
      this.fetchDates();
    }));

  }

  fetchDates() {
      this.bookingService.firebaseSubscriptions.push(this.database.collection<Facility>('facilities')
      .snapshotChanges()
      .pipe(map(docArray => {
        const filtered = docArray.filter(doc =>
        doc.payload.doc.data()['name'] ===  this.selectedFacility.name
      );
        this.facilityId = filtered[0].payload.doc.id;
        return filtered[0].payload.doc.id;
      }))
      .subscribe(result => {
        this.dateCollection = this.database.collection('facilities')
                                            .doc(result)
                                            .collection<Date>('dates', ref => ref.orderBy('date', 'asc'));
                                            // filter out dates here
        this.bookingService.firebaseSubscriptions.push(this.dateCollection.valueChanges().subscribe(results => {
          this.displayDates = results;
          }));
        }));
  }

  dateClicked(date: Date) {
    this.dateSelected = date;
    if (this.dateSelected) {
      this.bookingService.dateSelected.next({date: this.dateSelected, facilityId: this.facilityId});
    }
  }

}
