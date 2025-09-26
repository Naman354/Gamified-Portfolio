document.addEventListener("DOMContentLoaded", () => {
  let level = parseInt(localStorage.getItem("level")) || 2;
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  let draggedSkill = null;

  const skillCards = Array.from(document.querySelectorAll(".skill-card"));
  const dropZones = Array.from(document.querySelectorAll(".drop-zone"));
  const progressFill = document.getElementById("progress-fill");
  const levelText = document.getElementById("level-text");
  const levelUpPopup = document.getElementById("level-up");
  const xpEarnedText = document.getElementById("xp-earned");
  const resetBtn = document.getElementById("reset-btn");
  const continueBtn = document.getElementById("continue-btn");
  const skillsContinueBtn = document.getElementById("skills-continue-btn");
  const puzzleSection = document.getElementById("puzzle-section");
  const skillsSection = document.getElementById("skills-section");

  const initialRemainingTargets = {};
  const remainingTargets = {};
  const projectRemainingSkills = {};
  let initialTotalDrops = 0;

  skillCards.forEach(card => {
    const key = card.dataset.skill;
    const raw = card.dataset.targets || "";
    const arr = raw.split(",").map(s => s.trim()).filter(Boolean);
    initialRemainingTargets[key] = arr.slice();
    remainingTargets[key] = arr.slice();
    initialTotalDrops += arr.length;
  });

  dropZones.forEach(zone => {
    projectRemainingSkills[zone.dataset.project] = [];
  });

  for (const skill in remainingTargets) {
    remainingTargets[skill].forEach(proj => {
      if (projectRemainingSkills[proj]) projectRemainingSkills[proj].push(skill);
    });
  }

  function updateProgressBar() {
    const currentRemaining = Object.values(remainingTargets).reduce((sum, arr) => sum + arr.length, 0);
    const completed = initialTotalDrops - currentRemaining;
    const percent = initialTotalDrops === 0 ? 100 : Math.round((completed / initialTotalDrops) * 100);
    progressFill.style.width = percent + "%";
  }

  function handleDrop(zone) {
    if (!draggedSkill) return;
    if (zone.classList.contains("locked")) {
      draggedSkill = null;
      return;
    }

    const skillName = draggedSkill.dataset.skill;
    const zoneProject = zone.dataset.project;
    const skillTargets = remainingTargets[skillName] || [];

    if (skillTargets.includes(zoneProject)) {
      zone.classList.add("correct");
      remainingTargets[skillName] = skillTargets.filter(p => p !== zoneProject);
      if (projectRemainingSkills[zoneProject]) {
        projectRemainingSkills[zoneProject] = projectRemainingSkills[zoneProject].filter(s => s !== skillName);
      }

      xp += 5;

      if (!remainingTargets[skillName] || remainingTargets[skillName].length === 0) {
        draggedSkill.style.display = "none";
      }

      if (projectRemainingSkills[zoneProject] && projectRemainingSkills[zoneProject].length === 0) {
        zone.classList.add("locked");
      }

      setTimeout(() => zone.classList.remove("correct"), 400);
    } else {
      zone.classList.add("incorrect");
      setTimeout(() => zone.classList.remove("incorrect"), 700);
    }

    draggedSkill = null;
    updateProgressBar();

    const stillRemaining = Object.values(remainingTargets).reduce((s, a) => s + a.length, 0);
    if (stillRemaining === 0) {
      finishSkillsPuzzle();
    }
  }

  function finishSkillsPuzzle() {
    xpEarnedText.textContent = `XP Earned: ${xp}`;
    level++;
    levelText.textContent = `Level ${level}`;
    skillsSection.style.display = "block";
    levelUpPopup.style.display = "flex";
    puzzleSection.style.display = "none";

    // Save progress to localStorage
    localStorage.setItem("skillsCompleted", "true");
    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);
  }

  // Restore progress on page load
  if (localStorage.getItem("skillsCompleted") === "true") {
    skillsSection.style.display = "block";
    puzzleSection.style.display = "none";
    levelText.textContent = `Level ${level}`;
    progressFill.style.width = "100%";
  }

  skillCards.forEach(card => {
    card.addEventListener("dragstart", e => {
      draggedSkill = card;
      if (e.dataTransfer) e.dataTransfer.setData("text/plain", card.dataset.skill);
    });
    card.addEventListener("touchstart", () => {
      draggedSkill = card;
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", e => {
      e.preventDefault();
      handleDrop(zone);
    });
    zone.addEventListener("touchend", () => handleDrop(zone));
  });

  continueBtn.addEventListener("click", () => {
    levelUpPopup.style.display = "none";
  });

  skillsContinueBtn.addEventListener("click", () => {
    window.location.href="page5.html";
  });

  resetBtn.addEventListener("click", () => {
    xp = 0;
    draggedSkill = null;
    Object.keys(initialRemainingTargets).forEach(k => {
      remainingTargets[k] = initialRemainingTargets[k].slice();
    });
    Object.keys(projectRemainingSkills).forEach(p => projectRemainingSkills[p] = []);
    for (const skill in remainingTargets) {
      remainingTargets[skill].forEach(proj => {
        if (projectRemainingSkills[proj]) projectRemainingSkills[proj].push(skill);
      });
    }
    skillCards.forEach(card => {
      card.style.display = "inline-block";
    });
    dropZones.forEach(zone => {
      zone.classList.remove("locked", "correct", "incorrect");
      zone.style.background = "";
      zone.style.border = "";
    });
    progressFill.style.width = "0%";
    levelUpPopup.style.display = "none";
    skillsSection.style.display = "none";
    puzzleSection.style.display = "block";

    // Clear localStorage for restart
    localStorage.removeItem("skillsCompleted");
    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);
  });

  updateProgressBar();
});
