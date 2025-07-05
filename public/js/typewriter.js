// Typewriter script

const pathname = window.location.pathname;

let lines = [];

if (pathname === "/") {
  lines = [
    "Accessibility is not a problem to be solved.",
    "Accessibility is a culture to be built.",
    "",
    "Sheri Byrne-Haber"
  ];
} else if (pathname === "/hunt/home") {
  lines = [
    "The power of the Web is in its universality.",
    "Access by everyone regardless of disability is an essential aspect.",
    "",
    "Tim Berners-Lee"
  ];
} 

const speed = 70;
let lineIndex = 0;
let charIndex = 0;
let hasStartedTyping = false;

function typeLine() {
  if (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const isGroup1 = lineIndex < 2;
    const targetId = isGroup1 ? "font-group-1" : "font-group-2";

    if (charIndex < line.length) {
      document.getElementById(targetId).innerHTML += line.charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, speed);
    } else {
      document.getElementById(targetId).innerHTML += "<br>";
      charIndex = 0;
      lineIndex++;
      setTimeout(typeLine, speed);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const settings = JSON.parse(localStorage.getItem("userSettings")) || {};
  if (settings.contrast === "dark") {
    const quoteLeft = document.querySelector('.quote-start');
    const quoteRight = document.querySelector('.quote-end');
    if (quoteLeft) quoteLeft.src = "/img/quote-left-white.png";
    if (quoteRight) quoteRight.src = "/img/quote-right-white.png";
  }

  const quoteSection = document.querySelector(".quote");

  if (!('IntersectionObserver' in window)) {
    typeLine(); 
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStartedTyping) {
        hasStartedTyping = true;
        typeLine();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(quoteSection);
});
