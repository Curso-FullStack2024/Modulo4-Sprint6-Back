
import profileRepository from '../repositories/profileRepository.js'
import tokenServices from './tokenServices.js'

const repository = profileRepository
const tokenService = tokenServices

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
    const profiles = await repository.findByUserId(valor)
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
    return { success: true };
  }
  catch (error) {
    console.error('no se pudo actualizar el perfil:', err.message);
    return { success: false, error: err.message };
  }
}
