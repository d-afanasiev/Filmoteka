
const homeButtonEl = document.querySelector('.home-button');

homeButtonEl.addEventListener("click", transitToHomePage);

function transitToHomePage() {
    console.log("Home-page open");
}

const myLibraryButtonEl = document.querySelector('.my-library-button');

myLibraryButtonEl.addEventListener("click", transitToMyLibraryPage);

function transitToMyLibraryPage() {
    console.log("My-Library-page open");
}