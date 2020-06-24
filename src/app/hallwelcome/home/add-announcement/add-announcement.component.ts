import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Announcement } from '../../announcement.model';
import { AnnouncementService } from '../announcement.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent implements OnInit {

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
  }

  onAdd(form: NgForm) {
    const announcement = {
      title: form.value.title,
      description: form.value.description
    };
    this.addDataToFirestore(announcement);
  }

  addDataToFirestore(announcement: Announcement) {
    this.announcementService.addDataToDatabase(announcement);
  }

}
