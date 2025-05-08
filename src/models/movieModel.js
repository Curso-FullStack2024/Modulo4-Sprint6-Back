import mongoose from "mongoose"

//// ESQUEMA  DE PELICULA
const movieSchema = new mongoose.Schema({ 
  adult: { type: Boolean },
  backdrop_path: { type: String },
  genre_ids: [{
    type: Number,
    ref: 'Genre', // Referencia al modelo Genre
    field: 'id'
  }],
  id: { type: Number },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  release_date: { type: Date },
  title: { type: String },
  video: { type: Boolean },
  vote_average: { type: Number },
  vote_count: { type: Number },
}, { collection: 'movies' }
)


export const Movie = mongoose.model('Movie', movieSchema);



