import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Announcement } from '../announcement.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementService } from './announcement.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import {
  trigger,
  transition,
  animate,
  style,
  animation,
  sequence,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('a-fade', [
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
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  announcements: Announcement[];
  announcementSubscription: Subscription;
  editState: boolean = false;
  announcementToEdit: Announcement;

  user: User;
  userSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private announcementService: AnnouncementService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.announcementSubscription = this.announcementService.dataChanged.subscribe(
      (a) => (this.announcements = a)
    );
    this.announcementService.fetchData();
    this.userSubscription = this.auth.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.announcementSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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
