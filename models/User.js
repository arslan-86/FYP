const mongoose = require('mongoose');
const Quiz = require('./Quiz.js');


const userSchema = new mongoose.Schema({
   firstName:{
      type: String
   },
   lastName:{
      type: String
   },
   email:{
      type: String
   },
   password:{
      type: String
   },
   isTeacher:{
      type: Boolean,
   },
   
   attemptedQuizzes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Quiz' }],
   createdQuizzes: [{  type: mongoose.SchemaTypes.ObjectId, ref: 'Quiz'}]

})



const User = new mongoose.model('User', userSchema);




module.exports = User;