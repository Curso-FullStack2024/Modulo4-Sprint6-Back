import { createProfile, deleteProfile, getProfilesByProp, updateProfile } from "../services/profileServices.js";

export async function createController(req, res) {    
    try {
        const newProfile = await createProfile(req.body)
        res.status(200).send(newProfile)        
    } catch (error) {
        console.log('Error en registro:', error);
        res.status(400).json({ message: error.message });        
    }
}


export async function getProfilesByUserIdController(req, res) {    
    try {      
        const { userId } = req.params
        if (userId){
        const profiles = await getProfilesByProp('user', userId)
        res.status(200).send(profiles)        
        }
        else{
            res.status(400).json({ message: 'no se indico el id del usuario' });  
        }
    } catch (error) {
        console.log('Error en getprofiles:', error);
        res.status(400).json({ message: error.message });        
    }
}


export async function updateController(req, res) {       
    try {
        const id=req.params.id       
        const updatedProfile = await updateProfile(id, req.body)
        res.status(200).send(updatedProfile)              
    } catch (error) {
        console.log('Error en registro:', error);
        res.status(400).json({ message: error.message });        
    }
}


export async function deleteProfileController(req, res) {    
    try {
        const { id } = req.params
        const profile = await deleteProfile(id)
        res.status(200).send(profile)        
    } catch (error) {
        console.log('Error en eliminar el perfil:', error);
        res.status(400).json({ message: error.message });        
    }
}
