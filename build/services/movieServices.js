import MovieRepository from "../repositories/movieRepository.js";

const repository = MovieRepository

export function getMovieByID(id) {
    const movie = repository.getByID(id)
    return movie
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
