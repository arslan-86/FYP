const Quiz  = require('../models/Quiz.js');
const Result  = require('../models/Result.js');
const User = require('../models/User.js');
const multer = require('multer');
let  id = ''; 



const examGetHandler = async (req, res) => {
   id = req.params.id;
  res.render('exam')
}


const  getExam = async (req, res)=>{
   try {
      if(id == '' || id == undefined){
         res.send(404)
      }
      let result = await Quiz.findById({_id: id});
      res.send(result)
   } catch (error) {
      console.log(error);  
   }
}

const getResult = async (req, res) => {
   if (req.user.isTeacher) {
      res.redirect('/t/result')
   }
   else if(!req.user.isTeacher){
   const result = await Result.find({student_id: req.user._id});
   // console.log(result);
   res.render('s/result', { result: result });
   }
}
const profileGet = async (req, res) => {
   if(req.user.isTeacher){
      res.redirect('/t/profile')
   }
   else{
      User.findById({_id: req.user._id})
      .then(u => {
         console.log(u);
       
         res.render('s/profile', {data: u});
      })
      .catch(e => console.log(e))
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
            degree: req.body.degree,
            discipline: req.body.discipline,
            semester: req.body.semester,
            shift: req.body.shift,
            section: req.body.section,
            rollNo: req.body.rollNo,
            university: req.body.university,
            image: req.file.filename
         }
      }
   )
   .then(() => console.log('info updated'))
   .catch((e) => console.log(e))
   res.redirect('/s/profile');
  
}

module.exports = {examGetHandler, getExam, getResult, profileGet, profilePost};



// try {
//    let result = await Quiz.findById({_id: id});
//    res.send(result)
// } catch (error) {
//    console.log(error);
   
// }