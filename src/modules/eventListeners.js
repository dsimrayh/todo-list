import {processNewTaskInput, processTaskInput, clearTaskInput} from './createTask.js';

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

    // Navbar list items - highlight on click
    const navbarItems = document.querySelectorAll('.nav-item');

    navbarItems.forEach(item => {
        item.addEventListener('click', () => {
            navbarItems.forEach(navbarItem => {
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

        processNewTaskInput();
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

    // New project button - open new project menu on click
    const newProjectButton = document.querySelector('#project-img');
    const newProjectMenu = document.querySelector('.new-project-menu');
    const projectCancelButton = document.querySelector('#cancel-project-btn');

    newProjectButton.addEventListener('click', () => {
        newProjectMenu.classList.add('visible');
    })

    projectCancelButton.addEventListener('click', () => {
        newProjectMenu.classList.remove('visible');
    })
}

export {addEventListeners}


// ============== DEPRECATED =================

  //  // Important button / fill on click
  //  const importantButtons = document.querySelectorAll('.important')
//
  //  importantButtons.forEach(button => {
  //      let selected = false;
  //      button.addEventListener('click', () => {
  //          selected = !selected;
  //          if(selected) {
  //              button.src = "../src/images/important-filled.png"
  //          } else {
  //              button.src = "../src/images/important.png"
  //          }
  //      })
  //          
  //  });



//
  // // Open task description
  // const openDescriptionButtons = document.querySelectorAll('.expand');
  // const descriptions = document.querySelectorAll('.description');
//
  // openDescriptionButtons.forEach(button => {
  //     button.addEventListener('click', (e) => {
  //         const id = +e.target.dataset.descriptionId;
  //         const description = descriptions[id - 1];
  //         button.classList.toggle('open');
  //         description.classList.toggle('open');
  //     });
  // })
//


 //   // Task complete button - green checkmark on click
 //   const taskCompleteButtons = document.querySelectorAll('.task-complete-button');
//
 //   taskCompleteButtons.forEach(button => {
 //       button.addEventListener('click', () => {
 //           button.classList.toggle('checked');
 //       })
 //   });
