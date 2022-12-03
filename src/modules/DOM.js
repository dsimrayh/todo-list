export {clearTasks, clearCompletedTasks, showNoTasks, updateHeader,}

function clearTasks () {

}

// EDIT WITH ADDITION OF TASK IDs (Also remove descriptions)
// Clears all completed tasks
function clearCompletedTasks() {
    const taskList = document.querySelector('#task-list');
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        taskList.removeChild(task);
    })
}

function showNoTasks() {
    const noTasksElement = document.createElement('div');
    noTasksElement.classList.add('task', 'no-task');
    noTasksElement.textContent = "No tasks remaining";

    const clearTasksContainer = document.querySelector('.clear-tasks-container');
    clearTasksContainer.parentNode.insertBefore(noTasksElement, clearTasksContainer);
}

function updateHeader(homeTile) {
    // ADD HOME TILE PARSER TO CLEAN INPUT
    const header = document.querySelector('#content-header');
    header.innerText = homeTile;
}