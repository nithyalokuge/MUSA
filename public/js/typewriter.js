// Typewriter script

let lines = [
  "Accessibility is not a problem",
  "to be solved. Accessibility is",
  "a culture to be built.",
  "",
  "Sheri Byrne-Haber"
];

const speed = 55;
let lineIndex = 0;
let charIndex = 0;
let hasStartedTyping = false;

function typeLine() {
  if (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const isGroup1 = lineIndex < 3;
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
