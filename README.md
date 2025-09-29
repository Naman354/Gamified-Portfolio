GAMIFIED PORTFOLIO

A unique, interactive portfolio where each section is unlocked by completing a fun mini-game challenge. Instead of just scrolling through static pages, visitors engage with short challenges that reveal different parts of the portfolio step by step.

Tech Stack:
HTML – structure of the portfolio
CSS – styling, layout, and UI polish
JavaScript (Vanilla) – game logic, level progression, localStorage persistence

How It Works:
The portfolio is divided into 4 levels.
Each level corresponds to a challenge.
Completing a challenge unlocks a portfolio section.

Progress is saved in localStorage, so once you clear a level, you don’t have to redo it when revisiting or navigating.

Level Breakdown
Level 1 → No challenge, just the introduction (unlocked by default).
Level 2 → Quiz challenge (answer simple questions). Unlocks portfolio section #2.
Level 3 → Drag-and-drop puzzle (match items correctly). Unlocks portfolio section #3.
Level 4 → Typing challenge (type a given text accurately before the timer ends). Unlocks the final portfolio section.

All challenges are short and simple, designed to be completed in under a minute.

Features
Gamified experience for exploring a portfolio
Progress tracking with localStorage
XP & Level system
Level-up popup after each completed challenge
Contact form validation (name, email, message)
Note: The form currently has no backend integration; it just validates input and shows a success message.

Persistence with LocalStorage
level → stores current level
xp → stores XP earned
typingCompleted → tracks if the typing challenge is done
This ensures progress is not lost if the page is refreshed or revisited.

Running Locally
Clone the repository:
git clone https://github.com/your-username/gamified-portfolio.git
Navigate into the project folder:
cd gamified-portfolio
Open index.html in your browser and play!

Live Demo
The project is deployed on GitHub Pages: 
https://naman354.github.io/Gamified-Portfolio/


