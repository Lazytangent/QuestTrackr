document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.querySelector('#submit');

  const logoContainer = document.querySelector('.logo-container');
  logoContainer.addEventListener('click', () => {
    window.location.href = '/';
  });
});
