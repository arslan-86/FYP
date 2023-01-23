const addQuestion = document.getElementById('addQuestion');
const form = document.getElementById('form');
const questionsDiv = document.getElementById('questions');
const totalQuestions = document.getElementById('totalQuestions');
const quiz_id = document.getElementById('quiz_id');
const close_icon = document.getElementById('close-icon');


window.addEventListener('load', async ()=>{
   quiz_id.value = getRandom()
})


// totalQuestions.addEventListener('change', ()=>{
//    const len = +totalQuestions.value;
//    console.log(len);

//    questionsDiv.innerHTML = '';

//    for (let index = 1; index <= len ; index++) {
//       let question = document.createElement('div');
//       question.classList.add('input-group');
//       question.innerHTML =  `<label for="question">Question</label>
//       <textarea name="question" id="question" cols="50" rows="2"></textarea>
   
//       <label for="choice">Choices</label>
//       <input type="text" name="choice1" id="choice" placeholder="Choice no. 1">
//       <input type="text" name="choice2" id="choice" placeholder="Choice no. 1">
//       <input type="text" name="choice3" id="choice" placeholder="Choice no. 1">
//       <input type="text" name="choice4" id="choice" placeholder="Choice no. 1">
   
//       <label for="correct_answer">Correct Answer <span>[Please select number between 1 to 4]</span></label>
//       <input type="number" name="answer" id="correct_answer">`;
   
//       questionsDiv.appendChild(question)
      
//    }
// })


addQuestion.addEventListener('click', (e) => {
   // e.preventDefault();
   
   let question = document.createElement('div');
   question.classList.add('input-group');
   question.innerHTML =  `
   <div id="close-icon"></div>

   <label for="question">Question</label>
   <textarea name="question" id="question" cols="50" rows="2" required></textarea>

   <label for="choice">Choices</label>
   <input type="text" name="choice1" id="choice" placeholder="Choice no. 1" required>
   <input type="text" name="choice2" id="choice" placeholder="Choice no. 1" required>
   <input type="text" name="choice3" id="choice" placeholder="Choice no. 1" required>
   <input type="text" name="choice4" id="choice" placeholder="Choice no. 1" required>

   <label for="correct_answer">Correct Answer <span>[Please select number between 1 to 4]</span></label>
   <input type="number" name="answer" id="correct_answer" required>`;

   questionsDiv.appendChild(question)
})


close_icon.addEventListener('click', (e)=>{
   close_icon.parentElement.remove();
   console.log('clicked');
})



function getRandom(){
   const arr = ['1','2','3','4','5','6','7','8','9',"a","b","c","d","e","f"];
   let ran = "";
   for(let i = 0; i<6; i++){
      let index = Math.floor(Math.random() * arr.length);
      ran += arr[index];
   }
   return ran;
}
getRandom();