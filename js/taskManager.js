class TaskManager {
    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate, status){
        
        const task = {
            id: this.currentId ++,
            name: name,
            description: description ,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        };
        
       
        this.tasks.push({task});
    }        

    createTaskHtml(name, description, assignedTo, dueDate, status) {
        
        const html = `
        <!-- Task begin -->
        <div class="col-sm-8 col-md-4 col-lg-3 my-3">
        <div class="card border-success mb-3" >
          <div class="card-header bg-transparent border-success">
              <div class="d-flex justify-content-between">
                  <div class="align-self-center"
                  <h5>${name}</h5><p id="status" class="text-muted fst-italic">In progress</p></div>
                  <div><img src="./images/inprogress.png"></div>
                </div>
            
          </div>
          <div class="card-body text-success">
            
            <p class="card-text">
              ${description}
            </p>
            <h6 class="card-title">${status}: ${dueDate}</h6>
            <p>${assignedTo}</p>
          </div>
          <div class="card-footer bg-transparent border-success">
            <div class="d-flex justify-content-end gap-2">
              <button class="btn btn-primary " type="button">Edit</button>
              <button class="btn btn-primary" type="button">
                Delete
              </button>
            </div>
          </div>
        </div> 
      </div>`;

      return html;
    }

    render() {
        const tasksHtmlList = [];
        

        for(let i=0; i < this.tasks.length; i++) 
        {
            
            let temp = this.tasks[i];   
            console.log(`Checking...${this.tasks[i]}`);
            let taskHtml = this.createTaskHtml(temp.name, temp.description, temp.assignedTo, temp.dueDate, temp.status);
            tasksHtmlList.push(taskHtml);
        }
        
        document.querySelector("#cardList").innerHTML = tasksHtmlList.join('\n');
    }
    
}