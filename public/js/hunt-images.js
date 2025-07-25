// Script for showing and closing The Hunt Museum's homepage images

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close-btn');
const galleryImages = document.querySelectorAll('.gallery-grid img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});