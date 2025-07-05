// Active link script

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll('.subnav-link, .navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
});
