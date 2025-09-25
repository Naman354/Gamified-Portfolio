let level = 2;
let xp = 0;
let draggedSkill = null;

const skillCards = document.querySelectorAll(".skill-card");
const dropZones = document.querySelectorAll(".drop-zone");
const progressFill = document.getElementById("progress-fill");
const levelText = document.getElementById("level-text");
const levelUpPopup = document.getElementById("level-up");
const xpEarnedText = document.getElementById("xp-earned");
const resetBtn = document.getElementById("reset-btn");
const continueBtn = document.getElementById("continue-btn");
const puzzleSection = document.getElementById("puzzle-section");
const skillsSection = document.getElementById("skills-section");

// Track remaining targets per skill
let remainingTargets = {};
skillCards.forEach(card => {
  remainingTargets[card.dataset.skill] = card.dataset.targets.split(",");
});

// Track remaining skills per project
let projectRemainingSkills = {};
dropZones.forEach(zone => {
  projectRemainingSkills[zone.dataset.project] = [];
});

// Initialize projectRemainingSkills
for (const skill in remainingTargets) {
  remainingTargets[skill].forEach(proj => {
    projectRemainingSkills[proj].push(skill);
  });
}

skillCards.forEach(card => {
  card.addEventListener("dragstart", e => draggedSkill = card);
  card.addEventListener("touchstart", e => draggedSkill = card);
});

dropZones.forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", () => handleDrop(zone));
  zone.addEventListener("touchend", () => handleDrop(zone));
});

function handleDrop(zone) {
  if (!draggedSkill || zone.classList.contains("locked")) return;

  const skillName = draggedSkill.dataset.skill;
  const zoneProject = zone.dataset.project;
  const skillTargets = remainingTargets[skillName];

  if (skillTargets.includes(zoneProject)) {
    zone.classList.add("correct");
    remainingTargets[skillName] = skillTargets.filter(p => p !== zoneProject);
    projectRemainingSkills[zoneProject] = projectRemainingSkills[zoneProject].filter(s => s !== skillName);

    xp += 5; // XP increment

    if (remainingTargets[skillName].length === 0) {
      draggedSkill.style.display = "none";
    }

    // Lock project if no remaining skills
    if (projectRemainingSkills[zoneProject].length === 0) {
      zone.classList.add("locked");
    }

    setTimeout(() => zone.classList.remove("correct"), 400);
  } else {
    zone.classList.add("incorrect");
    setTimeout(() => zone.classList.remove("incorrect"), 800);
  }

  draggedSkill = null;

  // Check if all projects are completed
  const allDone = Object.values(projectRemainingSkills).every(arr => arr.length === 0);
  if (allDone) {
    showLevelUp();
  }

  updateProgressBar();
}

function updateProgressBar() {
  let totalDrops = 0;
  let completedDrops = 0;

  for (const skill in remainingTargets) {
    totalDrops += remainingTargets[skill].length + (skillCards.namedItem(skill) ? 1 : 0);
  }
  completedDrops = totalDrops ? totalDrops - Object.values(remainingTargets).flat().length : 0;

  let percent = Math.min((completedDrops / totalDrops) * 100, 100);
  progressFill.style.width = percent + "%";
}

function showLevelUp() {
  xpEarnedText.textContent = `XP Earned: ${xp}`;
  level++;
  levelText.textContent = `Level ${level}`;
  levelUpPopup.style.display = "flex";
}

// Close level up on click
continueBtn.addEventListener("click", () => {
  levelUpPopup.style.display = "none";
  puzzleSection.style.display = "none";
  skillsSection.style.display = "flex";
});

resetBtn.addEventListener("click", () => {
  skillCards.forEach(card => card.style.display = "inline-block");
  xp = 0;
  progressFill.style.width = "0%";
  dropZones.forEach(zone => {
    zone.classList.remove("correct", "incorrect", "locked");
  });

  // Reset remainingTargets
  skillCards.forEach(card => {
    remainingTargets[card.dataset.skill] = card.dataset.targets.split(",");
  });

  // Reset projectRemainingSkills
  for (const proj in projectRemainingSkills) {
    projectRemainingSkills[proj] = [];
  }
  for (const skill in remainingTargets) {
    remainingTargets[skill].forEach(proj => {
      projectRemainingSkills[proj].push(skill);
    });
  }
});
