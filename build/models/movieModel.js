import mongoose from "mongoose"

//// ESQUEMA  DE PELICULA
const movieSchema = new mongoose.Schema({  
    // _id: mongoose.Schema.Types.ObjectId,
  adult: { type: Boolean },
  backdrop_path: { type: String },
  genre_ids: { type: [Number] },
  id: { type: Number },
  original_language: { type: String },
  original_title: { type: [String] },
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





// JavaScript

// const movieSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   adult: { type: Boolean, required: true },
//   backdrop_path: { type: String, default: null },
//   genre_ids: { type: [Number], required: true },
//   id: { type: Number, required: true, unique: true },
//   original_language: { type: String, required: true },
//   original_title: { type: String, required: true },
//   overview: { type: String, required: true },
//   popularity: { type: Number, required: true },
//   poster_path: { type: String, default: null },
//   release_date: { type: String, required: true },
//   title: { type: String, required: true },
//   video: { type: Boolean, required: true },
//   vote_average: { type: mongoose.Schema.Types.Mixed, required: true }, // Can be Double or Int32
//   vote_count: { type: Number, required: true },
// });

// export const Movie = mongoose.model('Movie', movieSchema);



