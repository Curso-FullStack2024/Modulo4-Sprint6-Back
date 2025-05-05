import express from "express";
import { registerController, verifyEmailController , loginController,  forgotPasswordController, resetPasswordController, deleteUserController, changePasswordController} from "../controllers/authController.js";
import  {authenticateToken, hasPermission} from './../middleware/authMiddleware.js'


const router = express.Router()


 router.get('/verify/token/:token', verifyEmailController)
 router.post('/forgotpassword', forgotPasswordController)
 router.post('/register/', registerController)
 router.post('/login/',  loginController)
 router.post('/resetpassword/', resetPasswordController)
 router.post('/changepassword/', changePasswordController)
 
 router.delete('/delete/:id',  authenticateToken, hasPermission('delete:users'), deleteUserController)
 

export default router;