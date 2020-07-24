import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, sequence, animate } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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
  ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
