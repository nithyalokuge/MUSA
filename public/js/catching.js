// Script for the catching game

let baseFallSpeed = 4;
let dropStartTime = null;
const game = document.getElementById("game");
const frame = document.querySelector(".frame-container");
const girl = document.getElementById("girl");
const startTip = document.getElementById("start-tip");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameContainer = document.querySelector(".game-container");
const startBtn = document.getElementById("start-btn");
const introScreen = document.querySelectorAll(".intro-screen");
const modal = document.getElementById("modal");
const modalContent = modal.querySelector("p");
const modalIcon = modal.querySelector(".modal-icon");

const flowerImgs = [
  "/img/games/flower0-game.png",
  "/img/games/flower1-game.png",
  "/img/games/flower2-game.png",
  "/img/games/flower3-game.png",
];

let score = 0;
let lives = 3;
let girlX = 0;
let gameRunning = false;
let animationId = null;
let flowers = [];
let movementDetected = false;

girlX = game.clientWidth / 2 - girl.offsetWidth / 2;
girl.style.left = `${girlX}px`;

function updateGirlPosition(mouseX) {
  if (!gameRunning) return;
  const newX = Math.min(
    Math.max(0, mouseX - girl.offsetWidth / 2),
    game.clientWidth - girl.offsetWidth
  );
  girlX = newX;
  girl.style.left = `${girlX}px`;

  if (!movementDetected) {
    movementDetected = true;
    startTip.style.display = "none";
    dropStartTime = Date.now();
    dropLoop();
  }
}

// Mouse control
frame.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  const x = e.clientX - rect.left;
  updateGirlPosition(x);
});

// Touch control
frame.addEventListener("touchmove", (e) => {
  if (!gameRunning) return;
  e.preventDefault();
  const rect = game.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;
  updateGirlPosition(x);
}, { passive: false });

function createFlower() {
  const flower = document.createElement("img");
  flower.src = flowerImgs[Math.floor(Math.random() * flowerImgs.length)];
  flower.alt = "Flower";
  flower.className = "flower";
  flower.style.position = "absolute";
  flower.style.top = "-100px";

  // Padding
  const isMobile = window.innerWidth < 768;
  const flowerWidth = 50;
  const padding = isMobile ? 25 : 20; 

  const maxX = game.clientWidth - padding * 2 - flowerWidth;
  const spawnX = padding + Math.random() * maxX;

  flower.style.left = `${spawnX}px`;
  flower.style.width = `${flowerWidth}px`;

  /* Debug for flowers box
  const debug = document.createElement("div");
  debug.className = "flower-debug-box";
  debug.style.position = "absolute";
  debug.style.border = "2px dashed orange";
  debug.style.pointerEvents = "none"; */

  game.appendChild(flower);
  // game.appendChild(debug); 
  flowers.push({ el: flower, y: -100 }); 
  // flowers.push({ el: flower, y: -100, debugEl: debug }); 
}

