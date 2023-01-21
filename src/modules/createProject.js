import { displayTask } from './createTask.js';
import { createProjectElement, clearTasks, showNoTasks } from './DOM.js';
import { editProject, deleteProject } from './editProject.js';
import updateProjectsInStorage from '../utils/updateProjectsInStorage.js';
import storageAvailable from '../utils/storageAvailable.js';

// Array to hold all projects and their data
let masterProjectList = [];

function checkIfNoProjects() {
    return masterProjectList.length === 0;
}

// Variable to use for project ID numbers
let projectIdCounter = 1;

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
    const removeFromTaskList = (taskId) => {
        const taskToRemove = _taskList.findIndex(task => task.getID() === taskId);
        _taskList.splice(taskToRemove, 1);
    }

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
    addProjectEventListeners(newProject.getId());

    projectIdCounter++;

    if(storageAvailable('localStorage')) {
        updateProjectsInStorage(masterProjectList);
    }
}

function clearProjectInput() {
    document.querySelector('#new-project-name').value = '';
}

function addProjectEventListeners(projectId) {
    // Allows the user to highlight the project once clicked
    // Also removes the 'active' styling from the previously selected tile
    // Also updates task list header
    const projectElement = document.querySelector(`
        .nav-item[data-project-id="${projectId}"]
    `);
    projectElement.addEventListener('click', () => {
        const navbarItems = document.querySelectorAll('.nav-item');
        navbarItems.forEach(navbarItem => {
            navbarItem.classList.remove('active');
        })
        
        projectElement.classList.add('active');

        // Handles displaying projects and their respective tasks
        const selectedProject = masterProjectList.find(project => project.getId() === projectId);
        const contentHeader = document.querySelector('#content-header');
        contentHeader.textContent = selectedProject.getName();
        const taskList = selectedProject.getTaskList();
        clearTasks();
        showNoTasks();
        taskList.forEach(task => {
            displayTask(task, task.getID());
            if(task.isImportant() === true) {
                document.querySelector(`.important[data-task-id="${task.getID()}"`)
                .src = '../src/images/important-filled.png';
            }
        });
    });
    // Open project menu once vertical menu is clicked
    const projectMenuButton = document.querySelector(`
        .vertical-menu[data-project-id="${projectId}"]
    `)
    const projectMenu = document.querySelector(`
        .edit-project-menu[data-project-id="${projectId}"]
    `);
    projectMenuButton.addEventListener('click', () => {
        projectMenu.classList.toggle('open');
    })

    // Event listeners for edit and delete buttons
    const editButton = document.querySelector(`
        .project-edit-btn[data-project-id="${projectId}"]
    `);
    editButton.addEventListener('click', () => {
        editProject(projectId);
    });

    const deleteButton = document.querySelector(`
        .project-delete-btn[data-project-id="${projectId}"]
    `);
    deleteButton.addEventListener('click', () => {
        deleteProject(projectId);
        if(storageAvailable('localStorage')) {
            updateProjectsInStorage(masterProjectList);
        }
    });
}

// Processes aproject data from localStorage and creates + displays the projects in the DOM
function processLocalStorageProjects(localStorageProjectList) {
    const parsedProjectList = JSON.parse(localStorageProjectList);
    parsedProjectList.forEach(project => {
        const projectObject = Project(project.name);
        masterProjectList.push(projectObject);
        createProjectElement(projectObject);
        addProjectEventListeners(projectObject.getName(), projectObject.getId());
        projectIdCounter++;
    })
}

export {masterProjectList, checkIfNoProjects, processNewProjectInput, clearProjectInput, processLocalStorageProjects}
