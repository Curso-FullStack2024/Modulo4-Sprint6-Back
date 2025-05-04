import { Movie  }from "../models/movieModel.js";
import { Genre } from "../models/genreModel.js";
import { Language } from "../models/languageModel.js";



class movieRepository  {
    //busca por ID
    async getByID(id) {
        try {
            return await Movie.findById(id).lean()

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }

    //devuelve todos los documentos
    async getAll(skip=0, limit=null) {
        try {
            return await Movie.find().limit(24).populate({
                path: 'genres',
                select: 'name', // Solo trae el campo 'name'
                options: { strictPopulate: false }})

            // Obtener documentos desde el 11 al 20
            //return Movie.find().skip(10).limit(10);            
        } catch (error) {
            console.error(`se produjo un error: ${error} `)            
        }        
    }

    //busca por atributo y valor
    async findByProp(atributo, valor) {
        
        // busca por atributo booleano
            if (Movie.schema.paths[atributo].instance ==="Boolean" && typeof valor === 'string' && (valor === 'true' || valor === 'false')) {
                // Convertir string a booleano
                const booleanValue = valor === 'true';
                const query = { [atributo]: booleanValue };
                return await Movie.find(query);
            }
        // busca por atributo numerico
        if (!isNaN(valor)) {
            const query = { [atributo]: valor }
            return await Movie.find(query)
        }
        else {// busca por atributo string
            const query = { [atributo]: new RegExp(valor, 'i') }
            return await Movie.find(query)
        }
    }

    
    // async obtenerMayoresDe30() {
    //     return await Movie.find({ edad: { $gt: 30 }, planetaOrigen: 'Tierra', $expr: { $gte: [{ $size: "$poderes" }, 2] } })
    // }

//crea una nueva pelicula
    async createMovie(data) {    
        try {
            const newMovie= await Movie.create(data)        
            return newMovie            
        } catch (error) {
            console.error(`se produjo un error: ${error} `)
            throw new Error(`Error al crear la película: ${error.message}`);
        }    
    }

    async updateMovie(id, data) {  
        
        try {   
            const movie= await Movie.findByIdAndUpdate( id, { $set:data }, { new : true , upsert: true})                        
            return movie
            
        } catch (error) {
            throw('se produjo un error al intentar actualizar: ',error)
        }          
    }

    async deleteMovie(id) {        
        const movie= await Movie.findByIdAndDelete( id)        
        return movie
    }
    
    // async borrarPorNombre(name) {        
    //     const heroe= await Movie.deleteOne( { nombreSuperheroe : name })   
    //     return heroe
    // }

    async getGenre(id) {
        try {
            const query = { id : id }
            const genre = await Genre.findOne(query)
            // console.log(genre)
            return genre.name

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }


    async getLanguage(iso) {
        try {
            const query = { iso_639_1 : iso }
            const language = await Language.findOne(query)
            // console.log(genre)
            return language.name

        } catch (error) {
            console.error(`se produjo un error: ${error} `)
        }
    }

}

export default new movieRepository()