
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('score');

const quiz = document.getElementById('quiz');
const confirmBtn = document.getElementById('confirm-btn');
const closeBtn = document.getElementById('closeBtn');

const loader = document.getElementById('loader');



const html = document.documentElement;

let quiz_id = '';
let quiz_id2 = '';
let quiz_title = '';
let warningCounter = 0;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
   // {
   // "question": "When was the programming language &quot;C#&quot; released?",
   // "choice1" :"2000",
   // "choice2" :"1998",
   // "choice3" :"1999",
   // "choice4" :"2001",
   // "answer"  : 1

   // },
   // {
   // "question": "What five letter word is the motto of the IBM Computer company?",
   // "choice1" : "Click",
   // "choice2" : "Logic",
   // "choice3" : "Pixel",
   // "choice4"  : "Think",
   // "answer" :    4
]

//Constants
let BONUS = 0;
let MAX_QUESTIONS = 0;
let totalMarks = 0;



// Getting Quiz form Api








window.addEventListener('load', e => {
   const btn = document.getElementById('myModal');

   btn.click();
})

confirmBtn.addEventListener('click', e => {
   if (html.requestFullscreen) {
      html.requestFullscreen();
   }
   glanceTracker();

})
closeBtn.addEventListener('click', e => {
   window.location.assign('/quiz')
})


// GLANCE TRACKER

function glanceTracker() {
   JEELIZGLANCETRACKER.init({

      callbackTrack: function (isWatching) {
         if (isWatching) {
            console.log('Hey, you are watching bro');
            if(warningCounter == 0){
               startQuiz();
            }

         } else {
            console.log('You are not watching anymore :(');
            warningCounter++;
            if  (warningCounter === 4) {
               return failed();
            }
            if(warningCounter === 3){
               lastWarning();
            }
            else {
               console.log(warningCounter);
               warning();
            }

         }
      },
      callbackReady: function (error, spec) {
         if (error) {
            console.log('EN ERROR happens', error);
            return;
         }
         console.log('All is well :)');
         
      },
      isDisplayVideo: true,
      canvasId: 'glanceTrackerCanvas',
      sensibility: 0.2,
      NNCPath: 'js/dist/'
   });
}



async function startQuiz() {
   try {
      let res = await fetch('http://localhost:5000/s/getexam');
      if (!res.ok) {
         throw new Error(res.statusText);
      }
      let data = await res.json();
      quiz_id = data._id;
      quiz_id2 = data.quiz_id;
      quiz_title = data.title;
      questions = data.questions;
      totalMarks = data.totalMarks;
      BONUS = data.totalMarks / data.totalQuestions;
      MAX_QUESTIONS = data.totalQuestions;
   } catch (error) {
      console.log(error);
   }
   availableQuestions = [...questions];
   questionCounter = 0;
   score = 0;
   getNewQuestion();
}

async function getNewQuestion() {
   
   loader.classList.add('hide')
   quiz.classList.remove('hide');
   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      // progressBarFull.style.width = 0;
      // scoreText.innerText = 0;
      if (document.exitFullscreen) {
         document.exitFullscreen();
      }

      JEELIZGLANCETRACKER.toggle_pause(isPause = true, shutCamera = true)
      JEELIZGLANCETRACKER.toggle_display(isDisplay = false)
      JEELIZGLANCETRACKER.destroy();



      let resultData = {
         quiz_id: quiz_id,
         quiz_id2: quiz_id2,
         totalMarks: totalMarks,
         obtainedMarks: score,
         quiz_title: quiz_title
      }

      let res = await axios.post('http://localhost:5000/s/result', resultData)


      return window.location.assign('/s/result');
   }

   questionCounter++;
   const questionIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionIndex];
   question.innerText = currentQuestion.question;

   progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

   choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
   })

   availableQuestions.splice(questionIndex, 1);
   acceptingAnswers = true;
};

choices.forEach(choice => {
   choice.addEventListener('click', e => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];

      let classToApply = 'incorrect';

      if (currentQuestion.answer == selectedAnswer) {
         classToApply = 'correct';
         score += BONUS;
         scoreText.innerHTML = score;
      }


      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
         selectedChoice.parentElement.classList.remove(classToApply);
         getNewQuestion();
      }, 1000)
   })
})


function warning() {
   const warning = document.getElementById('warning');
   // const failed = document.getElementById('failed');
   loader.classList.add('hide');
   quiz.classList.add('hide');

   warning.classList.remove('hide');

   setTimeout(async () => {
      await warning.classList.add('hide');
      await quiz.classList.remove('hide');
   }, 3000)
}

function lastWarning() {
   const lastWarning = document.getElementById('lastWarning');
   // const failed = document.getElementById('failed');
   loader.classList.add('hide');
   quiz.classList.add('hide');

   lastWarning.classList.remove('hide');

   setTimeout(async () => {
      await lastWarning.classList.add('hide');
      await quiz.classList.remove('hide');
   }, 5000)
}
//In case student failed this setting will be displayed

async function failed() {
   const failed = document.getElementById('failed');
   await quiz.classList.add('hide');
   loader.classList.add('hide')
   failed.classList.remove('hide');


   let resultData = {
      quiz_id: quiz_id,
      quiz_id2: quiz_id2,
      totalMarks: totalMarks,
      obtainedMarks: 0,
      student_id: quiz_id,
      quiz_title: quiz_title
   }

   let res = await axios.post('http://localhost:5000/s/result', resultData)

   // CLearing GlanceTracker
   JEELIZGLANCETRACKER.toggle_pause(isPause = true, shutCamera = true)
   JEELIZGLANCETRACKER.toggle_display(isDisplay = false)
   JEELIZGLANCETRACKER.destroy();

   warningCounter = 0;
   setTimeout(() => {
      window.location.assign('/s/result')
   }, 3000)


}

