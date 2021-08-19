const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const checkBox = document.querySelector(".theme-switch__toggle");
checkBox.addEventListener("change", onCheked);
footer = document.querySelector(".footer");
modal = document.querySelector(".modal");

function chekLocalstorage() {
  if (localStorage.getItem("cheked") === "true") {
   checkBox.checked = true;
   addTheme(Theme.DARK);
     }
}
chekLocalstorage();

function removeTheme(theme){
  document.body.classList.remove(theme);
  footer.classList.remove(theme);
  modal.classList.remove(theme);
}

function addTheme(theme){
  document.body.classList.add(theme);
  footer.classList.add(theme);
  modal.classList.add(theme);
}

function onCheked(event){
   
    if (checkBox.checked) {
    removeTheme(Theme.LIGHT);
    addTheme(Theme.DARK);

      localStorage.setItem("Theme", "DARK");
    localStorage.setItem("cheked", "true");
    checkBox.checked = true;

      return;
    }

    removeTheme(Theme.DARK);
    addTheme(Theme.LIGHT);
    localStorage.setItem("Theme", "LIGHT");
    localStorage.setItem("cheked", "false");
   }
