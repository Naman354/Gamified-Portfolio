document.addEventListener("DOMContentLoaded", () => {
  let level = 3;
  let xp = 0;
  let timerDuration = 90; // seconds
  let timer = timerDuration;
  let timerInterval = null;
  let typingStarted = false;
  let startTime = null;

  const targetText = document.getElementById("target-text").textContent.trim();
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

  // Ensure Level Up popup is hidden on page load
  levelUpPopup.style.display = "none";

  // Timer updater
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

  typingInput.addEventListener("input", startTimer);

  submitBtn.addEventListener("click", () => {
    if (!typingStarted) return;

    clearInterval(timerInterval);
    const userText = typingInput.value.trim();

    if (userText === targetText) {
      xp += 10;
      xpEarnedText.textContent = `XP Earned: ${xp}`;
      progressFill.style.width = "100%";

      // Hide title and instruction
      challengeTitle.style.display = "none";
      challengeInstruction.style.display = "none";

      // Remove typing card and show contact section
      challengeCard.remove();
      contactSection.style.display = "flex";

      // Show Level Up popup
      level++;
      document.getElementById("level-text").textContent = `Level ${level}`;
      levelUpPopup.querySelector("h1").textContent = "Congratulations! You finished the game";
      levelUpPopup.style.display = "flex";
    } else {
      statusMsg.textContent = "❌ Text does not match!";
    }
  });

  continueBtn.addEventListener("click", () => {
    levelUpPopup.style.display = "none";
  });

  // Contact form validation
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Reset errors
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
