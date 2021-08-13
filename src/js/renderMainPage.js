import hbs from '../templates/cardMainPage.hbs';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { fetchTrendFilm, fetchSearchFilm } from './fetchAPI';
import { genreList } from './genreList';
import Spinner from './utils/spinner';

//*for pagination*
import Pagination from 'tui-pagination';
import { opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';
export let pageNumber = 1;
setContainerHidden(true);
//*

const filmList = document.querySelector('.film-list');
const search = document.querySelector('.header__form');

function genresIdConverter(el) {
  if (el.genre_ids.length === 0) {
    return (el.genre_ids = 'Other');
  }
  el.genre_ids = el.genre_ids
    .map(genreID => (genreID = genreList[genreID]))
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

search.addEventListener('submit', searchFilm);

export function renderFilm() {
  const spinner = new Spinner({ message: 'Loading....' });

  filmList.innerHTML = '';
  pageNumber = 1;

  spinner.show();
  fetchTrendFilm()
    .then(r => {
      r.results.map(el => {
        genresIdConverter(el);
        sliceDate(el);
        });
      filmList.innerHTML = hbs(r.results);

      //*for pagination*
      opt.totalItems = r.total_results;
      opt.page = r.page;
      pagination();
      if (r.total_results > opt.itemsPerPage) {
        setContainerHidden(false);
        myPagination.on('afterMove', function (eventData) {
          pageNumber = eventData.page;
          fetchTrendFilm().then(r => {
            r.results.map(el => {
              genresIdConverter(el);
              sliceDate(el);
            });

            filmList.innerHTML = hbs(r.results);
          });
        });
      }
      //*
    })
    .catch(error =>
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and '),
    )
    .finally(() => spinner.hide());
}

renderFilm();

async function searchFilm(e) {
  e.preventDefault();
  const spinner = new Spinner({ message: 'Loading....' });
  spinner.show();
  try {
    if (!e.currentTarget.firstElementChild.value) {
      await fetchTrendFilm().then(r => {
        r.results.map(el => {
          genresIdConverter(el);
          sliceDate(el);
        });
        filmList.innerHTML = hbs(r.results);
        return;
      });
    } else {
      await fetchSearchFilm(e.currentTarget.firstElementChild.value.trim()).then(r => {
        if (r.total_results === 0) {
          Notiflix.Notify.failure(
            'Search result not successful. Enter the correct movie name and ',
          );
          filmList.innerHTML = '';
          setContainerHidden(true);
        } else {
          r.results.map(el => {
            genresIdConverter(el);
            sliceDate(el);
          });
          filmList.innerHTML = hbs(r.results);
          Notiflix.Notify.success('Successful search');
        }
      });
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
  } finally {
    spinner.hide();
  }
}
