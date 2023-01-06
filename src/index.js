import {addEventListeners} from './modules/eventListeners.js'
import { handleHomeTileClick } from './modules/home.js';
import {clearCompletedTasks} from './modules/createTask';
import {showNoTasks} from './modules/DOM.js';
import { checkIfNoTasks } from './modules/createTask.js';

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
              