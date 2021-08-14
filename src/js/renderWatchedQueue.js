import hbs from '../templates/cardMainPage.hbs';
import Notiflix from 'notiflix';
import { load } from './actionWithLS';

// *for pagination*
import { opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';

export let pageNumber = 1;
setContainerHidden(true);

const filmList = document.querySelector('.film-list');
let filmsArray = [];

export function renderWatchedQueueFilms(key) {
  filmList.innerHTML = '';

  filmsArray = load(key);

  if (filmsArray.length > 0) {
    filmList.innerHTML = '';
    pageNumber = 1;

    filmList.innerHTML = hbs(filmsArray);

    // *for pagination *
    opt.totalItems = filmsArray.length;
    opt.page = 1;

    pagination();

    if (filmsArray.length > opt.itemsPerPage) {
      setContainerHidden(false);
      myPagination.on('afterMove', function (eventData) {
        pageNumber = eventData.page;
        filmList.innerHTML = hbs(filmsArray);
      });
    }
  } else {
    Notiflix.Notify.failure("You don't have any film in your library");
  }
}
