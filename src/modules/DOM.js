import {addDays, format} from 'date-fns';

// **************** GENERAL FUNCTIONS ****************

function clearTasks () {
     // To be added
}

// EDIT WITH ADDITION OF TASK IDs (Also remove descriptions)
// Clears all completed tasks
function clearCompletedTasks() {
    const taskList = document.querySelector('#task-list');
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        taskList.removeChild(task);
    })
}

// Creates and appends div to task list that says "No tasks remaining"
function showNoTasks() {
    const noTasksElement = document.createElement('div');
    noTasksElement.classList.add('task', 'no-task');
    noTasksElement.textContent = "No tasks remaining";

    const clearTasksContainer = document.querySelector('.clear-tasks-container');
    clearTasksContainer.parentNode.insertBefore(noTasksElement, clearTasksContainer);
}

// Update the task list header based on selected tile
function updateHeader(homeTile) {
    const cleanedInput = homeTile.replace("-", " ");
    const firstLetter = cleanedInput.charAt(0).toUpperCase();
    const headerText = firstLetter + cleanedInput.slice(1);

    const header = document.querySelector('#content-header');
    header.innerText = headerText;
}


// **************** TASK SPECIFIC FUNCTIONS ****************

function createTaskElement(task, taskID) {
    const taskListDOM = document.querySelector('#task-list');
    const {name, description, dueDate, priority} = task;
    const dueDateFormatted = addDays(new Date(dueDate), 1);

    const li = document.createElement('li');
    li.classList.add('task', 'no-user-select');

    const leftDiv = createLeftSide(name, taskID);
    const rightDiv = createRightSide(dueDateFormatted, taskID);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    const taskDescription = createTaskDescription(description, taskID);

    taskListDOM.appendChild(li);
    taskListDOM.appendChild(taskDescription);

    li.style.borderColor = setTaskPriorityColor(priority);
}

function createLeftSide(taskName, taskID) {
    const div = document.createElement('div');
    div.classList.add('left');

    const img = document.createElement('img');
    img.classList.add('expand');
    img.dataset.taskId = taskID;
    img.src = '../src/images/expand.png';
    img.alt = 'expand';

    const taskCompleteButton = document.createElement('div');
    taskCompleteButton.classList.add('task-complete-button');
    taskCompleteButton.dataset.taskId = taskID;

    const span = document.createElement('span');
    span.textContent = taskName;

    div.appendChild(img);
    div.appendChild(taskCompleteButton);
    div.appendChild(span);

    return div;
}

function createRightSide(taskDueDate, taskID) {
    const div = document.createElement('div');
    div.classList.add('right');

    const dueDateElement = document.createElement('div');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = format(taskDueDate, 'P');

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('task-button-group');

    const importantBtn = document.createElement('img');
    importantBtn.classList.add('task-button', 'important');
    importantBtn.src = '../src/images/important.png';
    importantBtn.alt = 'important';
    importantBtn.dataset.taskId = taskID;
    importantBtn.dataset.selected = 'false';

    const editBtn = document.createElement('img');
    editBtn.classList.add('task-button', 'edit');
    editBtn.src = '../src/images/edit.png';
    editBtn.alt = 'edit';
    editBtn.dataset.taskId = taskID;

    const deleteButton = document.createElement('img');
    deleteButton.classList.add('task-button', 'delete');
    deleteButton.src = '../src/images/trash.png';
    deleteButton.alt = 'delete';
    deleteButton.dataset.taskId = taskID;

    buttonGroup.appendChild(importantBtn);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteButton);

    div.appendChild(dueDateElement);
    div.appendChild(buttonGroup);

    return div;
}

function createTaskDescription(taskDescription, taskID) {
    const div = document.createElement('div');
    div.classList.add('description');
    div.dataset.taskId = taskID;
    div.textContent = taskDescription;

    return div;
}

function setTaskPriorityColor(taskPriority) {
    let colors = {
        'high': 'rgba(255, 2, 2, 0.5)',
        'medium': 'rgba(238, 255, 0, 0.6)',
        'low': 'rgba(0, 255, 34, 0.5)',
        'none': 'rgba(185, 185, 185, 0.35)'
    }

    return colors[taskPriority];

}

// *********************************************************

export {clearTasks, clearCompletedTasks, showNoTasks, updateHeader, createTaskElement}