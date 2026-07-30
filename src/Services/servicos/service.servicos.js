import createError from '../../Utils/createError.js';
import servicosRepository from '../../Repositories/servicos/repository.servicos.js';

export default {
    async listServicos() {
        try {
            return await servicosRepository.listServicos();
        } catch (error) {
            throw createError('Erro ao listar serviços.', 400);
        }
    }
};
