function getCurrentLevelFromXP(xp) {
  return Math.floor(0.5 + Math.sqrt(0.25 + (xp / 500)));
}

function getNextLevelFromXP(xp) {
  return getCurrentLevelFromXP(xp) + 1;
}

function getXPRequiredForLevel(level) {
  return (level * (level - 1)) / 2 * 1000;
}

function updateXPBar() {
  const currLevel = document.querySelector('#currentLevel');
  const nextLevel = document.querySelector('#nextLevel');
  const progressBar = document.querySelector('.nav-container__xp-section--fill');
  const currentXP = document.querySelector('#currentXp').innerHTML;

  const actualLevel = getCurrentLevelFromXP(currentXP);
  const thisLevelXP = getXPRequiredForLevel(actualLevel);
  const nextLevelXP = getXPRequiredForLevel(actualLevel + 1);

  const progress = ((currentXP - thisLevelXP) * 100) / (nextLevelXP - thisLevelXP);

  currLevel.innerText = actualLevel
  nextLevel.innerText = getNextLevelFromXP(currentXP);
  progressBar.style.width = `${progress}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  if(currentXP){
    updateXPBar();
  }

  const completeButtons = Array.from(document.querySelectorAll('.complete-quest-button'));

  completeButtons.forEach(completeButton => {
    completeButton.addEventListener('click', async event => {
      const questId = completeButton.id.split('-')[1];
      const res = await fetch(`/api/quests/${questId}`, {
        method: 'PUT',
      });
      const { quest, user } = await res.json();
      document.querySelector('#currentXp').innerHTML = user.totalXp;
      updateXPBar();

      // Move the quest from the active to the completed.
      const activeLi = document.querySelector("#active-quests");
      const completedLi = document.querySelector("#completed-quests");

      const questRow = completeButton.parentElement;

      activeLi.removeChild(questRow);
      completedLi.appendChild(questRow);
      completeButton.remove();
    });
  });

});
