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
            throw createError('Erro ao criar usuário.', 400);;
        }
    }
}