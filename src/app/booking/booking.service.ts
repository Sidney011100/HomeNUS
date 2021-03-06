import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { Facility } from './facility.model';
import { map } from 'rxjs/operators';
import { SelectedDate } from './selectedDate.model';
import { User } from '../auth/user.model';
import { Booking } from './booking.model';
import { Timing } from './time-booking/timing.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  facilityAdded = new Subject<Facility[]>();
  facilitySelected = new Subject<Facility>();
  facilityId = new Subject<string>();
  dateSelected = new Subject<SelectedDate>();
  facilities: Facility[];
  user: User;
  myBookingSubject = new Subject<Booking[]>();
  myBookings: Booking[];
  pendingSubject = new Subject<Booking[]>();
  pendingBookings: Booking[];
  firebaseSubscriptions: Subscription[] = [];
  beginActivity = false;

  constructor(private database: AngularFirestore) { }


    // for users to view all facilities and make a booking, called in BookingComponent //
    fetchFacilitiesData() {
        this.firebaseSubscriptions.push(this.database.collection('facilities')
                    .valueChanges()
                    .subscribe((facilities: Facility[]) => {
                        this.facilityAdded.next(facilities);
                    }));
    }

    // when admin adds a new Facility //
    addDataToDatabase(facility: Facility) {
    // can be more efficient, need not sieve through all the files
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
                    .set({ date: today, approved: false, name: this.setTimeRange(today.getHours()) });
              }
            }
          });
    }

    updateDateInFacility(facility: Facility) {
      const facilitiesCollection = this.firebaseSubscriptions.push(this.database
      .collection('facilities', x => x.where('name', '==', facility.name))
      .get().subscribe(x => {
        const datesCollection = this.database.collection('facilities').doc(x.docs[0].id)
                                  .collection<Date>('dates', ref => ref.orderBy('date', 'asc'));
        this.firebaseSubscriptions.push(datesCollection.get()
          .subscribe(y => {
            // const today = new Date();
            // datesCollection.doc(y.docs[y.size - 1].id).get().subscribe( z => {
            //   console.log(z.data()['date'].getDate());
              for (let i = 0; i < 33; i++) {
                const today = new Date();
                today.setDate(today.getDate() + i);
                const dateDoc = datesCollection.doc(`${today.toDateString()}`);
                dateDoc.set({dayFull: false, date: today});
                // check if there is already a collection of timing
                const timings = dateDoc.collection('timings');
                this.firebaseSubscriptions.push(timings.get().subscribe(arrayOfTimings => {
                  if (arrayOfTimings.size === 0) {
                    for (let j = 0; j < 17; j++) {
                      today.setHours(7 + j, 0, 0);
                      timings.doc<Timing>(this.setTwentyFourHourClock(today.getHours()))
                              .set({booked: false, date: today, approved: false, name: this.setTimeRange(today.getHours())});
                    }
                  }
                }));
              }
          }));
      }));
    }

    setTwentyFourHourClock(hour: number) {
      return hour < 10 ? '0' + hour + '00' : hour + '00';
    }

    setTimeRange(hour: number) {
      return `${this.setTwentyFourHourClock(hour)} - ${this.setTwentyFourHourClock(hour + 1)}`;
    }

    // for user to view all their bookings, called in MyBookingsCompoenent //
    fetchMyBookings(userId: string) {
      this.firebaseSubscriptions.push(this.database.collection('users').doc(userId).collection('bookings')
        .valueChanges()
        .subscribe((bookings: Booking[]) => {
          this.myBookings = bookings;
          this.myBookingSubject.next([...this.myBookings]);
        }));
    }

    // for admin to fetch all bookings made //
    fetchPendingBookings() {
      this.firebaseSubscriptions.push(this.database.collection('bookings')
        .valueChanges()
        .subscribe((bookings: Booking[]) => {
          this.pendingBookings = bookings;
          this.pendingSubject.next([...this.pendingBookings]);
        }));
    }

    // when a user cancels their booking: called in myBookingComponent //
    userCancelledBooking(element: Booking) {
      // remove from user's collection of bookings
      this.firebaseSubscriptions.push(this.database.collection('users').doc(element.userId)
                  .collection('bookings')
                  .snapshotChanges()
                  .pipe(map(docArray => {
                    const docId = docArray.filter(doc =>
                      // tslint:disable-next-line:no-unused-expression
                      doc.payload.doc.data()['facilityId'] === element.facilityId &&
                      doc.payload.doc.data()['dateId'] === element.dateId &&
                      doc.payload.doc.data()['timeId'] === element.timeId
                    );
                    return docId[0].payload.doc.id;
                  }))
                  .subscribe(id => this.database.collection('users').doc(element.userId)
                            .collection('bookings').doc(id).delete()
                  ));
      // remove from collection of bookings made
      this.firebaseSubscriptions.push(this.database.collection('bookings')
                  .snapshotChanges()
                  .pipe(map(docArray => {
                    const cancelledBooking = docArray.filter(doc =>{
                      // tslint:disable-next-line:no-unused-expression
                      return doc.payload.doc.data()['facilityId'] === element.facilityId &&
                      doc.payload.doc.data()['dateId'] === element.dateId &&
                      doc.payload.doc.data()['timeId'] === element.timeId;
                    });
                    return cancelledBooking[0].payload.doc.id;
                  }))
                  .subscribe(docId =>
                    this.database.collection('bookings').doc(docId).delete()
                    ));
      // update in collection of facilities, dates, timings
      this.database.collection('facilities').doc(element.facilityId)
                  .collection('dates').doc(element.dateId)
                  .collection('timings').doc(element.timeId)
                  .update({booked: false});
     }

     cancelSubscriptions() {
        this.firebaseSubscriptions.forEach(subs => subs.unsubscribe());
     }

}

