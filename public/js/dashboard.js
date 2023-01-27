
const searchBtn = document.getElementById('Sbtn');
const searchBox = document.getElementById('searchBox');
const resultBox1 = document.getElementById('resultBox1');
const resultBox2 = document.getElementById('resultBox2');



const form = document.getElementById('form');

// data.append('searchValue', searchBox.value)
searchBtn.addEventListener('click', async (e) => {
   e.preventDefault();
   let data = {
      searchValue: searchBox.value
   }
   if (form.filter.value == 'Id') {
      axios.post('http://localhost:5000/dashboardSearchId', data)
         .then((x) => {

            console.log(x.data);
            if (x.data.length < 1) {
               resultBox1.classList.remove('hide');
            }
            else{
               for(let i=0; i< x.data.length; i++){
                  let div = document.createElement('div');
                  div.classList.add('quizDetail')
                  let p1 = document.createElement('p');
                  let p2 = document.createElement('p');
                  let a = document.createElement('a');
         
                  p1.innerText = x.data[i].quiz_id;
                  p2.innerText = x.data[i].title
                  a.innerText = 'Start';
                  a.href = `http://localhost:5000/s/exam/${x.data[i]._id}`;
                  a.classList.add('startBtn');
         
                  div.appendChild(p1);
                  div.appendChild(p2);
                  div.appendChild(a);
                  resultBox2.appendChild(div);
                  resultBox2.classList.remove('hide');
               }
            }

         })
   }

   if (form.filter.value == 'title') {
   let x = await axios.post('http://localhost:5000/dashboardSearchTitle', data)
   console.log(x.data);
   if (x.data.length < 1) {
      resultBox1.classList.remove('hide');
   }
   else{
      for(let i=0; i< x.data.length; i++){
         let div = document.createElement('div');
         div.classList.add('quizDetail')
         let p1 = document.createElement('p');
         let p2 = document.createElement('p');
         let a = document.createElement('a');

         p1.innerText = x.data[i].quiz_id;
         p2.innerText = x.data[i].title
         a.innerText = 'Start';
         a.href = `http://localhost:5000/s/exam/${x.data[i]._id}`;
         a.classList.add('startBtn');

         div.appendChild(p1);
         div.appendChild(p2);
         div.appendChild(a);
         resultBox2.appendChild(div);
         resultBox2.classList.remove('hide');
      }
   }
}

})

