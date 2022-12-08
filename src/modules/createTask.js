export {processNewTaskInput}

/*
PRIORITY COLORS:
High: rgba(255, 2, 2, 0.5)
Med: rgba(238, 255, 0, 0.5)
Low: rgba(0, 255, 34, 0.5)
None: rgba(185, 185, 185, 0.35)
*/

let taskList = [];

const Task = (name, description, dueDate, priority, important, completed) => {
    return {
        name,
        description,
        dueDate,
        priority,
        important,
        completed
    };
}

function processNewTaskInput() {
    const name = document.querySelector('#task-name-input').value;
    const description = document.querySelector('#task-desc-input').value;
    const dueDate = document.querySelector('#task-date-input').value;
    const priority = document.querySelector('#task-priority-input').value;
    const important = false;
    const completed = false;

    const newTask = Task(name, description, dueDate, priority, important, completed);

    addNewTask(newTask);

}

function addNewTask(task) {
    // DOM function(s) to create task element

    taskList.push(task)

    console.log(task);
    console.log(taskList);
}