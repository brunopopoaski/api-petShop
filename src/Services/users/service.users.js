import repository from '../../Repositories/users/repository.users.js';
import compareHashSenha from '../../Utils/compareHash.js';
import createToken from '../../Utils/createToken.js';
import createError from '../../Utils/createError.js';

export default {
    async login(cpf, senha) {
        try {
            const userDB = await repository.findByCpf(cpf);
            if (!userDB.cpf) {
                throw createError('Usuário não encontrado', 404);
            }
            const senhaValidaHash = await compareHashSenha(senha, userDB.senha);
            if (senhaValidaHash) {
                const novoToken = {
                    acess_token: await createToken({ tipo: userDB.tipoUsuario }),
                    type: "Bearer"
                }
                return novoToken;
            } else {
                throw createError('Senha incorreta!', 404);
            }
        } catch (error) {
            throw createError('Erro de autenticação.', 400);
        }
    }
}