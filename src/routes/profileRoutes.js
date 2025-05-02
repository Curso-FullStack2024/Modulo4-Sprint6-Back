import express from "express";
import { createController, deleteProfileController, getProfilesByUserIdController, updateController } from "../controllers/profileController.js";

// import { heroeValidation } from '../validators/heroeValidator.mjs'
// import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router()

// router.get('/movies', getAllMoviesController)
  router.get('/userid/:userId', getProfilesByUserIdController)
  router.get('/delete/:id', deleteProfileController)
//  router.post('/forgotpassword', forgotPasswordController)
// router.get('/movies/buscar/:atributo/:valor', findMoviesByPropController)
// router.get('/heroes/mayoresDe30/', obtenerSuperheroesMayoresDe30Controller)
// router.get('/heroes/agregar/', agregarController) // muestra el formulario
// router.get('/heroes/editar/', editarController) // muestra el formulario

 router.post('/create/', createController)
 router.post('/update/:id', updateController)
//  router.post('/login/', loginController)
//  router.post('/resetpassword/', resetPasswordController)
//  router.post('/resetpassword/token', recoveryPasswordController)
 
// router.put('/movies/actualizar/:id',  updateMovieController)
// router.put('/heroes/:id/editar', editarHeroeController) // envia al servidor
// router.delete('/movies/borrar/:id', deleteMovieController)
// router.delete('/heroes/borrarpornombre/:name', borrarPorNombreController)

export default router;