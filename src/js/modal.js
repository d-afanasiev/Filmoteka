import axios from 'axios';
import markup from '../templates/markupModal.hbs';
import storageLibraryMovies from '../js/moveToLocalStorage';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';

const filmList = document.querySelector('.film-list');
const modalMovie = document.querySelector('.modal__template');
const modalWindow = document.querySelector('.lightbox');
const closeBtn = document.querySelector('.modal__button');
const watchButton = document.querySelector('.modal__button-add');
let localWatched = [];
let localQueue = [];

function fetchMovieId(movieId) {
  const url = `${BASE_URL}${movieId}?api_key=${API_KEY}&language=en-US`;

  const response = axios.get(url);

  return response;
}

filmList.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  const activeImg = e.target;

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const movieId = activeImg.dataset.id;
  if (e.target.classList.value === 'film-list__img') {
    fetchMovieId(movieId).then(response => {
      modalMovie.innerHTML = markup(response.data);
      watchButton();
      queueButton();

      function watchButton() {
        const watchButton = document.querySelector('.modal__button-add');
        localWatched = JSON.parse(localStorage.getItem('watched'));
        let filmId = e.target.dataset.id;
        console.log(filmId);
        if (localWatched != null) {
          let Idx = localWatched.findIndex(option => option.id === Number.parseInt(filmId));
          if (Idx >= 0) {
            watchButton.textContent = 'Remove from Watched';
          }
        }
      }

      function queueButton() {
        const queueButton = document.querySelector('.modal__button-queue');
        localQueue = JSON.parse(localStorage.getItem('queue'));
        let filmIdQueue = e.target.dataset.id;
        if (localQueue != null) {
          let IdxQueue = localQueue.findIndex(option => option.id === Number.parseInt(filmIdQueue));
          if (IdxQueue >= 0) {
            queueButton.textContent = 'Remove from Queue';
          }
        }
      }

      storageLibraryMovies.addToLibaryWatch();
      storageLibraryMovies.addToLibaryQueue();
    });
  }

  openModal();
}

function openModal(e) {
  closeModal();
  modalMovie.innerHTML = '';
  modalWindow.classList.add('is-open');
  window.addEventListener('keydown', onCloseModalKey);
}

closeBtn.addEventListener('click', closeModal);
modalWindow.addEventListener('click', onCloseModalWindow);

function closeModal() {
  modalWindow.classList.remove('is-open');
  modalMovie.innerHTML = '';
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
