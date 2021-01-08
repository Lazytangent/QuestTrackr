function getCurrentLevelFromXP(xp) {
  return Math.floor(0.5 + Math.sqrt(0.25 + (xp / 500)));
}

function getNextLevelFromXP(xp) {
  return getCurrentLevelFromXP(xp) + 1;
}

function getXPRequiredForLevel(level) {
  return (level * (level-1)) / 2 * 1000;
}

function updateXPBar() {
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
  progressBar.style.width = `${progress}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateXPBar();

  const submitBtn = document.querySelector('#_4');

  submitBtn.addEventListener('click', async event => {
    const res = await fetch('/api/quests/4', {
      method: 'PUT',
    });
    const { quest, user } = await res.json();
    console.log(user.totalXp);
    document.querySelector('#currentXp').innerHTML = user.totalXp;
    updateXPBar();
  });
});
