async function renderPage() {
  const path = window.location.pathname.toString();
  const questId = parseInt(path.slice(8), 10);
  const res = await fetch(`/api/quests/${questId}`);
  const { quest, message } = await res.json();

  const pageHeading = document.querySelector('.page-heading');

  if (message) {
    pageHeading.innerHTML = message;
    return;
  }

  const questContainer = document.querySelector('.quest-container');
  const questNameDiv = document.querySelector('.quest-name');
  const questDescriptionDiv = document.querySelector('.quest-description');
  const questStartDateDiv = document.querySelector('.quest-startDate');
  const questDeadlineDiv = document.querySelector('.quest-deadline');
  const questXpValueDiv = document.querySelector('.quest-xpValue');
  const questSoloDiv = document.querySelector('.quest-solo');
  const questCompletedDateDiv = document.querySelector('.quest-completedDate');
  const questEditCompleteDiv = document.querySelector('.quest-edit-complete');
  const updateContainerDiv = document.querySelector('.update-container');
};
document.addEventListener('DOMContentLoaded', async () => {

  const button = document.querySelector('.completed');

  button.addEventListener('click',  async () =>{
    const res = await fetch(`/api/quests/${questId}`, {
      method: 'PUT',
    });
    button.remove();
  });
});

