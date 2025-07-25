// Script for ensuring that the scan icon stays within the artifact results container

document.addEventListener('DOMContentLoaded', () => {
    const qrBtn = document.querySelector('.scan-icon-link');
    const artifactSection = document.getElementById('artifactResults');
    const footer = document.querySelector('footer');

    const updatePosition = () => {
        const scrollY = window.scrollY;
        const min = artifactSection.offsetTop; // Where the QR button appears first (top position (px))
        const max = footer.offsetTop - qrBtn.offsetHeight - 20; // QR button stays above the footer by at least 20px (max top position (px))

        const newTop = Math.min(Math.max(scrollY + 400, min), max);
        qrBtn.style.top = newTop + 'px';
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();
});

