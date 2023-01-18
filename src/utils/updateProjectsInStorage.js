// Iterates over the masterProjectList, generates new object for each proejct,
// pushes object to new array, and stores it in localStorage.

// This is needed to maintain the state of tasks within projects in localStorage
export default function updateProjectsInStorage(masterProjectList) {
    const localStorageProjectList = [];
    masterProjectList.forEach(project => {
        const formattedProject = {
            'name': project.getName(),
            'taskList': [],
        };

        const projectTasks = project.getTaskList();
        projectTasks.forEach(task => {
            const formattedTask = {
                'name': task.name,
                'description': task.description,
                'dueDate': task.dueDate,
                'priority': task.priority,
                'important': task.isImportant(),
                'completed': task.isCompleted()
            };
            formattedProject['taskList'].push(formattedTask);
        })
        localStorageProjectList.push(formattedProject); 
    });
    localStorage.setItem('masterProjectList', JSON.stringify(localStorageProjectList));
}

