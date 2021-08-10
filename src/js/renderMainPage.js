import hbs from '../templates/cardMainPage.hbs';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { fetchTrendFilm, fetchSearchFilm } from './fetchAPI';
import genreList from './genreList';
import Spinner from './utils/spinner';

const filmList = document.querySelector('.film-list');
const search = document.querySelector(".header__form");


function genresIdConverter(el) {
    el.genre_ids = el.genre_ids
    .map(genreID => (genreID = genreList[genreID]))
    .slice(0, 2)
        .join(', ');
    
  return el;
}

function sliceDate(el) {
    if (!el.release_date) {
        return el.release_date
    } else {
        return el.release_date = el.release_date.slice(0, -6);
    }
}

function noPicture(el){
    if (!el.poster_path) {
        return el.poster_path = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/488px-No-Image-Placeholder.svg.png`
    } else {
        return el.poster_path = `https://image.tmdb.org/t/p/w500${el.poster_path}`;
    }
}

search.addEventListener('input', debounce(searchFilm, 500));
const spinner = new Spinner();

spinner.show("film-list")
fetchTrendFilm().then((r) => {
    r.results.map(el => {
    genresIdConverter(el);
    sliceDate(el);
    noPicture(el);
})
    filmList.innerHTML = hbs(r.results)
    spinner.hide("film-list")
})

async function searchFilm(e) {
    spinner.show("film-list")
    if (!e.target.value) {
        await fetchTrendFilm().then((r) => {
            r.results.map(el => {
                genresIdConverter(el);
                sliceDate(el);
                noPicture(el)
                })
            filmList.innerHTML = hbs(r.results)
            spinner.hide("film-list")
        return
    })
    }else if ( e.target.value.length > 0 && e.target.value.trim().length < 3) {
        Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')
        spinner.hide("film-list")
    } else {
        await fetchSearchFilm(e.target.value.trim()).then(r => {
            if (r.total_results === 0) {
                Notiflix.Notify.failure('Invalid name entered. Try again')
                spinner.hide("film-list")
            } else {
                r.results.map(el => {
                    genresIdConverter(el);
                    sliceDate(el);
                    noPicture(el)
                })
                filmList.innerHTML = hbs(r.results);
                Notiflix.Notify.success('Successful search')
                spinner.hide("film-list")
            }
        })
    }
}