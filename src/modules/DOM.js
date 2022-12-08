export {clearTasks, clearCompletedTasks, showNoTasks, updateHeader}

function clearTasks () {
     // To be added
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

// Creates and appends div to task list that says "No tasks remaining"
function showNoTasks() {
    const noTasksElement = document.createElement('div');
    noTasksElement.classList.add('task', 'no-task');
    noTasksElement.textContent = "No tasks remaining";

    const clearTasksContainer = document.querySelector('.clear-tasks-container');
    clearTasksContainer.parentNode.insertBefore(noTasksElement, clearTasksContainer);
}

// Update the task list header based on selected tile
function updateHeader(homeTile) {
    const cleanedInput = homeTile.replace("-", " ");
    const firstLetter = cleanedInput.charAt(0).toUpperCase();
    const headerText = firstLetter + cleanedInput.slice(1);

    const header = document.querySelector('#content-header');
    header.innerText = headerText;
}