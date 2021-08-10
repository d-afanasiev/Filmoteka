
const API_KEY = "4e286c2ceeb7113ef3a7d57d0bdb7157";


export async function fetchSearchFilm(value) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&query=${value}`)
    const searchedFilm = await(response.json())
    return searchedFilm
}

export async function fetchTrendFilm() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=1`)
    const filmsData = await(response.json())
    return filmsData
}




    
