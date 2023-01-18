// Iterates over the masterTaskList, generates new object for each task,
// pushes object to new array, and stores it in localStorage.

// This is needed to maintain the state of tasks in localStorage
export default function updateTasksInStorage(masterTaskList) {
    const localStorageTaskList = [];
    masterTaskList.forEach(task => {
        const formattedTask = {
            'name': task.name,
            'description': task.description,
            'dueDate': task.dueDate,
            'priority': task.priority,
            'important': task.isImportant(),
            'completed': task.isCompleted()
        };
        localStorageTaskList.push(formattedTask); 
    });
    localStorage.setItem('masterTaskList', JSON.stringify(localStorageTaskList));
}