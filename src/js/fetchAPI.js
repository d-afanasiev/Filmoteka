//*for pagination*
import { itemsPerPage } from './pagination';
import { pageNumber } from './renderMainPage';
//*

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';
import axios from 'axios';

export async function fetchSearchFilm(value) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${pageNumber}&per_page=${itemsPerPage}&query=${value}`,
  );
  const searchedFilm = await response.json();
  return searchedFilm;
}

export async function fetchTrendFilm() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}&per_page=${itemsPerPage}`,
  );
  const filmsData = await response.json();
  return filmsData;
}

export function fetchMovieId(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

  const response = axios.get(url);

  return response;
}

// initial code

// export async function fetchSearchFilm(value) {
//     const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&query=${value}`)
//     const searchedFilm = await(response.json())
//     return searchedFilm
// }

// export async function fetchTrendFilm() {
//     const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`)
//     const filmsData = await(response.json())
//     return filmsData
// }
