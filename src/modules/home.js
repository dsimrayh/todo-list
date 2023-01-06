import { updateHeader, clearTasks, showNoTasks } from './DOM.js';
import { masterTaskList, displayTask } from './createTask';
import { isToday, addHours, getWeek } from 'date-fns';

function handleHomeTileClick(homeTile) {
    updateHeader(homeTile);
    clearTasks();
    showNoTasks();
    switch(homeTile) {
        case 'all-tasks':
            displayAllTasks();
            break;
        case 'today':
            displayToday();
            break;
        case 'this-week':
            displayThisWeek();
            break;
        case 'important':
            displayImportant();
            break;
        default:
            break;
    }
}

function displayAllTasks() {
    masterTaskList.forEach(task => {
        displayTask(task, task.getID());
        if(task.isImportant() === true) {
            document.querySelector(`.important[data-task-id="${task.getID()}"`)
            .src = '../src/images/important-filled.png';
        }
    })
}

function displayToday() {
    masterTaskList.forEach(task => {
        const dueDate = addHours(new Date(task.dueDate) , 8);
        if(isToday(dueDate)) {
            displayTask(task, task.getID());
        }
        if(isToday(dueDate) && task.isImportant() === true) {
            document.querySelector(`.important[data-task-id="${task.getID()}"`)
            .src = '../src/images/important-filled.png';
        }
    })
}

function displayThisWeek() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const today = `${month}/${day}/${year}`;
    const thisWeek = getWeek(new Date(today), {'weekStartsOn': 1});

    masterTaskList.forEach(task => {
        const dueDate = addHours(new Date(task.dueDate) , 8); 
        const dueDateWeek = getWeek(new Date(dueDate), {'weekStartsOn': 1});
        if(dueDateWeek === thisWeek) {
            displayTask(task, task.getID());
        }
        if(dueDateWeek === thisWeek && task.isImportant() === true) {
            document.querySelector(`.important[data-task-id="${task.getID()}"`)
            .src = '../src/images/important-filled.png';
        }
    });
}

function displayImportant() {
    masterTaskList.forEach(task => {
        if(task.isImportant() === true) {
            displayTask(task, task.getID());
            document.querySelector(`.important[data-task-id="${task.getID()}"`)
            .src = '../src/images/important-filled.png';
        }
    });
}

export {handleHomeTileClick}
