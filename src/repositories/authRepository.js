import { User } from "../models/userModel.js";
import { Role } from "../models/roleModel.js";

class authRepository {

  // busca por email
  async getUserbyEmail(email) {
    try {
      return await User.findOne({ email: { $eq: email } }).populate({
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
      return await User.findOne({ username: { $eq: username } }).populate({
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
  //DEVUELVE TODOS LOS USUARIOS con su rol asociado
  async getAll(_skip = 0, _limit = null) {
    try {
      return await User.find().populate('role').select('-password -verificationToken -role.permissions').lean()
    } catch (error) {
      console.error(`se produjo un error: ${error} `)
    }
  }

  // busca por id de usuario
  async getUserbyId(id) {
    try {
      return await User.findById(id).populate({
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

  //crea un nuevo usuario
  async createUser(data) {
    try {
      const newUser = await User.create(data)
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


  //BORRA EL USUARIO POR ID
  async deleteUser(id) {
    try {
      const user = await User.findByIdAndDelete(id)
      return user

    } catch (error) {
      console.error(`se produjo un error: ${error} `)
      throw new Error(`Error al borrar el usuario: ${error.message}`);
    }
  }

  // obtiene todos los roles
  async getRoles(_id) {
    try {
      return await Role.find().select('-permissions')
    }
    catch (error) {
      console.error(`se produjo un error: ${error} `)
    }
  }
}

export default new authRepository()