import {updateHeader} from './DOM.js';

function handleHomeTileClick(homeTile) {
    //PUT UPDATE HEADER HERE
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
    updateHeader("All Tasks");
}

function displayToday() {
    updateHeader("Today");
}

function displayThisWeek() {
    updateHeader("This week");
}

function displayImportant() {
    updateHeader("Important");
}


export {handleHomeTileClick}