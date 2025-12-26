// Script for the quiz game

let originalQuizData = []; // Array storing the JSON quiz data in the exact order defined in the JSON file
let quiz = []; // Array containing rearranged list of quiz questions
let current = 0; // Current question the player is on
let score = 0; 
let restartTimeout = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const imageEl = document.getElementById("quiz-image");
const progressCount = document.getElementById("progress-count");
const scoreDisplay = document.getElementById("score-display");
const modal = document.getElementById("modal");
const modalIcon = modal.querySelector(".modal-icon");
const modalText = modal.querySelector("p");
const certificateModal = document.getElementById("certificateModal");
const playerNameInput = document.getElementById("playerName");
const generateCertificateBtn = document.getElementById("generateCertificateBtn");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/js/quiz.json")
    .then(res => res.json())
    .then(data => {
      originalQuizData = data;
      startGame();
    })
    .catch(err => console.error("Failed to load quiz data: ", err));
});

function rearrange(array) {
  /* 
    Rearrange the questions order randomly using the Fisher-Yates shuffle algorithm to ensure the questions are displayed in a random order each time.
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
  const percentage = (score / quiz.length) * 100;

  if (percentage >= 80) {
    showCertificateModal(percentage);
  } else {
    showModal(`Game completed! Your score is: ${score}/${quiz.length}. Resetting...`, "bi-emoji-smile-fill");
  }
}

function showModal(message, iconClass) {
  modalText.textContent = message;
  modalIcon.className = `modal-icon ${iconClass}`;
  modal.classList.add('active');

  document.body.style.pointerEvents = 'none';

  if (restartTimeout) clearTimeout(restartTimeout); 
  restartTimeout = setTimeout(() => {
    modal.classList.remove('active');
    document.body.style.pointerEvents = 'auto';
    startGame();
  }, 4500);
}

function showCertificateModal(percentage) { 
  certificateModal.classList.add('active');
  document.body.style.pointerEvents = 'none';

  playerNameInput.value = "";
  playerNameInput.style.borderColor = "";
  playerNameInput.placeholder = "Enter your name";

  const message = `Congratulations! You scored ${percentage}% and earned a certificate! Enter your name to receive it.`;
  certificateModal.querySelector("p").innerText = message;
  certificateModal.querySelector(".modal-icon").className = "modal-icon bi-emoji-smile-fill";

  generateCertificateBtn.onclick = () => {
    const playerName = playerNameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]+$/; 

    playerNameInput.style.borderColor = ""; 
    playerNameInput.placeholder = "Enter your name"; 

    if (playerName === "") {
      playerNameInput.style.borderColor = "red";
      playerNameInput.placeholder = "Please enter your name"; 
      return;
    } 

    if (!nameRegex.test(playerName)) {
      playerNameInput.style.borderColor = "red"; 
      playerNameInput.placeholder = "Please enter only letters";
      return;
    }

    generateCertificate(playerName, percentage);
    certificateModal.classList.remove('active'); 
    document.body.style.pointerEvents = 'auto';

    if (restartTimeout) clearTimeout(restartTimeout); 
    startGame();
  };

  if (restartTimeout) clearTimeout(restartTimeout); 
  restartTimeout = setTimeout(() => {
    certificateModal.classList.remove('active'); 
    document.body.style.pointerEvents = 'auto';
    startGame();
  }, 50000);
}

function generateCertificate(name, percentage) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

  const img = new Image();
  img.src = "/img/win.png";
  img.onload = () => {
    const imgX = (doc.internal.pageSize.width - 50) / 2;
    const imgY = 20;

    doc.addImage(img, "PNG", imgX, imgY);

    const spaceBetweenImageAndTitle = 70;
    doc.setTextColor(37, 64, 143);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(30);
    const title = "CERTIFICATE OF ACHIEVEMENT";
    const titleWidth = doc.getTextWidth(title);
    const titleY = imgY + spaceBetweenImageAndTitle;
    doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, titleY);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(18);
    const subtitle = "This certificate is proudly presented to";
    doc.text(subtitle, (doc.internal.pageSize.width - doc.getTextWidth(subtitle)) / 2, titleY + 18);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(25);
    const userName = (name).toUpperCase();
    doc.text(userName, (doc.internal.pageSize.width - doc.getTextWidth(userName)) / 2, titleY + 38);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(18);
    const message = `for successfully completing the museum quiz with a score of ${percentage}%!`;
    doc.text(message, (doc.internal.pageSize.width - doc.getTextWidth(message)) / 2, titleY + 56);

    const currentDate = new Date();
    const formattedDate = `${("0" + currentDate.getDate()).slice(-2)}/${("0" + (currentDate.getMonth() + 1)).slice(-2)}/${currentDate.getFullYear()}`;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(15);
    const dateX = doc.internal.pageSize.width - 30 - doc.getTextWidth(formattedDate);
    const dateY = doc.internal.pageSize.height - 28;
    doc.text(formattedDate, dateX, dateY);

    const img2 = new Image();
    img2.src = "/img/certificate-logo.png";
    img2.onload = () => {
      const img2Width = 40;
      const img2Height = 20;
      const img2X = 26;
      const img2Y = doc.internal.pageSize.height - img2Height - 22;

      doc.addImage(img2, "PNG", img2X, img2Y, img2Width, img2Height);

      const externalMargin = 10;
      const externalX = externalMargin;
      const externalY = imgY - externalMargin;
      const externalWidth = doc.internal.pageSize.width - 2 * externalMargin;
      const externalHeight = doc.internal.pageSize.height - 2 * externalMargin;

      doc.setLineWidth(3);
      doc.setDrawColor(37, 64, 143);
      doc.rect(externalX, externalY, externalWidth, externalHeight);

      const internalMargin = 5;
      const internalX = externalX + internalMargin;
      const internalY = externalY + internalMargin;
      const internalWidth = externalWidth - 2 * internalMargin;
      const internalHeight = externalHeight - 2 * internalMargin;

      doc.setLineWidth(2);
      doc.setDrawColor(128, 159, 210);
      doc.rect(internalX, internalY, internalWidth, internalHeight);

      doc.save(`${userName}_Quiz-Game-Certificate_MUSA.pdf`);
    };
  };
}

