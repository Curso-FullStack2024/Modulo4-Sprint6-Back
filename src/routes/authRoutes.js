import express from "express";
import { changePasswordController, deleteUserController, forgotPasswordController, getAllUsersController, getRolesController, loginController, registerController, resetPasswordController, updateUserController, verifyEmailController } from "../controllers/authController.js";
import { authenticateToken, hasPermission } from './../middleware/authMiddleware.js';


const router = express.Router()


 router.get('/verify/token/:token', verifyEmailController)
 router.post('/forgotpassword', forgotPasswordController)
 router.post('/register/', registerController)
 router.post('/login/',  loginController)
 router.post('/resetpassword/', resetPasswordController)
 router.post('/changepassword/', changePasswordController)
 
 router.delete('/delete/:id',  authenticateToken, hasPermission('delete:users'), deleteUserController)
 router.get('/users/', authenticateToken, hasPermission('update:users'), getAllUsersController)
 router.get('/roles/',  getRolesController)

 router.put('/actualizar/:id', authenticateToken, hasPermission('update:users'), updateUserController)

export default router;