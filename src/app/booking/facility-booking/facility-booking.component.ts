import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Facility } from '../facility.model';
import { BookingService } from '../booking.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { transition, trigger, style, sequence, animate } from '@angular/animations';

@Component({
  selector: 'app-facility-booking',
  templateUrl: './facility-booking.component.html',
  styleUrls: ['./facility-booking.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateX(-550px)',
          'box-shadow': 'none',
        }),
        sequence([
          animate(
            '1s ease',
            style({
              opacity: '0.3',
              transform: 'translateX(0)',
              'box-shadow': 'none',
            })
          ),
          animate(
            '0.5s ease',
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          )
        ]),
      ]),
    ]),
    trigger('fade2', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateX(-550px)',
          'box-shadow': 'none',
        }),
        sequence([
          animate(
            '1.5s ease',
            style({
              opacity: '0.3',
              transform: 'translateX(0)',
              'box-shadow': 'none',
            })
          ),
          animate(
            '0.5s ease',
            style({
              opacity: 1,
              transform: 'translateX(0)',
            })
          )
        ]),
      ]),
    ]),
  ],
})


export class FacilityBookingComponent implements OnInit,  AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Facility>();
  facilitySubs: Subscription;
  userSubscription: Subscription;
  selectedFacility: Facility;
  displayedColumns = ['name', 'capacity', 'block'];
  user: User;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              public auth: AuthService,
              private database: AngularFirestore) { }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal() {
    this.dialog.open(AddBookingComponent);
  }

  ngOnInit() {
    this.facilitySubs = this.database.collection('facilities').valueChanges()
    .subscribe((facilities: Facility[]) => this.dataSource.data = facilities);
    this.userSubscription = this.auth.user$.subscribe(user => this.user = user);
    this.bookingService.facilitySelected.subscribe(facility =>
      this.selectedFacility = facility);
  }

  facilityClicked(facility: string) {
    this.selectedFacility = this.dataSource.data.filter(a => a.name === facility)[0];
    this.bookingService.updateDateInFacility(this.selectedFacility);
    this.bookingService.facilitySelected.next(this.selectedFacility);
    document.getElementById("date").scrollIntoView({behavior: "smooth"});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.facilitySubs.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
