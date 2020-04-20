document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let surname = document.getElementById('surname').value;
  let type = document.getElementById('type').value;
  let number = document.getElementById('number').value;
  let cityType = document.getElementById('cityType').value;
  let city = document.getElementById('city').value;
  let date = document.getElementById('date').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let task = {
    title,
    surname,
    type,
    number,
    cityType,
    city,
    date,
    description
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
   let tasks = JSON.parse(localStorage.getItem('tasks'));
   let tasksView = document.getElementById('tasks'); //vista html
   tasksView.innerHTML = '';
   for(let i = 0; i < tasks.length; i++) {
     let title = tasks[i].title;
     let surname = tasks[i].surname;
     let type = tasks[i].type;
     let number = tasks[i].number;
     let cityType = tasks[i].cityType;
     let city = tasks[i].city;
     let date = tasks[i].date;
     let description = tasks[i].description;
 
     tasksView.innerHTML += `<div class="card mb-3">
         <div class="card-body">
            <p>Yo ${title} ${surname} Identificado con ${type} ${number} de ${cityType}. Declaro que, cumpliendo 
            con lo establecido en el decreto 457 y bajo gravedad de juramento, he solicitado un permiso de 
            urgencia para poder circular por la ciudad de ${city} el día ${date} con el siguiente motivo: ${description}
            <br>
            <br>
            <a style="margin-left:0px !important;" href="#" onclick="deleteTask('${title}')" type="button" class="btn btn-block btn-success ml-5">Borrar</a>
            
            <a type="button"  class="btn btn-block btn-info border" href="javascript:generatePDF('${title}')">Descargar PDF</a>
            </p>
         </div>
       </div>`;
       
   }
 }


getTasks();


function generatePDF(title){
   console.log(title)
   let tasks = JSON.parse(localStorage.getItem('tasks'));
   var doc = new jsPDF('l', 'mm', [216, 279]);
  
   for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].title == title) {
         let title = tasks[i].title;
         let surname = tasks[i].surname;
         let type = tasks[i].type;
         let number = tasks[i].number;
         let cityType = tasks[i].cityType;
         let city = tasks[i].city;
         let date = tasks[i].date;
         let description = tasks[i].description;    

         
         doc.setFont("helvetica");
         doc.setFontType("bold");
         doc.setFontSize(22);
         doc.text(15,20, `Salvoconducto ${date}`)  

         doc.setFont("helvetica");
         doc.setFontType("regular");
         doc.setFontSize(20);
         doc.text(15,30, `A nombre de: ${title} ${surname}`)  

         doc.setFont("roboto");
         doc.setFontType("regular");
         doc.setFontSize(14);
         doc.text(15, 40, `Yo ${title} ${surname} Identificado con ${type} ${number} de ${cityType}. Declaro que, cumpliendo con lo establecido en el decreto 457 y 
         `);
         doc.text(15, 45, `bajo gravedad de juramento, he solicitado un permiso de urgencia para circular por la ciudad de ${city} el día ${date} `);
         doc.text(15, 50, `con el siguiente motivo: ${description}`);

         doc.save('salvoconducto.pdf'); 
      }
        
    }
   
}