import { createTaskElement } from "./DOM.js";

// Primary task list to store all tasks
let taskList = [];
// Counter for task ID #s
let taskIdCounter = 10;

const Task = (name, description, dueDate, priority) => {
    let _important = false;
    let _completed = false;
    let _id = null;

    const isImportant = () => _important;

    const isCompleted = () => _completed;

    const toggleImportant = () =>  _important = !_important;

    const toggleCompleted = () => _completed = !_completed;

    const setID = (value) => _id = value;

    const getID = () => _id;

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
        getID
    };
}

function processNewTaskInput() {
    const name = document.querySelector('#task-name-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const dueDate = document.querySelector('#task-date-input').value;
    const priority = document.querySelector('#task-priority-input').value;

    const newTask = Task(name, description, dueDate, priority);

    addNewTask(newTask);

    clearTaskInput();

}

function clearTaskInput() {
    const textDateInputs = Array.from(document.querySelectorAll('.input'));
    const priorityInput = document.querySelector('#task-priority-input');
    textDateInputs.forEach(input => input.value = '');
    priorityInput.selectedIndex = 0;
}

function addNewTask(task) {
    task.setID(taskIdCounter);
    createTaskElement(task, taskIdCounter);
    taskList.push(task)
    addTaskEventListeners(task, taskIdCounter);
    taskIdCounter++;
}


// WORKING (set task counter back to 1)
function addTaskEventListeners(task, taskID) {
    const description = document.querySelector(`.description[data-task-id="${taskID}"`);
    const expand = document.querySelector(`.expand[data-task-id="${taskID}"`);
    expand.addEventListener('click', () => {
        expand.classList.toggle('open');
        description.classList.toggle('open');
    });

    const taskCompleteButton = document.querySelector(`.task-complete-button[data-task-id="${taskID}"`);
    taskCompleteButton.addEventListener('click', () => {
        task.toggleCompleted();
        taskCompleteButton.classList.toggle('checked');
    });
    
    const importantButton = document.querySelector(`.important[data-task-id="${taskID}"`);
    importantButton.addEventListener('click', () => {
        const selected = importantButton.dataset.selected;
        if(selected === 'false') {
            importantButton.src = '../src/images/important-filled.png';
            importantButton.dataset.selected = 'true';
        }
        if(selected === 'true') {
            importantButton.src = '../src/images/important.png';
            importantButton.dataset.selected = 'false';
        }
 
        task.toggleImportant();

    });

    const editButton = document.querySelector(`.edit[data-task-id="${taskID}"`);
    editButton.addEventListener('click', () => {
        console.log(`Edit task ${taskID}`);
    });

    const deleteButton = document.querySelector(`.delete[data-task-id="${taskID}"`);
    deleteButton.addEventListener('click', () => {
        console.log(`Delete task ${taskID}`);
    });

}

export {processNewTaskInput, clearTaskInput}