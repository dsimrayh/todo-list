import { masterProjectList } from "./createProject";

function editProject(projectId) {
    const newProjectMenu = document.querySelector('.new-project-menu');
    newProjectMenu.classList.add('visible');

    // Changes button text
    const projectCreateButton = document.querySelector('#create-project-btn');
    projectCreateButton.textContent = 'CONFIRM EDIT';

    // Adds a one-time event listener to edit button in order to confirm and make the change
    // Return if blank, otherwise changes the name of the project in the DOM element and in the project object
    // Also closes the edit menu once edit is confirmed
    projectCreateButton.addEventListener('click', () => {
        const newProjectName = document.querySelector('#new-project-name').value;
        if(newProjectName === '') return;

        const projectToEdit = masterProjectList.find(project => project.getId() === projectId);
        projectToEdit.setName(newProjectName);
        
        const projectElement = document.querySelector(`
            .project-tile[data-project-id="${projectId}"]
        `);
        projectElement.textContent = newProjectName;

        newProjectMenu.classList.remove('visible');

    }, {'once': true});
}

function deleteProject(projectId) {
    const isUserSure = confirm('Are you sure you want to delete this project?');
    if(isUserSure !== true) return;

    // Remove project elements from DOM
    const projectList = document.querySelector('#project-tiles');

    const projectElementToRemove = document.querySelector(`
        .nav-item[data-project-id="${projectId}"]
    `);

    const projectMenuElementToRemove = document.querySelector(`
        .edit-project-menu[data-project-id="${projectId}"]
    `);

    projectList.removeChild(projectElementToRemove);
    projectList.removeChild(projectMenuElementToRemove);

    // Remove project from masterProjectList
    const projectToDelete = masterProjectList.findIndex(project => project.getId() === projectId);
    masterProjectList.splice(projectToDelete, 1);
}

export {editProject, deleteProject}
