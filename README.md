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

### Preparing your firebase for authentication with Google and Microsoft

1. Firebase > Go to Console > Authentication > Sign-in method
   - Enable Google provider
   - Enable Microsoft Provider
2. Firebase > Go to Console > Database > Rules

Edit the rules to be as follows: 

`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone on the internet to view, edit, and delete
    // all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // your app will lose access to your Firestore database
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    match /posts/{document} {
    	
      function getRole(role) {
      	return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles[role]
      }
      allow read: if getRole('member') == true;
      allow update, create, delete: if getRole('admin') == true;
    }
  }
}`

### Hosting the application on your local server  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### To add more features

1. Run `ng generate component feature-name` to generate a new component. You can also use `ng generate service|guard|module`.
2. Each component can have a shared `component.service.ts` folder 

### Styling 

1. Head over to Angular Materials for an extensive variety of possible display styles content-wise. 
2. Edit the `theme.scss` folder to change the colour theme.

## Build/Deploy

1. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
2. Run `firebase login` to log into your personal firebase account. 
3. Run `firebase init` to set up your project directory and some Firebase products.
4. Run `firebase deploy` to obtain a hosting site of your web application. Your domain name should look something like this: `projectID.web.app` and `projectID.firebaseapp.com`.

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
