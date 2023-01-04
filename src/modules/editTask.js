import { checkIfNoTasks, masterTaskList, displayTask } from "./createTask";
import { showNoTasks } from "./DOM";

// Pull up edit mode
function editTask(taskId) {
    const addTaskButton = document.querySelector('.add-task-modal-button');
    const editTaskButton = document.querySelector('.edit-task-modal-button');
    addTaskButton.classList.add('hidden');
    editTaskButton.classList.remove('hidden');

    const mask = document.querySelector('#mask');
    mask.classList.add('display-grid');

    const title = document.querySelector('.add-task-modal-title');
    title.textContent = 'EDIT TASK';

    updateInputs(taskId);


    editTaskButton.addEventListener('click', () => {
        const inputs = Array.from(document.querySelectorAll('.input'));
        if(inputs.some(input => input.value === '')) return;

        confirmEdits(taskId)

        const addTaskButton = document.querySelector('.add-task-modal-button');
        const editTaskButton = document.querySelector('.edit-task-modal-button');
        addTaskButton.classList.remove('hidden');
        editTaskButton.classList.add('hidden');

        mask.classList.remove('display-grid');
    }, {'once': true});
}

// Actually make the changes
function confirmEdits(taskId) {
    // Get new values from inputs to use for update
    const name = document.querySelector('#task-name-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const dueDate = document.querySelector('#task-date-input').value;
    const priority = document.querySelector('#task-priority-input').value;

    // Update the task properties
    const taskToEdit = masterTaskList.find(task => task.getID() === taskId);
    taskToEdit.name = name;
    taskToEdit.description = description;
    taskToEdit.dueDate = dueDate;
    taskToEdit.priority = priority;

    // Reset inputs
    const textDateInputs = Array.from(document.querySelectorAll('.input'));
    const priorityInput = document.querySelector('#task-priority-input');
    textDateInputs.forEach(input => input.value = '');
    priorityInput.selectedIndex = 0;

    // Delete original task from DOM
    const taskElementToRemoveFromDOM = document.querySelector(`.task[data-task-id="${taskId}"`);
    const descriptionToRemoveFromDOM = document.querySelector(`.description[data-task-id="${taskId}"`);
    const taskList = document.querySelector('#task-list');
    taskList.removeChild(taskElementToRemoveFromDOM);
    taskList.removeChild(descriptionToRemoveFromDOM);

    // Display updated task
    displayTask(taskToEdit, taskId);
}

// Fills in the inputs on the edit task modal with the current values for that task
function updateInputs(taskId) {
    const {name, description, dueDate, priority} = masterTaskList.find(task => task.getID() === taskId);

    const priorityIndexes = {
        'none': 0,
        'low': 1,
        'medium': 2,
        'high': 3
    };

    document.querySelector('#task-name-input').value = name;
    document.querySelector('#task-desc-input').value = description;
    document.querySelector('#task-date-input').value = dueDate;
    document.querySelector('#task-priority-input').selectedIndex = priorityIndexes[priority];
}

// Deletes the selected task - removes from DOM and master task list
function deleteTask(taskId) {
    alert('Are you sure?');
    const taskList = document.querySelector('#task-list');
    const task = document.querySelector(`.task[data-task-id="${taskId}"]`);
    const description = document.querySelector(`.description[data-task-id="${taskId}"]`);

    taskList.removeChild(task);
    taskList.removeChild(description);
    
    const taskToRemoveFromMasterList = masterTaskList.findIndex(task => task.getID() === taskId);
    masterTaskList.splice(taskToRemoveFromMasterList, 1);

    if(checkIfNoTasks() === true) {
        showNoTasks();
    }
}

export {editTask, confirmEdits, deleteTask}
