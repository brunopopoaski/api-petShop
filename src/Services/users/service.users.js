import createError from "../../Utils/createError.js";
import userRepository from "../../Repositories/users/repository.users.js";
import hash from "../../Utils/hash.js";

export default {
    async createUser(nome, cpf, email, telefone, senha, endereco, role) {
        try {
            if (!nome || !cpf || !email || !telefone || !senha || !endereco || !role) {
                throw createError('Todos os campos são obrigatórios', 400);
            }
            const senhaHash = await hash.createHashSenha(senha);
            const novoUser = await userRepository.createUser(nome, cpf, email, telefone, senhaHash, endereco, role);
            return novoUser;
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw createError('Erro ao criar usuário.', 400);
        }
    },

    async listUsers() {
        try {
            return await userRepository.listUsers();
        } catch (error) {
            throw createError('Erro ao listar usuários.', 400);
        }
    },

    async findUserById(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório', 400);
            }

            const user = await userRepository.findUserById(id);
            if (!user) {
                throw createError('Usuário não encontrado', 404);
            }

            return user;
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw createError('Erro ao buscar usuário.', 400);
        }
    },

    async updateUser(id, nome, cpf, email, telefone, senha, endereco, role, status) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório', 400);
            }

            const dadosAtualizados = {};

            if (nome) dadosAtualizados.nome = nome;
            if (cpf) dadosAtualizados.cpf = cpf;
            if (email) dadosAtualizados.email = email;
            if (telefone) dadosAtualizados.telefone = telefone;
            if (senha) dadosAtualizados.senha = await hash.createHashSenha(senha);
            if (endereco) dadosAtualizados.endereco = endereco;
            if (role !== undefined) dadosAtualizados.role = role;
            if (status) dadosAtualizados.status = status;

            const userUpdated = await userRepository.updateUser(id, dadosAtualizados);
            if (!userUpdated) {
                throw createError('Usuário não encontrado', 404);
            }

            return userUpdated;
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw createError('Erro ao atualizar usuário.', 400);
        }
    },

    async deleteUser(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório', 400);
            }

            const userDeleted = await userRepository.deleteUser(id);
            if (!userDeleted) {
                throw createError('Usuário não encontrado', 404);
            }

            return userDeleted;
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            throw createError('Erro ao inativar usuário.', 400);
        }
    }
};