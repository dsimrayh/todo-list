import { createTaskElement } from "./DOM.js";

// Primary task list to store all tasks
let taskList = [];

const Task = (name, description, dueDate, priority) => {
    let _important = false;
    let _completed = false;

    const isImportant = () => _important;

    const toggleImportant = () =>  _important = !_important;

    const toggleCompleted = () => _completed = !_completed;

    return {
        name,
        description,
        dueDate,
        priority,
        toggleImportant,
        toggleCompleted,
        isImportant
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
    // DOM function(s) to create task element
    // Event listeners for buttons
    // Add to master task list
    createTaskElement(task);

    taskList.push(task)
}

export {processNewTaskInput, clearTaskInput}