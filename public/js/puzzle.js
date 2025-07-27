// Script for the puzzle

document.addEventListener("DOMContentLoaded", () => {
  let selected = null;
  const container = document.querySelector(".puzzle-container");
  const modal = document.getElementById('modal');
  const modalIcon = modal.querySelector('.modal-icon');
  const modalText = modal.querySelector('p');
  const showPictureBtn = document.getElementById('showPictureBtn');
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModalBtn = document.querySelector('.modal-close-btn');

  const originalOrder = [
    "puzzle-game1.jpg", "puzzle-game2.jpg", "puzzle-game3.jpg",
    "puzzle-game4.jpg", "puzzle-game5.jpg", "puzzle-game6.jpg",
    "puzzle-game7.jpg", "puzzle-game8.jpg", "puzzle-game9.jpg"
  ];

  const originalImageSrc = "/img/games/puzzle-game.jpg"; 
  const originalImageAlt = "Original puzzle image";

  /* 
    Rearrange the array randomly using the Fisher-Yates shuffle algorithm to ensure the game tiles are displayed in a random order each time.
    https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ (Accessed July 6, 2025)
  */

  function rearrange() {
    const pieces = Array.from(container.children);
    const shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    shuffled.forEach(piece => container.appendChild(piece));
  }

  function swapPieces(piece1, piece2) {
    const tempSrc = piece1.src;
    const tempAlt = piece1.alt;
    piece1.src = piece2.src;
    piece1.alt = piece2.alt;
    piece2.src = tempSrc;
    piece2.alt = tempAlt;
  }

  function checkPuzzle() {
    const currentOrder = Array.from(container.children).map(p => p.src.split("/").pop());
    return currentOrder.join() === originalOrder.join();
  }

  container.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("puzzle-piece")) return;

    if (!selected) {
      selected = target;
      target.classList.add("selected");
    } else if (selected === target) {
      selected.classList.remove("selected");
      selected = null;
    } else {
      swapPieces(selected, target);
      selected.classList.remove("selected");
      selected = null;

      if (checkPuzzle()) {
        setTimeout(() => {
          showModal("Well done! Puzzle completed! Resetting...", "bi-emoji-wink-fill");
        }, 2000);
      }
    }
  });

  function showModal(message, iconClass) {
    modalText.textContent = message;
    modalIcon.className = `modal-icon ${iconClass}`;
    modal.classList.add('active');

    document.body.style.pointerEvents = 'none';
    
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.pointerEvents = 'auto';
      rearrange();
    }, 4500);
  }

  showPictureBtn.addEventListener('click', () => {
    modalImage.src = originalImageSrc;
    modalImage.alt = originalImageAlt;
    imageModal.style.display = 'flex';
    closeModalBtn.classList.add('puzzle');
  });

  closeModalBtn.addEventListener('click', () => {
    imageModal.style.display = 'none';
  });

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
      imageModal.style.display = 'none';
    }
  });

  rearrange();
});
