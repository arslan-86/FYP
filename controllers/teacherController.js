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
         User.findOneAndUpdate({ _id: req.user._id }, { $push: { createdQuizzes: result._id } }).then(() => console.log('user up')).catch(err => console.log(err))

      }
   })

   req.flash('success_msg', `Quiz created by the ID: ${req.body.quiz_id}`)
   res.redirect('/tdashboard')
}



//        Edit GET and POST requests Handlers

//@route GET http://localhost:5000/t/edit 
//@desc get all quizzes from the database against Logged In teacher _id and display it  
const editQuizGet = async (req, res) => {
   let data = [];
   let len = req.user.createdQuizzes.length;
   if (len > 0) {
      for (let i = 0; i < len; i++) {
         let x = await Quiz.findOne({ _id: req.user.createdQuizzes[i] });
         data.push({
            id: x._id,
            quiz_id: x.quiz_id,
            title: x.title,
            desc: x.description,
            marks: x.totalMarks,
            questions: x.totalQuestions
         });
      }
   }
   res.render('t/edit', { data: data });
}



//@route GET http://localhost:5000/t/result
//@desc  display all results from database against logged in teacher => req.user.createdQuizzes
const resultGet = async (req, res) => {
   if (!req.user.isTeacher) {
      res.redirect('/s/result')
   }
   else if (req.user.isTeacher) {
      try {
         let data = [];
         for (let i = 0; i < req.user.createdQuizzes.length; i++) {
            let x = await Result.find({ quiz_id: req.user.createdQuizzes[i] }).populate('quiz_id').populate('student_id',);
            for (let j = 0; j < x.length; j++) {
               if (x[j].length < 1) return;
               data.push({
                  id       : x[j].quiz_id2,
                  title    : x[j].quiz_title,
                  desc     : x[j].quiz_id.description,
                  std_name : x[j].student_id.firstName + ' ' + x[j].student_id.lastName,
                  obtMarks : x[j].obtainedMarks,
                  tMarks   : x[j].totalMarks,
               })
            }
         }
         // console.log(data);
         res.render('t/result', { data: data })
      }
      catch (error) {
         console.log(error);
      }
   }
}




const updateGet = async (req, res) => {
   const id = req.params.id;

   let x = await Quiz.findById(id);
   // .exec((err, d) => {
   //    if(err) throw err;
   //    data =d;
   // })

   res.render('t/update', { data: x })
}

const updatePost = async (req, res) => {
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
   let update = {
      quiz_id: req.body.quiz_id,
      title: req.body.title,
      description: req.body.description,
      totalQuestions: req.body.totalQuestions,
      totalMarks: req.body.totalMarks * +req.body.totalQuestions,
      questions: questions,
      createdBy: req.user._id
   }
   Quiz.findOneAndUpdate({ quiz_id: req.body.quiz_id }, update)
      .then((d) => { })
      .catch(e => console.log(e))

   req.flash('success_msg', 'Quiz Updated Successfully');
   res.redirect('/t/edit')
}


const deleteGet = async (req, res) => {
   let qid = req.params.id;

   try {
      await Quiz.deleteOne({ _id: qid })

      await User.updateOne({ _id: req.user._id }, {
         $pull: {
            createdQuizzes: qid
         }
      });
      req.flash('success_msg', 'Quiz Deleted Successfully');
      res.redirect('/t/edit');
   } catch (error) {
      console.log(error);
   }
}

const profileGet = (req, res) => {
if(req.user.isTeacher){
   User.findById({_id: req.user._id})
   .then(u => {

      res.render('t/profile', {data: u})
   })
   .catch(e => console.log(e))
}
else{
   res.redirect('/s/profile')
}
}

const profilePost = async (req, res) => {
   User.updateOne(
      {_id: req.user._id},
      {
         $set:{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            livein: req.body.livein,
            age: req.body.age,
            education: req.body.education,
            work: req.body.education,
            image: req.file.filename
         }
      }
   )
   .then(() => {
      console.log('info updated')
      res.redirect('/t/profile');
   })
   .catch((e) => console.log(e))
  
}




module.exports = { createQuizPost, createQuizGet, editQuizGet, resultGet, updateGet, updatePost, deleteGet, profileGet, profilePost }
