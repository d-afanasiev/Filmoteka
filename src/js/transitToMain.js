
const homeButtonEl = document.querySelector('.home-button');
const myLibraryButtonEl = document.querySelector('.my-library-button');

const headerEl = document.querySelector('#header');
const headerFormEl = document.querySelector('#header-form');

const libraryButtonsBlockEl = document.querySelector('#library-buttons-block');

const logoBlockEl = document.querySelector('#logo-block');

headerEl.classList.remove('header-my-library');
libraryButtonsBlockEl.classList.add('library-buttons-block-disable');

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

    watchedButtonEl.classList.add("library-button-active");
    queueButtonEl.classList.remove("library-button-active");

    console.log("Here function for show Watched");
}

logoBlockEl.addEventListener('click', transitToHomePage);

const watchedButtonEl = document.querySelector('#watched-button');
const queueButtonEl = document.querySelector('#queue-button');
watchedButtonEl.classList.add("library-button-active");

watchedButtonEl.addEventListener('click', showWatched);
queueButtonEl.addEventListener('click', showQueue);

function showWatched() {
    watchedButtonEl.classList.add("library-button-active");
    queueButtonEl.classList.remove("library-button-active");

    console.log("Here function for show Watched");
}

function showQueue() {
    queueButtonEl.classList.add("library-button-active");
    watchedButtonEl.classList.remove("library-button-active");

    console.log("Here function for show Queue");
}
