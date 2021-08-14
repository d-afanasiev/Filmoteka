const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';
import axios from 'axios';
import { save, deleteObj } from './actionWithLS';
let filmsWatch = [];
let filmsQueue = [];

function addToLibaryWatch() {
  const onButtonWatch = document.querySelector('.modal__button-add');
  onButtonWatch.addEventListener('click', watch);

  function watch(e) {
    let filmId = e.target.dataset.movieId;
      fetchMovieId(filmId).then(response => {
        let answer = response.data;
        if (e.target.textContent === 'add to Watched') {
          save('watched', answer);
          filmsWatch.push(answer);
          localStorage.setItem('watched', JSON.stringify(filmsWatch));
          e.target.textContent = 'remove from Watched';
        } else {
          deleteObj('watched', answer.id);
          let Idx = filmsWatch.findIndex(option => option.id == filmId);
          filmsWatch.splice(Idx, 1);
          localStorage.setItem('watched', JSON.stringify(filmsWatch));
          e.target.textContent = 'add to Watched';
          onButtonWatch.classList.remove('modal__button-active');
        }
      });
    }
  }
}

function addToLibaryQueue() {
  const onButtonQueue = document.querySelector('.modal__button-add-queue');
  onButtonQueue.addEventListener('click', queue);

  function queue(e) {
    let filmId = e.target.dataset.movieId;

    fetchMovieId(filmId).then(response => {
      let answer = response.data;
      if (e.target.textContent === 'add to Queue') {
        save('queue', answer);
        filmsQueue.push(answer);
        localStorage.setItem('queue', JSON.stringify(filmsQueue));
        e.target.textContent = 'remove from Queue';
      } else {
        deleteObj('queue', answer.id);
        let Idx = filmsQueue.findIndex(option => option.id == filmId);
        filmsQueue.splice(Idx, 1);
        localStorage.setItem('queue', JSON.stringify(filmsQueue));
        e.target.textContent = 'add to Queue';
      }
    });
  }
}

function fetchMovieId(movieId) {
  const url = `${BASE_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = axios.get(url);
  return response;
}

export default { addToLibaryWatch, addToLibaryQueue };
