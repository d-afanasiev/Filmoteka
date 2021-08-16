import hbs from '../templates/cardMainPage.hbs';
import Notiflix from 'notiflix';
import { load } from './actionWithLS';
import genreList from './json/genres.json';

// *for pagination*
import { opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';

export let pageNumber = 1;
setContainerHidden(true);

const filmList = document.querySelector('.film-list');
let filmsArray = [];

function genresIdConverter(el) {
  if (el.genres.length === 0) {
    return (el.genres = 'Other');
  }
  el.genres = el.genres
    .map((genre) => genre.id = genreList[genre.id])
    .slice(0, 2)
    .join(', ');

  return el;
}

function sliceDate(el) {
  if (!el.release_date) {
    return (el.release_date = 'Unknown date');
  } else {
    return (el.release_date = el.release_date.slice(0, -6));
  }
}

export function renderWatchedQueueFilms(key) {
  filmList.innerHTML = '';

  filmsArray = load(key);

  if (filmsArray.length > 0) {
    filmList.innerHTML = '';
    pageNumber = 1;

    filmsArray.map(el => {
      genresIdConverter(el);
      sliceDate(el);
    });

    filmsArray.map(el => {
      delete Object.assign(el, { genre_ids: el.genres });
    });

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
