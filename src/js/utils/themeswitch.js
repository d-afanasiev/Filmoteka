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
    document.body.classList.add("dark-theme");
    footer.classList.add("dark-theme");
    modal.classList.add("dark-theme");
     }
}
      chekLocalstorage();



function onCheked(event){
   
  
       
    if (checkBox.checked) {
      document.body.classList.remove("light-theme");
      footer.classList.remove("light-theme");
      modal.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      footer.classList.add("dark-theme");
      modal.classList.add("dark-theme");

      localStorage.setItem("Theme", "DARK");
    localStorage.setItem("cheked", "true");
    checkBox.checked = true;

      return;
    }

    document.body.classList.remove("dark-theme");
    footer.classList.remove("dark-theme");
    modal.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    footer.classList.add("light-theme");
    modal.classList.add("light-theme");
    localStorage.setItem("Theme", "LIGHT");
    localStorage.setItem("cheked", "false");
   }
