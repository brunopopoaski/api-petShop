import authRepository from '../../Repositories/auth/repository.auth.js';
import hash from '../../Utils/hash.js';
import createToken from '../../Utils/createToken.js';
import createError from '../../Utils/createError.js';

export default {
    async login(cpf, senha) {
        try {
            const userDB = await authRepository.findByCpf(cpf);
            if (!userDB.cpf) {
                throw createError('Usuário não encontrado', 404);
            }
            
            const senhaValidaHash = await hash.compareHashSenha(senha, userDB.senha);
            if (senhaValidaHash) {
                const novoToken = {
                    acess_token: await createToken({ role: userDB.role, id: userDB._id }),
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