import express from "express";
import { createMovieController, deleteMovieController, findMoviesByPropController, getAllGenresController, getAllLanguagesController, getAllMoviesController, getGenreController, getMovieByIDController, getMovieByTMDbController, getTopMoviesController, updateMovieController } from "../controllers/moviesController.js";
import { authenticateToken, hasPermission } from "../middleware/authMiddleware.js";


const router = express.Router()

router.get('/', authenticateToken, getAllMoviesController)
router.get('/id/:id', authenticateToken, getMovieByIDController)
router.get('/genre/:id', authenticateToken, getGenreController)
router.get('/genres/', authenticateToken, getAllGenresController)
router.get('/languages/', authenticateToken, getAllLanguagesController)
router.get('/buscar/:atributo/:valor', authenticateToken, findMoviesByPropController)
router.get('/top/:field/',  getTopMoviesController)

router.post('/crear/', authenticateToken,hasPermission('create:movies'), createMovieController)
router.put('/actualizar/:id', authenticateToken, hasPermission('update:movies'), updateMovieController)
router.get('/tmdb/:id', authenticateToken, getMovieByTMDbController)
router.delete('/borrar/:id', authenticateToken, hasPermission('delete:movies'), deleteMovieController)


export default router;