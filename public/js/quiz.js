const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const grid_container = document.getElementById('gridContainer');
const errorLabel = document.getElementById('errorLabel');
const form = document.getElementById('form');

let quiz_id = '';


let quizData = {};



searchBtn.addEventListener('click', async (e) => {
   e.preventDefault();
   if (form.filter.value == 'id') {
      try {
         let res = await fetch(`http://localhost:5000/quiz/i/${searchBar.value}`);

         if (!res.ok) {
            displayError();
            throw new Error(res.statusText)
         }

         let data = await res.json();
         if (data.length > 0) {
            displayQuizInfo(data)
         }
         else {
            errorLabel.classList.remove('hideLabel')
         }

      } catch (error) {
         console.log(error)
      }
   }

   else if (form.filter.value == 'title') {

      try {
         let res = await fetch(`http://localhost:5000/quiz/t/${searchBar.value}`);

         if (!res.ok) {
            displayError();
            throw new Error(res.statusText)
         }
         let data = await res.json();

         if (data.length > 0) {
            displayQuizInfo(data)
         } else {
            errorLabel.classList.remove('hideLabel')
         }

      } catch (error) {
         console.log(error)
      }
   }


});



// Dynamically adding quiz data to grid-container in quiz.ejs file

function displayQuizInfo(quiz) {
   // console.log(quiz);
   grid_container.innerHTML = "";
   errorLabel.classList.add('hideLabel');
   grid_container.classList.remove('hideLabel')

   for (let i = 0; i < quiz.length; i++) {

      grid_container.innerHTML += `
   
   <div class="quiz-info">
   <p class="label">Title:</p>
   <h1 class="title w80">${quiz[i].title}</h1>
   <p class="label">Description:</p>
   <p class="desc w80">${quiz[i].description}</p>

   <div class="toBeFlexed w80">
      <div>
         <p class="label">Questions:</p>
         <h3 class="questionsNo">${quiz[i].totalQuestions}</h3>
      </div>
      <div class="seperator"></div>
      <div>
         <p class="label">Total Marks:</p>
         <h3 class="marks ">${quiz[i].totalMarks}</h3>
      </div>
   </div>
   <hr class="hr w80">
  
   <a href="s/exam/${quiz[i]._id}" class="cus-btn" id="start-quiz-btn">Start</a>
   
</div>

</div>

</div>


`;

   }

}


function displayError() {
   grid_container.classList.add('hideLabel');
   errorLabel.classList.remove('hideLabel');
}


const startBtn = document.getElementById('start-quiz-btn');




