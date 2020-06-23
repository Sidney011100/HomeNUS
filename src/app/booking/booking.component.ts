import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
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
export class BookingComponent implements OnInit, AfterViewInit, OnDestroy{
  dataSource = new MatTableDataSource<Facility>();
  displayedColumns = ['name', 'capacity', 'block'];
  user: User;
  selectedFacility: Facility;
  selectedDate: Date;
  facilitySubs: Subscription;


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
    this.bookingService.dateSelected.subscribe(chosenDate => {
      this.selectedDate = chosenDate.date;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    this.dialog.open(AddBookingComponent);
  }

  facilityClicked(facility: string) {
    this.selectedFacility = this.dataSource.data.filter(a => a.name === facility)[0];
    this.bookingService.facilitySelected.next(this.selectedFacility);
  }

  ngOnDestroy() {
    if(this.facilitySubs) {
      this.facilitySubs.unsubscribe();
    }
  }

}
