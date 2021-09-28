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

  createTaskHtml(id, name, description, assignedTo, dueDate, status) {
    // status array
    let arrStatus = ["To-do", "In-progress", "Review", "Done"];
    // todoClr
    // inprogressClr
    // reviewClr
    // doneClr
    let arrTaskColor = ["todoClr", "inprogressClr", "reviewClr", "doneClr"];
    // status image array
    let arrStatusImage = [
      "bi-filter-circle",
      "bi-dash-circle-dotted",
      "bi-search",
      "bi-check2-circle",
    ];
    // find status-image based on the index  of currunt status
    let imgStatus = arrStatusImage[arrStatus.indexOf(status)];
    // get task text color from array
    let textColor = arrTaskColor[arrStatus.indexOf(status)];

    // add/remove 'done' button html on the tasks
    let doneButton = "";

    if (status === "Done") doneButton = "";
    else
      doneButton = `<button class="btn modalBtnColor doneButton" id="doneButton-${id}" type="button">Done</button>`;

    const html = `
        <!-- Task begin -->
        <div class="col-sm-8 col-md-4 col-lg-3 my-3" id="task-${id}">
        <div class="card mb-3" >
          <div class="card-header ${textColor} border-secondary">
              <div class="d-flex justify-content-between ">
                  <div class="align-self-center">
                  <h5 class="cardHeadColor">${name}</h5>
                  <p id="status" class="fst-italic ">${status}</p></div>
                  <div class="bi ${imgStatus}"></div>
                </div>
           
          </div>
          <div class="card-body">
            <p class="card-text">
              ${description}
            </p>
            <h6 class="card-title">Due: ${dueDate}</h6>
            <p>${assignedTo}</p>
          </div>
          <div class="card-footer bg-transparent border-secondary">
            <div class="d-flex justify-content-end gap-2">
              ${doneButton}
              <button class="btn modalBtnColor" type="button">
                Delete
              </button>
            </div>
          </div>
        </div> 
      </div>`;

    console.log("ID inside createHTML: " + id);

    return html;
  }

  render() {
    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let temp = this.tasks[i];
      console.log(temp["name"]);
      let taskHtml = this.createTaskHtml(
        temp.id,
        temp.name,
        temp.description,
        temp.assignedTo,
        temp.dueDate,
        temp.status
      );
      tasksHtmlList.push(taskHtml);
    }

    document.querySelector("#cardList").innerHTML = tasksHtmlList.join("\n");
  }

  updateTaskToDone(taskId) {
    this.tasks[taskId].status = "Done";
  }
}
