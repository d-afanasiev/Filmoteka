import { renderFilm } from './renderMainPage';
import Spinner from './utils/spinner';
import { renderWatchedQueueFilms } from './renderWatchedQueue';

import { refs } from './refs';

const {
  homeButtonEl,
  myLibraryButtonEl,
  headerEl,
  headerFormEl,
  headerInput,
  libraryButtonsBlockEl,
  logoBlockEl,
  watchedButtonEl,
  queueButtonEl,
} = refs;

homeButtonEl.addEventListener('click', transitToHomePage);

function transitToHomePage() {
  headerEl.classList.remove('header-my-library');
  headerEl.classList.add('header-home');
  homeButtonEl.classList.add('header__link--active');
  myLibraryButtonEl.classList.remove('header__link--active');
  headerFormEl.classList.add('header__form');
  headerFormEl.classList.remove('header__form-disable');
  libraryButtonsBlockEl.classList.add('library-buttons-block-disable');
  libraryButtonsBlockEl.classList.remove('library-buttons-block');
  renderFilm();
  localStorage.setItem('isLibrary', JSON.stringify(false));
  localStorage.setItem('isWatchedLibrary', JSON.stringify(true));
  headerInput.value = '';
}

myLibraryButtonEl.addEventListener('click', transitToMyLibraryPage);

function transitToMyLibraryPage() {
  headerEl.classList.remove('header-home');
  headerEl.classList.add('header-my-library');
  homeButtonEl.classList.remove('header__link--active');
  myLibraryButtonEl.classList.add('header__link--active');
  headerFormEl.classList.remove('header__form');
  headerFormEl.classList.add('header__form-disable');
  libraryButtonsBlockEl.classList.remove('library-buttons-block-disable');
  libraryButtonsBlockEl.classList.add('library-buttons-block');

  watchedButtonEl.classList.add('library-button-active');
  queueButtonEl.classList.remove('library-button-active');
  renderWatchedQueueFilms('watched');
  localStorage.setItem('isLibrary', JSON.stringify(true));
}

logoBlockEl.addEventListener('click', transitToHomePage);

watchedButtonEl.classList.add('library-button-active');

watchedButtonEl.addEventListener('click', showWatched);
queueButtonEl.addEventListener('click', showQueue);

function showWatched() {
  watchedButtonEl.classList.add('library-button-active');
  queueButtonEl.classList.remove('library-button-active');
  localStorage.setItem('isWatchedLibrary', JSON.stringify(true));
  renderWatchedQueueFilms('watched');
}

function showQueue() {
  queueButtonEl.classList.add('library-button-active');
  watchedButtonEl.classList.remove('library-button-active');
  localStorage.setItem('isWatchedLibrary', JSON.stringify(false));
  renderWatchedQueueFilms('queue');
}
