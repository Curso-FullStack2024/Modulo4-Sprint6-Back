import {  login, registerUser, verifyEmail, forgotPassword, resetPassword } from "../services/authServices.js";
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

// export async function verifyEmailController(req, res) {    
//     try {
//         // Obtener token hasheado        
//         const verificationToken = req.params.token;
//         const result=await verifyEmail(verificationToken);

//         if (result.success){
//             res.status(200).json({ message: 'Email verificado con éxito' });
//         }else{
//             console.log('Error al validar el token:', result.error);
//             // res.status(400).json({ message:  result.error }); 
//             throw new Error(result.error)
//         }
        
       
//     } catch (error) {
//         // console.log('Enlace no válido:', error);
//         res.status(400).json({ message: error.message });        
//     }
// }

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const result = await authService.login(email, password);
//         res.json(result);
//     } catch (error) {
//         console.log('Error en login:', error);
//         res.status(401).json({ message: error.message });
//     }
// };

// export async function loginController(req, res) {    
//     try {
//         const {email, password}=req.body
//         const result = await login(email, password)
//         res.status(200).send(result)        
//     } catch (error) {
//         console.log('Error en login:', error);
//         res.status(401).json({ message: error.message });        
//     }
// }



// export async function forgotPasswordController(req, res) {    
    
//     try {       
//         // Obtener token hasheado        
//         const { email } = req.body
//         const result=await forgotPassword(email);

//         if (result.success){
//             res.status(200).json({ message: 'ingresa tu nueva contraseña' });
//         }else{
//             console.log('Error al validar el token:', result.message);
//             // res.status(400).json({ message:  result.error }); 
//             throw new Error(result.message)
//         }               
//     } catch (error) {
//         // console.log('Enlace no válido:', error);
//         res.status(400).json({ message: error.message });        
//     }
// }



// export async function resetPasswordController(req, res) {    
//     try {
//         // Obtener token hasheado        
//           const {id, password} = req.body;
//         // console.log(id, password)
//        const result=await resetPassword(id, password);

//         if (result.success){
//             res.status(200).json({ message: 'contraseña cambiada' });
//         }else{
//             console.log('Error al cambiar la contraseña:', result.error);
//             // res.status(400).json({ message:  result.error }); 
//             throw new Error(result.error)
//         }
        
       
//     } catch (error) {
//         // console.log('Enlace no válido:', error);
//         res.status(400).json({ message: error.message });        
//     }
// }
