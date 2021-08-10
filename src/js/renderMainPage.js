import hbs from '../templates/cardMainPage.hbs';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import { fetchTrendFilm, fetchSearchFilm } from './fetchAPI';

const filmList = document.querySelector('.film-list');
const search = document.querySelector(".header__form");

search.addEventListener('input', debounce(searchFilm, 500));

fetchTrendFilm().then((r) => {
            filmList.innerHTML = hbs(r.results)
})

async function searchFilm(e) {
    if (!e.target.value) {
    await fetchTrendFilm().then((r) => {
        filmList.innerHTML = hbs(r.results)
        return
    })
    }else if ( e.target.value.length > 0 && e.target.value.trim().length < 3) {
        Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.')
    } else {
        await fetchSearchFilm(e.target.value.trim()).then(r => {
        
            if (r.total_results === 0) {
                Notiflix.Notify.failure('Invalid name entered. Try again')
            } else {
                filmList.innerHTML = hbs(r.results);
                Notiflix.Notify.success('Success')
            }
        })
    }
}