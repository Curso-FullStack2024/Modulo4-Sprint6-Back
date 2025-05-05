import express from 'express'
import  cors  from 'cors'
import {  connectDB } from './config/dbConfig.js'
import router from './routes/index.js';
// import  router from './src/routes/paisesRoutes.mjs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import dotenv from 'dotenv'
dotenv.config()


const app=express()
const PORT=process.env.PORT || 3500


const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 86400 // 24 horas en segundos
};

app.use(cors(corsOptions));

app.use(express.json())

connectDB()

 // obtenerTodosLosMovies()
app.use('/', router)

app.use((req,res)=>{
    res.status(404).send({ mensaje:'Ruta no encontrada'})
})

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
