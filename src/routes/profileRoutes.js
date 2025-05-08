import express from "express";
import { createController, deleteProfileController, getProfilesByUserIdController, updateController } from "../controllers/profileController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/userid/:userId', authenticateToken, getProfilesByUserIdController)
router.delete('/delete/:id', authenticateToken, deleteProfileController)
router.post('/create/', authenticateToken, createController)
router.post('/update/:id', authenticateToken, updateController)


export default router;