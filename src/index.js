import {addEventListeners} from './modules/eventListeners.js';
import { handleHomeTileClick } from './modules/home.js';
import {clearCompletedTasks, masterTaskList} from './modules/createTask';
import { masterProjectList } from './modules/createProject.js';
import {showNoTasks} from './modules/DOM.js';
import { checkIfNoTasks } from './modules/createTask.js';
import storageAvailable from './utils/storageAvailable.js';

//if(storageAvailable('localStorage')) {
//    if(!localStorage.getItem('masterTaskList')) {
//        localStorage.setItem('masterTaskList', JSON.stringify(masterTaskList));
//    } else {
//        masterTaskList = JSON.parse(localStorage.getItem('masterTaskList'));
//    }
//
//    if(!localStorage.getItem('masterProjectList')) {
//        localStorage.setItem('masterProjectList', JSON.stringify(masterProjectList));
//    } else {
//        masterProjectList = JSON.parse(localStorage.getItem('masterProjectList'));
//    }
//}

addEventListeners();
showNoTasks();

const homeTiles = document.querySelectorAll('.home-tile');
homeTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const selectedTile = tile.id;
        handleHomeTileClick(selectedTile);
    })
});

const clearTasksBtn = document.querySelector('.clear-tasks-button');
clearTasksBtn.addEventListener('click', () => {
    clearCompletedTasks();
    if(checkIfNoTasks() === true) {
        showNoTasks();
    }
});


            

