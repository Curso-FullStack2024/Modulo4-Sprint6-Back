import express from "express";
import { registerController, verifyEmailController , loginController,  forgotPasswordController, resetPasswordController, deleteUserController, changePasswordController} from "../controllers/authController.js";

// import { heroeValidation } from '../validators/heroeValidator.mjs'
// import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router()

// router.get('/movies', getAllMoviesController)
 router.get('/verify/token/:token', verifyEmailController)
 router.post('/forgotpassword', forgotPasswordController)
// router.get('/movies/buscar/:atributo/:valor', findMoviesByPropController)
// router.get('/heroes/mayoresDe30/', obtenerSuperheroesMayoresDe30Controller)
// router.get('/heroes/agregar/', agregarController) // muestra el formulario
// router.get('/heroes/editar/', editarController) // muestra el formulario
router.get('/delete/:id', deleteUserController)
 router.post('/register/', registerController)
 router.post('/login/', loginController)
 router.post('/resetpassword/', resetPasswordController)
 router.post('/changepassword/', changePasswordController)
//  router.post('/resetpassword/token', recoveryPasswordController)
 

export default router;