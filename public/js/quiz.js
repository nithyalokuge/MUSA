// Script for the quiz game

let originalQuizData = []; // Array storing the JSON quiz data in the exact order defined in the JSON file
let quiz = []; // Array containing rearranged list of quiz questions
let current = 0; // Current question the player is on
let score = 0; 
let time = 30; // Countdown timer value for each question
let timer = null; // Start and stop countdown when a question is shown or answered

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById('intro-screen');
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const imageEl = document.getElementById("quiz-image");
const timerBox = document.getElementById("timer-box");
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
    })
    .catch(err => console.error("Failed to load quiz data: ", err));
});

startBtn.addEventListener('click', () => {
  startScreen.classList.add('d-none');
  quizContainer.classList.remove('d-none');
  startGame();
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
  
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.classList.remove('show');

  questionEl.textContent = q.question;

  if (q.image) {
    imageEl.classList.remove('show');
    imageEl.src = q.image;

    imageEl.onload = () => {
      imageEl.classList.add('show');
      quizContainer.classList.add('show'); 
    };
  } else {
    imageEl.removeAttribute('src');
    imageEl.classList.remove('show');
    quizContainer.classList.add('show'); 
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

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  time = 30;
  timerBox.textContent = `Timer: ${time}s`;
  timer = setInterval(() => {
    time--;
    timerBox.textContent = `Timer: ${time}s`;
    if (time === 0) {
      clearInterval(timer);
      showAnswer(null);
    }
  }, 1000);
}

function showAnswer(selected) {
  clearInterval(timer);
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
  }, 1500);
}

function endGame() {
  showModal(`Game completed! Your score is: ${score}/${quiz.length}.`, "bi-emoji-smile-fill");
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  setTimeout(() => {
    modal.classList.remove('active');
    showStartScreen();
  }, 2500);
}

function showStartScreen() {
  quizContainer.classList.add('d-none');
  startScreen.classList.remove('d-none');
  startBtn.textContent = "PLAY AGAIN";
}