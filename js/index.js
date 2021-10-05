// Initialize TaskManager class
const newTaskManager = new TaskManager();
newTaskManager.load();
newTaskManager.render();
// task form elements
const newTaskName = document.querySelector("#newTask-name");
const newTaskDescription = document.querySelector("#newTask-description");
const newTaskAssignedTo = document.querySelector("#newTask-assigned-to");
const newTaskDate = document.querySelector("#newTask-date");
const newTaskStatus = document.querySelector("#newTask-status");
// button elements
const btnMainAddNewTask = document.querySelector("#btnMainAddNewTask");
const btnNewTaskAdd = document.querySelector("#btnNewTaskAdd");
const btnNewTaskReset = document.querySelector("#btnNewTaskReset");

// field validation span elements
let inValidFeedback1 = document.querySelector(".in-valid-feedback1");
let inValidFeedback2 = document.querySelector(".in-valid-feedback2");
let inValidFeedback3 = document.querySelector(".in-valid-feedback3");
let inValidFeedback4 = document.querySelector(".in-valid-feedback4");
let inValidFeedback5 = document.querySelector(".in-valid-feedback5");

let isValidCount = 0; //validation counter
let isEdit = [false, 0]; //toggle edit array 

// validate input fields
function validateInput(event, feedbackEvent, inputType) {
  switch (inputType) {
    case "text":
      {
        if (event.value.length <= 5) {
          console.log("task name not valid");
          feedback(feedbackEvent, "text", "invalid");
          isValidCount++;
        } else {
          feedback(feedbackEvent, "text", "valid");
        }
      }
      break;
    case "date":
      {
        let userDate = new Date(event.value);
        // get current date
        const d = new Date();
        let userMonth = userDate.getMonth() + 1;
        let nowYear = d.getFullYear();
        let nowDate = d.getDate();
        let nowMonth = d.getMonth() + 1;
        let inValidDate = false;

        if (event.value === "") inValidDate = false;
        else if (userDate.getFullYear() < nowYear) {
          inValidDate = false;
          console.log("invalid year");
        } else if (userMonth < nowMonth) {
          inValidDate = false;
        } else if (userMonth === nowMonth && userDate.getDate() < nowDate) {
          console.log("invalid date");
          inValidDate = false;
        } else {
          console.log("valid everything");
          inValidDate = true;
        }

        if (inValidDate) {
          feedback(feedbackEvent, inputType, "valid");
        } else {
          feedback(feedbackEvent, inputType, "invalid");
          isValidCount++;
        }
      }
      break;
    case "status":
      {
        if (event.value === "") {
          feedback(feedbackEvent, inputType, "invalid");
          isValidCount++;
        } else {
          feedback(feedbackEvent, inputType, "valid");
        }
      }
      break;
  }
}

// add valid/invalid feedback to span element for form fields
function feedback(event, inputType, feedbackType) {
  if (feedbackType === "invalid") {
    event.style.color = "red";
    switch (inputType) {
      case "text":
        event.innerText = "* Task name should be more than 5 characters";
        break;
      case "date":
        event.innerText = "* Please select a date";
        break;
      case "status":
        event.innerText = "* Please select an option";
        break;
      default:
        event.innerText = "";
    }
  }

  if (feedbackType === "valid") {
    event.style.color = "green";
    event.innerHTML = `Looks good!<i class="bi-check2"></i>`;
  }
}

// function to validate form fields and render task
function validFormFieldInput(event) {
  // get all form values
  let newTaskNameVal = newTaskName.value;
  let newTaskDescriptionVal = newTaskDescription.value;
  let newTaskAssignedToVal = newTaskAssignedTo.value;
  let newTaskDateVal = newTaskDate.value;
  let newTaskStatusVal = newTaskStatus.value;

  // log all form values to console
  console.log(`new task name - ${newTaskNameVal}`);
  console.log(`new task description - ${newTaskDescriptionVal}`);
  console.log(`new task assigned-to - ${newTaskAssignedToVal}`);
  console.log(`new task date - ${newTaskDateVal}`);
  console.log(`new task status - ${newTaskStatusVal}`);

  event.preventDefault();

  // call functions to validate all the form fields
  validateInput(newTaskName, inValidFeedback1, "text");
  validateInput(newTaskDescription, inValidFeedback2, "text");
  validateInput(newTaskAssignedTo, inValidFeedback3, "text");
  validateInput(newTaskDate, inValidFeedback4, "date");
  validateInput(newTaskStatus, inValidFeedback5, "status");

  // if all fields are valid:
  if (isValidCount === 0) {
    //  formatting date dd/mm/yyyyHTML
    const formattedDate = newTaskDateVal.split("-");
    let newDate = `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`;

    // Checking if edit or add new task 
    if (isEdit[0]){
      newTaskManager.editTask(isEdit[1], newTaskNameVal,
      newTaskDescriptionVal,
      newTaskAssignedToVal,
      newDate,
      newTaskStatusVal);
    } else {
    newTaskManager.addTask(
      newTaskNameVal,
      newTaskDescriptionVal,
      newTaskAssignedToVal,
      newDate,
      newTaskStatusVal
    );
    }
    newTaskManager.save();
    console.log("All the tasks inside the array..", newTaskManager.tasks);
    // reset form to make ready for next task input
    resetFormFieldInput();
    // render the tasks on the page
    newTaskManager.render();
    let btnCloseModal = document.getElementById('btnCloseModal')
    btnCloseModal.click();
  } else {
    isValidCount = 0; // reset count if any field is invalid
  }
}

