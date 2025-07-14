// Hero animation script

document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.querySelector('.welcome-text');
    const to = document.querySelector('.to-text');
    const hands = document.querySelectorAll('.hand');
    const rotatedText = document.querySelector('.rotated-text');
    const scrollArrow = document.querySelector('.scroll-arrow');

    setTimeout(() => {
        welcome.style.opacity = 1;
    }, 200);

    setTimeout(() => {
        to.style.opacity = 1;
    }, 600);

    hands.forEach((hand, index) => {
        setTimeout(() => {
            hands.forEach(h => h.classList.remove('active'));
            hand.classList.add('active');
        }, 1000 + index * 200); // Slideshow of hands each 200ms apart starting after 1 second
    });

    setTimeout(() => {
        rotatedText.style.opacity = 1;
    }, 1000 + hands.length * 200 + 400);

    setTimeout(() => {
        scrollArrow.classList.add('visible');
    }, 1000 + hands.length * 200 + 1200);
});