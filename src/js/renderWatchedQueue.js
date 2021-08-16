import hbs from '../templates/cardMainPage.hbs';
import Notiflix from 'notiflix';
import { load } from './actionWithLS';
import genreList from './json/genres.json';

// *for pagination*
import { itemsPerPage, opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';
//*

import { refs } from './refs';

const { filmList } = refs;

let filmsArray = [];

function genresIdConverter(el) {
  if (el.genres.length === 0) {
    return (el.genres = 'Other');
  }
  el.genres = el.genres
    .map(genre => (genre.id = genreList[genre.id]))
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

    filmsArray.map(el => {
      genresIdConverter(el);
      sliceDate(el);
    });

    filmsArray.map(el => {
      delete Object.assign(el, { genre_ids: el.genres });
    });

    // *for pagination *
    setContainerHidden(true);
    opt.totalItems = filmsArray.length;
    opt.page = 1;
    pagination();

    function renderFilmsPerPage(page) {
      let startFrom = (page - 1) * itemsPerPage;
      let endOn = startFrom + itemsPerPage;
      filmList.innerHTML = hbs(filmsArray.slice(startFrom, endOn));
    }

    renderFilmsPerPage(opt.page);

    if (filmsArray.length > opt.itemsPerPage) {
      setContainerHidden(false);
      myPagination.on('afterMove', function (eventData) {
        filmList.innerHTML = '';
        opt.pageNumber = eventData.page;
        renderFilmsPerPage(eventData.page);
      });
    }
    //*
  } else {
    Notiflix.Notify.failure("You don't have any film in your library");
  }
}
