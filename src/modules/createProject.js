import { masterTaskList } from './createTask';

// Array to hold all projects and their data
let masterProjectList = [];

function checkIfNoProjects() {
    return masterProjectList.length === 0;
}

// Variable to use for project ID numbers
let projectIdCounter = 0;

// Project factory function
const Project = (name) => {
    let _name = name;
    let _id = projectIdCounter; 
    let _taskList = [{'1': '1'}, {'2': '2'}, {'3': '3'}];

    const getName = () => _name;
    const setName = (newName) => _name = newName;
    const getId = () => _id;
    const setId = (newId) => _id = newId;
    const getTaskList = () => _taskList;
    const addToTaskList = (task) => _taskList.push(task);
    const removeFromTaskList = (task) => _taskList.splice(task, 1);

    return {
        getName,
        setName,
        getId,
        setId,
        getTaskList,
        addToTaskList,
        removeFromTaskList,
    }
}

// Handle the input from the new project form
function processNewProjectInput() {
    const projectName = document.querySelector('#new-project-name').value;
    const newProject = Project(projectName);

    console.log(newProject.getName());
    console.log(newProject.getId());
    newProject.removeFromTaskList({'2': '2'});
    console.log(newProject.getTaskList());

    //projectIdCounter++;
}

function clearProjectInput() {
    document.querySelector('#new-project-name').value = '';
}

export {checkIfNoProjects, processNewProjectInput, clearProjectInput}