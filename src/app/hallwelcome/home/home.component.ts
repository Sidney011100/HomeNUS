import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from 'angularfire2/firestore';
import { Event } from '../event.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['date', 'time', 'name', 'duration'];
  dataSource = new MatTableDataSource<Event>();

  constructor(private database: AngularFirestore) { }

  ngOnInit(): void {
    // this.database.collection('events').snapshotChanges()
    //   .pipe(
    //     map(docArray => {
    //       return docArray.map(document => {
    //         return {
    //           id: document.payload.doc.id,
    //           ...document.payload.doc.data() as Event
    //         }
    //       })
    //     })
    //   )
    //   .subscribe((events: Event[]) => {
    //     this.dataSource.data = events;
    //   });
    this.fetchEvents();
  }

  fetchEvents() {
    this.database.collection('events').valueChanges().subscribe((events: Event[]) => {
      this.dataSource.data = events;
    });
  }
}
