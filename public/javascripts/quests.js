const createQuestDivs = async function createDivsForQuests (category = 'all') {
  const questsContainer = document.querySelector('.quests-container');
  const res = await fetch(`/api/quests/${category}`);
  const quests = await res.json();

  for (let quest of quests) {
    const outerDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const deadlineDiv = document.createElement('div');
    const xpValueDiv = document.createElement('div');
    const soloDiv = document.createElement('div');
    const categoryDiv = document.createElement('div');
    const buttonDiv = document.createElement('div');
    outerDiv.classList.add('quests-container__quest-container');
    nameDiv.classList.add('quests-container__quest-container--name', 'quest-container');
    deadlineDiv.classList.add('quests-container__quest-container--deadline', 'quest-container');
    xpValueDiv.classList.add('quests-container__quest-container--xpValue', 'quest-container');
    soloDiv.classList.add('quests-container__quest-container--solo', 'quest-container');
    categoryDiv.classList.add('quests-container__quest-container--category', 'quest-container');
    buttonDiv.classList.add('quests-container__quest-container--button', 'quest-container');

  }
};

document.addEventListener('DOMContentLoaded', async () => {
});
