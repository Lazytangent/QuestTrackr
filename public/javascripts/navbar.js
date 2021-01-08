document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('searchbar');

  searchBar.onkeypress = (event) => {
    if(!event) event = window.event;
    const keyCode = event.code || event.key;

    if(keyCode === 'Enter') {
      //Perform the search
      console.log(searchBar.value)
    }
  }
});
