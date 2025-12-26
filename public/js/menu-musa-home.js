// Script for creating a circular overlay menu that expands from the center of the hamburger menu icon and collapses back into it when closed (for MUSA home page)

const hamburger = document.getElementById('hamburger');
const circularMenu = document.getElementById('circularMenu');
const closeMenu = document.getElementById('closeMenu');

// Function that calculates the center point of the hamburger button 
function getHamburgerCenterPercent() {
  const width = window.innerWidth;

  if (width >= 2560) {
    return { xPercent: 75, yPercent: 2 };
  } else if (width >= 1440) {
    return { xPercent: 94.5, yPercent: 3.5 };
  } else if (width >= 1200) {
    return { xPercent: 93.5, yPercent: 7 };
  } else if (width >= 1024) {
    return { xPercent: 95, yPercent: 4 };
  } else if (width >= 820) {
    return { xPercent: 92, yPercent: 4 };
  } else {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect (Accessed July 13, 2025)
    const rect = hamburger.getBoundingClientRect();
    const xPercent = (rect.left + rect.width / 2) / window.innerWidth * 100;
    const yPercent = (rect.top + rect.height / 2) / window.innerHeight * 100;
    return { xPercent, yPercent };
  }
}

hamburger.addEventListener('click', () => {
  const { xPercent, yPercent } = getHamburgerCenterPercent();

  circularMenu.style.transition = 'none';
  circularMenu.style.clipPath = `circle(0% at ${xPercent}% ${yPercent}%)`;
  circularMenu.classList.add('show');

  requestAnimationFrame(() => {
    circularMenu.style.transition = 'clip-path 0.6s ease-in-out';
    circularMenu.style.clipPath = `circle(150% at ${xPercent}% ${yPercent}%)`;
  });
});

closeMenu.addEventListener('click', () => {
  const { xPercent, yPercent } = getHamburgerCenterPercent();

  circularMenu.style.clipPath = `circle(0% at ${xPercent}% ${yPercent}%)`;

  circularMenu.addEventListener('transitionend', function handler() {
    circularMenu.classList.remove('show');
    circularMenu.style.clipPath = '';
    circularMenu.removeEventListener('transitionend', handler);
  });
});