async function renderPage(questId) {
  const res = await fetch(`/api/quests/${questId}`);
  const { quest, message, prev, next } = await res.json();

  const pageHeading = document.querySelector('.page-heading');

  const body = document.querySelector('body');
  const questContainer = document.querySelector('.quest-container');
  const questNameDiv = document.querySelector('.quest-name');
  const questDescriptionDiv = document.querySelector('.quest-description');
  const questStartDateDiv = document.querySelector('.quest-startDate');
  const questDeadlineDiv = document.querySelector('.quest-deadline');
  const questXpValueDiv = document.querySelector('.quest-xpValue');
  const questSoloDiv = document.querySelector('.quest-solo');
  const questCompletedDateDiv = document.querySelector('.quest-completedDate');
  const questEditCompleteDiv = document.querySelector('.quest-edit-complete');

  if (message) {
    pageHeading.innerHTML = `
      <h2> ${message} </h2>
    `;
    questContainer.classList.add('hidden-container');
    return;
  }
  questContainer.classList.remove('hidden-container');

  pageHeading.innerHTML = `
    <h2> Quest No. ${quest.id} Details </h2>
  `;

  questNameDiv.innerHTML = `
    <h3> Quest: ${quest.name}
      <div class="link-container">
        <form method="get" action="/quests/edit/${quest.id}">
          <button class="edit"> Edit Quest </button>
        </form>
      </div>
    </h3>
  `;
  // questContainer.appendChild(questNameDiv);

  questDescriptionDiv.innerHTML = `
    <h5> Description: </h5>
    <p> ${quest.description} </p>
  `;
  // questContainer.appendChild(questDescriptionDiv);

  questStartDateDiv.innerHTML = `
    <h5> Started On: </h5>
    <p> ${Date(quest.startDate).toString()} </p>
  `;
  // questContainer.appendChild(questStartDateDiv);

  questDeadlineDiv.innerHTML = `
    <h5> Deadline: </h5>
    <p> ${Date(quest.deadline).toString()} </h5>
  `;
  // questContainer.appendChild(questDeadlineDiv);

  questXpValueDiv.innerHTML = `
    <h5> XP Value: </h5>
    <p> ${quest.xpValue} Points </p>
  `;
  // questContainer.appendChild(questXpValueDiv);

  if (quest.solo) {
    questSoloDiv.innerHTML = `
      <h5> Solo or group? </h5>
      <p> This quest is meant to be done solo. </p>
    `;
  } else {
    questSoloDiv.innerHTML = `
      <h5> Solo or group? </h5>
      <p> This quest is meant to be done in a group as a Raid. </p>
    `;
  }
  // questContainer.appendChild(questSoloDiv);

  if (quest.completedDate) {
    questCompletedDateDiv.removeAttribute('hidden');
    questCompletedDateDiv.innerHTML = `
      <h5> Completed On: </h5>
      <p> ${Date(quest.completedDate).toString()} </p>
    `;
    // questContainer.appendChild(questCompletedDateDiv);
  } else {
    questCompletedDateDiv.setAttribute('hidden', '');
  }

  if (!quest.completedDate) {
    questEditCompleteDiv.innerHTML = `
      <h5> Update Quest: </h5>
      <div class="update-container">
        <button class="completed completed-quest-button" id="complete-${quest.id}" onClick="window.location.reload()"> Complete Quest </button>
        <form action="/quests/delete/${quest.id}" method="post">
          <button class="delete"> Delete Quest </button>
        </form>
      </div>
    `;
  } else {
    questEditCompleteDiv.innerHTML = `
      <h5> Update Quest: </h5>
      <div class="update-container">
        <form action="/quests/delete/${quest.id}" method="post">
          <button class="delete"> Delete Quest </button>
        </form>
      </div>
    `;
  }
  // questContainer.appendChild(questEditCompleteDiv);

  // body.appendChild(questContainer);

  const movementButtons = document.querySelector('.movement-buttons');
  const previousQuest = document.createElement('button');
  const nextQuest = document.createElement('button');
  movementButtons.innerHTML = '';

  previousQuest.classList.add('movement-btn');
  previousQuest.innerHTML = `Previous`;

  nextQuest.classList.add('movement-btn');
  nextQuest.innerHTML = `Next`;

  if (prev) {
    previousQuest.id = `quest-id-${prev}`;
  } else {
    previousQuest.setAttribute('disabled', '');
    previousQuest.classList.add('btn-disabled');
  }

  if (next) {
    nextQuest.id = `quest-id-${next}`;
  } else {
    nextQuest.setAttribute('disabled', '');
    nextQuest.classList.add('btn-disabled');
  }

  movementButtons.appendChild(previousQuest);
  movementButtons.appendChild(nextQuest);

  body.appendChild(movementButtons);

  const button = document.querySelector('.completed');
  if (button) {
    button.addEventListener('click', async () =>{
      await fetch(`/api/quests/${questId}`, {
          method: 'PUT',
      });
      button.remove();
    });
  }

  const mvmtBtns = document.querySelectorAll('.movement-btn');
  mvmtBtns.forEach(btn => {
    btn.addEventListener('click', async event => {
      const btnId = event.target.id;
      const questId = btnId.slice(9);
      window.history.pushState({}, '', `/quests/${questId}`);
      document.title = `Quest #${questId}`;
      await renderPage(questId);
    });
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname.toString();
  const questId = parseInt(path.slice(8), 10);
  await renderPage(questId);

});

