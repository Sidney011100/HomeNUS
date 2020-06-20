import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Announcement } from '../announcement.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementService } from './announcement.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  announcements: Announcement[];
  announcementSubscription: Subscription;
  editState: boolean = false;
  announcementToEdit: Announcement;

  constructor(
    private database: AngularFirestore, 
    private dialog: MatDialog,
    private announcementService: AnnouncementService
    ) { }

  ngOnInit(): void { 
    this.announcementSubscription = this.announcementService.dataChanged.subscribe(a => this.announcements = a);
    this.announcementService.fetchData();
  }

  ngOnDestroy() {
    this.announcementSubscription.unsubscribe();
  }

  openModal() {
    this.dialog.open(AddAnnouncementComponent);
  }

  onDelete(event, announcement: Announcement) {
    this.clearState();
    this.announcementService.deleteDataFromDatabase(announcement);
  }

  onEdit(event, announcement: Announcement) {
    this.editState = true;
    this.announcementToEdit = announcement;
  }

  updateAnnouncement(announcement: Announcement) {
    this.announcementService.updateDataInDataBase(announcement);
    this.clearState();
  }

  clearState() {
    this.editState = false;
    this.announcementToEdit = null;
  }
}
