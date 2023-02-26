# Smart Quiz Web Application

## Introduction
The idea behind Smart Quiz application which distinguishes this application from other applications is that is uses webcam to check whether a student is looking at the screen while attempting the quiz or not. If the student is looking somewhere else instead of the laptop screen for two seconds straight then the application will generate a warning message for the for the first time. For the second time, the student will not be able to continue the quiz anymore.

![welcome-SQ](https://user-images.githubusercontent.com/111128880/221427254-ea3dbe35-34bd-4b78-ad24-c8973db6456f.png)


## Jeeliz Glance Tracker
I used a third party library called Jeeliz Glance Tracker in this project. This JavaScript/WebGL library detects if the user is looking at the screen or not
I used this library in Smart Quiz Application in such a way that if user try to look away from the screen while taking the quiz then application will hide the test and generate a warning message saying "Please do not look offscreen while attempting the quiz. And if this happens again then application will end the test give the user zero marks for this quiz.

![SQ_ecam](https://user-images.githubusercontent.com/111128880/221427732-f1db2670-ba30-4f56-9f09-a79e88accf87.png)




## Tools and Technologies Used
 + EJS
 + CSS
 + Node JS
 + Express JS
 + MongoDB
 + Passport JS
 + Bootstrap
 
 ## Primary Actors
 Two types of users who can use this application:
 ### Teacher
 + Teacher will be able to create quizzes.
 + Perform CRUD operations on quizzes.
 + Check the results of students
 + Edit his/her profile.
 
 ### Students
 + Student will be able to attempt quizzes created by teachers.
 + Check their results
 + Edit his/her profile


## How to use
  First of all clone this repository in your local machine. Then open the source code in your favourite code editor. After that add a ```.env``` file and add a environment variable ```MongoUri```
  ```
  MongoUri='Your database string'
  ```
  Run the following command to install dependencies
  ```node
  npm install
  ```
  To start the project run the following command in the terminal
  ```node
  npm start
  ```
  
  
  ## Limitation
  + This application is not compatible with mobile phone. You should use laptop for this to run smoothly.
  
