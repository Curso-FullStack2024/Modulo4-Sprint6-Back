import express from "express";
import { createController, deleteProfileController, getProfilesByUserIdController, updateController } from "../controllers/profileController.js";

// import { heroeValidation } from '../validators/heroeValidator.mjs'
// import { handleValidationErrors } from "../middlewares/errorMiddleware.mjs";

const router = express.Router()


  router.get('/userid/:userId', getProfilesByUserIdController)
  router.get('/delete/:id', deleteProfileController)


 router.post('/create/', createController)
 router.post('/update/:id', updateController)


export default router;