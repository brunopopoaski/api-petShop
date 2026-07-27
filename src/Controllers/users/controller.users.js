import userService from '../../Services/users/service.users.js';



export default {
    async createUser(req, res, next) {
        try {
            const { nome, cpf, email, telefone, senha, endereco, role } = req.body;
            const novoUser = await userService.createUser(nome, cpf, email, telefone, senha, endereco, role);
            res.status(201).json(novoUser);
        } catch (error) {
            next(error);
        }
    },

    async listUsers(req, res, next) {
        try {
            const users = await userService.listUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}