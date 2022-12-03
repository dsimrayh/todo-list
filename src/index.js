import addEventListeners from './modules/eventListeners.js'
import { handleHomeTileClick } from './modules/home.js';
import {clearCompletedTasks} from './modules/DOM.js'
import {showNoTasks} from './modules/DOM.js';

addEventListeners();

const homeTiles = document.querySelector('#home-tiles');
homeTiles.addEventListener('click', (e) => {
    if(e.target.id !== '') {
        const selectedTile = e.target.id;
        handleHomeTileClick(selectedTile);
    }
    return;
})

const clearTasksBtn = document.querySelector('.clear-tasks-button');
clearTasksBtn.addEventListener('click', () => {
    clearCompletedTasks();
    showNoTasks();
});


              