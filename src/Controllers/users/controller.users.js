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
    },

    async findUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, cpf, email, telefone, senha, endereco, role, status } = req.body;
            const userUpdated = await userService.updateUser(id, nome, cpf, email, telefone, senha, endereco, role, status);
            res.status(200).json(userUpdated);
        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const userDeleted = await userService.deleteUser(id);
            res.status(200).json(userDeleted);
        } catch (error) {
            next(error);
        }
    },
        async findUserByIdProfile(req, res, next) {
        try {
            const id = req.user.id;
            const user = await userService.findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
        async updateUserProfile(req, res, next) {
        try {
            const id = req.user.id;
            const { nome, cpf, email, telefone, senha, endereco, role, status } = req.body;
            const userUpdated = await userService.updateUser(id, nome, cpf, email, telefone, senha, endereco, role, status);
            res.status(200).json(userUpdated);
        } catch (error) {
            next(error);
        }
    }
};