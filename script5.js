document.addEventListener("DOMContentLoaded", () => {
  let level = parseInt(localStorage.getItem("level"));
  if (isNaN(level)) level = 0;
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let timerDuration = 90;
  let timer = timerDuration;
  let timerInterval = null;
  let typingStarted = false;
  let startTime = null;
  console.log(`Current level: ${level}`);

  const requiredLevel = 4;
  if (level < requiredLevel) {
    alert("You cannot access this level yet!");
    if(level>0) window.location.href = `page${level+1}.html`;
    else window.location.href = `index.html`;
  }
  const typingInput = document.getElementById("typing-input");
  const submitBtn = document.getElementById("submit-btn");
  const timerEl = document.getElementById("timer");
  const statusMsg = document.getElementById("status-msg");
  const challengeCard = document.getElementById("challenge-card");
  const contactSection = document.getElementById("contact-section");
  const progressFill = document.getElementById("progress-fill");
  const xpEarnedText = document.getElementById("xp-earned");
  const levelUpPopup = document.getElementById("level-up");
  const continueBtn = document.getElementById("continue-btn");

  const challengeTitle = document.getElementById("challenge-title");
  const challengeInstruction = document.getElementById("challenge-instruction");
  const levelHeading = document.getElementById("level-heading");
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Typing challenges improve your speed and accuracy. Practice makes perfect!"
  ];

const randomIndex = Math.floor(Math.random() * paragraphs.length);
const selectedParagraph = paragraphs[randomIndex];

const targetTextEl = document.getElementById("target-text");
if (targetTextEl) targetTextEl.textContent = selectedParagraph;

const targetText = selectedParagraph;
  document.getElementById("level-text").textContent = `Level ${level}`;
  if (localStorage.getItem("typingCompleted") === "true") {
    challengeCard?.remove();
    contactSection.style.display = "flex";
    progressFill.style.width = "100%";
    xpEarnedText.textContent = `XP Earned: ${xp}`;
    document.getElementById("level-text").textContent = `Level ${level}`;
    if (levelHeading) levelHeading.textContent = `LEVEL ${level}`;
  }

  levelUpPopup.style.display = "none";

  function startTimer() {
    if (typingStarted) return;
    typingStarted = true;
    startTime = Date.now();

    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      timer = timerDuration - elapsed;
      timerEl.textContent = `⏱ ${timer}s`;

      if (timer <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = "⏱ 0s";
        statusMsg.textContent = "⏱ Time's up!";
        typingInput.disabled = true;
        submitBtn.disabled = true;
      }
    }, 1000);
  }

  typingInput?.addEventListener("input", startTimer);

  submitBtn?.addEventListener("click", () => {
    if (!typingStarted) return;

    clearInterval(timerInterval);
    const userText = typingInput.value.trim();

    if (userText === targetText) {
      xp += 10;
      xpEarnedText.textContent = `XP Earned: ${xp}`;
      progressFill.style.width = "100%";

      if (challengeTitle) challengeTitle.style.display = "none";
      if (challengeInstruction) challengeInstruction.style.display = "none";

      challengeCard?.remove();
      contactSection.style.display = "flex";

      level++;
      document.getElementById("level-text").textContent = `Level ${level}`;
      if (levelHeading) levelHeading.textContent = `LEVEL ${level}`;
      levelUpPopup.style.display = "flex";

      localStorage.setItem("typingCompleted", "true");
      localStorage.setItem("level", level);
      localStorage.setItem("xp", xp);
    } else {
      statusMsg.textContent = "❌ Text does not match!";
    }
  });

  continueBtn?.addEventListener("click", () => {
    levelUpPopup.style.display = "none";
  });

  const input = document.getElementById("typing-input");


  input.addEventListener("paste", (e) => {
     e.preventDefault();
     alert("Pasting is not allowed in this typing challenge!");
    });
const form = document.getElementById("contact-form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    ["name", "email", "message"].forEach(id => {
      document.getElementById(`${id}-error`).textContent = "";
    });

    if (!name.value.trim()) {
      document.getElementById("name-error").textContent = "Name is required";
      valid = false;
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      document.getElementById("email-error").textContent = "Valid email required";
      valid = false;
    }
    if (!message.value.trim()) {
      document.getElementById("message-error").textContent = "Message is required";
      valid = false;
    }

    if (valid) {
      alert("Form submitted successfully");
      form.reset();
    }
  });
});
