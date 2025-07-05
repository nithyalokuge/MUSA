// Script for showing different maps when the respective buttons are clicked

function filterImages(floor) {
  const allImages = document.querySelectorAll('.gallery-img');
  allImages.forEach(img => img.classList.remove('active'));

  const selectedImg = document.querySelector(`.gallery-img.${floor}`);
  if (selectedImg) {
    selectedImg.classList.add('active');
  } else if (floor === 'all') {
    document.querySelector('.gallery-img.all').classList.add('active');
  }

  const buttons = document.querySelectorAll('.button-row .btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-active');
    btn.classList.add('btn-not-active');
  });

  const buttonMap = {
    all: 'All',
    floor1: 'Floor 1',
    floor2: 'Floor 2',
    floor3: 'Floor 3'
  };

  const clickedBtn = Array.from(buttons).find(
    btn => btn.textContent.trim() === buttonMap[floor]
  );

  if (clickedBtn) {
    clickedBtn.classList.remove('btn-not-active');
    clickedBtn.classList.add('btn-active');
  }
}
