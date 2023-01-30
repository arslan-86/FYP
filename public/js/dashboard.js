
const searchBtn = document.getElementById('Sbtn');
const searchBox = document.getElementById('searchBox');
const resultBox1 = document.getElementById('resultBox1');
const resultBox2 = document.getElementById('resultBox2');
const closeBtn = document.getElementById('close-icon');
const closeBtn2 = document.getElementById('close-icon2');



const form = document.getElementById('form');

// data.append('searchValue', searchBox.value)
searchBtn.addEventListener('click', async (e) => {
   e.preventDefault();
   resultBox2.lastChild.remove()
   let data = {
      searchValue: searchBox.value
   }
   if (form.filter.value == 'Id') {
      axios.post('http://localhost:5000/dashboardSearchId', data)
         .then((x) => {

            if (x.data.length < 1) {
               resultBox2.classList.add('hide')
               resultBox1.classList.remove('hide');
            }
            else {
               for (let i = 0; i < x.data.length; i++) {
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

                  resultBox1.classList.add('hide');
                  resultBox2.classList.remove('hide');
                  resultBox2.appendChild(div);
               }
            }

         })
         .catch(e => console.log(e));
   }

   if (form.filter.value == 'title') {
      try {
         let x = await axios.post('http://localhost:5000/dashboardSearchTitle', data)

         if (x.data.length == 0) {
            resultBox2.classList.add('hide');
            resultBox1.classList.remove('hide');
         }
         else {
            for (let i = 0; i < x.data.length; i++) {
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

               resultBox1.classList.add('hide')
               resultBox2.classList.remove('hide');
               resultBox2.appendChild(div);
            }
         }
      }
      catch(error){
         console.log(error);
      }
   }
})

closeBtn.addEventListener('click', (e) => {
   closeBtn.parentNode.classList.add('hide')
   console.log('click');
})

closeBtn2.addEventListener('click', (e) => {
   closeBtn2.parentNode.classList.add('hide')
})

