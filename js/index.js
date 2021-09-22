const btnNewTaskAdd = document.querySelector("#btnNewTaskAdd");
const newTaskName = document.querySelector("#newTask-name");
const newTaskDescription = document.querySelector("#newTask-description");
const newTaskAssignedTo = document.querySelector("#newTask-assigned-to");
const newTaskDate = document.querySelector("#newTask-date");
const newTaskStatus = document.querySelector("#newTask-status");

const btnMainAddNewTask = document.querySelector("#btnMainAddNewTask");
const btnNewTaskReset = document.querySelector("#btnNewTaskReset");

// field validation span element
let inValidFeedback1 = document.querySelector(".in-valid-feedback1");
let inValidFeedback2 = document.querySelector(".in-valid-feedback2");
let inValidFeedback3 = document.querySelector(".in-valid-feedback3");
let inValidFeedback4 = document.querySelector(".in-valid-feedback4");
let inValidFeedback5 = document.querySelector(".in-valid-feedback5");
let isValidCount = 0;

function validFormFieldInput() {
  let newTaskNameVal = newTaskName.value;
  let newTaskDescriptionVal = newTaskDescription.value;
  let newTaskAssignedToVal = newTaskAssignedTo.value;
  let newTaskDateVal = newTaskDate.value;
  let newTaskStatusVal = newTaskStatus.value;

  console.log(`new task name - ${newTaskNameVal}`);
  console.log(`new task description - ${newTaskDescriptionVal}`);
  console.log(`new task assigned-to - ${newTaskAssignedToVal}`);
  console.log(`new task date - ${newTaskDateVal}`);
  console.log(`new task status - ${newTaskStatusVal}`);

  //let newTaskDescriptionVal

  // validate task name field
  if (newTaskNameVal.length <= 5) {
    console.log("task name not valid");
    inValidFeedback1.innerText = "*Task name should be more than 5 characters";
    inValidFeedback1.style.color = "red";
    isValidCount++;
  } else {
    inValidFeedback1.innerText = "";
  }

  // validate description field
  if (newTaskDescriptionVal.length <= 5) {
    console.log("description not valid");
    inValidFeedback2.innerText =
      "*Description should be more than 5 characters";
    inValidFeedback2.style.color = "red";
    isValidCount++;
  } else {
    inValidFeedback2.innerText = "";
  }

  // validate assigned to field
  if (newTaskAssignedToVal.length <= 5) {
    console.log("Assigned to not valid");
    inValidFeedback3.innerText =
      "*Assigned-to should be more than 5 characters";
    inValidFeedback3.style.color = "red";
    isValidCount++;
  } else {
    inValidFeedback3.innerText = "";
  }

  //validate date field
  if (newTaskDateVal === "") {
    inValidFeedback4.innerText = "* Please select a date";
    inValidFeedback4.style.color = "red";
    isValidCount++;
  } else {
    inValidFeedback4.innerText = "";
  }

  //validate status field
  if (newTaskStatusVal === "") {
    inValidFeedback5.innerText = "* Please select an option";
    inValidFeedback5.style.color = "red";
    isValidCount++;
  } else {
    inValidFeedback5.innerText = "";
  }
}

function resetFormFieldInput() {
  inValidFeedback1.innerText = "";
  inValidFeedback2.innerText = "";
  inValidFeedback3.innerText = "";
  inValidFeedback4.innerText = "";
  inValidFeedback5.innerText = "";
}

btnNewTaskAdd.addEventListener("click", validFormFieldInput);
btnNewTaskReset.addEventListener("click", resetFormFieldInput);
