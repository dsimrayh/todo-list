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
})

// Task complete button - green checkmark on click
const taskCompleteButtons = document.querySelectorAll('.task-complete-button');

taskCompleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('checked');
    })
})
