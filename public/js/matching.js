// Script for the matching game

let cardsData = [];
let cards = [];
let selectedCards = [];
let score = 0; // Number of matched pairs
let matchesFound = 0;

const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const modal = document.getElementById('modal');
const modalText = modal.querySelector('p');
const modalIcon = modal.querySelector('.modal-icon');

fetch('/js/matching.json')
  .then(response => response.json())
  .then(data => {
    cardsData = data.map(item => ({
      id: item.artwork.toLowerCase().replace(/\s+/g, '-'), // Spaces replaced with dashes
      img: item.img,
      artist: item.artist
    }));
    initializeGame();
  })
  .catch(error => console.error('Error loading matching.json file: ', error));

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
  card.className = 'card selectable';
  card.dataset.id = item.id;
  card.dataset.type = type;

  const content = type === 'artwork' ? `<img src="${item.img}" alt="${item.id}">` : `<div class="card-body"><p>${item.artist}</p></div>`;

  card.innerHTML = content;
  card.addEventListener('click', () => handleCardClick(card));
  board.appendChild(card);
}

function initializeGame() {
  score = 0;
  matchesFound = 0;
  selectedCards = [];
  updateScore();

  board.innerHTML = '';

  cards = cardsData.flatMap(item => [
    { ...item, type: 'artwork' },
    { ...item, type: 'artist' }
  ]);

  rearrange(cards);

  cards.forEach(item => createCard(item, item.type));
}

function handleCardClick(card) {
  if (card.classList.contains('matched') || card.classList.contains('selected')) return;

  card.classList.add('selected');
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    const [card1, card2] = selectedCards;

    // Prevent selecting same type twice
    if (card1.dataset.type === card2.dataset.type) {
      selectedCards.forEach(c => c.classList.remove('selected'));
      selectedCards = [];
      return;
    }

    const isMatch = card1.dataset.id === card2.dataset.id;

    setTimeout(() => {
      if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score++;
        matchesFound++;
        updateScore();

        if (matchesFound === cardsData.length) {
          showModal('Well done! You matched all pairs!', 'bi-check-circle-fill');
          setTimeout(initializeGame, 2000);
        }
      } else {
        card1.classList.remove('selected');
        card2.classList.remove('selected');
      }
      selectedCards = [];
    }, 800); // If cards don’t match, their border will return to blue after a delay of 800ms. Their opacity will reduce after 800ms if they match.
  }
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  setTimeout(() => {
    modal.classList.remove('active');
  }, 1500);
}
