import hbs from '../templates/cardMainPage.hbs';
import Notiflix from 'notiflix';
import { fetchTrendFilm, fetchSearchFilm } from './fetchAPI';
import genreList from './json/genres.json';
import Spinner from './utils/spinner';
import { initLocalStorage } from './actionWithLS';
import nProgress from 'nprogress';

//*for pagination*
import Pagination from 'tui-pagination';
import { opt } from './pagination';
import { pagination } from './pagination';
import { myPagination } from './pagination';
import { setContainerHidden } from './pagination';
import { refs } from './refs';

export let pageNumber = 1;
setContainerHidden(true);

let inputValue;

const { filmList, search } = refs;
//*

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

  nProgress.start();
  // spinner.show();
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
          nProgress.start();
          fetchTrendFilm().then(r => {
            r.results.map(el => {
              genresIdConverter(el);
              sliceDate(el);
            });

            filmList.innerHTML = hbs(r.results);
            nProgress.done();
          });
        });
      }
      //*
    })
    .catch(error =>
      Notiflix.Notify.failure('Search result not successful. Enter the correct movie name and '),
    )
    .finally(() => {
      nProgress.done();
      // spinner.hide()
    });
}

initLocalStorage();
renderFilm();

async function searchFilm(e) {
  e.preventDefault();

  inputValue = e.currentTarget.firstElementChild.value.trim();

  const spinner = new Spinner({ message: 'Loading....' });
  nProgress.start();
  // spinner.show();
  try {
    if (!inputValue) {
      await fetchTrendFilm().then(r => {
        r.results.map(el => {
          genresIdConverter(el);
          sliceDate(el);
        });
        filmList.innerHTML = hbs(r.results);
        return;
      });
    } else {
      await fetchSearchFilm(inputValue).then(r => {
        if (r.total_results === 0) {
          Notiflix.Notify.failure('Search result not successful. Enter the correct movie name.');
          setContainerHidden(true);
          filmList.innerHTML = '';
        } else {
          r.results.map(el => {
            genresIdConverter(el);
            sliceDate(el);
          });
          filmList.innerHTML = hbs(r.results);
          Notiflix.Notify.success('Successful search');

          //*for pagination*
          if (r.total_results <= opt.itemsPerPage) {
            setContainerHidden(true);
          } else {
            opt.totalItems = r.total_results;
            opt.page = r.page;
            pagination();
            setContainerHidden(false);
            myPagination.on('afterMove', function (eventData) {
              pageNumber = eventData.page;
              fetchSearchFilm(inputValue).then(r => {
                r.results.map(el => {
                  genresIdConverter(el);
                  sliceDate(el);
                });

                filmList.innerHTML = hbs(r.results);
              });
            });
          }
          //*
        }
      });
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
  } finally {
    nProgress.done();
    // spinner.hide();
  }
}
