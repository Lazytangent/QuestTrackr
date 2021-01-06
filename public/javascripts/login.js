document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('#submit');

  // submitButton.setAttribute('disabled', true);
  // Select required input fields

  const logoContainer = document.querySelector('.logo-container');
  logoContainer.addEventListener('click', () => {
    window.location.href = '/';
  });
});
