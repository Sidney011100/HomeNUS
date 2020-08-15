# HomeNUS

Have you ever missed the sign up for an event? Wondered where any of your halls’ or residential colleges’ announcements went when you remembered just seeing it moments ago?  

To begin with, announcements on chat groups are a convenient platform, however they tend to be buried in everyday texts. Additionally, some of us mute the group due to disinterest in everyday texts or spam, missing out on important announcements. Physical posters are often left unread as we are so caught up in our hectic lives. Meanwhile, announcement emails might also be buried in spam mails.    

Even though chat groups, paper posters and emails are frequently used platforms for pushing out announcements, cases as mentioned above still occur to many of us. These are not official platforms and information tends to be missed by their intended audience.  

So why not have a One-stop platform just for your Hall/RC to streamline information flow within your residences? 

This project is an on-going NUS Orbital 2020 project by 2 NUS Computing students.     
View our [video demo](https://drive.google.com/file/d/13MCIHsSsiWu7C4Le-6KqdL9P_YXFqQZf/view?usp=sharing) or try it out link on our [website](https://homenus-937e9.web.app/)!

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

https://homenus-937e9.web.app/

## Documentation

https://docs.google.com/document/d/1_oq4h-pjhGScRr2vAG89amhfyuNZSZztN2yE2IJPYV8/edit

## Video Demo of Application Usage

https://drive.google.com/file/d/13MCIHsSsiWu7C4Le-6KqdL9P_YXFqQZf/view?usp=sharing

