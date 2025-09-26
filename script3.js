let level = parseInt(localStorage.getItem("level")) || 1;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let currentQuestionIndex = 0;
let score = 0;
let quizPlayed = localStorage.getItem("quizPlayed") === "true";

const questions = [
  { question: "Which language powers web interactivity?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: 2 },
  { question: "What does CSS stand for?", options: ["Creative Style System", "Cascading Style Sheets", "Colorful Style Syntax", "Custom Style Setup"], answer: 1 },
  { question: "Which tag is used for the largest heading?", options: ["<h6>", "<h4>", "<h1>", "<head>"], answer: 2 },
  { question: "What symbol is used for IDs in CSS?", options: [". (dot)", "# (hash)", "@ (at)", "$ (dollar)"], answer: 1 },
  { question: "Which HTML element holds JavaScript?", options: ["<code>", "<javascript>", "<script>", "<js>"], answer: 2 }
];

const quizSection = document.getElementById("quiz-section");
const quizCard = document.getElementById("quiz-card");
const startBtn = document.getElementById("start-btn");
const projectsSection = document.getElementById("projects-section");
const levelText = document.getElementById("level-text");
const progressFill = document.getElementById("progress-fill");
const levelUpPopup = document.getElementById("level-up");
const quizContent = document.getElementById("quiz-content");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const quizProgress = document.getElementById("quiz-progress");
const continueBtn = document.getElementById("continue-btn");

window.addEventListener("DOMContentLoaded", () => {
  levelText.textContent = `Level ${level}`;
  if (quizPlayed) {
    quizCard.style.display = "none";
    quizContent.style.display = "none";
    projectsSection.style.display = "block";
    progressFill.style.width = "100%";
  }
});

function startQuiz() {
  if (quizPlayed) return;
  startBtn.style.display = "none";
  quizContent.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  xp = 0;
  progressFill.style.width = "0%";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(index, btn));
    optionsContainer.appendChild(btn);
  });
  quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function checkAnswer(selectedIndex, button) {
  const q = questions[currentQuestionIndex];

  if (selectedIndex === q.answer) {
    button.classList.add("correct");
    xp += 5;
  } else {
    button.classList.add("wrong");
  }

  let progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 600);
}

function finishQuiz() {
  xp += 10;
  level++;
  quizPlayed = true;

  localStorage.setItem("level", level);
  localStorage.setItem("xp", xp);
  localStorage.setItem("quizPlayed", "true");

  quizCard.remove();
  setTimeout(() => showLevelUp(), 800);
}

function showLevelUp() {
  levelText.textContent = `Level ${level}`;
  progressFill.style.width = "100%";

  let xpText = document.createElement("div");
  xpText.id = "xp-earned";
  xpText.textContent = `XP Earned: ${xp}`;
  levelUpPopup.appendChild(xpText);

  levelUpPopup.style.display = "flex";

  setTimeout(() => {
    levelUpPopup.style.display = "none";
    projectsSection.style.display = "block";
    if (continueBtn) continueBtn.style.display = "block";
    xpText.remove();
  }, 2500);
}

if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    window.location.href="page4.html";
  });
}

if (startBtn) startBtn.addEventListener("click", startQuiz);

const moreInfoButtons = document.querySelectorAll(".more-info-btn");
moreInfoButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const ul = btn.nextElementSibling;
    if (ul.style.display === "none") {
      ul.style.display = "block";
      btn.textContent = "Less Info";
    } else {
      ul.style.display = "none";
      btn.textContent = "More Info";
    }
  });
});
