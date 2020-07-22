# HomeNus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

This project is an on-going NUS Orbital 2020 project by 2 NUS Computing students. 

## Aim 

An official mobile-responsive Web Application for hassle-free access to your residence’s information. 

## Tech Stack

Angular (Front-end)
NgRx (State management)
Firebase and AngularFire (Back-end e.g. database, authentication, etc)
Html and CSS (Styling)

## Software Engineering Principles

1. Don't Repeat Yourself (DRY) 
  - through the use of services
2. Big Design Up Front 
3. Single Responisbility Principle
4. Dependency Inversion Principle
5. Law of Demeter
Head over to: https://dev.to/luminousmen/what-are-the-best-software-engineering-principles--3p8n for elaborations on the above mentioned principles.

## Development server
### Getting started 

1. To set up Angular on your local desktop follow the instructions in: https://angular.io/guide/setup-local.

2. Clone the code above

3. To link the firebase to your own, follow the instructions in: https://www.positronx.io/how-to-connect-firebase-realtime-nosql-cloud-database-with-angular-app-from-scratch/.
    Using the instructions given under the headers "Setup Google Firebase Database Account", "Setup Firebase (Agnularfire library) in Angular Project". The necessary AngularFirestore files have been imported. 
    
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## To add more features

1. Run `ng generate component feature-name` to generate a new component. You can also use `ng generate service|guard|module`.
2. Each component can have a shared `component.service.ts` folder 

## Styling 
1. Head over to Angular Materials for an extensive variety of possible display styles content-wise. 
2. Edit the `theme.scss` folder to change the colour theme.

## Build/Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Demo

Checkout: https://homenus-937e9.web.app/

## User Guide 

https://docs.google.com/document/d/1_oq4h-pjhGScRr2vAG89amhfyuNZSZztN2yE2IJPYV8/edit?usp=sharing

## Video Demo of Application Usage

https://drive.google.com/file/d/1MWnqrEKd4FNNMqxBA2NwCA5yT7VC-XRP/view?usp=sharing

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
