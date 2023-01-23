const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
      default: true
   }
})



const Teacher = new mongoose.model('Teacher', teacherSchema);




module.exports = Teacher;