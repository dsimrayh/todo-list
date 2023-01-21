import { addEventListeners } from './modules/eventListeners.js';
import { handleHomeTileClick } from './modules/home.js';
import { clearCompletedTasks } from './modules/createTask.js';
import { showNoTasks } from './modules/DOM.js';
import { checkIfNoTasks, processLocalStorageTasks } from './modules/createTask.js';
import { processLocalStorageProjects } from './modules/createProject.js';
import storageAvailable from './utils/storageAvailable.js';

addEventListeners();
showNoTasks();

if(storageAvailable('localStorage')) {
    if(localStorage.getItem('masterTaskList') && localStorage.getItem('masterProjectList')) {
        processLocalStorageProjects(localStorage.getItem('masterProjectList'));
        processLocalStorageTasks(localStorage.getItem('masterTaskList'));
    } 
}

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
