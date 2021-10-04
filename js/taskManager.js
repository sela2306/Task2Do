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
    this.tasks[taskId].status = "Done";
  }

  deleteTask(taskID) {
    let newTasks = [];
    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      if (task.id !== taskID) newTasks.push(task);
    }
    this.tasks = newTasks;
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

  // function to create the columns html for each task type
  createTaskHtml(arrTask = []) {
    // set the empty column div
    let html =
      '<div class="col-sm-8 col-md-4 col-lg-3 my-3" data-column="noNewTasks"></div>';
    // if the array is not empty, create the the html task div
    if (arrTask.length != 0) {

      // set task image and colour based on task type
      //********************************************************** */
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
      // add/remove 'done' button html on the tasks
      let doneButton = "";
      // if the task is Done, don't add done button, else add done button with task ID
      if (arrTask[0].status === "Done") doneButton = "";
      else
        doneButton = `<button class="btn modalBtnColor doneButton" id="doneButton-${arrTask[0].id}" type="button">Done</button>`;

      const tasksColumnList = [];
      for (let i = 0; i < arrTask.length; i++) {
        html = `

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
                    <button class="btn modalBtnColor delete-button" type="button" id="deleteButton-${arrTask[0].id}">
                      Delete
                    </button>
                    
                  </div></div>
                </div>
              `;

        tasksColumnList.push(html);
      }

      // add the tasks to the column and return the html string
      return `<div class="col-sm-8 col-md-4 col-lg-3 my-3 ${textColor}" data-column="${
        arrTask[0].status
      })">
                  ${tasksColumnList.join("\n")} </div>`;
    } // if no tasks exist, return empty column
    else
      return '<div class="col-sm-8 col-md-4 col-lg-3 my-3" data-column="noNewTasks"></div>';
  }
} // End TaskManager class
