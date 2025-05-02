import mongoose from 'mongoose'

export async function connectDB() {

    try {

        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`, { serverSelectionTimeoutMS: 5000 })
        console.log('Conexion exitosa a MongoDB');
    }
    catch (error) {
        console.error('error al conectar a MongoDB', error)
        process.exit(1)
    }
}

