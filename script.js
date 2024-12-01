document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];//convert a JSON string into a JavaScript object or array

  tasks.forEach(task => renderTask(task))

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask)
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  //fetching task from the local storage and displaying it into the DOM
  function renderTask(task) {

    const li=document.createElement("li")

    //The data-id attribute will allow each task to be uniquely identified-useful for operations like deletion
    li.setAttribute('data-id',task.id) //attribute is added to the li tag as a key value pair
    
    if(task.completed)
      li.classList.add("completed")

    li.innerHTML=`
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener('click',(e)=>{
      if(e.target.tagName=== 'BUTTON')
        return;

      task.completed=!task.completed;
      li.classList.toggle('completed')
      saveTask()
    })

    li.querySelector('button').addEventListener('click', (e)=>{
      //e.stopPropagation() is Useful when you want an event to be handled only on the current element, without affecting its parent elements.
      e.stopPropagation()
      tasks= tasks.filter(t => t.id !== task.id)
      li.remove()//Deletes the element entirely from the DOM
      saveTask()

    })

    todoList.appendChild(li)
  }

  //adding task to the local storage
  function saveTask() {
    //We need JSON strings to store data in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));//converts a JavaScript object or array into a JSON string
  }
});
