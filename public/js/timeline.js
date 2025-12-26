// Script for the timeline game

let artifacts = [];
let correctOrder = [];
let currentOrder = [];
let lockedIndexes = new Set(); // Indices for artifacts that have been guessed correctly
let wrongAttempts = 0; // Count of user mistakes
const MAX_ATTEMPTS = 3;

const timelineList = document.getElementById('timeline-list');
const checkButton = document.getElementById('check-order');
const modal = document.getElementById('modal');
const modalText = modal.querySelector('p');
const modalIcon = modal.querySelector('.modal-icon');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/js/timeline.json')
    .then(res => res.json())
    .then(data => {
      artifacts = data;
      correctOrder = [...artifacts].sort((a, b) => getCentury(a.date) - getCentury(b.date));
      startGame();
    })
    .catch(err => console.error('Error loading JSON: ', err));
});

function getCentury(dateStr) {
  const match = dateStr.match(/(\d+)[a-z]{2}/i);
  return match ? parseInt(match[1]) : 21;
}

function startGame() {
  wrongAttempts = 0;
  lockedIndexes = new Set();
  currentOrder = rearrange([...artifacts]);
  checkButton.textContent = 'Check Order';
  renderList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* 
  Rearrange the array randomly using the Fisher-Yates shuffle algorithm to ensure the game cards are displayed in a random order each time.
  https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ (Accessed July 6, 2025)
*/

function rearrange(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderList() {
  timelineList.innerHTML = '';

  currentOrder.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('timeline-item');
    if (lockedIndexes.has(index)) li.classList.add('locked');
    li.dataset.index = index;

    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="timeline-info">
        <p class="title">${item.title}</p>
        <p class="date" style="display: none;">${item.date}</p>
      </div>
      <div class="move-buttons">
        <button class="move-up" aria-label="Move up"><i class="bi bi-arrow-up" aria-hidden="true"></i></button>
        <button class="move-down" aria-label="Move down"><i class="bi bi-arrow-down" aria-hidden="true"></i></button>
      </div>
    `;

    timelineList.appendChild(li);
  });

  attachArrowHandlers();
}

function attachArrowHandlers() {
  const items = Array.from(timelineList.children);

  items.forEach((li, index) => {
    const upBtn = li.querySelector('.move-up');
    const downBtn = li.querySelector('.move-down');

    const canMoveUp = getNextUnlockedIndex(index, -1) !== null;
    const canMoveDown = getNextUnlockedIndex(index, 1) !== null;

    upBtn.disabled = lockedIndexes.has(index) || !canMoveUp;
    downBtn.disabled = lockedIndexes.has(index) || !canMoveDown;

    upBtn?.addEventListener('click', () => moveItem(index, -1));
    downBtn?.addEventListener('click', () => moveItem(index, 1));
  });
}

function getNextUnlockedIndex(fromIndex, direction) {
  let i = fromIndex + direction;
  while (i >= 0 && i < currentOrder.length) {
    if (!lockedIndexes.has(i)) return i;
    i += direction;
  }
  return null;
}

function moveItem(index, direction) {
  const newIndex = index + direction;

  let targetIndex = newIndex;
  while (lockedIndexes.has(targetIndex)) {
    targetIndex += direction;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;
  }

  if (targetIndex < 0 || targetIndex >= currentOrder.length || lockedIndexes.has(index) || lockedIndexes.has(targetIndex)) return;

  [currentOrder[index], currentOrder[targetIndex]] = [currentOrder[targetIndex], currentOrder[index]];

  renderList();
}

checkButton.addEventListener('click', () => {
  if (checkButton.textContent === 'Play Again') {
    startGame();
    return;
  }

  let correctCount = 0;

  currentOrder.forEach((item, index) => {
    if (item.title === correctOrder[index].title) {
      lockedIndexes.add(index);
      correctCount++;
    }
  });

  if (correctCount === currentOrder.length) {
    showModal('Well done! You got them all in order! Resetting...', 'bi-emoji-wink-fill');
    setTimeout(() => {
      startGame(); 
    }, 4000); 
  } else {
    wrongAttempts++;
    if (wrongAttempts >= MAX_ATTEMPTS) {
      showModal('No more attempts left! Here is the correct order: ', 'bi-emoji-tear-fill');
      renderCorrectTimeline();
      checkButton.textContent = 'Play Again';
    } else {
      const triesLeft = MAX_ATTEMPTS - wrongAttempts;
      const msg = triesLeft === 1
      ? 'You have one attempt left.'
      : `You got ${correctCount} correct and have ${triesLeft} attempts left.`;
      showModal(msg, 'bi-emoji-smile-fill');
      renderList();
    }
  }
});

function renderCorrectTimeline() {
  document.getElementById('timeline-list').scrollIntoView({ behavior: 'smooth' });
  timelineList.innerHTML = '';
  timelineList.classList.add('reveal-dates');

  correctOrder.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('timeline-item');
    li.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="timeline-info">
        <p class="title">${item.title}</p>
        <p class="date">${item.date}</p>
      </div>
    `;
    timelineList.appendChild(li);
  });
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  document.body.style.pointerEvents = 'none';
  
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.pointerEvents = 'auto';
  }, 4000);
}
