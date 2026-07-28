import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import createError from '../Utils/createError.js';

export default function authMiddleware(requiredRole = null) {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw createError('Token não informado.', 401);
            }
            
            const token = authHeader.split(' ')[1];
            req.user = jwt.verify(token, env.JWT_SECRET);
        

            if (requiredRole && req.user.role !== requiredRole) {
                throw createError('Acesso negado.', 403);
            }

            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado.' });
            }

            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token inválido.' });
            }

            return res.status(error.statusCode || 500).json({ message: error.message || 'Erro de autenticação.' });
        }
    };
}
