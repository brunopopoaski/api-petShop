import createError from '../../Utils/createError.js';
import servicosRepository from '../../Repositories/servicos/repository.servicos.js';

export default {
    async createServico(servicoData) {
        try {
            const { nome, descricao, preco, duracao, ativo } = servicoData || {};

            if (!nome || !descricao || preco === undefined || duracao === undefined) {
                throw createError('Os campos nome, descricao, preco e duracao são obrigatórios.', 400);
            }

            if (typeof preco !== 'number' || preco < 0) {
                throw createError('Preço inválido.', 400);
            }

            if (typeof duracao !== 'number' || duracao < 0) {
                throw createError('Duração inválida.', 400);
            }

            if (ativo !== undefined && typeof ativo !== 'boolean') {
                throw createError('O campo ativo deve ser booleano.', 400);
            }

            return await servicosRepository.createServico({
                nome,
                descricao,
                preco,
                duracao,
                ativo: ativo ?? true
            });
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao criar serviço.', 400);
        }
    },

    async listServicos() {
        try {
            return await servicosRepository.listServicos();
        } catch (error) {
            throw createError('Erro ao listar serviços.', 400);
        }
    }
};
