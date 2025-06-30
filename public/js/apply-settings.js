// Script for applying settings to all pages

const settings = JSON.parse(localStorage.getItem('userSettings')) || {};

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    if (settings.contrast === 'dark') {
        body.classList.add('dark-mode');
    }

    if (settings.textSize === 'large') {
        body.classList.add('large-text');
    }

    if (settings.textStyle === 'dyslexia') {
        body.classList.add('dyslexia-font');
    }
});
