class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status) {
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
  }

// changing to Done status
updateTaskToDone(taskId) {
  this.getTask(taskId).status = "Done";
   }
// edit task
editTask(taskId, name, description, assignedTo, dueDate, status) {
  for (let i = 0; i < this.tasks.length; i++) {
    // search for taskID in this.task array and update the task
    if (this.tasks[i].id === taskId){
      this.tasks[i].name = name;
      this.tasks[i].description = description;
      this.tasks[i].assignedTo = assignedTo;
      this.tasks[i].dueDate = dueDate;
      this.tasks[i].status = status;
      console.log("Edited task", this.tasks[i].name);
    }
  }
}
// delete task
deleteTask(taskId) {
  let temp = this.getTask(taskId);
  console.log("delete task function",temp);
  let newTasks = [];
  for (let i = 0; i < this.tasks.length; i++) {
    let task = this.tasks[i];
    if (task.id != temp.id) newTasks.push(task);
  }
  this.tasks = newTasks;
  // if this.tasks is empty, reset currentID to 0
}
// get selected task
getTask(taskId){
  let temp =[];
  for (let i = 0; i < this.tasks.length; i++) {
    // search for taskID in this.task array
    if (this.tasks[i].id === taskId){
      temp= this.tasks[i];
    }
  }
  console.log("selected task",temp);
  return temp;
}



  // save to localStorage
  save() {
    // save task if tasks list is not empty
    if (this.tasks.length != 0) {
    let tasksJson = JSON.stringify(this.tasks); //converting tasks to JSON string
    localStorage.setItem("tasks", tasksJson);
    
    let currentID = this.currentId.toString(); //converting Id to string
    localStorage.setItem("currentID",currentID);

    } else {
      // clear storage and reset current id to 0
      localStorage.clear();
      this.currentId = 0;
      console.log("Clearing storage when task list is empty.");
    }
   
  }
//load from local storage
  load() {
    let tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      this.tasks = JSON.parse(tasksJson); //converting JSON string to task array
      let tempID = localStorage.getItem("currentID");
      if (tempID)
      this.currentId = Number(tempID);
    }

  }

  // render the tasks in four columns based on status
  render() {
    // filter the task array and divide tasks into four arrays based on status
    let arrTodo = this.tasks.filter((arr) => {
      return arr.status === "To-do";
    });

    let arrInProgress = this.tasks.filter((arr) => {
      return arr.status === "In-progress";
    });

    let arrReview = this.tasks.filter((arr) => {
      return arr.status === "Review";
    });

    let arrDone = this.tasks.filter((arr) => {
      return arr.status === "Done";
    });
    // Make the four task columns and populate them with the tasks according to status
    let tempHtml = 
      this.createTaskHtml(arrTodo) + 
      this.createTaskHtml(arrInProgress) + 
      this.createTaskHtml(arrReview) + 
      this.createTaskHtml(arrDone);
    // disply the tasks in the card list div
    document.querySelector("#cardList").innerHTML = tempHtml;
  }

  // function to create the row html for each task type
  createTaskHtml(arrTask = []) {

    // if the array is not empty, create the the html task div
    if (arrTask.length != 0) {
     
      // set task image and colour based on task type
      let arrStatus = ["To-do", "In-progress", "Review", "Done"];
      let arrTaskColor = ["todoClr", "inprogressClr", "reviewClr", "doneClr"];
      // status image array
      let arrStatusImage = [
        "bi-filter-circle",
        "bi-dash-circle-dotted",
        "bi-search",
        "bi-check2-circle",
      ];
      //find status-image based on the index  of currunt status
      let imgStatus = arrStatusImage[arrStatus.indexOf(arrTask[0].status)];
      // get task text color from array
      let textColor = arrTaskColor[arrStatus.indexOf(arrTask[0].status)];
      let doneButton = "";
      const tasksColumnList = [];
      // loop through task array and create the html
      for (let i = 0; i < arrTask.length; i++) {
        // if status is 'done' add done button
        if (arrTask[i].status === "Done") doneButton = "";
      else
        doneButton = `<button class="btn bi bi-check-circle-fill
        modalBtnColor doneButton" title="Mark as Done" id="doneButton-${arrTask[i].id}" type="button"></button>`;
        //cards
        let html = `
        <div class="col-sm-8 col-md-4 col-lg-3 my-3" data-column="noNewTasks">
            <div class="card mb-3" id="task-${arrTask[i].id}">
                <div class="card-header ${textColor} border-secondary">
                    <div class="d-flex justify-content-between ">
                        <div class="align-self-center">
                        <h5 class="cardTitleText">${arrTask[i].name}</h5>
                        <p id="status" class="fst-italic ">${arrTask[i].status}</p></div>
                        <div class="bi ${imgStatus}"></div>
                      </div>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    ${arrTask[i].description}
                  </p>
                  <h6 class="card-title">Due: ${arrTask[i].dueDate}</h6>
                  <p>${arrTask[i].assignedTo}</p>
                </div>
                <div class="card-footer bg-transparent border-secondary">
                  <div class="d-flex justify-content-end gap-2">
                    ${doneButton}
                    <button class="btn bi bi-pencil-fill
                    modalBtnColor edit-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" title="Edit" id="editButton-${arrTask[i].id}"></button>
                    <button class="btn bi bi-trash-fill
                    modalBtnColor delete-button" type="button" title="Delete" id="deleteButton-${arrTask[i].id}"></button>
                  </div></div>
                </div></div>`;

        tasksColumnList.push(html);
      }
  return `<div class="row">${tasksColumnList.join("\n")}</div>`
    } // if no tasks exist, return empty column
    else
      return '';
  }

} // End TaskManager class
