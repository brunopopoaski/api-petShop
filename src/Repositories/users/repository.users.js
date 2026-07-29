import MUser from '../../Models/user.schema.js';

export default {
    async createUser(nome, cpf, email, telefone, hashSenha, endereco, role) {
        const novoUser = await MUser.create({
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            senha: hashSenha,
            endereco: endereco,
            role: role
        });
        console.log("novoUser", novoUser)
        return novoUser;
    },

    async listUsers() {
        return await MUser.find().select("-senha");
    },

    async findUserById(id) {
        return await MUser.findById(id).select("-senha");
    },

    async updateUser(id, dadosAtualizados) {
        return await MUser.findByIdAndUpdate(id, dadosAtualizados, { new: true }).select("-senha");
    },

    async deleteUser(id) {
        return await MUser.findByIdAndUpdate(id, { status: 'INATIVO' }, { new: true }).select("-senha");
    }
};