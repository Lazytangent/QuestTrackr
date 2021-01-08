button = document.querySelector('.completed');

button.addEventListener('click',  async () =>{
    const res = await fetch(`/api/quests/${questId}`, {
        method: 'PUT',
    });

    button.remove();
});