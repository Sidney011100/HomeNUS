import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { Facility } from './facility.model';
import { map } from 'rxjs/operators';
import { SelectedDate } from './selectedDate.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  facilityAdded = new Subject<Facility[]>();
  facilitySelected = new Subject<Facility>();
  facilityId = new Subject<string>();
  dateSelected = new Subject<SelectedDate>();
  facilities: Facility[];

  constructor(private database: AngularFirestore) { }


    fetchFacilitiesData() {
        this.database.collection('facilities')
                    .valueChanges()
                    .subscribe((facilities: Facility[]) => {
                        this.facilityAdded.next(facilities);
                    });
    }

    addDataToDatabase(facility: Facility) {
        this.database.collection('facilities').add(facility)
          .then(documentReference => {
            const dates = this.database.collection('facilities').doc(documentReference.id).collection('dates');
            for (let i = 0; i < 31; i++) {
              const today = new Date();
              today.setDate(today.getDate() + i);
              const dateDoc = dates.doc(`${today.toDateString()}`);
              const timings = dateDoc.collection('timings');
              dateDoc.set({dayFull: false, date: today});
              for (let j = 0; j < 17; j++) {
                today.setHours(7 + j, 0, 0);
                timings.doc(this.setTwentyFourHourClock(today.getHours()))
                    .set({booked: false, date: today, approved: false, name: this.setTimeRange(today.getHours()) });
              }
            }
          });
    }

    setTwentyFourHourClock(number: number) {
      return number < 10 ? '0' + number + '00' : number + '00';
    }

    setTimeRange(number: number) {
      return `${this.setTwentyFourHourClock(number)} - ${this.setTwentyFourHourClock(number + 1)}`;
    }
}

