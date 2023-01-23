const fs = require('fs');
const path = require('path');
const Quiz = require('../models/Quiz.js')

const quizPostReqHandler = (req, res) => {
   const b = req.body.searchBar
   // console.log(req.body.searchBar)
   filePath = path.join('__dirname','..','sampledata.json')
   const file = fs.readFileSync(filePath, 'utf8');
 
   newFile = JSON.parse(file)

   if(newFile.title != b){
      res.sendStatus(404);
      // console.log('eroor');
      
   }
   else{
      res.send(newFile);
   }

}

const quizGetIdReq = async (req , res) => {
   try{
      const id = req.params.id;
      const result = await Quiz.find({quiz_id: id});
      res.send(result);
   }
   catch(error){
      console.log(error);
   }
}

const quizGetTitleReq = async (req, res) => {
  try {
   const title = req.params.title;
   const result = await Quiz.find({title: title});
   res.send(result)
  } 
  catch (error) {
   console.log(error);
  }
}


module.exports = {quizPostReqHandler, quizGetIdReq , quizGetTitleReq};