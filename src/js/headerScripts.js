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

function homePageClassSwitcher(element, oldClass, newClass) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

function transitToHomePage() {

  homePageClassSwitcher(headerEl, 'header-my-library', 'header-home');
  homePageClassSwitcher(headerFormEl, 'header__form-disable', 'header__form');
  homePageClassSwitcher(libraryButtonsBlockEl, 'library-buttons-block', 'library-buttons-block-disable');
  homePageClassSwitcher(homeButtonEl, null, 'header__link--active');
  homePageClassSwitcher(myLibraryButtonEl, 'header__link--active', null);
  renderFilm();
  localStorage.setItem('isLibrary', JSON.stringify(false));
  localStorage.setItem('isWatchedLibrary', JSON.stringify(true));
  headerInput.value = '';
}

myLibraryButtonEl.addEventListener('click', transitToMyLibraryPage);

function transitToMyLibraryPage() {

  homePageClassSwitcher(headerEl, 'header-home', 'header-my-library');
  homePageClassSwitcher(headerFormEl, 'header__form', 'header__form-disable');
  homePageClassSwitcher(libraryButtonsBlockEl, 'library-buttons-block-disable', 'library-buttons-block');
  homePageClassSwitcher(homeButtonEl, 'header__link--active', null);
  homePageClassSwitcher(myLibraryButtonEl, null,'header__link--active');
  homePageClassSwitcher(watchedButtonEl, null, 'library-button-active');
  homePageClassSwitcher(queueButtonEl, 'library-button-active', null);
  renderWatchedQueueFilms('watched');
  localStorage.setItem('isLibrary', JSON.stringify(true));
}

logoBlockEl.addEventListener('click', transitToHomePage);

watchedButtonEl.classList.add('library-button-active');

watchedButtonEl.addEventListener('click', showWatched);
queueButtonEl.addEventListener('click', showQueue);

function showWatched() {
  homePageClassSwitcher(watchedButtonEl, null, 'library-button-active');
  homePageClassSwitcher(queueButtonEl, 'library-button-active', null);
  localStorage.setItem('isWatchedLibrary', JSON.stringify(true));
  renderWatchedQueueFilms('watched');
}

function showQueue() {
  homePageClassSwitcher(queueButtonEl, null, 'library-button-active');
  homePageClassSwitcher(watchedButtonEl, 'library-button-active', null);
  localStorage.setItem('isWatchedLibrary', JSON.stringify(false));
  renderWatchedQueueFilms('queue');
}