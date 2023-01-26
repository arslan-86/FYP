const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const mongoose = require('mongoose');

//  Controllers

const quizController = require('../controllers/quizController.js');
const studentController = require('../controllers/studentController.js');
const teacherController = require('../controllers/teacherController.js');
const registerController = require('../controllers/registerController.js');

//   Models
const User = require('../models/User.js');
const Result = require('../models/Result.js');
const Quiz = require('../models/Quiz.js')

let id = '';

router.get('/', (req, res) => {
   res.render('welcome');
})
router.get('/dashboard', (req, res) => {
   id = req.user._id;
   if (req.user.isTeacher) {
      res.redirect('/tdashboard')
   }
   else if (!req.user.isTeacher) {
      res.render('dashboard')
   }
})
router.get('/tdashboard', (req, res) => {
   id = req.user_id;
   if (!req.user.isTeacher) {
      res.redirect('/dashboard')
   }
   else if (req.user.isTeacher) {
      res.render('tdashboard')
   }
})

router.get('/setting', (req, res) => {
   res.render('setting')
})

router.get('/instruction', (req, res) => {
   res.render('instruction')
})



router.get('/login', (req, res) => {
   if (req.isAuthenticated()) {
      if (req.user.isTeacher == true) {
         res.redirect('/tdashboard')
      } else {
         res.redirect('/dashboard')
      }
   }
   else {
      res.render("login");
   }
})

router.post('/login', passport.authenticate('local', { successRedirect: '/temp', failureRedirect: "/login", failureFlash: true }), (err, req, res, next) => {
   if (err) next(err);
});

router.get('/temp', (req, res) => {
   if (req.user.isTeacher == true) {
      res.redirect('/tdashboard')
   }
   else {
      res.redirect('/dashboard')
   }
});


router.get('/logout', (req, res) => {
   req.logOut((err) => {
      if (err) console.log(err)
   });
   req.flash("success_msg", "You are logged out")
   res.redirect('/login')
})


router.get('/register', registerController.getRegister);
router.post('/register', registerController.postRegister);


//                    Student and Exam Routes
// 
//This render the exam.js and send the quiz id to getExam 
router.get('/s/exam/:id', studentController.examGetHandler)
// Api created for frontEnd Javascript exam.js  line:147
router.get('/s/getexam', studentController.getExam)
router.get('/s/result', studentController.getResult);
// left this hander here because im using "id" which i cannot use in other file
// line:18 => line:24 => line:31 => line:91
// in order to save result i need student id which i cannot get in other files
// so when student sign in and goes to dashboard his _id automatically stores in
// id variable
router.post('/s/result', (req, res) => {
   const result = new Result({
      quiz_id: req.body.quiz_id,
      quiz_id2: req.body.quiz_id2,
      student_id: req.user._id,
      quiz_title: req.body.quiz_title,
      totalMarks: req.body.totalMarks,
      obtainedMarks: req.body.obtainedMarks
   })
   result.save()
      .then(() => console.log('Result Saved'))
      .catch((err) => console.log(err));
   res.send('Result Saved')
   User.findOneAndUpdate({ _id: req.user._id }, { $push: { attemptedQuizzes: req.body.quiz_id } }).then(() => console.log('savedd')).catch((er) => console.log(er))
})
router.get('/s/profile', studentController.profileGet)



// 
//                    Teacher Routes
// 
router.get('/t/edit', teacherController.editQuizGet);
router.get('/t/result', teacherController.resultGet);
router.get('/t/create', teacherController.createQuizGet);
router.post('/t/createQuiz', teacherController.createQuizPost);
router.get('/t/update/:id', teacherController.updateGet);
router.post('/t/update', teacherController.updatePost);
router.get('/t/delete/:id', teacherController.deleteGet);
router.get('/t/profile', teacherController.profileGet);





//
//   QUIZ  Routes
// 
router.get('/quiz', (req, res) => {
   if (req.user.isTeacher) {
      res.redirect('/t/create')
   } else if (!req.user.isTeacher) {
      res.render('quiz')
   }

});
router.post('/quiz', quizController.quizPostReqHandler);
router.get('/quiz/i/:id', quizController.quizGetIdReq);
router.get('/quiz/t/:title', quizController.quizGetTitleReq);

// 
// 
// 

module.exports = router;