import authService from '../../Services/auth/service.auth.js';

export default {
    async login(req, res, next ) {
        try {
            const {cpf, senha} = req.body;
            const resultadoLogin = await authService.login(cpf, senha);
            res.status(201).json(resultadoLogin)  
        } catch (error) {
            next(error);
        }
    }
}