function dropLoop() {
  if (!gameRunning) return;

  // Occasional new flower
  if (Math.random() < 0.02) {
    createFlower();
  }

  const handBox = getGirlHandBox();
  
  /* Debug hand box position and size
  const debugHandBox = document.getElementById("debug-hand-box");
  debugHandBox.style.position = "absolute";
  debugHandBox.style.left = `${handBox.left}px`;
  debugHandBox.style.top = `${handBox.top}px`;
  debugHandBox.style.width = `${handBox.right - handBox.left}px`;
  debugHandBox.style.height = `${handBox.bottom - handBox.top}px`;
  debugHandBox.style.border = "2px dashed red";
  debugHandBox.style.pointerEvents = "none";
  debugHandBox.style.zIndex = 9999; */

  // Loop through flowers from the end to avoid splice issues
  for (let i = flowers.length - 1; i >= 0; i--) {
    const flower = flowers[i];
    const timeSinceStart = (Date.now() - dropStartTime) / 1000;
    const speed = baseFallSpeed + timeSinceStart * 0.04;
    flower.y += speed;

    flower.el.style.top = `${flower.y}px`;

    const flowerRect = flower.el.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();
    const flowerBox = {
      left: flowerRect.left - gameRect.left,
      right: flowerRect.right - gameRect.left,
      top: flowerRect.top - gameRect.top,
      bottom: flowerRect.bottom - gameRect.top,
    };

    /* Update debug box if flower has a debugEl
    if (flower.debugEl) {
      flower.debugEl.style.left = `${flowerBox.left}px`;
      flower.debugEl.style.top = `${flowerBox.top}px`;
      flower.debugEl.style.width = `${flowerBox.right - flowerBox.left}px`;
      flower.debugEl.style.height = `${flowerBox.bottom - flowerBox.top}px`;
    } */

    // Collision check
    const collision =
      flowerBox.left < handBox.right &&
      flowerBox.right > handBox.left &&
      flowerBox.top < handBox.bottom &&
      flowerBox.bottom > handBox.top;

    if (collision) {
      // console.log("COLLISION: ", flowerBox, handBox);
      score++;
      scoreDisplay.textContent = `Flowers caught: ${score}`;
      flower.el.remove();
      // if (flower.debugEl) flower.debugEl.remove();
      flowers.splice(i, 1);
      continue;
    }

    // If flower missed
    if (flower.y > game.clientHeight) {
      // console.log("MISSED: ", flowerBox);
      lives--;
      updateLives();
      flower.el.remove();
      // if (flower.debugEl) flower.debugEl.remove();
      flowers.splice(i, 1);

      if (lives === 0) {
        endGame();
        return; 
      }
    }
  }
  animationId = requestAnimationFrame(dropLoop);
}

function getGirlHandBox() {
  const isMobile = window.innerWidth < 768;
  const width = girl.offsetWidth * (isMobile ? 0.55 : 0.55);
  const height = girl.offsetHeight * 0.30;
  const left = girlX + girl.offsetWidth * (isMobile ? 0.65 : 0.60);
  const top = game.clientHeight - girl.offsetHeight * (isMobile ? 0.001 : 0.20);
  return {
    left,
    right: left + width,
    top,
    bottom: top + height
  };
}

function updateLives() {
  if (lives > 0) {
    livesDisplay.innerHTML = `Lives: ${'<i class="bi bi-heart-fill"></i> '.repeat(lives)}`;
  } else {
    livesDisplay.innerHTML = `Lives: 0`;
  }
}

function resetGame() {
  score = 0;
  lives = 3;
  movementDetected = false;
  scoreDisplay.textContent = `Flowers caught: 0`;
  updateLives();
  flowers.forEach(f => f.el.remove());
  flowers = [];
  cancelAnimationFrame(animationId);
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animationId);

  setTimeout(() => {
    modal.classList.add("active");
    modalContent.textContent = `You caught ${score} flower${score === 1 ? "" : "s"} before losing all your lives!`;
    modalIcon.className = "modal-icon bi bi-emoji-smile-fill";

    document.body.style.pointerEvents = 'none';

    setTimeout(() => {
      modal.classList.remove("active");
      document.body.style.pointerEvents = 'auto';
      gameContainer.classList.add("d-none");
      introScreen.forEach(element => {
        element.classList.remove("d-none"); 
      });
      startBtn.textContent = "Play Again";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 4500);
  }, 1000);
}

startBtn.addEventListener("click", () => {
  introScreen.forEach(element => {
    element.classList.add("d-none");  
  });
  gameContainer.classList.remove("d-none");
  setTimeout(() => {
    startTip.style.display = "block";
    setTimeout(() => startTip.style.display = "none", 7500);
  }, 200);

  resetGame();
  gameRunning = true;

  setTimeout(() => {
    const scrollTarget = gameContainer.offsetTop + gameContainer.offsetHeight + 150;
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
  }, 100);
});