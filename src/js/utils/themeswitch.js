const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const checkBox = document.querySelector('.theme-switch__toggle');
checkBox.addEventListener('change', onCheked);
footer = document.querySelector('.footer');
modal = document.querySelector('.modal');

function chekLocalstorage() {
  if (localStorage.getItem('cheked') === 'true') {
    checkBox.checked = true;
    document.body.classList.add('dark-theme');
    footer.classList.add('dark-theme');
    modal.classList.add('dark-theme');
  }
}
chekLocalstorage();

function onCheked(event) {
  manageDarkTheme(checkBox.checked);
}

function manageDarkTheme(isItTimeToMakeDarkTheme) {
  const classToRemove = isItTimeToMakeDarkTheme ? 'light-theme' : 'dark-theme';
  const classToAdd = isItTimeToMakeDarkTheme ? 'dark-theme' : 'light-theme';

  document.body.classList.remove(classToRemove);
  footer.classList.remove(classToRemove);
  modal.classList.remove(classToRemove);
  document.body.classList.add(classToAdd);
  footer.classList.add(classToAdd);
  modal.classList.add(classToAdd);

  localStorage.setItem('Theme', isItTimeToMakeDarkTheme ? 'DARK' : 'LIGHT');
  localStorage.setItem('cheked', isItTimeToMakeDarkTheme);
}
