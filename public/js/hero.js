// Hero animation script

document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.querySelector('.welcome-text');
    const to = document.querySelector('.to-text');
    const hands = document.querySelectorAll('.hand');
    const rotatedText = document.querySelector('.rotated-text');
    const scrollArrow = document.querySelector('.scroll-arrow');

    // Texts fade in after 200ms
    setTimeout(() => {
        welcome.classList.add('visible');
        to.classList.add('visible');
    }, 200);

    // First hand fades in after 1500ms 
    setTimeout(() => {
        hands[0].classList.add('active'); 
    }, 1500);

    // Hands (one-by-one) appear after 3000ms every 400ms
    hands.forEach((hand, index) => {
        if (index !== 0) {
            setTimeout(() => {
                hands.forEach(h => h.classList.remove('active')); 
                hand.style.transition = 'none'; 
                hand.classList.add('active');
            }, 3000 + (index - 1) * 400); 
        }
    });

    // Rotated text appears after final hand + 400ms
    const rotatedDelay = 3000 + (hands.length - 1) * 400 + 400;
    setTimeout(() => {
        rotatedText.style.opacity = 1;
    }, rotatedDelay);

    // Scroll down arrow appears 800ms after the rotated text
    setTimeout(() => {
        scrollArrow.classList.add('visible');
    }, rotatedDelay + 800);
});
