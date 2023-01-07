import { masterTaskList } from './createTask';
import { createProjectElement } from './DOM';

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
    let _taskList = [];

    const getName = () => _name;
    const setName = (newName) => _name = newName;
    const getId = () => _id;
    const setId = (newId) => _id = newId;
    const getTaskList = () => _taskList;
    const addToTaskList = (task) => _taskList.push(task);
    // Update
    const removeFromTaskList = (task) => _taskList.splice(task, 1);

    return {
        _name,
        _id,
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
    // Format project name (capitalize first letter)
    const inputValue = document.querySelector('#new-project-name').value.toLowerCase();
    const firstLetter = inputValue[0].toUpperCase();
    const projectName = firstLetter + inputValue.slice(1);

    createNewProject(projectName);
}

function createNewProject(projectName) {
    // Create the project object, add it to the list, and create the DOM element
    const newProject = Project(projectName);
    masterProjectList.push(newProject);
    createProjectElement(newProject);

    // Allows the user to highlight the project once clicked
    // Also removes the 'active' styling from the previously selected tile
    // Also updates task list header
    const projectElement = document.querySelector(`
        .nav-item[data-project-id="${newProject.getId()}"]
    `);
    projectElement.addEventListener('click', () => {
        const contentHeader = document.querySelector('#content-header');
        contentHeader.textContent = projectName;

        const navbarItems = document.querySelectorAll('.nav-item');
        navbarItems.forEach(navbarItem => {
            navbarItem.classList.remove('active');
        })
        
        projectElement.classList.add('active');
    })
    // Open project menu once vertical menu is clicked
    const projectMenuButton = document.querySelector(`
        .vertical-menu[data-project-id="${newProject.getId()}"]
    `)
    const projectMenu = document.querySelector(`
        .edit-project-menu[data-project-id="${newProject.getId()}"]
    `);
    projectMenuButton.addEventListener('click', () => {
        projectMenu.classList.toggle('open');
    })

    projectIdCounter++;
}

function clearProjectInput() {
    document.querySelector('#new-project-name').value = '';
}

export {checkIfNoProjects, processNewProjectInput, clearProjectInput}
