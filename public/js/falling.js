const game = document.getElementById("game");
const frame = document.querySelector(".frame-container");
const girl = document.getElementById("girl");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

const flowerImgs = [
  "/img/games/flower.png",
  "/img/games/flower1.png",
  "/img/games/flower2.png",
  "/img/games/flower3.png",
];
const flowerSize = 300;
const girlWidth = 100;
const girlHeight = 100;
const fallSpeed = 8;
const paddingX = 0;

let score = 0;
let lives = 3;
let girlX = game.clientWidth / 2 - girlWidth / 2;
let gameRunning = true;

girl.style.left = `${girlX}px`;

function updateGirlPosition(mouseX) {
  if (!gameRunning) return;
  const newX = Math.min(
    Math.max(0, mouseX - girl.offsetWidth / 2),
    game.clientWidth - girl.offsetWidth
  );
  girlX = newX;
  girl.style.left = `${girlX}px`;
}

frame.addEventListener("mousemove", (e) => {
  const rect = game.getBoundingClientRect();
  const x = e.clientX - rect.left;
  updateGirlPosition(x);
});

frame.addEventListener(
  "touchmove",
  (e) => {
    if (!gameRunning) return;
    e.preventDefault();
    const rect = game.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    updateGirlPosition(x);
  },
  { passive: false }
);

function dropFlower() {
  if (!gameRunning) return;

  const flower = document.createElement("img");
  flower.src = flowerImgs[Math.floor(Math.random() * flowerImgs.length)];
  flower.className = "flower";
  game.appendChild(flower);

  let x = Math.random() * (game.clientWidth - flower.offsetWidth);
  let y = -flowerSize;
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  const interval = setInterval(() => {
    if (!gameRunning) {
      flower.remove();
      clearInterval(interval);
      return;
    }

    y += fallSpeed;
    flower.style.top = `${y}px`;

    const flowerRect = {
      left: x,
      right: x + flower.offsetWidth,
      top: y,
      bottom: y + flower.offsetHeight,
    };

    const girlRect = {
      left: girlX,
      right: girlX + girl.offsetWidth * 0.4,
      top: game.clientHeight - girl.offsetHeight * 0.15,
      bottom: game.clientHeight,
    };

    const collision =
      flowerRect.left < girlRect.right &&
      flowerRect.right > girlRect.left &&
      flowerRect.top < girlRect.bottom &&
      flowerRect.bottom > girlRect.top;

    const missed = y > game.clientHeight;

    if (collision) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      flower.remove();
      clearInterval(interval);
    } else if (missed) {
      lives--;
      livesDisplay.textContent = `Lives: ${"❤️".repeat(lives)}`;
      flower.remove();
      clearInterval(interval);
      if (lives === 0) {
        gameRunning = false;
        gameOverScreen.style.display = "block";
      }
    }
  }, 16);
}

setInterval(dropFlower, 480);

restartBtn.addEventListener("click", () => {
  score = 0;
  lives = 3;
  gameRunning = true;
  scoreDisplay.textContent = `Score: ${score}`;
  livesDisplay.textContent = `Lives: ${"❤️".repeat(lives)}`;
  gameOverScreen.style.display = "none";
});
