* [Meeting #1 (January 27, 2017)](https://github.com/jusleg/soen341/wiki/Meeting-Notes#meeting-1)
* [Meeting #2 (February 3, 2017)](https://github.com/jusleg/soen341/wiki/Meeting-Notes#meeting-2)
* [Meeting #3 (February 10, 2017)](https://github.com/jusleg/soen341/wiki/Meeting-Notes#meeting-3)

***

## **MEETING #1**

Struggling to understand teacher and what he is writing. What do we do?

App that enables students to discuss between students and potentially teachers.
Login into the server, which will direct you to the classes that you are enrolled in.

Teachers can sign up.
Students can sign up by logging in with their Concordia acc.
Student and teacher can communicate directly.
Teacher can Enable the room , Kick people out.
Chat room where students can exchange information / pictures / notes.
Automation to detect inappropriate content such as .gifs/ memes.

Customer comment : 
Must have moderators and teacher to control what the group is talking about. Not Just random things.
There exists a public repository which can force student to login their student acc. Just have to validate the student actually exists.
How do we know that the person is actually in class in person? i-clicker attendance , http-location, etc

_FIRST SPRINT_
Something working, the idea one is the log-in system is essential.
You need the data base working.
Have a really weak log-in. Text send form. Doesn't need to be connected to Concordia.
Basic log-in, you can skip the validation for student/teacher.
Elementary Front-end for now, to be improved later.

## **MEETING #2**

Master, Develop, Feature branch relationship:
You can put all features into develop and at the end merge it into master.
Git tree ? if its evaluated.

_SECOND SPRINT_
Unit Test.
Automation Testing - TravisCI. Based on the stories and enough test
The chat - have different chat rooms for each course
Login - login with db with routing and permission handling
User distinction between Teacher/Student
Get MyConcordia Students DB

## **MEETING #3**

Asked if it's possible to have another program to keep track of issues such as Atlassian, Jira, gitBucket. 
Discussed about story points, and burndown chart. 

## **MEETING #4**

Discussed about lost grades due to missing team members. We discussed about burndown chart. In the past, our burndown charts only included the story points. This create burndown charts that were not good looking. From now on we will also include the time spent in the burndown chart. The chart will be based on hours worked. Email campaign are the main aspect of sprint 3. Many tasks depend on the email campaign to be implemented. Email campaigns for the forgot password, student on-boarding and notification email will be implemented. Some of the features behind the different email scenarios will also be implemented.
