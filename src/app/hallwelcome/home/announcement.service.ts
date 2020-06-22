import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Announcement } from '../announcement.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  dataChanged = new Subject<Announcement[]>();
  announcementData: Announcement[];
  aDoc: AngularFirestoreDocument<Announcement>;

  constructor(private database: AngularFirestore) { }

  fetchData() {
    // this.database.collection('announcements').valueChanges().subscribe((a: Announcement[]) => {
    //   this.announcementData = a;
    //   this.dataChanged.next([...this.announcementData]);
    // });
    this.database.collection('announcements')
                .snapshotChanges()
                .pipe(map(docArray => {
                  return docArray.map(document => {
                    return {
                      id: document.payload.doc.id,
                      ...document.payload.doc.data() as Announcement
                    };
                  });
                }))
                .subscribe((announcements: Announcement[]) => {
                  this.announcementData = announcements;
                  this.dataChanged.next([...this.announcementData]);
                });
  }

  addDataToDatabase(announcement: Announcement) {
    this.database.collection('announcements').add(announcement);
  }

  deleteDataFromDatabase(announcement: Announcement) {
    // console.log(announcement.id);
    this.aDoc = this.database.doc(`announcements/${announcement.id}`);
    // to get the specific announcement from the 'announcements'(collection) using the announcement id obtained thru snapshotchanges
    this.aDoc.delete();
  }

  updateDataInDataBase(announcement: Announcement) {
    this.aDoc = this.database.doc(`announcements/${announcement.id}`) ;
    this.aDoc.update(announcement);
  }
}

