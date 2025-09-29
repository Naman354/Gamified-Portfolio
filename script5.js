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
    if (level > 0) window.location.href = `page${level+1}.html`;
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
  const challengeSection = document.getElementById("challenge-section");
  const paragraphs = [
    "Once upon a time in a land of code, the brave programmer typed furiously to save the kingdom from bugs.",
    "As the sun set behind the mountains, she typed the final line that would unlock the secrets of the ancient scroll.",
    "In a world where every word matters, one keystroke could change everything.",
    "In the quiet of the night, the fingers of the coder danced across the keyboard, weaving spells of logic and magic.",
    "With every line of code, the programmer built a bridge between imagination and reality, where ideas came alive on the screen.",
  ];

  const randomIndex = Math.floor(Math.random() * paragraphs.length);
  const selectedParagraph = paragraphs[randomIndex];

  const targetTextEl = document.getElementById("target-text");
  if (targetTextEl) targetTextEl.textContent = selectedParagraph;

  const targetText = selectedParagraph;
  document.getElementById("level-text").textContent = `Level ${level}`;

  if (localStorage.getItem("typingCompleted") === "true") {
    if (challengeCard) challengeCard.remove();
    contactSection.style.display = "flex";
    if (challengeSection) challengeSection.style.display = "none";
    progressFill.style.width = "100%";
    xpEarnedText.textContent = `XP Earned: ${xp}`;
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
        typingStarted = false;
      }
    }, 1000);
  }

  typingInput.addEventListener("input", () => {
    startTimer(); // keep your timer logic

    const userText = typingInput.value;
    let highlightedText = "";

    for (let i = 0; i < targetText.length; i++) {
      if (i < userText.length) {
        if (userText[i] === targetText[i]) {
          highlightedText += `<span class="correct">${targetText[i]}</span>`;
        } else {
          highlightedText += `<span class="incorrect">${targetText[i]}</span>`;
        }
      } else {
        highlightedText += targetText[i]; // letters not typed yet
      }
    }

  targetTextEl.innerHTML = highlightedText;
});


  submitBtn.addEventListener("click", () => {
    if (!typingStarted) return;

    clearInterval(timerInterval);
    const userText = typingInput.value.trim();

    if (userText === targetText) {
      xp += 10;
      xpEarnedText.textContent = `XP Earned: ${xp}`;
      progressFill.style.width = "100%";

      if (challengeTitle) challengeTitle.style.display = "none";
      if (challengeInstruction) challengeInstruction.style.display = "none";
      if (challengeSection) challengeSection.style.display = "none";
      
      if (challengeCard) challengeCard.remove();
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

  continueBtn.addEventListener("click", () => {
    levelUpPopup.style.display = "none";
  });

  typingInput.addEventListener("paste", (e) => {
    e.preventDefault();
    alert("Pasting is not allowed in this typing challenge!");
  });

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!name || !email || !message) {
      console.error("Contact form inputs missing in DOM!");
      return;
    }

    ["name", "email", "message"].forEach((id) => {
      const errEl = document.getElementById(`${id}-error`);
      if (errEl) errEl.textContent = "";
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
