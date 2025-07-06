// Script for the matching game

let cardsData = [];
let cards = [];
let firstCard = null; // First card that the user flips over
let lock = false;
let score = 0; // Number of matched pairs
let matchesFound = 0;

const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');

fetch('/js/match.json')
  .then(response => response.json())
  .then(data => {
    cardsData = data.map(item => ({
      id: item.artwork.toLowerCase().replace(/\s+/g, '-'), // Spaces replaced with dashes
      img: item.img,
      artist: item.artist
    }));
    initializeGame();
  })
  .catch(error => console.error('Error loading match.json file: ', error));

/* 
  Rearrange the array randomly using the Fisher-Yates shuffle algorithm to ensure the game cards are displayed in a random order each time.
  https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ (Accessed July 6, 2025)
*/

function rearrange(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(item, type) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = item.id;

  const content = type === 'artwork'
    ? `<img src="${item.img}" alt="${item.id}">`
    : `<p>${item.artist}</p>`;

  card.innerHTML = `
    <div class="card-front"></div>
    <div class="card-back">${content}</div>
  `;

  card.addEventListener('click', () => handleCardClick(card));
  board.appendChild(card);
}

function initializeGame() {
  cards = cardsData.flatMap(item => [item, item]).map((item, i) => ({
    ...item,
    type: i % 2 === 0 ? 'artwork' : 'artist'
  }));

  rearrange(cards);
  board.innerHTML = '';
  cards.forEach(item => createCard(item, item.type));
  score = 0;
  matchesFound = 0;
  updateScore();
}

function handleCardClick(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    const secondCard = card;
    const match = firstCard.dataset.id === secondCard.dataset.id && firstCard !== secondCard;

    lock = true;

    setTimeout(() => {
      if (match) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score++;
        matchesFound++;
        updateScore();

        if (matchesFound === cardsData.length) {
          showSuccessModal('Well done! You matched all pairs!', 'bi-check-circle-fill'); 
          setTimeout(initializeGame, 1300); 
        }
      } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
      }
      firstCard = null;
      lock = false;
    }, 900); // If cards don’t match, they are flipped back over after a delay of 900ms
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function showSuccessModal(message, iconClass) {
  const modal = document.getElementById('modal');
  const modalText = modal.querySelector('p'); 
  const modalIcon = modal.querySelector('.modal-icon');

  modalText.textContent = message; 
  modalIcon.className = `modal-icon ${iconClass}`; 

  modal.classList.add('active'); 

  setTimeout(() => {
    modal.classList.remove('active');  
  }, 1300);
}

