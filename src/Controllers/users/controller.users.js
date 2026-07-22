import userService from '../../Services/users/service.users.js';

export default {
    async login(req, res, next ) {
        try {
            const {cpf, senha} = req.body;
            const resultadoLogin = await userService.login(cpf, senha);
            res.status(201).json(resultadoLogin)  
        } catch (error) {
            next(error);
        }
    }
}