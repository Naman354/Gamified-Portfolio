let level = 1
let xp = 0
let currentQuestionIndex = 0
let score = 0
let quizPlayed = false

const questions = [
  { question: "Which language powers web interactivity?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: 2 },
  { question: "What does CSS stand for?", options: ["Creative Style System", "Cascading Style Sheets", "Colorful Style Syntax", "Custom Style Setup"], answer: 1 },
  { question: "Which tag is used for the largest heading?", options: ["<h6>", "<h4>", "<h1>", "<head>"], answer: 2 },
  { question: "What symbol is used for IDs in CSS?", options: [". (dot)", "# (hash)", "@ (at)", "$ (dollar)"], answer: 1 },
  { question: "Which HTML element holds JavaScript?", options: ["<code>", "<javascript>", "<script>", "<js>"], answer: 2 }
]

const quizSection = document.getElementById("quiz-section")
const quizCard = document.getElementById("quiz-card")
const startBtn = document.getElementById("start-btn")
const projectsSection = document.getElementById("projects-section")
const levelText = document.getElementById("level-text")
const progressFill = document.getElementById("progress-fill")
const levelUpPopup = document.getElementById("level-up")
const quizContent = document.getElementById("quiz-content")
const questionText = document.getElementById("question-text")
const optionsContainer = document.getElementById("options")
const quizProgress = document.getElementById("quiz-progress")

function startQuiz() {
  if (quizPlayed) return
  quizPlayed = true
  startBtn.style.display = "none"
  quizContent.style.display = "block"
  currentQuestionIndex = 0
  score = 0
  showQuestion()
}

function showQuestion() {
  const q = questions[currentQuestionIndex]
  questionText.textContent = q.question
  optionsContainer.innerHTML = ""
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button")
    btn.textContent = opt
    btn.classList.add("option-btn")
    btn.addEventListener("click", () => checkAnswer(index))
    optionsContainer.appendChild(btn)
  })
  quizProgress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`
}

function checkAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex]
  if (selectedIndex === q.answer) {
    score++
    xp += 5
  }
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion()
  } else {
    finishQuiz()
  }
}

function finishQuiz() {
  xp += 10
  level++
  quizCard.remove()
  setTimeout(() => {
    showLevelUp()
  }, 800)
}

function showLevelUp() {
  levelText.textContent = `Level ${level}`
  progressFill.style.width = "100%"
  levelUpPopup.style.display = "flex"
  setTimeout(() => {
    levelUpPopup.style.display = "none"
    projectsSection.style.display = "block"
  }, 2500)
}

if (startBtn) {
  startBtn.addEventListener("click", startQuiz)
}

const moreInfoButtons = document.querySelectorAll(".more-info-btn")
moreInfoButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const ul = btn.nextElementSibling
    if (ul.style.display === "none") {
      ul.style.display = "block"
      btn.textContent = "Less Info"
    } else {
      ul.style.display = "none"
      btn.textContent = "More Info"
    }
  })
})
