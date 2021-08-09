
const homeButtonEl = document.querySelector('.home-button');
const myLibraryButtonEl = document.querySelector('.my-library-button');

const headerEl = document.querySelector('#header');
const headerFormEl = document.querySelector('#header-form');

const libraryButtonsBlockEl = document.querySelector('#library-buttons-block');

homeButtonEl.addEventListener("click", transitToHomePage);

function transitToHomePage() {
    headerEl.classList.remove('header-my-library');
    headerEl.classList.add('header-home');
    homeButtonEl.classList.add('header__link--active');
    myLibraryButtonEl.classList.remove('header__link--active');
    headerFormEl.classList.add('header__form');
    headerFormEl.classList.remove('header__form-disable');
    libraryButtonsBlockEl.classList.add('library-buttons-block-disable');
    libraryButtonsBlockEl.classList.remove('library-buttons-block');
}

myLibraryButtonEl.addEventListener("click", transitToMyLibraryPage);

function transitToMyLibraryPage() {
    headerEl.classList.remove('header-home');
    headerEl.classList.add('header-my-library');
    homeButtonEl.classList.remove('header__link--active');
    myLibraryButtonEl.classList.add('header__link--active');
    headerFormEl.classList.remove('header__form');
    headerFormEl.classList.add('header__form-disable');
    libraryButtonsBlockEl.classList.remove('library-buttons-block-disable');
    libraryButtonsBlockEl.classList.add('library-buttons-block');
}