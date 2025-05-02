
import profileRepository from '../repositories/profileRepository.js'
import tokenServices from './tokenServices.js'
import sendEmail from '../utils/sendMail.js'
import { Role } from '../models/roleModel.js'

const repository = profileRepository
const tokenService = tokenServices

// export function getMovieByID(id) {
//     const movie = repository.getByID(id)
//     return movie
// }

// export function getAllMovies() {
//     const movies = repository.getAll()
//     return movies
// }


// export async function findMoviesByProp(atributo, valor) {
//     const movies = await repository.findByProp(atributo, valor)
//     return movies

// }

// export async function obtenermoviesMayoresDe30() {
//     const movies = await repository.obtenerMayoresDe30()
//     return movies
// }


export async function createProfile(data) {
    try {
        const profile = await repository.getByName(data.name, data.user);

        // Verificar si el nombre ya existe
        if (profile) {
          throw new Error(`El nombre ${data.name} ya está en uso`);
        }

        const newProfile = await repository.createProfile(data);
        return newProfile

    } catch (error) {
        console.error(`se produjo un error: ${error} `)
        throw new Error(`Error al crear el perfil: ${error.message}`);

    }
}

/////////////////

export async function getProfilesByProp(atributo, valor) {
    try {
        const profiles = await repository.findByUserId( valor)
        return profiles
          
    } catch (error) {
        console.error(`se produjo un error: ${error} `)
        throw new Error(`Error al obtener los perfiles: ${error.message}`);
        
    }
}
///////////////////////////


export async function deleteProfile(id) {
        const profile = await repository.deleteProfile(id)
        return profile
    }

    /////////////////

export async function updateProfile(id, data) {
    try {
        repository.update(id, data)
        return { success: true};
     }
     catch (error) {
        console.error('no se pudo actualizar el perfil:', err.message);
        return { success: false, error: err.message };
    }
}

/////////////////////////

export async function verifyEmail  (token) {
    try {
      // Obtener token 
      const validationResult = tokenService.verifyToken(token);
     
       if (validationResult.isValid) {
        // Si el token es válido, buscar el usuario por el token
        const user = await repository.getUserbyId(validationResult.payload.userId);

        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        // Verificar si el usuario ya está verificado
        if (user.isVerified){
            throw new Error('El email ya ha sido verificado anteriormente');
        }

        // Verificar si el token de verificación coincide
        if (user.verificationToken !== token) {
          throw new Error('Token inválido');
        }
      //busca el id del role por defecto 'user'
        const defaultRole = await Role.findOne({ name: 'user' });

        // Generar JWT
        // const jwtToken = tokenService.getSignedJwtToken(user);
  
        // Establecer email como verificado
        repository.update(user._id, {
            verificationToken: undefined,
            isVerified: true,           
            role: defaultRole._id
        });
        
    //    console.log('jwtoken=>',jwtToken)
  
  
        return { success: true};
   
      }
    } catch (err) {
      console.error('no se pudo validar el email:', err.message);
      return { success: false, error: err.message };
    
  }
};

//////////////////////////////////

// Método para iniciar sesión
export async function login(email, password) {
    // Buscamos el usuario por email
    const user = await repository.getUserbyEmail(email);
  
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (!user.isVerified) {
        throw new Error('el usuario no ha validado su cuenta');
    }

    // Verificamos si la contraseña es correcta
   
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Correo o contraseña incorrectos');
    }


    // Convertimos el usuario a objeto plano y eliminamos la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generamos un nuevo token y retornamos la respuesta
    const token = tokenService.generateToken(userResponse);
    return { user: userResponse, token };
}
//////////

/// genera el mail para resetear contraseña

export async function forgotPassword (email) {
    // Verificar si el usuario ya existe
    try {
        // const existingUserByUsername = await repository.getUserbyUsername(data.username)
        // if (existingUserByUsername) {
        //     throw new Error('El usuario ya existe')
        // }

        const existingUser = await repository.getUserbyEmail(email)
        console.log('existingUser=>',existingUser)
        if (!existingUser) {
            throw new Error('la dirección de correo no está registrada')
        }

        // Generar un token de verificación
        const resetToken = tokenService.generateValidationToken(existingUser.id);
        const editedUser = await authRepository.update(existingUser._id, {
            resetPasswordToken:resetToken
        });

        // Crear URL de verificación
        const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

        // Enviar el token al correo electrónico del usuario
        const message = `Has solicitado el cambio de contraseña. Por favor, haz clic en el siguiente enlace : \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: existingUser.email,
                subject: 'Cambio de contraseña',
                link: resetUrl,
                message,
                type: 'reset'
            });
            
        } catch (err) {
            // Si el envío del correo falla, eliminamos el token
            await repository.update(existingUser._id,  { $unset: { resetPasswordToken: "" } })
            console.error('Error al enviar el correo de verificación:', err);
            throw new Error('Error al enviar el correo de verificación');
        }


        return { success : true }

    } catch (error) {
        console.error(`se produjo un error: ${error} `)
        throw new Error(`Error al recuperar contraseña: ${error.message}`);

    }
}


////////////////////////


export async function resetPassword  (id, password) {
    try {      
        const user = await repository.getUserbyId(id);
        const hashedPassword = await bcrypt.hash(password, 10);

        repository.update(id, {
            password:hashedPassword,
            resetPasswordToken:''
        });
        
        return { success: true};
         
    } catch (err) {
      console.error('no se pudo cambiar la contraseña:', err.message);
      return { success: false, error: err.message };
    
  }
};

// export async function createMovie(data) {
//     const movie = await repository.createMovie(data)
//     return movie
// }
// export async function updateMovie(id, data) {    
//     const movies = await repository.updateMovie(id, data)
//     return movies
// }

// export async function deleteMovie(id) {
//     const movie = await repository.deleteMovie(id)
//     return movie
// }
