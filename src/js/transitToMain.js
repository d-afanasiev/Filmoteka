
const homeButtonEl = document.querySelector('.home-button');

const myLibraryButtonEl = document.querySelector('.my-library-button');

const headerEl = document.querySelector('#header');

const headerFormEl = document.querySelector('#header-form');

homeButtonEl.addEventListener("click", transitToHomePage);

function transitToHomePage() {
    headerEl.classList.remove('header-my-library');
    headerEl.classList.add('header-home');
    homeButtonEl.classList.add('header__link--active');
    myLibraryButtonEl.classList.remove('header__link--active');
    headerFormEl.classList.add('header__form');
    headerFormEl.classList.remove('header__form-disable');
}

myLibraryButtonEl.addEventListener("click", transitToMyLibraryPage);

function transitToMyLibraryPage() {
    headerEl.classList.remove('header-home');
    headerEl.classList.add('header-my-library');
    homeButtonEl.classList.remove('header__link--active');
    myLibraryButtonEl.classList.add('header__link--active');
    headerFormEl.classList.remove('header__form');
    headerFormEl.classList.add('header__form-disable');
    console.log("Home-page open");
}

const myLibraryButtonEl = document.querySelector('.my-library-button');

myLibraryButtonEl.addEventListener("click", transitToMyLibraryPage);

function transitToMyLibraryPage() {
    console.log("My-Library-page open");
}