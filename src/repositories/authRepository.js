import { User } from "../models/userModel.js";
import { Role } from "../models/roleModel.js";

class authRepository  {
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
//     async findByProp(atributo, valor) {
        
//         // busca por atributo booleano
//             if (Movie.schema.paths[atributo].instance ==="Boolean" && typeof valor === 'string' && (valor === 'true' || valor === 'false')) {
//                 // Convertir string a booleano
//                 const booleanValue = valor === 'true';
//                 const query = { [atributo]: booleanValue };
//                 return await Movie.find(query);
//             }
//         // busca por atributo numerico
//         if (!isNaN(valor)) {
//             const query = { [atributo]: valor }
//             return await Movie.find(query)
//         }
//         else {// busca por atributo string
//             const query = { [atributo]: new RegExp(valor, 'i') }
//             return await Movie.find(query)
//         }
//     }

// busca por email
async getUserbyEmail(email) {
    try {
        //return await User.findOne({  email: { $eq: email } }).populate('role')
        return await User.findOne({  email: { $eq: email } }).populate({
            path: 'role',
            populate: {
              path: 'permissions'
            }
          })
    }
    catch (error) {
        console.error(`se produjo un error: ${error} `)
    }
}

// busca por nombre
async getUserbyUsername(username) {
    try {       
        // return await User.findOne({  username: { $eq: username }  }).populate('role')
        return await User.findOne({  username: { $eq: username }  }).populate({
            path: 'role',
            populate: {
              path: 'permissions'
            }
          })
    }
    catch (error) {
        console.error(`se produjo un error: ${error} `)
    }
}


// busca por nombre
async getUserbyId(id) {
    
    try {
        return await User.findById(id) 
        }
    catch (error) {
        console.error(`se produjo un error: ${error} `)
    }
}

//crea un nuevo usuario
    async createUser(data) {    
        try {
            const newUser= await User.create(data)        
            return newUser            
        } catch (error) {
            console.error(`se produjo un error: ${error} `)
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }    
    }
//actualiza un usuario
    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
      }

//     async updateMovie(id, data) {  
        
//         try {   
//             const movie= await Movie.findByIdAndUpdate( id, { $set:data }, { new : true , upsert: true})                        
//             return movie
            
//         } catch (error) {
//             throw('se produjo un error al intentar actualizar: ',error)
//         }          
//     }

//BORRA EL USUARIO POR ID
    async deleteUser(id) {  
        try {            
            const user= await User.findByIdAndDelete( id)        
            return user
            
        } catch (error) {
            console.error(`se produjo un error: ${error} `)
            throw new Error(`Error al borrar el usuario: ${error.message}`);
        }      
    }
    
    // async borrarPorNombre(name) {        
    //     const heroe= await Movie.deleteOne( { nombreSuperheroe : name })   
    //     return heroe
    // }

}
export default new authRepository()