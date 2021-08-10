import axios from 'axios';
import markup from '../templates/markupModal.hbs';


const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';

const refs = {
    btnClosetModal: document.querySelector('.modal__button'),
    movie: document.querySelector('.film-list__item')
};


//  function fetchMovieId (movieID){
//     const url = `${BASE_URL}${movieID}?api_key=${API_KEY}&language=en-US&id&poster_path&title&vote_average&vote_count&popularity&original_title&genres`;

//     const response =  axios.get(url)

//     return response.data
// } 




// const cardMovie = document.querySelector('.modal__template');

// cardMovie.insertAdjacentHTML( 'beforeend', markup(fetchMovieId))


refs.movie.addEventListener('click', onOpenModalWindow)

function onOpenModalWindow (evt){
    evt.preventDefault();
    modalWindow.classList.add('is-open');
}