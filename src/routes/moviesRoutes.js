import express from "express";
import { createMovieController, deleteMovieController, findMoviesByPropController, getAllMoviesController, getGenreController, getMovieByIDController, updateMovieController } from "../controllers/moviesController.js";
// import {
//      obtenerSuperheroePorIdController, obtenerTodoslosSuperheroesController, buscarSuperheroesPorAtributoController,
//      obtenerSuperheroesMayoresDe30Controller, agregarHeroeController, actualizarHeroeController, borrarHeroeController, 
//      borrarPorNombreController, agregarController, editarController, editarHeroeController
// } from '../controllers/superheroesController.mjs'
// import { heroeValidation } from '../validators/heroeValidator.mjs'
// import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router()

router.get('/', getAllMoviesController)
router.get('/id/:id', getMovieByIDController)
router.get('/genre/:id', getGenreController)
router.get('/buscar/:atributo/:valor', findMoviesByPropController)
// router.get('/heroes/mayoresDe30/', obtenerSuperheroesMayoresDe30Controller)
// router.get('/heroes/agregar/', agregarController) // muestra el formulario
// router.get('/heroes/editar/', editarController) // muestra el formulario

 router.post('/crear/', createMovieController)
router.put('/actualizar/:id',  updateMovieController)

router.delete('/borrar/:id', deleteMovieController)


export default router;