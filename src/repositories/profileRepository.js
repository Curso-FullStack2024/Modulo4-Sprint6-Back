import { Profile } from "../models/profileModel.js";


class profileRepository {
  

  // busca por nombre
  async getByName(name, userId) {

    try {
      return await Profile.findOne({ name: { $eq: name }, user: userId })
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
      const newProfile = await Profile.create(data)
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


  //BORRA EL  PERFIL POR ID
  async deleteProfile(id) {
    const profile = await Profile.findByIdAndDelete(id)
    return profile
  }
  ////////////////////
  async findByUserId(id) {

    const profiles = await Profile.find({ user: id });
    return profiles
  }
}
export default new profileRepository()