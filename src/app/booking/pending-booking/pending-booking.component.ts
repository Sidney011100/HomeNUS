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
import { ApprovalComponent } from './approval/approval.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pending-booking',
  templateUrl: './pending-booking.component.html',
  styleUrls: ['./pending-booking.component.css']
})
export class PendingBookingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Booking>();
  displayedColumns = ['facility', 'date', 'time', 'approved'];
  user: User;
  userSubscription: Subscription;
  dataSubscription: Subscription;

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
        this.bookingService.fetchPendingBookings();
      }
    });
    this.dataSubscription = this.bookingService.pendingSubject.subscribe((bookings: Booking[]) => {
      this.dataSource.data = bookings;
    });
  }

  approveClicked(element: Booking) {
    const dialogRef = this.dialog.open(ApprovalComponent, {
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approveTrue(element);
      } else {
        this.approveFalse(element);
      }
    });
  }

  approveTrue(element: Booking) {
    // update on collection: bookings
    this.database.collection('bookings').snapshotChanges()
    .pipe(map(docArray => {
      const approvedBooking = docArray.filter(booking =>
        booking.payload.doc.data()['userBookingId'] === element.userBookingId);
      return approvedBooking[0].payload.doc.id;
    }))
    .subscribe(bookingId => {
      this.database.collection('bookings').doc(bookingId).update({pending: false, approved: true});
    });

    // update collection: facilities
    this.database.collection('facilities').doc(element.facilityId)
                .collection('dates').doc(element.dateId)
                .collection('timings').doc(element.timeId)
                .update({booked: true, approved: true});

    // update collection users
    this.database.collection('users').doc(element.userId)
                  .collection('bookings').doc(element.userBookingId)
                  .update({pending: false, approved: true});
  }

  approveFalse(element: Booking) {
    // update on collection: bookings
    this.database.collection('bookings').snapshotChanges()
    .pipe(map(docArray => {
      const approvedBooking = docArray.filter(booking =>
        booking.payload.doc.data()['userBookingId'] === element.userBookingId);
      return approvedBooking[0].payload.doc.id;
    }))
    .subscribe(bookingId => {
      this.database.collection('bookings').doc(bookingId).update({pending: false, approved: true});
    });

    // update collection: facilities
    this.database.collection('facilities').doc(element.facilityId)
                .collection('dates').doc(element.dateId)
                .collection('timings').doc(element.timeId)
                .update({booked: false, approved: true});

    // update collection users
    this.database.collection('users').doc(element.userId)
                  .collection('bookings').doc(element.userBookingId)
                  .update({pending: false, approved: false});
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
  }

}
