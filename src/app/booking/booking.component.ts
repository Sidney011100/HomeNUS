import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { Facility } from './facility.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from './booking.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  dataChanged = new Subject<Facility[]>();
  facilities: Observable<Facility[]>;
  dataSource = new MatTableDataSource<Facility>();
  displayedColumns = ['name', 'capacity', 'block'];
  user: User;


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              public auth: AuthService) { }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.bookingService.facilityAdded.subscribe((facilities: Facility[]) => {
      this.dataSource.data = facilities;
    });
    this.bookingService.fetchFacilitiesData();
    //should not be like this?
    this.auth.user$.subscribe(user => this.user = user);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    this.dialog.open(AddBookingComponent);
  }

  viewDates() {
    //navigate to page DateBooking to view all avail dates
    //pass name of facility selected into this function
  }

  // ngOnDestroy() {
  //   if(this.pastExercisesSubscription) {
  //     this.pastExercisesSubscription.unsubscribe();
  //   }
  // }

}
