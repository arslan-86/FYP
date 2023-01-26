const Quiz  = require('../models/Quiz.js');
const Result  = require('../models/Result.js');
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
   if(!req.user.isTeacher){
      res.render('s/profile');
   }
   else{
      res.redirect('/t/profile')
   }
}

module.exports = {examGetHandler, getExam, getResult, profileGet};



// try {
//    let result = await Quiz.findById({_id: id});
//    res.send(result)
// } catch (error) {
//    console.log(error);
   
// }