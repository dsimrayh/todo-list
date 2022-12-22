import {addEventListeners} from './modules/eventListeners.js'
import { handleHomeTileClick } from './modules/home.js';
import {clearCompletedTasks} from './modules/DOM.js'
import {showNoTasks} from './modules/DOM.js';

addEventListeners();

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
    showNoTasks();
});



              