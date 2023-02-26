const questionsDiv = document.getElementById('questions');

const addQuestion = document.getElementById('addQuestion');

addQuestion.addEventListener('click', (e) => {
   // e.preventDefault();
   
   let question = document.createElement('div');
   question.classList.add('input-group');
   question.innerHTML =  `
   <div id="close-icon" onclick="return this.parentNode.remove()"></div>

   <label for="question">Question</label>
   <textarea name="question" id="question" cols="50" rows="2" required></textarea>

   <label for="choice">Choices</label>
   <input type="text" name="choice1" id="choice" placeholder="Choice no. 1" required>
   <input type="text" name="choice2" id="choice" placeholder="Choice no. 2" required>
   <input tyspe="text" name="choice3" id="choice" placeholder="Choice no. 3" required>
   <input type="text" name="choice4" id="choice" placeholder="Choice no. 4" required>

   <label for="correct_answer">Correct Answer <span>[Please select number between 1 to 4]</span></label>
   <input type="number" name="answer" id="correct_answer" required>`;

   questionsDiv.appendChild(question)
})