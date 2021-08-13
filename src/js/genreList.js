import { fetchListGenre } from './fetchAPI';

fetchListGenre().then(data => {
  localStorage.setItem('genres', JSON.stringify(data.genres));
});

let genres = JSON.parse(localStorage.getItem('genres'));
const genreList = genres.reduce((previousValue, data) => {
  let genreAll = { [data.id]: data.name };
  return { ...previousValue, ...genreAll };
}, {});

export { genreList };
