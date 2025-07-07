// Script for the timeline game

let artifacts = [];
let correctOrder = []; // Array of artifacts in chronological order
let sortableInstance = null; // Variable that will store the Sortable.js instance - https://sortablejs.github.io/Sortable/ (Accessed July 07, 2025)

const timelineList = document.getElementById('timeline-list');
const checkButton = document.getElementById('check-order');
const resetButton = document.getElementById('reset-game');
const modal = document.getElementById('modal');
const modalIcon = modal.querySelector('.modal-icon');
const modalText = modal.querySelector('p');

document.addEventListener('DOMContentLoaded', () => {
  fetch('/js/timeline.json')
    .then(res => res.json())
    .then(data => {
      artifacts = data;
      // Oldest to newest artwork
      correctOrder = [...artifacts].sort((a, b) => getCentury(a.date) - getCentury(b.date));
      startGame();
    })
    .catch(err => console.error('Error loading timeline.json: ', err));
});

function renderList(items, showDates) {
  timelineList.innerHTML = '';

  items.forEach(artifact => {
    const li = document.createElement('li');
    li.classList.add('timeline-item');
    li.dataset.title = artifact.title;

    li.innerHTML = `
      <img src="${artifact.image}" alt="${artifact.title}">
      <div class="timeline-info">
        <p class="title">${artifact.title}</p>
        ${showDates ? `<p>${artifact.date}</p>` : ''}
      </div>
      <span class="drag-handle" aria-label="Drag to reorder"><i class="bi bi-grip-vertical" aria-hidden="true"></i></span>
    `;

    timelineList.appendChild(li);
  });
}

// Function that extracts the century number from a string, so for e.g "16th century" becomes 16
function getCentury(dateStr) {
  const match = dateStr.match(/(\d+)[a-z]{2}\scentury/i);
  return match ? parseInt(match[1]) : 21; // Defaults to 21 if no number is found
}

function rearrangeArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Function for starting or resetting the game
function startGame() {
  renderList(rearrangeArray([...artifacts]), false);

  if (sortableInstance) sortableInstance.destroy(); // Remove any previous drag-and-drop functionality from the list
  // Activate Sortable.js on the timeline list - users can drag and rearrange items using the handle
  sortableInstance = Sortable.create(timelineList, { animation: 150, handle: '.drag-handle', });

  checkButton.classList.remove('d-none');
  resetButton.classList.add('d-none');
}

checkButton.addEventListener('click', () => {
  const currentTitles = Array.from(timelineList.children).map(li => li.dataset.title);
  const correctTitles = correctOrder.map(item => item.title);
  const isCorrect = currentTitles.every((title, index) => title === correctTitles[index]);

  if (isCorrect) {
    showModal('Well done!', 'bi bi-check-circle-fill');
    checkButton.classList.add('d-none');

    setTimeout(() => {
      startGame();
    }, 2010);

  } else {
    showModal('Sorry! That\'s not the right order. Here\'s the correct timeline: ', 'bi bi-x-circle-fill');
    checkButton.classList.add('d-none');
    resetButton.classList.add('d-none');

    setTimeout(() => {
      renderList(correctOrder, true); 
      resetButton.classList.remove('d-none');
      if (sortableInstance) sortableInstance.destroy(); // No dragging functionality when the correct order is shown
      sortableInstance = null;
    }, 2010);
  }
});

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  setTimeout(() => {
    modal.classList.remove('active');
  }, 2000);
}

resetButton.addEventListener('click', () => {
  startGame();
});  