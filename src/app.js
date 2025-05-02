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

app.use(cors())
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
