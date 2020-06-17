import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

// import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

// import { FullCalendar } from 'google-calendar';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import '@fullcalendar/list/main.css';

// import { Calendar } from '@fullcalendar/core/Calendar';
// // import googleCalendarPlugin from '@fullcalendar/google-calendar';

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
//     defaultView: 'dayGridMonth',
//     defaultDate: '2020-06-07',
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     events: [
//       {
//         title: 'All Day Event',
//         start: '2020-06-01'
//       },
//       {
//         title: 'Long Event',
//         start: '2020-06-07',
//         end: '2020-06-10'
//       },
//       {
//         groupId: '999',
//         title: 'Repeating Event',
//         start: '2020-06-09T16:00:00'
//       },
//       {
//         groupId: '999',
//         title: 'Repeating Event',
//         start: '2020-06-16T16:00:00'
//       },
//       {
//         title: 'Conference',
//         start: '2020-06-11',
//         end: '2020-06-13'
//       },
//       {
//         title: 'Meeting',
//         start: '2020-06-12T10:30:00',
//         end: '2020-06-12T12:30:00'
//       },
//       {
//         title: 'Lunch',
//         start: '2020-06-12T12:00:00'
//       },
//       {
//         title: 'Meeting',
//         start: '2020-06-12T14:30:00'
//       },
//       {
//         title: 'Birthday Party',
//         start: '2020-06-13T07:00:00'
//       },
//       {
//         title: 'Click for Google',
//         url: 'http://google.com/',
//         start: '2020-06-28'
//       }
//     ]
//   });

//   calendar.render();
// });

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

// let calendar = new Calendar(calendarEl, {
//   plugins: [ googleCalendarPlugin ],
//   googleCalendarApiKey: 'AIzaSyBF1sgzX5vzKWhqKIMen7XD4Wm-_6Hd3IU',
//   eventSources: [
//     {
//       googleCalendarId: 'https://calendar.google.com/calendar/ical/homenus2020%40gmail.com/public/basic.ics'
//     },
//     {
//       googleCalendarId: 'https://calendar.google.com/calendar/ical/5lpq47fnghbv7a00adv3l68fg8%40group.calendar.google.com/public/basic.ics'
//     }
//   ]
// });

// calendar.render();
// });

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new Calendar.\Calendar(calendarEl, {
//     plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
//     defaultView: 'dayGridMonth',
//     defaultDate: '2020-06-07',
//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay'
//     },
//     events: [
//       {
//         title: 'All Day Event',
//         start: '2020-06-01'
//       },
//       {
//         title: 'Long Event',
//         start: '2020-06-07',
//         end: '2020-06-10'
//       },
//       {
//         groupId: '999',
//         title: 'Repeating Event',
//         start: '2020-06-09T16:00:00'
//       },
//       {
//         groupId: '999',
//         title: 'Repeating Event',
//         start: '2020-06-16T16:00:00'
//       },
//       {
//         title: 'Conference',
//         start: '2020-06-11',
//         end: '2020-06-13'
//       },
//       {
//         title: 'Meeting',
//         start: '2020-06-12T10:30:00',
//         end: '2020-06-12T12:30:00'
//       },
//       {
//         title: 'Lunch',
//         start: '2020-06-12T12:00:00'
//       },
//       {
//         title: 'Meeting',
//         start: '2020-06-12T14:30:00'
//       },
//       {
//         title: 'Birthday Party',
//         start: '2020-06-13T07:00:00'
//       },
//       {
//         title: 'Click for Google',
//         url: 'http://google.com/',
//         start: '2020-06-28'
//       }
//     ]
//   });

//   calendar.render();
// });

