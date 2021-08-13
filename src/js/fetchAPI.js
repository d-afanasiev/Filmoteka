//*for pagination*
import { itemsPerPage } from './pagination';
import { pageNumber } from './renderMainPage';
//*

const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';
import axios from 'axios';

export async function fetchSearchFilm(value) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pageNumber}&per_page=${itemsPerPage}&query=${value}`,
  );
  const searchedFilm = await response.json();
  return searchedFilm;
}

export async function fetchTrendFilm() {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNumber}&per_page=${itemsPerPage}`,
  );
  const filmsData = await response.json();
  return filmsData;
}

export async function fetchListGenre() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=4e286c2ceeb7113ef3a7d57d0bdb7157&language=en-US`,
  );
  const genreData = await response.json();
  return genreData;
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
