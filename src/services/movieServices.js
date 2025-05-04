import MovieRepository from "../repositories/movieRepository.js";

const repository = MovieRepository

export async function  getMovieByID (id) {
    const movie = await repository.getByID(id)
    const genres = await Promise.all(movie.genre_ids.map(m => repository.getGenre(m)));
    const language = await repository.getLanguage(movie.original_language)
    // const genres=await repository.getGenre(movie.genre_ids[0])
     
     return {
        ... movie,
        genres,
        language
    }
}


export function getAllMovies() {
    const movies = repository.getAll()
    return movies
}


export async function findMoviesByProp(atributo, valor) {
    const movies = await repository.findByProp(atributo, valor)
    return movies

}

// export async function obtenermoviesMayoresDe30() {
//     const movies = await repository.obtenerMayoresDe30()
//     return movies
// }


export async function createMovie(data) {
    const movie = await repository.createMovie(data)
    return movie
}


export async function updateMovie(id, data) {    
    const movies = await repository.updateMovie(id, data)
    return movies
}

export async function deleteMovie(id) {
    const movie = await repository.deleteMovie(id)
    return movie
}


export async function getGenre(id) {
    const genres = await repository.getGenre(id)
    return genres
}
