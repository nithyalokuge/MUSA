// Script for showing different maps when the respective buttons are clicked

function filterImages(floor) {
  const allImages = document.querySelectorAll('.gallery-img');
  allImages.forEach(img => img.classList.remove('active'));

  if (floor === 'all') {
    const allFloorImage = document.querySelector('.gallery-img.all');
    if (allFloorImage) {
      allFloorImage.classList.add('active');
    }
  } else {
    const selectedImg = document.querySelector(`.gallery-img.${floor}`);
    if (selectedImg) {
      selectedImg.classList.add('active');
    }
  }

  const buttons = document.querySelectorAll('.button-row .btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-active');
    btn.classList.add('btn-not-active');
  });

  const buttonMap = {
    all: 'All',
    floor3: 'Top',
    floor2: 'First',
    floor1: 'Ground'
  };

  const clickedBtn = Array.from(buttons).find(
    btn => btn.textContent.trim() === buttonMap[floor]
  );

  if (clickedBtn) {
    clickedBtn.classList.remove('btn-not-active');
    clickedBtn.classList.add('btn-active');
  }
}
