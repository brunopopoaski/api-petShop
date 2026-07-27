import Muser from '../../Models/user.schema.js';

export default {
    async createUser(nome, cpf, email, telefone, hashSenha, endereco, role) {
        const novoUser = await Muser.insertOne({
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            senha: hashSenha,
            endereco: endereco,
            role: role
        });
        return novoUser;
    }
}