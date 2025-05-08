import { createMovie, deleteMovie, findMoviesByProp, getAllGenres, getAllLanguages, getAllMovies, getGenre, getMovieByID, getTopMovies, updateMovie } from '../services/movieServices.js'


export async function getMovieByIDController(req, res) {
  try {
    const { id } = req.params
    const movie = await getMovieByID(id)

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send({ mensaje: 'Película no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

export async function getAllMoviesController(req, res) {
  const page = req.query.page
  const adult = req.headers['x-adult'] === 'true'
  const movies = await getAllMovies(page, adult)
  res.send(movies)
}

export async function findMoviesByPropController(req, res) {
  const { atributo, valor } = req.params
  const movies = await findMoviesByProp(atributo, valor)

  if (movies.length > 0) {
    res.send(movies)
  } else {
    res.status(404).send({ mensaje: 'No se encontraron películas con ese atributo' })
  }
}


export async function getMovieByTMDbController(req, res) {
  try {
    const { id } = req.params
    const movie = await findMoviesByProp('id', id)

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send({ mensaje: 'Película no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getTopMoviesController(req, res) {
  const { field } = req.params;
  const adult = req.headers['x-adult'] === 'true'
  const movies = await getTopMovies(field, adult)
  res.send(movies)
}


export async function createMovieController(req, res) {
  try {
    const newMovie = await createMovie(req.body)
    res.send(newMovie)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function updateMovieController(req, res) {
  try {
    const movie = await updateMovie(req.params.id, req.body)
    res.send(movie)
  } catch (error) {
    console.error('se produjo un error', error)
  }
}


export async function deleteMovieController(req, res) {
  const movie = await deleteMovie(req.params.id)
  res.send(movie)
}


export async function getGenreController(req, res) {
  const genre = await getGenre(req.params.id)
  res.send(genre)
}


export async function getAllGenresController(req, res) {
  const genres = await getAllGenres()
  res.send(genres)
}

export async function getAllLanguagesController(req, res) {
  const languages = await getAllLanguages()
  res.send(languages)
}

