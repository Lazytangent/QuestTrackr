/*
 1: 0 - 1000,
 2: 1000 - 3000,
 3: 3000 - 6000,
 4: 6000 - 10000,
 etc...
*/

function getCurrentLevelFromXP(xp) {
  return Math.floor(0.5 + Math.sqrt(0.25 + (xp / 500)));
}

function getNextLevelFromXP(xp) {
  return getCurrentLevelFromXP(xp) + 1;
}

function getXPRequiredForLevel(level) {
  return (level * (level-1)) / 2 * 1000;
}

document.addEventListener('DOMContentLoaded', () => {
  const currLevel = document.querySelector('#currentLevel');
  const nextLevel = document.querySelector('#nextLevel');
  const progressBar = document.querySelector('.nav-container__xp-section--fill');
  const currentXP = document.querySelector('#currentXp').innerHTML;

  const actualLevel = getCurrentLevelFromXP(currentXP);
  const thisLevelXP = getXPRequiredForLevel(actualLevel);
  const nextLevelXP = getXPRequiredForLevel(actualLevel + 1);

  const progress = ((currentXP - thisLevelXP) * 100 )/ (nextLevelXP - thisLevelXP);

  currLevel.innerText = actualLevel
  nextLevel.innerText = getNextLevelFromXP(currentXP);
  progressBar.style.width = progress + '%'; //'45%'

  //submitButton.setAttribute('disabled', true);
  // Select required input fields
});
