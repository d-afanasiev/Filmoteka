export const refs = {
  // transitToMain.js
  homeButtonEl: document.querySelector('.home-button'),
  myLibraryButtonEl: document.querySelector('.my-library-button'),

  headerEl: document.querySelector('#header'),
  headerFormEl: document.querySelector('#header-form'),
  headerInput: document.querySelector('.header__input'),

  libraryButtonsBlockEl: document.querySelector('#library-buttons-block'),

  logoBlockEl: document.querySelector('#logo-block'),

  watchedButtonEl: document.querySelector('#watched-button'),
  queueButtonEl: document.querySelector('#queue-button'),

  // modal.js
  //*for body no-scroll *
  bodyEl: document.querySelector('body'),
  //*

  filmList: document.querySelector('.film-list'),
  modalMovie: document.querySelector('.modal__template'),
  modalWindow: document.querySelector('.lightbox'),
  closeBtn: document.querySelector('.modal__button'),
  watchButton: document.querySelector('.modal__button-add'),

  // renderMainPage.js
  search: document.querySelector('.header__form'),

  // arrowScroll.js
  arrowTop: document.querySelector('.arrow-top'),
  headerHome: document.querySelector('.header-home'),
};
