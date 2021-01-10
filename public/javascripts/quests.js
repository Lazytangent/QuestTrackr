async function createQuestDivs(category = 'all') {
  const questsContainer = document.querySelector('.quests-container');
  const res = await fetch(`/api/quests/${category}`);
  const { quests } = await res.json();
  questsContainer.innerHTML = '';

  if (!quests.length) {
    questsContainer.innerHTML = `
      <div class="errorDiv">
        <h3>No quests found in this category of ${category}</h3>
      </div>
    `;
    return;
  }

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
    categoryDiv.classList.add('quests-container__quest-container--category', 'quest-container');
    soloDiv.classList.add('quests-container__quest-container--solo', 'quest-container');
    buttonDiv.classList.add('quests-container__quest-container--button', 'quest-container');

    nameDiv.innerHTML = `
      <h4> Quest Name </h4>
      <a href="/quests/${quest.id}" class="quest-name-link"><p>${quest.name}</p></a>
    `;
    outerDiv.appendChild(nameDiv);

    deadlineDiv.innerHTML = `
      <h4> Deadline </h4>
      <p>${new Date(quest.deadline)}</p>
    `;
    outerDiv.appendChild(deadlineDiv);

    xpValueDiv.innerHTML = `
      <h4> XP Value </h4>
      <p>${quest.xpValue}</p>
    `;
    outerDiv.appendChild(xpValueDiv);

    soloDiv.innerHTML = `
      <h4> Solo? </h4>
      <p>${quest.solo}</p>
    `;
    outerDiv.appendChild(soloDiv);

    if (quest.Category) {
      categoryDiv.innerHTML = `
        <h4> Category </h4>
        <p>${quest.Category.name}</p>
      `;
      outerDiv.appendChild(categoryDiv);
    } else {
      categoryDiv.innerHTML = `
        <h4> Category </h4>
        <p> None </p>
      `;
      outerDiv.appendChild(categoryDiv);
    }

    buttonDiv.innerHTML = `
      <form method="post" action="/quests/join/${quest.id}">
        <button class="join-quest-btn" id="quest-${quest.id}"> Join Quest </button>
      </form>
    `;
    outerDiv.appendChild(buttonDiv);

    questsContainer.appendChild(outerDiv);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await createQuestDivs();

  const categorySelect = document.querySelector('#category-select');
  categorySelect.addEventListener('change', async () => {
    const newValue = categorySelect.value;
    await createQuestDivs(newValue);
  });
});
