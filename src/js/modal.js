import axios from 'axios';
import markup from '../templates/markupModal.hbs';
import storageLibraryMovies from '../js/moveToLocalStorage';
import { fetchMovieId } from './fetchAPI';
import Notiflix from 'notiflix';
import Spinner from './utils/spinner';

import { refs } from './refs';

const { bodyEl, filmList, modalMovie, modalWindow, closeBtn, watchButton } = refs;

let localWatched = [];
let localQueue = [];

filmList.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  const activeImg = e.target;

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const movieId = activeImg.dataset.id;
  if (e.target.classList.value === 'film-list__img') {
    let spinner;
    if (localStorage.getItem('Theme') === 'DARK') {
      spinner = new Spinner({
        element: '.modal',
        message: 'Loading....',
        backgroundColor: '#3c4242',
        messageColor: '#FFFFFF',
      });
    } else {
      spinner = new Spinner({ element: '.modal', message: 'Loading....' });
    }
    spinner.show();
    fetchMovieId(movieId)
      .then(response => {
        const vote_average = response.data.vote_average.toFixed(1);
        const fullResult = { ...response.data, vote_average };
        modalMovie.innerHTML = markup(fullResult);
        watchButton();
        queueButton();

        function watchButton() {
          const watchButton = document.querySelector('.modal__button-add'),
            localWatched = JSON.parse(localStorage.getItem('watched'));
          let filmId = e.target.dataset.id;
          if (localWatched != null) {
            let Idx = localWatched.findIndex(option => option.id === Number.parseInt(filmId));
            if (Idx >= 0) {
              watchButton.textContent = 'Remove from Watched';
              watchButton.classList.add('modal__button-active');
            }
          }
        }

        function queueButton() {
          const queueButton = document.querySelector('.modal__button-queue'),
            localQueue = JSON.parse(localStorage.getItem('queue'));
          let filmIdQueue = e.target.dataset.id;
          if (localQueue != null) {
            let IdxQueue = localQueue.findIndex(
              option => option.id === Number.parseInt(filmIdQueue),
            );
            if (IdxQueue >= 0) {
              queueButton.textContent = 'Remove from Queue';
              queueButton.classList.add('modal__button-active');
            }
          }
        }

        storageLibraryMovies.addToLibaryWatch();
        storageLibraryMovies.addToLibaryQueue();
        spinner.hide();
      })
      .catch(error =>
        Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and '),
      );
  }

  openModal();
}

function openModal(e) {
  // closeModal();
  modalMovie.innerHTML = '';
  modalWindow.classList.add('is-open');
  window.addEventListener('keydown', onCloseModalKey);

  //*for body no-scroll *
  bodyEl.classList.add('modal-is-open');
  //*
}

closeBtn.addEventListener('click', closeModal);
modalWindow.addEventListener('click', onCloseModalWindow);

function closeModal() {
  modalWindow.classList.remove('is-open');
  modalMovie.innerHTML = '';

  //*for body no-scroll *
  bodyEl.classList.remove('modal-is-open');
  //*
}

function onCloseModalWindow(evt) {
  if (
    evt.target.dataset.action === 'close-lightbox' ||
    evt.target.className === 'lightbox__overlay'
  ) {
    closeModal();
    modalMovie.innerHTML = '';
  }
}

function onCloseModalKey(evt) {
  if (evt.key === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', onCloseModalKey);
  }
}