// reset all form input fields
function resetFormFieldInput() {
  // reset form values
  isValidCount = 0;
  newTaskName.value = "";
  newTaskDescription.value = "";
  newTaskAssignedTo.value = "";
  newTaskDate.value = "";
  newTaskStatus.value = "";
  // reset feedback text and color
  resetFeedbackSpan(inValidFeedback1, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback2, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback3, "Enter more than 5 characters");
  resetFeedbackSpan(inValidFeedback4, "");
  resetFeedbackSpan(inValidFeedback5, "");
  function resetFeedbackSpan(event, text) {
    event.innerText = text;
    event.style.color = "";
  }
}

// call validation function when Add Task button is clicked
btnNewTaskAdd.addEventListener("click", (event) => validFormFieldInput(event));
// call reset function when reset button is clicked
btnNewTaskReset.addEventListener("click", resetFormFieldInput);

// Clear form when closed( X button is clicked) if form is half-filled
var myModal = document.getElementById("staticBackdrop");
myModal.addEventListener("hidden.bs.modal", function (event) {
  // clear form
  resetFormFieldInput();
});

// add done button function
const cardList = document.querySelector("#cardList");
cardList.addEventListener("click", (event) => {
 //if done button is clicked, mark task as done
  if (event.target.classList.contains("doneButton")) {
    // get button task id
    let taskId = event.target.id.split("-");
    console.log("Done button Id..",taskId);
    // find the task in the task array
    // change In-Progress / Review / To-do to Done
    newTaskManager.updateTaskToDone(Number(taskId[1]));
    newTaskManager.save();
    // render the updated html
    newTaskManager.render();
  }
//if delete button is clicked, delete task
  if (event.target.classList.contains("delete-button")) {
    let taskId = event.target.id.split("-");
    console.log("Delete button Id..",taskId);
    // find the task in the task array and delete
    newTaskManager.deleteTask(Number(taskId[1]));
    newTaskManager.save();
    // render the updated html
    newTaskManager.render();
  }
  //if edit button is clicked, edit task
  if (event.target.classList.contains("edit-button")) {
    let taskId = event.target.id.split("-");
    console.log("Edit button Id..",taskId);
    let taskToEdit = newTaskManager.getTask(Number(taskId[1]));
    let tempDate = taskToEdit.dueDate.split("/");
    //populating selected card values into modal form
    let tempDate2 = `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
    newTaskName.value = taskToEdit.name;
    newTaskDescription.value = taskToEdit.description;
    newTaskAssignedTo.value = taskToEdit.assignedTo ;
    newTaskDate.value = tempDate2;
    newTaskStatus.value = taskToEdit.status;
    isEdit = [true, Number(taskId[1])]; //save taskId to isEdit array
    //save edited values
    newTaskManager.save();
    // render the updated html
    newTaskManager.render();
  }
  
});

// change add task to edit task in modal if edit is clicked
myModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget
  let modalTitle = myModal.querySelector('.modal-title');
  let modalBtnAdd = myModal.querySelector('#btnNewTaskAdd');
  let modalBtnReset = myModal.querySelector('#btnNewTaskReset');
  if (button.classList.contains("edit-button")) {
   
  modalBtnAdd.innerText = "Done";
  modalTitle.textContent = 'Edit task';
  modalBtnReset.style.display = "none";
  } else {
    modalBtnAdd.innerText = "Add task";
  modalTitle.textContent = 'Add task';
  modalBtnReset.style.display = "block";
  }
});

