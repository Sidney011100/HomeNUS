import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../booking.service';
import { Subscription } from 'rxjs';
import { Facility } from '../facility.model';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material/dialog';
import { TimeBookingComponent } from '../time-booking/time-booking.component';



@Component({
  selector: 'app-date-booking',
  templateUrl: './date-booking.component.html',
  styleUrls: ['./date-booking.component.css']
})
export class DateBookingComponent implements OnInit, OnDestroy {
  facilitySub: Subscription;
  dateCollection: AngularFirestoreCollection<Date>;
  selectedFacility: Facility;
  displayDates = [];
  facilityId: string;
  dateSelected: Date;

  constructor(private bookingService: BookingService,
              private database: AngularFirestore,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.facilitySub = this.bookingService.facilitySelected.subscribe(facility => {
      this.selectedFacility = facility;
      this.fetchDates();
      console.log(this.displayDates);
    });
  }

  fetchDates() {
      this.database.collection<Facility>('facilities')
      .snapshotChanges()
      .pipe(map(docArray => {
        const filtered = docArray.filter(doc =>
        doc.payload.doc.data()['name'] ===  this.selectedFacility.name
      );
        this.facilityId = filtered[0].payload.doc.id;
        return filtered[0].payload.doc.id;
      }))
      .subscribe(result => {
        this.dateCollection = this.database.collection('facilities').doc(result).collection<Date>('dates');
        this.dateCollection.valueChanges()
        .subscribe(results => {
          const today = new Date();
          this.displayDates = results;
          });
        });
  }

  dateClicked(date: Date) {
    this.dateSelected = date;
    if (this.dateSelected) {
      this.bookingService.dateSelected.next({date: this.dateSelected, facilityId: this.facilityId});
    }
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

}
