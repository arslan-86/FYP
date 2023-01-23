const mongoose = require('mongoose');


const quizSchema = new mongoose.Schema({
   quiz_id:{
      type: String,
      // lowerCase: true
   },
   title:{
      type: String,
      lowercase: true
   },
   description:{
      type: String
   },
   createdBy:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
   },
   totalQuestions:{
      type: Number
   },
   totalMarks:{
      type: Number
   },
   questions:{
      type: Array
   }
});


const Quiz = new mongoose.model('Quiz', quizSchema);


module.exports = Quiz;