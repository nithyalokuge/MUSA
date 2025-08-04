// Script for the quiz game

let originalQuizData = []; // Array storing the JSON quiz data in the exact order defined in the JSON file
let quiz = []; // Array containing rearranged list of quiz questions
let current = 0; // Current question the player is on
let score = 0; 

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const imageEl = document.getElementById("quiz-image");
const progressCount = document.getElementById("progress-count");
const scoreDisplay = document.getElementById("score-display");
const modal = document.getElementById("modal");
const modalIcon = modal.querySelector(".modal-icon");
const modalText = modal.querySelector("p");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/js/quiz.json")
    .then(res => res.json())
    .then(data => {
      originalQuizData = data;
      quiz = rearrange([...originalQuizData]);
      startGame();
    })
    .catch(err => console.error("Failed to load quiz data: ", err));
});

function rearrange(array) {
  /* 
    Rearrange the question order randomly using the Fisher-Yates shuffle algorithm to ensure the questions are displayed in a random order each time.
    https://www.geeksforgeeks.org/dsa/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/ (Accessed July 6, 2025)
  */

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Rearrange the options inside each question
  array.forEach(q => {
    q.options = rearrangeOptions([...q.options]);
  });
  return array;
}

function rearrangeOptions(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  current = 0;
  score = 0;
  quiz = rearrange([...originalQuizData]);
  showQuestion();
}

function showQuestion() {
  const q = quiz[current];
  
  questionEl.textContent = q.question;

  if (q.image) {
    imageEl.classList.remove('show');
    imageEl.src = q.image;

    imageEl.onload = () => {
      imageEl.classList.add('show');
    };
  } else {
    imageEl.removeAttribute('src');
    imageEl.classList.remove('show');
  }

  optionsEl.innerHTML = "";
  progressCount.textContent = `Question ${current + 1} / ${quiz.length}`;
  scoreDisplay.textContent = `Score: ${score} / ${quiz.length}`;

  q.options.forEach(opt => {
    const btnWrapper = document.createElement("div");
    btnWrapper.className = "col";

    const btn = document.createElement("button");
    btn.className = "quiz-btn";
    btn.textContent = opt;
    btn.onclick = () => showAnswer(opt);

    btnWrapper.appendChild(btn);
    optionsEl.appendChild(btnWrapper);
  });
}

function showAnswer(selected) {
  const q = quiz[current];
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === q.answer) {
    score++;
  }

  setTimeout(() => {
    current++;
    if (current < quiz.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 2000);
}

function endGame() {
  showModal(`Game completed! Your score is: ${score}/${quiz.length}. Resetting...`, "bi-emoji-smile-fill");
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  document.body.style.pointerEvents = 'none';
  
  setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.pointerEvents = 'auto';
    startGame();
  }, 4500);
}