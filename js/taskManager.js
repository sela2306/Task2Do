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
    // card Layout
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
  // rendering cards on main index page
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
  // changing to Done status
  updateTaskToDone(taskId) {
    this.tasks[taskId].status = "Done";
  }

  // render the tasks in four columns based on status
  renderInColumns() {

    // filter the task array and divid tasks into four arrays based on status
    let tasksHtmlList1 = this.tasks.filter((arr) => {
      return arr.status === "To-do";
    });

    let tasksHtmlList2 = this.tasks.filter((arr) => {
      return arr.status === "In-progress";
    });

    let tasksHtmlList3 = this.tasks.filter((arr) => {
      return arr.status === "Review";
    });

    let tasksHtmlList4 = this.tasks.filter((arr) => {
      return arr.status === "Done";
    });

    // get the max-length of the four arrays : 
    //this gives us the total number of rows to create
    let rowMax = Math.max(
      tasksHtmlList1.length,
      tasksHtmlList2.length,
      tasksHtmlList3.length,
      tasksHtmlList4.length
    );
// loop through the task array rowMax times and create the task columns for each row
    const tasksHtmlList = [];
    for (let i = 0; i < rowMax; i++) {
      let tempHtml =
        this.makeHtmlRow(tasksHtmlList1[i]) +
        this.makeHtmlRow(tasksHtmlList2[i]) +
        this.makeHtmlRow(tasksHtmlList3[i]) +
        this.makeHtmlRow(tasksHtmlList4[i]);

        // add the columns to the row div
      let layoutDivs = `<div class="row">
      ${tempHtml}
      </div>`;
      tasksHtmlList.push(layoutDivs);
    }
    // disply the tasks in the card list div
    document.querySelector("#cardList").innerHTML = tasksHtmlList.join("\n");
  }


  // function to create the columns html for each task type
  makeHtmlRow(arrTask = []) {

    // set the empty column div
    let layoutDivs = '<div class="col-sm-8 col-md-4 col-lg-3 my-3"></div>';
    // if the array is not empty, create the the html task div
    if (arrTask.length != 0) {

             /// set task image and colour based on task type
            //********************************************************** */
            let arrStatus = ["To-do", "In-progress", "Review", "Done"];
            let arrTaskColor = ["todoClr", "inprogressClr", "reviewClr", "doneClr"];
            // status image array
            let arrStatusImage = ["bi-filter-circle","bi-dash-circle-dotted","bi-search","bi-check2-circle"];
            // find status-image based on the index  of currunt status
            let imgStatus = arrStatusImage[arrStatus.indexOf(arrTask.status)];
            // get task text color from array
            let textColor = arrTaskColor[arrStatus.indexOf(arrTask.status)];
            // add/remove 'done' button html on the tasks
            let doneButton = "";

            if (arrTask.status === "Done") doneButton = "";
            else
              doneButton = `<button class="btn modalBtnColor doneButton" id="doneButton-${arrTask.id}" type="button">Done</button>`;

            layoutDivs = `
            <div class="col-sm-8 col-md-4 col-lg-3 my-3" id="task-${arrTask.id}">
            <div class="card mb-3" >
                <div class="card-header ${textColor} border-secondary">
                    <div class="d-flex justify-content-between ">
                        <div class="align-self-center">
                        <h5 class="cardTitleText">${arrTask.name}</h5>
                        <p id="status" class="fst-italic ">${arrTask.status}</p></div>
                        <div class="bi ${imgStatus}"></div>
                      </div>
                
                </div>
                <div class="card-body">
                  <p class="card-text">
                    ${arrTask.description}
                  </p>
                  <h6 class="card-title">Due: ${arrTask.dueDate}</h6>
                  <p>${arrTask.assignedTo}</p>
                </div>
                <div class="card-footer bg-transparent border-secondary">
                  <div class="d-flex justify-content-end gap-2">
                    ${doneButton}
                    <button class="btn modalBtnColor" type="button">
                      Delete
                    </button>
                  </div></div>
                </div>
              </div> `;

    }

    return layoutDivs;
  }
}
