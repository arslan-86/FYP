const mongoose = require('mongoose');
const Quiz = require('./Quiz');
const Student = require('./User');

const resultSchema = new mongoose.Schema({
   quiz_id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Quiz'
   },
   quiz_id2:{
      type: String
   },
   student_id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
   },
   quiz_title:{
      type: String
   },
   totalMarks:{
      type: Number
   },
   obtainedMarks:{
      type: Number
   },
   attemptedAt:{
      type: Date,
      default: Date.now
   }
})



const Result = new mongoose.model('Result', resultSchema);


module.exports = Result;