// GitHub Link - style changes on hover
const githubLink = document.querySelector('a');
const link = document.querySelector('#gh-link');
const logo = document.querySelector('#gh-logo');

githubLink.addEventListener('mouseover', () => {
    link.classList.toggle('link-hover');
    logo.classList.toggle('logo-hover');
})

githubLink.addEventListener('mouseout', () => {
    link.classList.toggle('link-hover');
    logo.classList.toggle('logo-hover');
})
