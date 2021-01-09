const button = document.querySelector('.completed');

button.addEventListener('click', async () =>{
    await fetch(`/api/quests/${questId}`, {
        method: 'PUT',
    });

    button.remove();
});
