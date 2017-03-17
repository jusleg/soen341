## [Sprint 1](https://github.com/jusleg/soen341/milestone/2?closed=1)
* **Wednesday January 25**
  * Discussed server architecture
  * Front-end frame work decided to AngularJs
  * Decided to use Socket.io for live chat feature.
* **Thursday January 26**
  * Split team members into groups : Front-end & Back-end 
  * Divide tasks amoung group.
  * Discussed on how to implement the login system
  * Discussed on how to connect back-end and front-end
* **Friday January 27**
  * Data Structure confirmed to be mongoDb
  * Discussed the application general flow
  * Discussed the relations between collections

## [Sprint 2](https://github.com/jusleg/soen341/milestone/3?closed=1)
* **Monday February 6**
  * MEAN stack documentation
  * Unit tests needs to be implementation
  * Student sign up (Full Name, Id, email)
  * We send a verification link to the email
  * Teacher signup (Full Name, email)
    * We verify if this is a valid email on https://www.concordia.ca/directories.html
    * Send them a verification email
  * How the room creation works
    * Teacher uploads a csv of emails
    * We check if some of those emails are in our userbase
      * If there is a match, add that user to the class and send a confirmation email
      * If there is no match, send the user an email with unique link. He signs up or log in and we add this class to his account
  * We should finish front end of chat in sprint 2
  * We should have the chat features done
  * For now, hard-coded rooms will be enough
  * Room creation will be part of sprint 3

* **Friday February 10**
  * Discussed about closing the classroom chat or not after the class is over
  * Defined the schema of current database 
  * Discussed about having the messenger being compatible with markdown to be able to send images
  * Discussed about hashing a value to each user so that each user will be unique
    * Encrypt their email
    * thinking of using PGP with tinyURL, AES encryption,  
  * Configure the database for accessibility purposes
  * Discussed about lunch 
  * Distributed task to members (database, login page and other HTML pages, implementing features, unit testing, etc...)
  * Discussed about using MLab
  
* **Monday February 13**
  * Finishing login today
  * Add test cases to user stories (not the automation part)
  * Acceptance criteria in user stories
  * Story points & estimation
  * Use waffle.io for burndown chart?
  * Use naming convention for branches & close merged ones
  * Discuss about team collaboration / punctuality

* **Tuesday February 14**
  * Sign-Up Implementation
    * Front-end form validation
    * Page routing
    * Passport.js implementation
    * Password hashing + salting
      * Library or manual implementation?
  * Documentation
    * Improving story points
    * Linking commits and PRs to correct issues
  * Login Implementation
    * Page routing
    * Form validation
    * Session creating and persistence
  * Styling
    * Consistent color palette
    * Use of scss variables
    * Navbar design discussion
      * How to implement a scrollable div
    * Chat design discussion

## [Sprint 3]()
* **Friday February 17**
  * Task repartition
  * Secure routes
  * Picked an encryption framework
  * Established the different email campaigns

* **Monday February 20**
  * discussion about UX
  * founds bug in and created issues
  * discussed progress and due dates

* **Friday February 24**
  * Discussed about Brendan's overall involvement in this project 
    * He rarely checks slack, facebook and his texts
    * This is becoming problematic
  * Discussed distributing Brendan's task with other team members

* **Monday February 27**
  * Discussed about user on-boarding
  * New on-boarding for student
    * We assume all the teacher have the same email for every student because students provided only one email in concordia's system
    * Student will be able to sign up using the regular sign up.
      * If they sign up without any class, the chat will be empty
      * If they sign up and already have classes linked to their emails, the chat will show those classes
      * Whenever they get added to the class, we will notify the student via email. (just a notification email)
  * Due to those modifications, issue [#50](https://github.com/jusleg/soen341/issues/50) was discarded because it does not reflect the needs of the new user on-boarding 

* **Wednesday March 8**
  * Discussed about things required for sprint 4:
    * Ability for teachers to add students into classes. This means that When teachers add a class, that class will be a new JSON in the DB and students will have a relation with that course (object in the student JSON) (edited)
    * Obtaining current logged in user in the app. Currently you are able to log in by providing credentials. This will route you to the app but your user information is not in the app at all.
    * Emails that are clicked should create an account? Ability to distinguish teacher from students
    * refactor a lot of front end. Side bar, Header and Class Room, active room, etc...
    * Landing page for the app? ( not the landing page we have right now )
