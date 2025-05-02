import jwt from 'jsonwebtoken';
import { get } from 'mongoose';

class TokenService {
    // Generar token para validar por mail)
    generateValidationToken(userId) {
        const jwtToken = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return jwtToken
    }

    // Verificar token de registro
    verifyToken(token) {
        try {
            if (!token) {
                return { isValid: false, error: 'Token no proporcionado' };
            }
            //   const payload= jwt.verify(token, process.env.JWT_SECRET);
            //   return payload
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            return { isValid: true, payload };
        } catch (error) {

            let errorMessage = 'Token inválido';

            if (error instanceof jwt.JsonWebTokenError) {
                errorMessage = 'Token inválido o malformado';
            } else if (error instanceof jwt.TokenExpiredError) {
                errorMessage = 'Token ha expirado';
            } else if (error instanceof jwt.NotBeforeError) {
                errorMessage = 'Token no válido aún (fecha de inicio en el futuro)';
            }

            return { isValid: false, error: errorMessage };
        }
    }

    getSignedJwtToken(user) {

        // Creamos un token que incluye el solo el id

        return jwt.sign(
            {
                id: user._id,              
            },
            // Usamos la clave secreta del .env
            process.env.JWT_SECRET,
            // El token expira en 24 horas
            { expiresIn: '24h' }
        );
    };


    generateToken(user) {

        // Creamos un token que incluye el id, rol y permisos del usuario

        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: {
                    name: user.role.name,
                    description: user.role.description
                }
            },
            // Usamos la clave secreta del .env
            process.env.JWT_SECRET,
            // El token expira en 24 horas
            { expiresIn: '24h' }
        );
    };

}
export default new TokenService();