import hbs from '../templates/cardMainPage.hbs';
import Notiflix from 'notiflix';
import { load } from './actionWithLS';
import genreList from './json/genres.json';

// *for pagination*
import { itemsPerPage, opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';
let functionKey = '';
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
  function renderFilmsPerPage(page) {
    let startFrom = (page - 1) * itemsPerPage;
    let endOn = startFrom + itemsPerPage;
    filmList.innerHTML = hbs(filmsArray.slice(startFrom, endOn));
  }

  if (key !== functionKey) {
    opt.page = 1;
  }

  filmsArray = load(key);
  filmList.innerHTML = '';
  setContainerHidden(true);

  if (filmsArray.length > 0) {
    renderFilmsPerPage(opt.page);

    filmsArray.map(el => {
      genresIdConverter(el);
      sliceDate(el);
    });

    filmsArray.map(el => {
      delete Object.assign(el, { genre_ids: el.genres });
    });

    // *for pagination *
    opt.totalItems = filmsArray.length;
    pagination();

    if (filmsArray.length > opt.itemsPerPage) {
      setContainerHidden(false);
      renderFilmsPerPage(opt.page);

      myPagination.on('afterMove', function (eventData) {
        filmList.innerHTML = '';
        opt.page = eventData.page;
        renderFilmsPerPage(eventData.page);

        functionKey = key;
      });
    }
    //*
  } else {
    filmList.innerHTML = '';
    if (key === 'queue') {
      Notiflix.Notify.warning("You don't have any film in your queue");
    }
    if (key === 'watched') {
      Notiflix.Notify.warning("You don't have any watched film");
    }
  }
  //*
}
