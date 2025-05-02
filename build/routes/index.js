import express from 'express';
const router = express.Router();

// Importar todas las rutas
import moviesRoutes from './moviesRoutes.js';
import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';

// Combinar rutas
router.get('/', (req, res)=>{ res.status(200).json({'servidor': 'online'} )})
router.use('/movies', moviesRoutes);
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

export default router;