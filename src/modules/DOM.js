export {clearTasks, clearCompletedTasks, showNoTasks, updateHeader, createTaskElement}

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

function createTaskElement(task) {
    const taskListDOM = document.querySelector('#task-list');
    const {name, description, dueDate, priority} = task;

    const li = document.createElement('li');
    li.classList.add('task', 'no-user-select');

    const leftDiv = createLeftSide(name);
    const rightDiv = createRightSide(dueDate);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);

    //const taskDescription = createTaskDescription();

    taskListDOM.appendChild(li);
    //taskListDOM.appendChild(taskDescription);
}

function createLeftSide(taskName) {
    const div = document.createElement('div');
    div.classList.add('left');

    const img = document.createElement('img');
    img.classList.add('expand');
    img.dataset.descriptionId = 1;
    img.src = '../src/images/expand.png';
    img.alt = 'expand';

    const taskCompleteButton = document.createElement('div');
    taskCompleteButton.classList.add('task-complete-button');

    const span = document.createElement('span');
    span.textContent = taskName;

    div.appendChild(img);
    div.appendChild(taskCompleteButton);
    div.appendChild(span);

    return div;
}

function createRightSide(taskDueDate) {
    const div = document.createElement('div');
    div.classList.add('right');

    const dueDateElement = document.createElement('div');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = taskDueDate;

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('task-button-group');

    const importantBtn = document.createElement('img');
    importantBtn.classList.add('task-button', 'important');
    importantBtn.src = '../src/images/important.png';
    importantBtn.alt = 'important';

    const editBtn = document.createElement('img');
    editBtn.classList.add('task-button');
    editBtn.src = '../src/images/edit.png';
    editBtn.alt = 'edit';

    const deleteButton = document.createElement('img');
    deleteButton.classList.add('task-button');
    deleteButton.src = '../src/images/trash.png';
    deleteButton.alt = 'delete';

    buttonGroup.appendChild(importantBtn);
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteButton);

    div.appendChild(dueDateElement);
    div.appendChild(buttonGroup);

    return div;
}

function createTaskDescription() {

}

// *********************************************************