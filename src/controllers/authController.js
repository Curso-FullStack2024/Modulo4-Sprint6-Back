import { login, registerUser, verifyEmail, forgotPassword, resetPassword, deleteUser, changePassword, getAllUsers, getRoles, updateUser } from "../services/authServices.js";


export async function registerController(req, res) {
  try {
    const newUser = await registerUser(req.body)
    res.status(200).send(newUser)
  } catch (error) {
    console.log('Error en registro:', error);
    res.status(400).json({ message: error.message });
  }
}


export async function verifyEmailController(req, res) {
  try {
    // Obtener token         
    const verificationToken = req.params.token;
    const result = await verifyEmail(verificationToken);

    if (result.success) {
      res.status(200).json({ message: 'Email verificado con éxito' });
    } else {
      console.log('Error al validar el token:', result.error);
      throw new Error(result.error)
    }


  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function loginController(req, res) {
  try {
    const { email, password } = req.body
    const result = await login(email, password)
    res.status(200).send(result)
  } catch (error) {
    console.log('Error en login:', error);
    res.status(401).json({ message: error.message });
  }
}


export async function forgotPasswordController(req, res) {

  try {
    // Obtener mail    
    const { email } = req.body
    const result = await forgotPassword(email);

    if (result.success) {
      res.status(200).json({ message: 'ingresa tu nueva contraseña' });
    } else {
      console.log('Error al validar el token:', result.message);
      throw new Error(result.message)
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function resetPasswordController(req, res) {
  try {
    const { id, password } = req.body;
    const result = await resetPassword(id, password);

    if (result.success) {
      res.status(200).json({ message: 'contraseña cambiada' });
    } else {
      console.log('Error al cambiar la contraseña:', result.error);
      throw new Error(result.error)
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);

    if (result.success) {
      res.status(200).json({ message: 'usuario eliminado' });
    } else {
      console.log('Error al eliminar el usuario:', result.error);
      throw new Error(result.error)
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function changePasswordController(req, res) {
  try {
    const { id, currentpassword, newpassword } = req.body;
    const result = await changePassword(id, currentpassword, newpassword);

    if (result.success) {
      res.status(200).json({ message: 'contraseña cambiada' });
    } else {
      console.log('Error al cambiar la contraseña:', result.error);
      throw new Error(result.error)
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function getAllUsersController(res) {
  try {
    const { users } = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log('se produjo un error:', error);
    res.status(400).json({ message: error.message });
  }
}


export async function getRolesController(res) {
  try {
    const { roles } = await getRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.log('se produjo un error:', error);
    res.status(400).json({ message: error.message });
  }
}


export async function updateUserController(req, res) {
  try {
    const User = await updateUser(req.params.id, req.body)
    res.send(User)
  } catch (error) {
    console.error('se produjo un error', error)
  }
}
