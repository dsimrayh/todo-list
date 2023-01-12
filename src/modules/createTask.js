import { createTaskElement } from "./DOM.js";
import { deleteTask, editTask } from "./editTask.js";
import { masterProjectList } from "./createProject.js";

// Primary task list to store all tasks
let masterTaskList = [];
// Counter for task ID #s
let taskIdCounter = 1;

function checkIfNoTasks() {
    return masterTaskList.length === 0;
}

// Task factory function
const Task = (name, description, dueDate, priority, projectId) => {
    let _important = false;
    let _completed = false;
    let _id = null;
    let _projectId = projectId;

    const isImportant = () => _important;
    const isCompleted = () => _completed;
    const toggleImportant = () =>  _important = !_important;
    const toggleCompleted = () => _completed = !_completed;
    const setID = (value) => _id = value;
    const getID = () => _id;
    const getProjectId = () => _projectId;

    return {
        name,
        description,
        dueDate,
        priority,
        toggleImportant,
        toggleCompleted,
        isImportant,
        isCompleted,
        setID,
        getID,
        getProjectId
    };
}

// Handles the input from the "Add task" modal
function processNewTaskInput(selectedProjectId) {
    const name = document.querySelector('#task-name-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const dueDate = document.querySelector('#task-date-input').value;
    const priority = document.querySelector('#task-priority-input').value;

    const newTask = Task(name, description, dueDate, priority, selectedProjectId);

    addNewTask(newTask, selectedProjectId);

    clearTaskInput();

}

// Clears the inputs on the "Add task" modal
function clearTaskInput() {
    const textDateInputs = Array.from(document.querySelectorAll('.input'));
    const priorityInput = document.querySelector('#task-priority-input');
    textDateInputs.forEach(input => input.value = '');
    priorityInput.selectedIndex = 0;
}

// Creates a new task element and adds it to the task list
function addNewTask(task, selectedProjectId) {
    removeNoTasksDiv();
    task.setID(taskIdCounter);
    createTaskElement(task, taskIdCounter);
    masterTaskList.push(task);
    addTaskEventListeners(task, taskIdCounter);
    taskIdCounter++;

    // If viewing a project and a task is created, push the task to the project's task list
    if(selectedProjectId !== 0 && selectedProjectId !== null && selectedProjectId !== undefined) {
        const projectToAppendTaskTo = masterProjectList.find(project => project.getId() === selectedProjectId);
        projectToAppendTaskTo.addToTaskList(task);
    }
}

// Add event listeners to each of the buttons on a task element
function addTaskEventListeners(task, taskID) {
    const description = document.querySelector(`.description[data-task-id="${taskID}"`);
    const expand = document.querySelector(`.expand[data-task-id="${taskID}"`);
    expand.addEventListener('click', () => {
        if(task.isCompleted() === true) return;
        expand.classList.toggle('open');
        description.classList.toggle('open');
    });

    const taskCompleteButton = document.querySelector(`.task-complete-button[data-task-id="${taskID}"`);
    const taskElement = document.querySelector(`.task[data-task-id="${taskID}"`);
    taskCompleteButton.addEventListener('click', () => {
        task.toggleCompleted();
        if(description.classList.contains('open')) {
            description.classList.remove('open');
            expand.classList.remove('open');
        }
        taskCompleteButton.classList.toggle('checked');
        taskElement.classList.toggle('completed');
    });
    
    const importantButton = document.querySelector(`.important[data-task-id="${taskID}"`);
    importantButton.addEventListener('click', () => {
        if(task.isCompleted() === true) return;
        let important = task.isImportant();
        if(important === false) {
            importantButton.src = '../src/images/important-filled.png';
            task.toggleImportant();
        }
        if(important === true) {
            importantButton.src = '../src/images/important.png';
            task.toggleImportant();
        }
    });

    const editButton = document.querySelector(`.edit[data-task-id="${taskID}"`);
    editButton.addEventListener('click', () => {
        if(task.isCompleted() === true) return;
        editTask(taskID);
    });

    const deleteButton = document.querySelector(`.delete[data-task-id="${taskID}"`);
    deleteButton.addEventListener('click', () => {
        if(task.isCompleted() === true) return;
        deleteTask(taskID, task.getProjectId());
    });

}

// Clears all completed tasks (including task descriptions | remove from DOM and task list)
function clearCompletedTasks() {
    const taskList = document.querySelector('#task-list');
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        if(task.classList.contains('completed')) {
            const taskId = +task.dataset.taskId;
            taskList.removeChild(task);
            taskList.removeChild(
                document.querySelector(`.description[data-task-id="${task.dataset.taskId}"]`)
                );

            const taskToRemoveFromMasterList = masterTaskList.find(task => task.getID() === taskId);
            const projectId = taskToRemoveFromMasterList.getProjectId();
            if(projectId !== null) {
                const project = masterProjectList.find(project => project.getId() === projectId);
                project.removeFromTaskList(taskId);
            }

            const indexOfTaskToRemoveFromMasterList = masterTaskList.findIndex(task => task.getID() === taskId);
            
            masterTaskList.splice(indexOfTaskToRemoveFromMasterList, 1);
        } 
    });
}

// Remove the div that displays "No tasks remaining"
function removeNoTasksDiv() {
    const contentArea = document.querySelector('#content-area');
    const noTask = document.querySelector('.no-task');
    if(noTask) contentArea.removeChild(noTask);
    return;
}

// Function used to create and display a task element for an already existing task (used in home tile switching)
function displayTask(task, taskId) {
    removeNoTasksDiv();
    createTaskElement(task, taskId);
    addTaskEventListeners(task, taskId);

    if(task.isCompleted() === true) {
        document.querySelector(`.task[data-task-id="${taskId}"]`)
        .classList.add('completed');

        document.querySelector(`.task-complete-button[data-task-id="${taskId}"]`)
        .classList.add('checked');
    }
}

export {processNewTaskInput, clearTaskInput, checkIfNoTasks, clearCompletedTasks, masterTaskList, displayTask}
