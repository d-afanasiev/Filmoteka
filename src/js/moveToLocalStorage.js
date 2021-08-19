import { fetchMovieId } from './fetchAPI';
import { save, deleteObj, refreshPage } from './actionWithLS';

function addToLibaryWatch() {
  const onButtonWatch = document.querySelector('.modal__button-add');
  onButtonWatch.addEventListener('click', watch);
}

function watch(e) {
  let filmId = e.target.dataset.movieId;
  fetchMovieId(filmId).then(response => {
    let answer = response.data;
    if (e.target.textContent === 'add to Watched') {
      save('watched', answer);
      refreshPage('watched');
      e.target.textContent = 'remove from Watched';
      onButtonWatch.classList.add('modal__button-active');
    } else {
      deleteObj('watched', answer.id);
      e.target.textContent = 'add to Watched';
      onButtonWatch.classList.remove('modal__button-active');
      refreshPage('watched');
    }
  });
}

function addToLibaryQueue() {
  const onButtonQueue = document.querySelector('.modal__button-add-queue');
  onButtonQueue.addEventListener('click', queue);
}

function queue(e) {
  let filmId = e.target.dataset.movieId;
  fetchMovieId(filmId).then(response => {
    let answer = response.data;
    if (e.target.textContent === 'add to Queue') {
      save('queue', answer);
      refreshPage('queue');
      e.target.textContent = 'remove from Queue';
      onButtonQueue.classList.add('modal__button-active');
    } else {
      deleteObj('queue', answer.id);
      e.target.textContent = 'add to Queue';
      onButtonQueue.classList.remove('modal__button-active');
      refreshPage('queue');
    }
  });
}
export default { addToLibaryWatch, addToLibaryQueue };
