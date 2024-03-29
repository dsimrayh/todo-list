import { processNewTaskInput, clearTaskInput } from './createTask.js';
import { processNewProjectInput, clearProjectInput } from './createProject.js';

function addEventListeners() {

    // GitHub Link - style changes on hover
    const githubLink = document.querySelector('a');
    const link = document.querySelector('#gh-link');
    const logo = document.querySelector('#gh-logo');

    githubLink.addEventListener('mouseover', () => {
        link.classList.toggle('link-hover');
        logo.classList.toggle('logo-hover');
    });

    githubLink.addEventListener('mouseout', () => {
        link.classList.toggle('link-hover');
        logo.classList.toggle('logo-hover');
    });


    // Menu Button - show / hide menu functionality
    const menuButton = document.querySelector('#menu-button');

    menuButton.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('navbar-hidden');
    });

    // Home section tiles - highlight on click
    const homeTiles = document.querySelectorAll('.nav-item');

    homeTiles.forEach(item => {
        item.addEventListener('click', () => {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(navbarItem => {
                navbarItem.classList.remove('active');
            })
            item.classList.add('active');
        })
    })

    // Open new task modal / add task
    const newTaskButton = document.querySelector('#task-img');
    const mask = document.querySelector('#mask');
    const addTaskButton = document.querySelector('.add-task-button');

    newTaskButton.addEventListener('click', () => {
        mask.classList.add('display-grid');
    });

    addTaskButton.addEventListener('click', () => {
        const inputs = Array.from(document.querySelectorAll('.input'));
        if(inputs.some(input => input.value === '')) return;

        // Check if we are currently viewing a project
        let selectedProjectId = null;
        const selectedTile = document.querySelector('.nav-item.active');
        if(selectedTile.dataset.projectId !== undefined) selectedProjectId = +selectedTile.dataset.projectId;

        processNewTaskInput(selectedProjectId);
        mask.classList.remove('display-grid');
    });

    // Close task modal
    const closeTaskModalButton = document.querySelector('.close-task-modal');

    closeTaskModalButton.addEventListener('click', () => {
        mask.classList.remove('display-grid');
        const title = document.querySelector('.add-task-modal-title');
        title.textContent = 'CREATE NEW TASK';

        const addTaskButton = document.querySelector('.add-task-modal-button');
        const editTaskButton = document.querySelector('.edit-task-modal-button');

        if(addTaskButton.classList.contains('hidden')) {
            addTaskButton.classList.remove('hidden');
            editTaskButton.classList.add('hidden');
        }

        clearTaskInput();
    });

    // Edit project vertical menu
    const verticalMenus = document.querySelectorAll('.vertical-menu');

    verticalMenus.forEach(menu => {
        menu.addEventListener('click', () => {
            menu.classList.toggle('open');
            const projectID = menu.dataset.projectId;
            const editProjectMenu = document.querySelector(
                `.edit-project-menu[data-project-id="${projectID}"]`
                );
            editProjectMenu.classList.toggle('open');
        });
    })

    // New project button - open new project menu on click + create btn and cancel btn listeners
    const newProjectButton = document.querySelector('#project-img');
    const newProjectMenu = document.querySelector('.new-project-menu');
    const projectCreateButton = document.querySelector('#create-project-btn');
    const projectCancelButton = document.querySelector('#cancel-project-btn');

    newProjectButton.addEventListener('click', () => {
        // Reset button text if user edited last
        if(projectCreateButton.textContent === 'CONFIRM EDIT') {
            projectCreateButton.textContent = 'CREATE PROJECT';
        }
        newProjectMenu.classList.add('visible');
    });

    projectCreateButton.addEventListener('click', () => {
        if(document.querySelector('#new-project-name').value === '') return;
        // return out of this function if in edit mode
        if(projectCreateButton.textContent === 'CONFIRM EDIT') return;
        processNewProjectInput();
        clearProjectInput();
        newProjectMenu.classList.remove('visible');
    });

    projectCancelButton.addEventListener('click', () => {
        newProjectMenu.classList.remove('visible');
        clearProjectInput();
    });
}

export {addEventListeners}
