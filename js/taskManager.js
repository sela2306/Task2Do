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

  renderInColumns() {
    const tasksHtmlList1 = [];
    const tasksHtmlList2 = [];
    const tasksHtmlList3 = [];
    const tasksHtmlList4 = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let temp = this.tasks[i];
      console.log(temp["name"]);
     
      if(temp.status ==="To-do") {
        tasksHtmlList1.push(this.tasks[i]);
      } else if(temp.status ==="In-progress") {
        tasksHtmlList2.push(this.tasks[i]);
      } else if(temp.status ==="Review") {
        tasksHtmlList3.push(this.tasks[i]);
      } else if(temp.status ==="Done") {
        tasksHtmlList4.push(this.tasks[i]);
      } 
    }
    console.log("Four Arrays..");
    console.log(tasksHtmlList1);
    console.log(tasksHtmlList2);
    console.log(tasksHtmlList3);
    console.log(tasksHtmlList4);

    let rowMax = Math.max(tasksHtmlList1.length,tasksHtmlList2.length, tasksHtmlList3.length, tasksHtmlList4.length);
    console.log(`Biggest Array..${rowMax}`);

    const tasksHtmlList = [];
    for (let i=0; i < rowMax; i++){
      let temp1 = tasksHtmlList1[i];
      let temp2 = tasksHtmlList2[i];
      let temp3 = tasksHtmlList3[i];
      let temp4 = tasksHtmlList4[i];

      let tempHtml = this.makeHtmlRow(temp1.name, temp1.description, temp1.assignedTo, temp1.dueDate, temp1.status);
      tempHtml = tempHtml + this.makeHtmlRow(temp2.name, temp2.description, temp2.assignedTo, temp2.dueDate, temp2.status);
      tempHtml = tempHtml + this.makeHtmlRow(temp3.name, temp3.description, temp3.assignedTo, temp3.dueDate, temp3.status);
      tempHtml = tempHtml + this.makeHtmlRow(temp4.name, temp4.description, temp4.assignedTo, temp4.dueDate, temp4.status);

      let layoutDivs =
      `<div class="row">
      ${tempHtml}
      </div>`
      tasksHtmlList.push(layoutDivs);
    }
    document.querySelector("#cardList").innerHTML = tasksHtmlList.join("\n");
    
  }
  makeHtmlRow(name, description, assignedTo, date, status) {
    let layoutDivs =
      `
      <div class="col">name: ${name}, status: ${status}</div>
       
        `
      return layoutDivs;
  }
}
/*4 arrays -- a1.2, a2.4, a3.0, a4.1
 rowCounter=0
  for(i=0 1<4 i++){
    if a1 or a2 or a3 === ""
    {
      undefined
    }
    <div class="col">a1.1</div>
    <div class="col">a2.1</div>
    <div class="col">a3.1</div>
    <div class="col">a4.1</div>
}
*/