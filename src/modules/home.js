import {updateHeader} from './DOM.js';

function handleHomeTileClick(homeTile) {
    updateHeader(homeTile);
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
    console.log("All tasks");
}

function displayToday() {
    console.log("Today");
}

function displayThisWeek() {
    console.log("This week");
}

function displayImportant() {
    console.log("Important");
}


export {handleHomeTileClick}