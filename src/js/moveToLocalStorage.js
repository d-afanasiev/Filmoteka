const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '4e286c2ceeb7113ef3a7d57d0bdb7157';
import axios from 'axios';
let filmsWatch = [];
let filmsQueue = [];

<<<<<<< Updated upstream
function addToLibaryWatch(){
=======
function addToLibaryWatch() {
  const onButtonWatch = document.querySelector('.modal__button-add');
  onButtonWatch.addEventListener('click', watch);
  

>>>>>>> Stashed changes

const onButtonWatch = document.querySelector(".modal__button-add");
onButtonWatch.addEventListener("click", watch);

<<<<<<< Updated upstream
function watch(e){
 
    let filmId = e.target.dataset.id;
   
    console.log(e.target.dataset.id);
    fetchMovieId(filmId)
    .then(response => {let answer = response.data;
      console.log(answer);
      if (e.target.textContent === "add to Watched"){
      films.push(answer);
      console.log(films);
      localStorage.setItem("watched", JSON.stringify(films));
      e.target.textContent = "remove from Watched"}
      else {
        let Idx = films.findIndex(option => option.id == filmId);
        console.log(Idx);
        films.splice(Idx,1);
        localStorage.setItem("watched", JSON.stringify(films));
        e.target.textContent = "add to Watched"
=======
    fetchMovieId(filmId).then(response => {
      let answer = response.data;
      if (e.target.textContent === 'add to Watched') {
        filmsWatch.push(answer);
        localStorage.setItem('watched', JSON.stringify(filmsWatch));
        e.target.textContent = 'remove from Watched';
      } else {
        let Idx = filmsWatch.findIndex(option => option.id == filmId);
        filmsWatch.splice(Idx, 1);
        localStorage.setItem('watched', JSON.stringify(filmsWatch));
        e.target.textContent = 'add to Watched';
>>>>>>> Stashed changes
      }
    }) 
  }
}

<<<<<<< Updated upstream
function addToLibaryQueue(){

  const onButtonQueue = document.querySelector(".modal__button-add-queue");
  onButtonQueue.addEventListener("click", queue);
  
  function queue(e){
   
      let filmId = e.target.dataset.id;
     
      console.log(e.target.dataset.id);
      fetchMovieId(filmId)
      .then(response => {let answer = response.data;
        console.log(answer);
        if (e.target.textContent === "add to Queue"){
        films.push(answer);
        console.log(films);
        localStorage.setItem("queue", JSON.stringify(films));
        e.target.textContent = "remove from Queue"}
        else {
          let Idx = films.findIndex(option => option.id == filmId);
          console.log(Idx);
          films.splice(Idx,1);
          localStorage.setItem("queue", JSON.stringify(films));
          e.target.textContent = "add to Queue"
        }
      }) 
    }
=======
function addToLibaryQueue() {
  const onButtonQueue = document.querySelector('.modal__button-add-queue');
  onButtonQueue.addEventListener('click', queue);
  


  function queue(e) {
    let filmId = e.target.dataset.movieId;

    fetchMovieId(filmId).then(response => {
      let answer = response.data;
      if (e.target.textContent === 'add to Queue') {
        filmsQueue.push(answer);
        localStorage.setItem('queue', JSON.stringify(filmsQueue));
        e.target.textContent = 'remove from Queue';
      } else {
        let Idx = filmsQueue.findIndex(option => option.id == filmId);
        filmsQueue.splice(Idx, 1);
        localStorage.setItem('queue', JSON.stringify(filmsQueue));
        e.target.textContent = 'add to Queue';
      }
    });
>>>>>>> Stashed changes
  }

function fetchMovieId(movieId) {
    const url = `${BASE_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
      const response = axios.get(url);
      return response;
  }

  


export default {addToLibaryWatch, addToLibaryQueue};


