import  { Profile } from "../models/profileModel.js"
import { User } from "../models/userModel.js";

import { Role } from "../models/roleModel.js";

class profileRepository  {
    //busca por ID
    // async getByID(id) {
    //     try {
    //         return await Movie.findById(id)

    //     } catch (error) {
    //         console.error(`se produjo un error: ${error} `)
    //     }
    // }

//     //devuelve todos los documentos
//     async getAll(skip=0, limit=null) {
//         try {
//             return await Movie.find().limit(20)
//             // Obtener documentos desde el 11 al 20
//             //return Movie.find().skip(10).limit(10);            
//         } catch (error) {
//             console.error(`se produjo un error: ${error} `)            
//         }        
//     }

//     //busca por atributo y valor
    // async findByProp(atributo, valor) {
        
    //     // busca por atributo booleano
    //         if (Profile.schema.paths[atributo].instance ==="Boolean" && typeof valor === 'string' && (valor === 'true' || valor === 'false')) {
    //             // Convertir string a booleano
    //             const booleanValue = valor === 'true';
    //             const query = { [atributo]: booleanValue };
    //             return await Profile.find(query);
    //         }
    //     // busca por atributo numerico
    //     if (!isNaN(valor)) {
    //         const query = { [atributo]: valor }
    //         return await Profile.find(query)
    //     }
    //     else {// busca por atributo string
    //         const query = { [atributo]: new RegExp(valor, 'i') }
    //         return await Profile.find(query)
    //     }
    // }


// busca por nombre
async getByName(name, userId) {
    
    try {       
        return await Profile.findOne({  name: { $eq: name } , user: userId })
    }
    catch (error) {
        console.error(`se produjo un error: ${error} `)
    }
}


// busca por ID del usuario
async getProfileById(id) {
    
    try {
        return await Profile.findById(id) 
        }
    catch (error) {
        console.error(`se produjo un error: ${error} `)
    }
}

//crea un nuevo perfil
    async createProfile(data) {    
        try {            
            const newProfile= await Profile.create(data)        
            return newProfile            
        } catch (error) {
            console.error(`se produjo un error: ${error} `)
            throw new Error(`Error al crear el perfil: ${error.message}`);
        }    
    }
//actualiza un perfil
    async update(id, updateData) {
        return await Profile.findByIdAndUpdate(id, updateData, { new: true });
      }

//     async updateMovie(id, data) {  
        
//         try {   
//             const movie= await Movie.findByIdAndUpdate( id, { $set:data }, { new : true , upsert: true})                        
//             return movie
            
//         } catch (error) {
//             throw('se produjo un error al intentar actualizar: ',error)
//         }          
//     }

//BORRA EL  PERFIL POR ID
    async deleteProfile(id) {        
        const profile= await Profile.findByIdAndDelete( id)        
        return profile
    }
    ////////////////////
    async findByUserId( id) {
        
        const profiles = await Profile.find({ user: id });
        return profiles
            }
}
export default new profileRepository()