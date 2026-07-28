import Muser from '../../Models/user.schema.js';

export default {
    async createUser(nome, cpf, email, telefone, hashSenha, endereco, role) {
        const novoUser = await Muser.create({
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            senha: hashSenha,
            endereco: endereco,
            role: role
        });
        return novoUser;
    },

    async listUsers() {
        return await Muser.find().select("-senha");
    },

    async findUserById(id) {
        return await Muser.findById(id).select("-senha");
    },

    async updateUser(id, dadosAtualizados) {
        return await Muser.findByIdAndUpdate(id, dadosAtualizados, { new: true }).select("-senha");
    },

    async deleteUser(id) {
        return await Muser.findByIdAndUpdate(id, { status: 'INATIVO' }, { new: true }).select("-senha");
    }
};