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

document.addEventListener('click', (e) => {
    const target = e.target;
    if(target.className === 'nav-item') {
        navbarItems.forEach(navbarItem => {
            navbarItem.classList.remove('active');
        })
    }
    target.classList.add('active');
});

// Important button / fill on click
const importantButtons = document.querySelectorAll('.important')

importantButtons.forEach(button => {
    let selected = false;
    button.addEventListener('click', () => {
        selected = !selected;
        if(selected) {
            button.src = "../src/images/important-filled.png"
        } else {
            button.src = "../src/images/important.png"
        }
    })
        
});

// Task complete button - green checkmark on click
const taskCompleteButtons = document.querySelectorAll('.task-complete-button');

taskCompleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('checked');
    })
});


// New task modal
const addTaskButton = document.querySelector('#task-img');
const mask = document.querySelector('#mask');
const modal = document.querySelector('.modal');

addTaskButton.addEventListener('click', () => {
    mask.classList.add('display-grid');
});

modal.addEventListener('click', () => {
    mask.classList.remove('display-grid')
});


// Open task description
const expand = document.querySelector('.expand');

expand.addEventListener('click', () => {
    const description = document.querySelector('.description');
    description.classList.toggle('open');

    expand.classList.toggle('open');
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

