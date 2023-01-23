const Quiz = require('../models/Quiz.js');
const Result = require('../models/Result.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

//               Create Quiz Get and Post Request

// @route GET http://localhost:5000/t/create
// @desc render the create.ejs 
const createQuizGet = (req, res) => {
   res.render('t/create');
}

// @route POST http://localhost:5000/t/create
// @desc Save the quiz in the QUIZ Model
const createQuizPost = (req, res) => {
   let len = req.body.question.length;
   let questions = [];
   if (len > 1) {
      for (let i = 0; i < len; i++) {
         let q = {
            question: req.body.question[i],
            choice1: req.body.choice1[i],
            choice2: req.body.choice2[i],
            choice3: req.body.choice3[i],
            choice4: req.body.choice4[i],
            answer: req.body.answer[i]
         }
         questions.push(q);
      }
   } else {
      let q = {
         question: req.body.question,
         choice1: req.body.choice1,
         choice2: req.body.choice2,
         choice3: req.body.choice3,
         choice4: req.body.choice4,
         answer: req.body.answer
      }
      questions.push(q);
   }
   // console.log(req.body);

   const quiz = new Quiz({
      quiz_id: req.body.quiz_id,
      title: req.body.title,
      description: req.body.description,
      totalQuestions: req.body.totalQuestions,
      totalMarks: req.body.totalMarks * +req.body.totalQuestions,
      questions: questions,
      createdBy: req.user._id
   });

   quiz.save(function (err, result) {
      if (err) {
         console.log(err);
      }
      else {
         User.findOneAndUpdate({ _id: req.user._id }, { $push: { createdQuizzes: result._id} }).then(() => console.log('user up')).catch(err => console.log(err))

      }
   })

   req.flash('success_msg', `Quiz created by the ID: ${req.body.quiz_id}`)
   res.redirect('/tdashboard')
}



//        Edit GET and POST requests Handlers

//@route GET http://localhost:5000/t/edit 
//@desc get all quizzes from the database against Logged In teacher _id and display it  
const editQuizGet = (req, res) => {
   let e = req.user.createdQuizzes[6]
   console.log(e);
   
   res.render('t/edit');
}

//@route POST http://localhost:5000/t/edit
//@desc


//@route GET http://localhost:5000/t/result
//@desc  display all results from database against logged in teacher => req.user.createdQuizzes
const resultGet = async (req, res) => {
   if (!req.user.isTeacher) {
      res.redirect('/s/result')
   }
   else if (req.user.isTeacher) {
      let data = [];
      req.user.createdQuizzes.forEach(id => {
         Result.find({quiz_id: id})
         .then( u => {
            if(u.length < 1) return;
            for(let c of u){
            c.populate('student_id').then(u => {
               console.log(c.quiz_id2);
               console.log(c.quiz_title);
               console.log(c.student_id.firstName+' '+u.student_id.lastName)
               console.log(c.totalMarks);
               console.log(c.obtainedMarks);
            })
            } 
         })
      });
      res.render('t/result', {data: data});
   }
}



module.exports = { createQuizPost, createQuizGet, editQuizGet, resultGet }
