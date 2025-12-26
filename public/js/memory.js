// Script for the memory game

let cardsData = [];
let cards = [];
let firstCard = null; // First card that the user flips over
let lock = false;
let matchesFound = 0;

const board = document.getElementById('gameBoard');
const modal = document.getElementById('modal');
const modalText = modal.querySelector('p');
const modalIcon = modal.querySelector('.modal-icon');

fetch('/js/memory.json')
  .then(response => response.json())
  .then(data => {
    cardsData = data.map(item => ({
      id: item.artwork.toLowerCase().replace(/\s+/g, '-'), // Spaces replaced with dashes
      img: item.img
    }));
    initializeGame();
  })
  .catch(error => console.error('Error loading memory.json: ', error));

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

function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = item.id;

  card.innerHTML = `
    <div class="card-front"></div>
    <div class="card-back">
      <img src="${item.img}" alt="${item.id}">
    </div>
  `;

  card.addEventListener('click', () => handleCardClick(card));
  board.appendChild(card);
}

function initializeGame() {
  const duplicatedCards = cardsData.flatMap(item => [item, item]);
  rearrange(duplicatedCards);
  
  board.innerHTML = '';
  duplicatedCards.forEach(item => createCard(item));

  cards = duplicatedCards;
  matchesFound = 0;
  firstCard = null;
  lock = false;
}

function handleCardClick(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = card;
  } else {
    const secondCard = card;
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    lock = true;

    setTimeout(() => {
      if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchesFound++;

        if (matchesFound === cardsData.length) {
          showModal('Well done! Resetting...', 'bi-emoji-wink-fill');
          setTimeout(() => {
            initializeGame();
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }, 4500);
        }
      } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
      }

      firstCard = null;
      lock = false;
    }, 900); // If cards don't match, they are flipped back over after a delay of 900ms. Their opacity will reduce after 900ms if they match.
  }
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  document.body.style.pointerEvents = 'none';

  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.pointerEvents = 'auto';
  }, 4500);
}
