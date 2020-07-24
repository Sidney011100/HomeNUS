import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

// import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { trigger, transition, style, sequence, animate } from '@angular/animations';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
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
  ],
})

export class CalendarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}


