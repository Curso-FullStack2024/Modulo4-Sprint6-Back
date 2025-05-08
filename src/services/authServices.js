import bcrypt from 'bcryptjs'
import authRepository from '../repositories/authRepository.js'
import tokenServices from './tokenServices.js'
import sendEmail from '../utils/sendMail.js'
import { Role } from '../models/roleModel.js'

const repository = authRepository
const tokenService = tokenServices

export async function registerUser(data) {
  // Verificar si el usuario ya existe
  try {
    const existingUser = await repository.getUserbyEmail(data.email)
    if (existingUser) {
      throw new Error('la dirección de correo ya esta registrada')
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Crear el nuevo usuario
    const user = await repository.createUser({
      ...data,
      password: hashedPassword
    })
    // Generar un token de verificación
    const validationToken = tokenService.generateValidationToken(user.id);
    const newUser = await authRepository.update(user._id, {
      verificationToken: validationToken
    });

    // Crear URL de verificación
    const verificationUrl = `https://nextfliks.netlify.app/validar/${validationToken}`;

    // Enviar el token al correo electrónico del usuario
    const message = `Has solicitado registrarte en nuestra plataforma. Por favor, haz clic en el siguiente enlace para verificar tu email: \n\n ${verificationUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Verificación de email',
        link: verificationUrl,
        message,
        type: 'verify'
      });

      console.log('verifica tu correo para activar tu cuenta')
    } catch (err) {
      // Si el envío del correo falla, eliminamos el usuario
      await repository.deleteUser(user._id)
      console.error('Error al enviar el correo de verificación:', err);
      throw new Error('Error al enviar el correo de verificación');
    }


    return newUser

  } catch (error) {
    console.error(`se produjo un error: ${error} `)
    throw new Error(`Error al crear el usuario: ${error.message}`);

  }
}

/////////////////

export async function verifyEmail(token) {
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
      if (user.isVerified) {
        throw new Error('El email ya ha sido verificado anteriormente');
      }

      // Verificar si el token de verificación coincide
      if (user.verificationToken !== token) {
        throw new Error('Token inválido');
      }
      //busca el id del role por defecto 'user'
      const defaultRole = await Role.findOne({ name: 'user' });


      // Establecer email como verificado
      repository.update(user._id, {
        verificationToken: undefined,
        isVerified: true,
        role: defaultRole._id
      });

      return { success: true };

    }
    else {
      console.log('Token inválido o expirado');
      return { success: false, error: 'Token inválido o expirado' };
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

export async function forgotPassword(email) {
  // Verificar si el usuario ya existe
  try {
    const existingUser = await repository.getUserbyEmail(email)
    console.log('existingUser=>', existingUser)
    if (!existingUser) {
      throw new Error('la dirección de correo no está registrada')
    }

    // Generar un token de verificación
    const resetToken = tokenService.generateValidationToken(existingUser.id);

    // Crear URL de verificación
    const resetUrl = `https://nextfliks.netlify.app/resetpassword/${resetToken}`;

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
      await repository.update(existingUser._id, { $unset: { resetPasswordToken: "" } })
      console.error('Error al enviar el correo de verificación:', err);
      throw new Error('Error al enviar el correo de verificación');
    }


    return { success: true }

  } catch (error) {
    console.error(`se produjo un error: ${error} `)
    throw new Error(`Error al recuperar contraseña: ${error.message}`);

  }
}


////////////////////////


export async function resetPassword(id, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    repository.update(id, {
      password: hashedPassword,
      resetPasswordToken: ''
    });

    return { success: true };

  } catch (err) {
    console.error('no se pudo cambiar la contraseña:', err.message);
    return { success: false, error: err.message };

  }
};


export async function deleteUser(id) {
  try {
    const user = await repository.deleteUser(id)
    if (user) {
      return { success: true };
    }
    else {
      console.log('algo paso 🤔')
      console.log(user)
      return { success: false, error: 'no se encontró el usuario indicado' }
    }
  } catch (error) {
    console.error('no se pudo eliminar el usuario:', err.message);
    return { success: false, error: err.message }
  }
}


export async function changePassword(id, currentpassword, newpassword) {
  try {
    const user = await repository.getUserbyId(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isValidPassword = await bcrypt.compare(currentpassword, user.password);

    if (!isValidPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    repository.update(id, {
      password: hashedPassword,
    });

    return { success: true };

  } catch (err) {
    console.error('no se pudo cambiar la contraseña:', err.message);
    return { success: false, error: err.message };

  }
};

export async function getAllUsers() {
  try {
    const users = await repository.getAll()
    if (users) {
      return { success: true, users };
    }
    else {

      return { success: false, error: 'error al obtener los usuarios' }
    }
  } catch (error) {
    console.error('se produjo un error:', err.message);
    return { success: false, error: err.message }
  }
}


export async function getRoles() {
  try {
    const roles = await repository.getRoles()
    if (roles) {
      return { success: true, roles };
    }
    else {

      return { success: false, error: 'error al obtener los roles de usuario' }
    }
  } catch (error) {
    console.error('se produjo un error:', err.message);
    return { success: false, error: err.message }
  }
}


export async function updateUser(id, data) {
  try {
    const user = await repository.getUserbyId(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    repository.update(id, data);

    return { success: true };

  } catch (err) {
    console.error('no se pudo actualizar el usuario:', err.message);
    return { success: false, error: err.message };

  }
};
