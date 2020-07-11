import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Booking } from '../booking.model';
import { BookingService } from '../booking.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookingComponent } from './delete-booking/delete-booking.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Timing } from '../time-booking/timing.model';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Booking>();
  displayedColumns = ['facility', 'date', 'time', 'approved'];
  user: User;
  userSubscription: Subscription;
  dataSubscription: Subscription;
  private fbSubscription: Subscription[] = [];
  timingInFacilitiesSubscription: Subscription;
  timingCollection: AngularFirestoreCollection<Timing>;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private authService: AuthService,
              private bookingService: BookingService,
              private dialog: MatDialog,
              private database: AngularFirestore) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.bookingService.fetchMyBookings(this.user.userId);
      }
    });
    this.dataSubscription = this.bookingService.myBookingSubject.subscribe((bookings: Booking[]) => {
      this.dataSource.data = bookings;
    });
  }

  onClick(element: Booking) {
    const dialogRef = this.dialog.open(DeleteBookingComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelBooking(element);
      }}
    );
  }

  cancelBooking(element: Booking) {
    this.userCancelledBooking(element);
  }

  async userCancelledBooking(element: Booking) {
    // update in collection of facilities, dates, timings
    const timingInFacilities: AngularFirestoreDocument<Timing> = this.database.collection('facilities').doc(element.facilityId)
    .collection('dates').doc(element.dateId)
    .collection('timings').doc(element.timeId);

    this.fbSubscription.push(timingInFacilities.get()
                      .subscribe(
                        doc => {
                            const data = {
                              booked: false
                            };
                            timingInFacilities.update(data);
                        }
                      ));

    // remove from user's collection of bookings
    this.fbSubscription.push(this.database.collection('users').doc(element.userId)
                .collection('bookings')
                .snapshotChanges()
                .pipe(map(docArray => {
                  const docId = docArray.filter(doc =>
                    doc.payload.doc.data()['facilityId'] === element.facilityId &&
                    doc.payload.doc.data()['dateId'] === element.dateId &&
                    doc.payload.doc.data()['timeId'] === element.timeId
                  );
                  if (docId.length) {
                    return docId[0].payload.doc.id;
                  }
                }))
                .subscribe(id => {
                  if (id) {
                    this.database.collection('users').doc(element.userId)
                          .collection('bookings').doc(id).delete();
                    }
                  }
                ));

    // remove from collection of bookings made
    this.fbSubscription.push(this.database.collection('bookings')
                .snapshotChanges()
                .pipe(map(docArray => {
                  const cancelledBooking = docArray.filter(doc =>
                    doc.payload.doc.data()['facilityId'] === element.facilityId &&
                    doc.payload.doc.data()['dateId'] === element.dateId &&
                    doc.payload.doc.data()['timeId'] === element.timeId
                  );
                  if (cancelledBooking.length) {
                    return cancelledBooking[0].payload.doc.id;
                  }
                }))
                .subscribe(docId => {
                  if (docId) {
                    this.database.collection('bookings').doc(docId).delete();
                  }
                }));

   }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.fbSubscription.forEach(sub => sub.unsubscribe());
  }

}
