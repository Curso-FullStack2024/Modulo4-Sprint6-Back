import MovieRepository from "../repositories/movieRepository.js";

const repository = MovieRepository

export async function getMovieByID(id) {
  try {
    const movie = await repository.getByID(id)
    if (movie) {
      const genres = await Promise.all(movie.genre_ids.map(m => repository.getGenre(m)));
      const language = await repository.getLanguage(movie.original_language)
    
      return {
        ...movie,
        genres,
        language
      }
    }
    else {
      throw new Error('Película inexistente');
    }
  } catch (err) {

    return { success: false, error: err.message };
  }
}


export async function getAllMovies(page, adult) {
  const movies = await repository.getAll(page, adult)
  return movies
}


export async function getTopMovies(field, adult) {
  const movies = await repository.getTopByField(field, 5, adult)
  return movies
}


export async function findMoviesByProp(atributo, valor) {
  const movies = await repository.findByProp(atributo, valor)
  return movies

}


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


export async function getAllGenres() {
  const genres = await repository.getAllGenres()
  return genres
}


export async function getAllLanguages() {
  const languages = await repository.getAllLanguages()
  return languages
}